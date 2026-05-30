// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Contact Form API Route
// POST /api/contact
//
// Flow:
//   1. Validate input (name, email, message required; honeypot anti-spam)
//   2. Send Telegram notification to owner
//   3. Send HTML confirmation email to user via Resend
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

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  // ── Parse body ──
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

  // ── Honeypot check ──
  if (honeypot) {
    // Silently accept to not reveal the trap
    return NextResponse.json({ ok: true })
  }

  // ── Validation ──
  const errors: string[] = []

  if (!name?.trim() || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.')
  }
  if (!email?.trim() || !isValidEmail(email)) {
    errors.push('A valid email address is required.')
  }
  if (!message?.trim() || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.')
  }
  if (message && message.length > 5000) {
    errors.push('Message must be under 5000 characters.')
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
    // Do NOT surface this to the user — email is the critical path
  }

  // ── Send confirmation email (critical) ──
  try {
    await sendConfirmationEmail(payload)
  } catch (err) {
    console.error('[Contact] Confirmation email failed:', err)
    return NextResponse.json(
      { error: 'Failed to send confirmation. Please try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
