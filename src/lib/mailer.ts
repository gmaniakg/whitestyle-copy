import nodemailer from 'nodemailer';

export interface EmailProviderStatus {
  resendConfigured: boolean;
  smtpConfigured: boolean;
  activeProvider: 'resend' | 'smtp' | 'none';
  fromAddress: string;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendEmailResult {
  ok: boolean;
  provider: 'resend' | 'smtp' | 'none';
  status: 'SENT' | 'FAILED' | 'SKIPPED_NO_CONFIG';
  providerMessageId?: string;
  error?: string;
}

function getFromAddress(): string {
  const custom = (process.env.EMAIL_FROM || '').trim();
  if (custom) return custom;
  if ((process.env.RESEND_API_KEY || '').trim()) {
    return '화이트스타일치과의원 <onboarding@resend.dev>';
  }
  const smtpUser = (process.env.SMTP_USER || '').trim();
  if (smtpUser) {
    return `화이트스타일치과의원 <${smtpUser}>`;
  }
  return '화이트스타일치과의원 <white@whitestyle.com>';
}

export function getEmailProviderStatus(): EmailProviderStatus {
  const resendConfigured = Boolean((process.env.RESEND_API_KEY || '').trim());
  const smtpConfigured = Boolean(
    (process.env.SMTP_USER || '').trim() && (process.env.SMTP_PASS || '').trim()
  );
  const activeProvider: 'resend' | 'smtp' | 'none' = resendConfigured
    ? 'resend'
    : smtpConfigured
      ? 'smtp'
      : 'none';

  return {
    resendConfigured,
    smtpConfigured,
    activeProvider,
    fromAddress: getFromAddress(),
  };
}

export async function sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const to = String(payload.to || '').trim().toLowerCase();
  if (!to || !to.includes('@')) {
    return {
      ok: false,
      provider: 'none',
      status: 'FAILED',
      error: '수신자 이메일 주소가 올바르지 않습니다.',
    };
  }

  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();
  const from = getFromAddress();

  let lastError: string | undefined;

  if (resendKey) {
    try {
      const resendFrom = (process.env.RESEND_FROM || process.env.EMAIL_FROM || '화이트스타일치과의원 <onboarding@resend.dev>').trim();
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(4500),
        body: JSON.stringify({
          from: resendFrom,
          to: [to],
          subject: payload.subject,
          html: payload.html,
          ...(payload.text ? { text: payload.text } : {}),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.id) {
        return {
          ok: true,
          provider: 'resend',
          status: 'SENT',
          providerMessageId: String(data.id),
        };
      }
      lastError = data?.message || data?.error || `Resend HTTP ${res.status}`;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  if (smtpUser && smtpPass) {
    try {
      const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
      const port = Number(process.env.SMTP_PORT || 465);
      const secure = (process.env.SMTP_SECURE ?? 'true') !== 'false';
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 4500,
        greetingTimeout: 4500,
        socketTimeout: 5000,
      });

      const smtpFrom = (process.env.EMAIL_FROM || `화이트스타일치과의원 <${smtpUser}>`).trim();
      const info = await transporter.sendMail({
        from: smtpFrom,
        to,
        subject: payload.subject,
        html: payload.html,
        ...(payload.text ? { text: payload.text } : {}),
      });

      return {
        ok: true,
        provider: 'smtp',
        status: 'SENT',
        providerMessageId: info.messageId ? String(info.messageId) : undefined,
      };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  if (!resendKey && !(smtpUser && smtpPass)) {
    return {
      ok: false,
      provider: 'none',
      status: 'SKIPPED_NO_CONFIG',
      error: '이메일 발송 키(RESEND_API_KEY 또는 SMTP_USER/SMTP_PASS)가 미설정 상태입니다.',
    };
  }

  return {
    ok: false,
    provider: resendKey ? 'resend' : 'smtp',
    status: 'FAILED',
    error: lastError || '이메일 발송에 실패했습니다.',
  };
}
