import { Resend } from "resend";

export const sendPasswordResetMail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Reset password email",
    html: `<p>Click <a href="${resetLink}">here to reset your password</a></p>`,
  });
};

export const sendVerificationMain = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here to confirm email</a></p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "2FA Code",
    html: `<p>Your 2FA Code is <pre>${token}</pre></p>`,
  });
};
