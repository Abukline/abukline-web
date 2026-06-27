// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Contact Form API Route
// POST /api/contact
//
// Flow:
//   1. Validate input (name, email, message required; honeypot anti-spam)
//   2. Send Telegram notification to owner  ← critical path for lead capture
//   3. Send HTML confirmation email to user ← best-effort, non-blocking
//      · In test mode (resend.dev domain): skipped — Resend restricts delivery
//        to the verified account owner only. Set CONTACT_FROM_EMAIL to a
//        verified @abukline.com address to enable in production.
//      · In production: attempted; failure logged as warning, not surfaced
//        to user. Telegram already ensures the lead is captured.
//   4. Return success / controlled error
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildEmailHtml } from '@/lib/emailTemplate'

// ─── Rate limiting (in-memory — replace with Redis for multi-instance prod) ──

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3           // max submissions per window
const RATE_WINDOW = 60 * 60 * 1000  // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ─── Localized validation messages ───────────────────────────────────────────

type SupportedLang = 'en' | 'it' | 'es'

const msgs: Record<SupportedLang, {
  name: string
  email: string
  messageShort: string
  messageLong: string
  rateLimit: string
}> = {
  en: {
    name: 'Name must be at least 2 characters.',
    email: 'A valid email address is required.',
    messageShort: 'Message must be at least 10 characters.',
    messageLong: 'Message must be under 5000 characters.',
    rateLimit: 'Too many requests. Please try again later.',
  },
  it: {
    name: 'Il nome deve contenere almeno 2 caratteri.',
    email: 'Inserisci un indirizzo email valido.',
    messageShort: 'Il messaggio deve contenere almeno 10 caratteri.',
    messageLong: 'Il messaggio non può superare i 5000 caratteri.',
    rateLimit: 'Troppe richieste. Riprova più tardi.',
  },
  es: {
    name: 'El nombre debe tener al menos 2 caracteres.',
    email: 'Introduce una dirección de email válida.',
    messageShort: 'El mensaje debe tener al menos 10 caracteres.',
    messageLong: 'El mensaje no puede superar los 5000 caracteres.',
    rateLimit: 'Demasiadas solicitudes. Por favor, inténtalo más tarde.',
  },
}

function resolveLang(lang: string | undefined): SupportedLang {
  return (['en', 'it', 'es'] as SupportedLang[]).includes(lang as SupportedLang)
    ? (lang as SupportedLang)
    : 'en'
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function esc(str: string): string {
  // Escape Markdown special chars for Telegram MarkdownV2
  return str.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (c) => `\\${c}`)
}

// ─── Telegram ────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string
  email: string
  company?: string
  type?: string
  subject?: string
  message: string
  language?: string
}

async function sendTelegramNotification(data: ContactPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[Contact] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping')
    return
  }

  const timestamp = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const lines = [
    '🚀 *New ABUKLINE Inquiry*',
    '',
    `*Name:* ${esc(data.name)}`,
    `*Email:* ${esc(data.email)}`,
    `*Company:* ${esc(data.company || '—')}`,
    `*Type:* ${esc(data.type || '—')}`,
    `*Subject:* ${esc(data.subject || '—')}`,
    `*Language:* ${esc((data.language || 'en').toUpperCase())}`,
    '',
    '*Message:*',
    esc(data.message),
    '',
    `⏱ ${esc(timestamp)}`,
    '🌐 abukline\\.com',
  ]

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'MarkdownV2',
      }),
    },
  )

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram error ${response.status}: ${body}`)
  }
}

// ─── Resend email ─────────────────────────────────────────────────────────────

async function sendConfirmationEmail(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not set')

  const resend = new Resend(apiKey)

  const lang = (['en', 'it', 'es'].includes(data.language ?? '')
    ? (data.language as 'en' | 'it' | 'es')
    : 'en')

  const { subject, html } = buildEmailHtml({
    name: data.name,
    email: data.email,
    company: data.company,
    type: data.type ?? '',
    subject: data.subject,
    language: lang,
  })

  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'
  const replyTo = process.env.CONTACT_REPLY_TO_EMAIL ?? 'hello@abukline.com'

  // When using Resend's test domain (onboarding@resend.dev) emails can only
  // be delivered to the Resend account owner's email address.
  // Switch CONTACT_FROM_EMAIL to hello@abukline.com once the domain is verified.
  const isTestDomain = fromEmail.includes('resend.dev')
  const fromField = isTestDomain
    ? fromEmail                      // test domain: use as-is, no display name
    : `ABUKLINE <${fromEmail}>`      // verified domain: branded display name

  const { error } = await resend.emails.send({
    from: fromField,
    to: [data.email],
    replyTo: replyTo,
    subject,
    html,
  })

  if (error) throw new Error(`Resend error: ${error.message}`)
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── IP for rate limiting ──
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  // ── Parse body first (needed for language-aware errors) ──
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const {
    name,
    email,
    company,
    type,
    subject,
    message,
    language,
    honeypot, // hidden anti-spam field — must be empty
  } = body as Record<string, string | undefined>

  const m = msgs[resolveLang(language)]

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: m.rateLimit }, { status: 429 })
  }

  // ── Honeypot check ──
  if (honeypot) {
    // Silently accept to not reveal the trap
    return NextResponse.json({ ok: true })
  }

  // ── Validation ──
  const errors: string[] = []

  if (!name?.trim() || name.trim().length < 2) {
    errors.push(m.name)
  }
  if (!email?.trim() || !isValidEmail(email)) {
    errors.push(m.email)
  }
  if (!message?.trim() || message.trim().length < 10) {
    errors.push(m.messageShort)
  }
  if (message && message.length > 5000) {
    errors.push(m.messageLong)
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0] }, { status: 422 })
  }

  const payload: ContactPayload = {
    name: name!.trim(),
    email: email!.trim().toLowerCase(),
    company: company?.trim() || undefined,
    type: type?.trim() || undefined,
    subject: subject?.trim() || undefined,
    message: message!.trim(),
    language: language?.trim() || 'en',
  }

  // ── Send Telegram (non-blocking on failure) ──
  try {
    await sendTelegramNotification(payload)
  } catch (err) {
    console.error('[Contact] Telegram notification failed:', err)
  }

  // ── Send confirmation email to user (best-effort, non-blocking) ──
  // In test mode (resend.dev from address), Resend only delivers to the
  // verified account owner — skip silently for other recipients.
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'
  const isTestMode = fromEmail.includes('resend.dev')

  if (isTestMode) {
    console.info(
      '[Contact] Resend test mode — confirmation email skipped for:',
      payload.email,
      '(set CONTACT_FROM_EMAIL to a verified @abukline.com address to enable)',
    )
  } else {
    try {
      await sendConfirmationEmail(payload)
    } catch (err) {
      // Non-blocking: lead is already captured via Telegram.
      // Log as warning, do not surface a 500 to the user.
      console.warn('[Contact] Confirmation email failed (non-blocking):', err)
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
