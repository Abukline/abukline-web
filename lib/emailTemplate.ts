// ─────────────────────────────────────────────────────────────────────────────
// ABUKLINE — Premium Contact Confirmation Email Template
//
// Design language: dark cinematic ecosystem identity.
// Inspired by: Linear, Vercel, Stripe, Arc Browser.
//
// Email-safe implementation:
//   · Table-based layout (Outlook compatible)
//   · Inline styles + bgcolor HTML attributes
//   · MSO conditional comments for Outlook button (VML)
//   · Gradient fallback for Outlook (solid colour)
//   · No JavaScript, no animations, no external images
//
// CSS class system (overridden in @media mobile):
//   email-padding  → outer header/footer cells
//   card-top       → card body section (eyebrow + headline + body text)
//   card-padding   → internal card sections (summary, note)
//   sep-padding    → separator cells — ONLY horizontal padding, never vertical
//   cta-padding    → CTA cell
//   footer-cell    → footer outer cell
//   footer-text    → footer text td (centered on mobile)
//   body-text      → body paragraph
//   note-text      → note paragraph
//   hide-mobile    → hidden on mobile
//
// Tested: Gmail (web + iOS + Android) · Outlook 2016+ · Apple Mail · Yahoo Mail
// ─────────────────────────────────────────────────────────────────────────────

export interface EmailData {
  name: string
  email: string
  company?: string
  type: string
  subject?: string
  language: 'en' | 'it' | 'es'
}

// ─── i18n copy ───────────────────────────────────────────────────────────────

