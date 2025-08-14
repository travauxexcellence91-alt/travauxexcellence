import nodemailer from 'nodemailer';
import twilio from 'twilio';

let mailer: nodemailer.Transporter | null = null;
let smsClient: ReturnType<typeof twilio> | null = null;

function getMailer() {
  if (mailer) return mailer;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env as any;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error('Missing SMTP configuration');
  }
  mailer = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return mailer;
}

function getSmsClient() {
  if (smsClient) return smsClient;
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env as any;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) return null;
  smsClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  return smsClient;
}

export async function sendEmail(to: string, subject: string, text: string) {
  const transporter = getMailer();
  const from = process.env.SMTP_FROM as string;
  await transporter.sendMail({ from, to, subject, text });
}

export async function sendSms(to: string, body: string) {
  const client = getSmsClient();
  const from = process.env.TWILIO_FROM as string;
  if (!client || !from) return;
  await client.messages.create({ to, from, body });
} 