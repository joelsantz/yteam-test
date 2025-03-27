import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { contact, positions } = body;

  const html = `
    <h2>New Contact from ${contact.fullName} (${contact.company})</h2>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Project Details:</strong> ${contact.projectDetails || "N/A"}</p>
    <h3>Positions:</h3>
    <ul>
      ${positions.map((p: any) => `
        <li>
          <strong>${p.title}</strong><br/>
          ${p.entryType === "manual" 
            ? `Seniority: ${p.seniority}, Skills: ${p.skills.join(", ")}, Budget: ${p.budget}`
            : `File uploaded: ${p.additionalInfo}, Budget: ${p.budget}`
          }
        </li>
      `).join("")}
    </ul>
  `;

  try {
    await resend.emails.send({
      from: "request@yteam.io",
      to: ["talent@yteam.io"],
      subject: "New Contact Form Submission",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