const copy = {
  en: {
    subject:      'We received your message · ABUKLINE',
    eyebrow:      'Confirmation',
    title:        'Thank you for reaching out.',
    body:         "We've received your message. Our team will review it and get back to you shortly.",
    summaryLabel: 'Your inquiry',
    labelName:    'Name',
    labelEmail:   'Email',
    labelCompany: 'Company',
    labelType:    'Type',
    labelSubject: 'Subject',
    noteHeading:  'What happens next',
    note:         "We review every inquiry personally. You'll hear from us within 24–48 hours. For urgent matters, reach us directly at hello@abukline.com.",
    cta:          'Visit ABUKLINE',
    footerLine1:  'ABUKLINE',
    footerLine2:  'Building Digital Ecosystems',
  },
  it: {
    subject:      'Abbiamo ricevuto il tuo messaggio · ABUKLINE',
    eyebrow:      'Conferma',
    title:        'Grazie per averci contattato.',
    body:         'Abbiamo ricevuto il tuo messaggio. Il team ABUKLINE lo analizzerà e ti risponderà il prima possibile.',
    summaryLabel: 'La tua richiesta',
    labelName:    'Nome',
    labelEmail:   'Email',
    labelCompany: 'Azienda',
    labelType:    'Tipo',
    labelSubject: 'Oggetto',
    noteHeading:  'Cosa succede ora',
    note:         'Ogni richiesta viene analizzata personalmente. Ti risponderemo entro 24–48 ore. Per urgenze, scrivici direttamente a hello@abukline.com.',
    cta:          'Visita ABUKLINE',
    footerLine1:  'ABUKLINE',
    footerLine2:  'Costruiamo Ecosistemi Digitali',
  },
  es: {
    subject:      'Hemos recibido tu mensaje · ABUKLINE',
    eyebrow:      'Confirmación',
    title:        'Gracias por contactarnos.',
    body:         'Hemos recibido tu mensaje. El equipo de ABUKLINE lo revisará y te responderá lo antes posible.',
    summaryLabel: 'Tu consulta',
    labelName:    'Nombre',
    labelEmail:   'Email',
    labelCompany: 'Empresa',
    labelType:    'Tipo',
    labelSubject: 'Asunto',
    noteHeading:  'Próximos pasos',
    note:         'Revisamos cada consulta de forma personal. Te responderemos en un plazo de 24–48 horas. Para urgencias, escríbenos a hello@abukline.com.',
    cta:          'Visitar ABUKLINE',
    footerLine1:  'ABUKLINE',
    footerLine2:  'Construyendo Ecosistemas Digitales',
  },
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Data row in the inquiry summary card.
// word-break:break-word prevents long emails / subjects from overflowing on mobile.
function dataRow(label: string, value: string | undefined, isLast = false): string {
  if (!value?.trim()) return ''
  const border = isLast ? '' : 'border-bottom:1px solid #1a1a1a;'
  return /* html */`
    <tr>
      <td style="${border}padding:11px 0;vertical-align:top;width:36%;">
        <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:10px;color:#484848;letter-spacing:0.12em;text-transform:uppercase;">${label}</span>
      </td>
      <td style="${border}padding:11px 0 11px 14px;vertical-align:top;">
        <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#c8c8c8;line-height:1.5;word-break:break-word;overflow-wrap:anywhere;">${esc(value)}</span>
      </td>
    </tr>`
}

// ─── ABUKLINE Grid Mark ───────────────────────────────────────────────────────
// Official 3×3 brand mark. Cell colours = opacity values composited onto #050505.
// TL:#ACACAC  TC:#3B82F6  TR:#272727
// ML:#272727  MC:#898989  MR:#484848
// BL:#141414  BC:#272727  BR:#737373

const GRID_MARK = /* html */`
<table cellpadding="0" cellspacing="2" role="presentation" bgcolor="#050505"
       style="border-collapse:separate;display:inline-table;line-height:0;font-size:0;">
  <tr>
    <td width="8" height="8" bgcolor="#ACACAC" style="border-radius:1px;font-size:0;line-height:0;"> </td>
    <td width="8" height="8" bgcolor="#3B82F6" style="border-radius:1px;font-size:0;line-height:0;"> </td>
    <td width="8" height="8" bgcolor="#272727" style="border-radius:1px;font-size:0;line-height:0;"> </td>
  </tr>
  <tr>
    <td width="8" height="8" bgcolor="#272727" style="border-radius:1px;font-size:0;line-height:0;"> </td>
    <td width="8" height="8" bgcolor="#898989" style="border-radius:1px;font-size:0;line-height:0;"> </td>
    <td width="8" height="8" bgcolor="#484848" style="border-radius:1px;font-size:0;line-height:0;"> </td>
  </tr>
  <tr>
    <td width="8" height="8" bgcolor="#141414" style="border-radius:1px;font-size:0;line-height:0;"> </td>
    <td width="8" height="8" bgcolor="#272727" style="border-radius:1px;font-size:0;line-height:0;"> </td>
    <td width="8" height="8" bgcolor="#737373" style="border-radius:1px;font-size:0;line-height:0;"> </td>
  </tr>
</table>`

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildEmailHtml(data: EmailData): { subject: string; html: string } {
  const lang = (data.language in copy ? data.language : 'en') as keyof typeof copy
  const t = copy[lang]

  // Build data rows — determine which is last for border removal
  const rows = [
    { label: t.labelName,    value: data.name },
    { label: t.labelEmail,   value: data.email },
    { label: t.labelCompany, value: data.company },
    { label: t.labelType,    value: data.type },
    { label: t.labelSubject, value: data.subject },
  ].filter((r) => r.value?.trim())

  const dataRowsHtml = rows
    .map((r, i) => dataRow(r.label, r.value, i === rows.length - 1))
    .join('')

  const html = /* html */`<!DOCTYPE html>
<html lang="${lang}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
  <!-- Declares this email as dark-first so Apple Mail / iOS Mail don't auto-invert -->
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <title>${esc(t.subject)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        <o:AllowPNG/>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td { font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    :root { color-scheme: dark light; }

    /*
     * Mobile breakpoint — max-width:600px
     *
     * Class map (desktop → mobile):
     *   email-padding  outer header/footer       52px/44px    → 24px/16px
     *   card-top       card body section          44px 44px    → 28px 20px
     *   card-padding   summary / note sections    28px 44px    → 20px 20px
     *   sep-padding    1px separator rows         0  44px      → 0   20px  ← ONLY horizontal
     *   cta-padding    CTA section                32px 44px    → 24px 20px
     *   footer-cell    footer outer cell          36px 0 52px  → 24px 16px 36px
     *   footer-text    footer inner text cell     (left-align) → center
     *
     * sep-padding is the critical fix: separators must never get vertical padding
     * from a generic override — the 1px line would be surrounded by 56px of empty
     * space on mobile.
     */
    @media only screen and (max-width:600px) {
      .email-container { width:100% !important; }
      .email-padding   { padding:24px 16px !important; }
      .card-top        { padding:28px 20px 16px !important; }
      .card-padding    { padding:20px 20px !important; }
      .sep-padding     { padding:0 20px !important; }
      .cta-padding     { padding:24px 20px 32px !important; }
      .footer-cell     { padding:24px 16px 36px !important; }
      .footer-text     { text-align:center !important; }
      .headline        { font-size:21px !important; line-height:1.25 !important; }
      .body-text       { font-size:14px !important; line-height:1.7 !important; }
      .note-text       { font-size:13px !important; line-height:1.7 !important; }
      .hide-mobile     { display:none !important; }
    }

    /*
     * Dark mode reinforcement for Apple Mail and macOS Mail.
     * Gmail uses its own algorithm and ignores this; Outlook desktop ignores it.
     * These rules simply re-assert our dark colours so the client doesn't invert them.
     */
    @media (prefers-color-scheme: dark) {
      .dm-bg   { background-color:#050505 !important; }
      .dm-card { background-color:#0d0d0d !important; }
      .dm-inner{ background-color:#111111 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#050505;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;" bgcolor="#050505">

<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td><![endif]-->

<!-- ░░░ PREHEADER (invisible in client, shows in inbox preview) ░░░ -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#050505;">${esc(t.title)}&nbsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;&hairsp;&zwnj;</div>

<!-- ░░░ OUTER WRAPPER ░░░ -->
<!-- table-layout:fixed removed — it fights width:100% on mobile. -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#050505"
       class="dm-bg"
       style="background-color:#050505;min-height:100%;">
  <tr>
    <td align="center" valign="top" style="padding:0 16px;">

      <!-- ░░░ EMAIL CONTAINER (max 560px, fluid on mobile) ░░░ -->
      <table class="email-container" role="presentation" cellpadding="0" cellspacing="0"
             width="560" style="max-width:560px;width:100%;">

        <!-- ─────────────────────────────────────────────────────── -->
        <!-- SECTION 1 — HEADER: Grid Mark + Wordmark               -->
        <!-- ─────────────────────────────────────────────────────── -->
        <tr>
          <!-- email-padding: desktop 52px top / 44px bottom → mobile 24px/16px -->
          <td align="center" style="padding:52px 0 44px;" class="email-padding">

            <!-- Grid Mark + Wordmark in a row -->
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="middle" style="padding-right:12px;">
                  ${GRID_MARK}
                </td>
                <td valign="middle">
                  <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:300;color:#EFEFEF;letter-spacing:0.32em;text-transform:uppercase;line-height:1;">ABUKLINE</span>
                </td>
              </tr>
            </table>

            <!-- Ecosystem Company label -->
            <p style="margin:10px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:9px;color:#2e2e2e;letter-spacing:0.22em;text-transform:uppercase;">Ecosystem Company</p>

          </td>
        </tr>

        <!-- ─────────────────────────────────────────────────────── -->
        <!-- SECTION 2 — MAIN CARD                                  -->
        <!-- ─────────────────────────────────────────────────────── -->
        <tr>
          <td style="border-radius:16px;overflow:hidden;" bgcolor="#0d0d0d">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                   bgcolor="#0d0d0d"
                   class="dm-card"
                   style="background-color:#0d0d0d;border:1px solid #1c1c1c;border-radius:16px;overflow:hidden;">
              <tr>
                <td>

                  <!-- ── Gradient accent bar ── -->
                  <!--[if mso]>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr><td height="3" bgcolor="#3b82f6" style="font-size:0;line-height:0;"> </td></tr>
                  </table>
                  <![endif]-->
                  <!--[if !mso]><!-->
                  <div style="height:2px;background:linear-gradient(90deg,#1d4ed8 0%,#3b82f6 45%,#6366f1 100%);font-size:0;line-height:0;"> </div>
                  <!--<![endif]-->

                  <!-- ── Card body ── -->
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <!-- card-top: desktop 44px 44px 12px → mobile 28px 20px 16px -->
                      <td style="padding:44px 44px 12px;" class="card-top">

                        <!-- Eyebrow label -->
                        <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:9px;color:#3b82f6;letter-spacing:0.22em;text-transform:uppercase;">${esc(t.eyebrow)}</p>

                        <!-- Headline — font-size overridden by .headline on mobile (21px) -->
                        <h1 class="headline" style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:26px;font-weight:700;color:#f0f0f0;letter-spacing:-0.025em;line-height:1.25;">${esc(t.title)}</h1>

                        <!-- Body text — .body-text overrides font-size to 14px on mobile -->
                        <p class="body-text" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#686868;line-height:1.75;">${esc(t.body)}</p>

                      </td>
                    </tr>

                    <!-- ── Separator ── -->
                    <tr>
                      <!-- sep-padding: ONLY horizontal padding — never vertical on separators -->
                      <td style="padding:32px 44px 0;" class="sep-padding">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tr><td height="1" bgcolor="#181818" style="font-size:0;line-height:0;"> </td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- ── Inquiry summary card ── -->
                    <tr>
                      <!-- card-padding: desktop 28px 44px → mobile 20px 20px -->
                      <td style="padding:28px 44px;" class="card-padding">

                        <!-- Summary heading -->
                        <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:9px;color:#383838;letter-spacing:0.18em;text-transform:uppercase;">${esc(t.summaryLabel)}</p>

                        <!-- Data card -->
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                               bgcolor="#111111"
                               class="dm-inner"
                               style="background-color:#111111;border:1px solid #1c1c1c;border-radius:10px;">
                          <tr>
                            <td style="padding:4px 20px;">
                              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                ${dataRowsHtml}
                              </table>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                    <!-- ── Separator ── -->
                    <tr>
                      <!-- sep-padding: mobile → 0 20px, NO vertical padding -->
                      <td style="padding:0 44px;" class="sep-padding">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tr><td height="1" bgcolor="#181818" style="font-size:0;line-height:0;"> </td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- ── Response note ── -->
                    <tr>
                      <!-- card-padding: desktop 28px 44px → mobile 20px 20px -->
                      <td style="padding:28px 44px;" class="card-padding">

                        <!-- Note heading -->
                        <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:9px;color:#383838;letter-spacing:0.18em;text-transform:uppercase;">${esc(t.noteHeading)}</p>

                        <!-- Note block with blue left border -->
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <!-- Blue accent bar (2px) -->
                            <td width="2" bgcolor="#2563eb" style="background-color:#2563eb;border-radius:2px;font-size:0;line-height:0;"> </td>
                            <!-- Note text — .note-text overrides to 13px on mobile -->
                            <td style="padding:2px 0 2px 16px;">
                              <p class="note-text" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#585858;line-height:1.75;word-break:break-word;">${esc(t.note)}</p>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                    <!-- ── Separator ── -->
                    <tr>
                      <!-- sep-padding: mobile → 0 20px, NO vertical padding -->
                      <td style="padding:0 44px;" class="sep-padding">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          <tr><td height="1" bgcolor="#181818" style="font-size:0;line-height:0;"> </td></tr>
                        </table>
                      </td>
                    </tr>

                    <!-- ── CTA ── -->
                    <tr>
                      <!-- cta-padding: desktop 32px 44px 44px → mobile 24px 20px 32px -->
                      <td align="center" style="padding:32px 44px 44px;" class="cta-padding">

                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                          href="https://abukline.com"
                          style="height:46px;v-text-anchor:middle;width:192px;"
                          arcsize="17%"
                          stroke="f"
                          fillcolor="#1d4ed8">
                          <w:anchorlock/>
                          <center style="color:#e8f0ff;font-family:sans-serif;font-size:13px;font-weight:500;letter-spacing:0.05em;">${esc(t.cta)} &rarr;</center>
                        </v:roundrect>
                        <![endif]-->
                        <!--[if !mso]><!-->
                        <a href="https://abukline.com" target="_blank"
                           style="display:inline-block;background-color:#1d3a6e;border:1px solid #2563eb;border-radius:10px;padding:14px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:500;color:#c8d9ff;text-decoration:none;letter-spacing:0.06em;white-space:nowrap;-webkit-text-size-adjust:none;mso-padding-alt:0;">
                          ${esc(t.cta)}&nbsp;&rarr;
                        </a>
                        <!--<![endif]-->

                      </td>
                    </tr>

                  </table>
                  <!-- /Card body -->

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ─────────────────────────────────────────────────────── -->
        <!-- SECTION 3 — FOOTER                                     -->
        <!-- ─────────────────────────────────────────────────────── -->
        <tr>
          <!-- footer-cell: desktop 36px 0 52px → mobile 24px 16px 36px -->
          <td align="center" style="padding:36px 0 52px;" class="footer-cell">

            <!--
              Footer layout: Grid Mark (hidden on mobile) + text column.
              On mobile the grid mark td is hidden via .hide-mobile.
              .footer-text centers the text column when the mark disappears.
            -->
            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <!-- Smaller grid mark for footer (6px cells) — hidden on mobile -->
                <td valign="middle" style="padding-right:10px;" class="hide-mobile">
                  <table cellpadding="0" cellspacing="1" role="presentation" bgcolor="#050505"
                         style="border-collapse:separate;display:inline-table;line-height:0;font-size:0;opacity:0.35;">
                    <tr>
                      <td width="6" height="6" bgcolor="#ACACAC" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                      <td width="6" height="6" bgcolor="#3B82F6" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                      <td width="6" height="6" bgcolor="#272727" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                    </tr>
                    <tr>
                      <td width="6" height="6" bgcolor="#272727" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                      <td width="6" height="6" bgcolor="#898989" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                      <td width="6" height="6" bgcolor="#484848" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                    </tr>
                    <tr>
                      <td width="6" height="6" bgcolor="#141414" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                      <td width="6" height="6" bgcolor="#272727" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                      <td width="6" height="6" bgcolor="#737373" style="border-radius:1px;font-size:0;line-height:0;"> </td>
                    </tr>
                  </table>
                </td>

                <!--
                  Text column.
                  Colors are intentionally dim on dark background (ghost footer aesthetic)
                  but lightened from the original to remain legible:
                    ABUKLINE brand:  #2a2a2a → #3a3a3a  (was nearly invisible)
                    Tagline:         #222222 → #303030
                    Email link:      #1e1e1e → #2c2c2c
                  On Gmail/Outlook light rendering these all appear as dark gray — correct.
                -->
                <td valign="middle" class="footer-text">
                  <p style="margin:0 0 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;font-weight:300;color:#3a3a3a;letter-spacing:0.26em;text-transform:uppercase;">${esc(t.footerLine1)}</p>
                  <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:9px;color:#303030;letter-spacing:0.14em;text-transform:uppercase;">${esc(t.footerLine2)}</p>
                  <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:10px;">
                    <a href="mailto:hello@abukline.com" style="color:#2c2c2c;text-decoration:none;">hello@abukline.com</a>
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

      </table>
      <!-- /Email container -->

    </td>
  </tr>
</table>
<!-- /Outer wrapper -->

<!--[if mso]></td></tr></table><![endif]-->

</body>
</html>`

  return { subject: t.subject, html }
}
