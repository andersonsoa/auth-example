import { Resend } from "resend";

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
