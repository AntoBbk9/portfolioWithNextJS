import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

  await transporter.sendMail({
  from: `"${name}" <${email}>`,
  to: "anthobelebele@gmail.com",
  subject: `[Portfolio Contact] ${subject}`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #BFDE42;">Nouveau message depuis ton portfolio</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <hr style="border: none; border-top: 1px solid #ccc;" />
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr style="border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 0.9em; color: #666;">Envoyé depuis le formulaire de contact de ton portfolio</p>
    </div>
  `,
});

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Échec de l’envoi" }, { status: 500 });
  }
}
