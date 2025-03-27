// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, subject, text, fileName, fileContentBase64 } = await req.json();

  try {
    await resend.emails.send({
      from: "tu-nombre@tu-dominio.com", // Debe estar verificado en Resend
      to: ["tu-correo@empresa.com"],
      subject,
      text,
      attachments: fileName && fileContentBase64
        ? [
            {
              filename: fileName,
              content: fileContentBase64,
              contentType: "application/octet-stream",
            },
          ]
        : [],
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ status: "error", message: error });
  }
}
