import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const receiverEmail = process.env.CONTACT_TO_EMAIL;
const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { message: "Email service is not configured (missing RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    if (!receiverEmail) {
      return NextResponse.json(
        { message: "Email receiver is not configured (missing CONTACT_TO_EMAIL)." },
        { status: 500 }
      );
    }

    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Email to you (admin)
    const adminEmailResult = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (adminEmailResult.error) {
      console.error("Admin email error:", adminEmailResult.error);
      return NextResponse.json(
        { message: "Failed to deliver your message to the site owner." },
        { status: 500 }
      );
    }

    // Send confirmation email to user and report status clearly.
    const userEmailResult = await resend.emails.send({
      from: senderEmail,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Thank You!</h2>
        <p>Hi ${name},</p>
        <p>We received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br />Prateek Lachwani</p>
      `,
    });

    if (userEmailResult.error) {
      console.error("User confirmation email error:", userEmailResult.error);
      return NextResponse.json(
        {
          message: "Message delivered to site owner, but confirmation email could not be sent to the sender.",
          confirmationSent: false,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!", confirmationSent: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
