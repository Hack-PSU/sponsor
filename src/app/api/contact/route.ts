import { NextResponse } from "next/server"
import { z } from "zod"
import sendgrid from "@sendgrid/mail"

if (process.env.SENDGRID_API_KEY) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.warn("SENDGRID_API_KEY is not set. Emails will not be sent.")
}

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Invalid email address."),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required."),
  honeypot: z.string().optional(), // for spam prevention
})

export async function POST(request: Request) {
  try {
    // Basic check for SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({ error: "Server configuration error. Could not send email." }, { status: 500 })
    }

    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please correct the errors below.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    // Spam prevention - if honeypot is filled, pretend success but don't send email
    if (parsed.data.honeypot) {
      return NextResponse.json({ success: true })
    }

    const { name, email, company, message } = parsed.data

    // Email to site owner
    const ownerMsg = {
      to: "sponsorship@hackpsu.org",
      from: "sponsorship@hackpsu.org",
      subject: `New Sponsor Inquiry from ${name}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    }

    // Confirmation email to user
    const userConfirmationMsg = {
      to: email,
      from: "sponsorship@hackpsu.org", // Use a verified sender
      subject: "We've Received Your Message | HackPSU Sponsorship",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to the HackPSU team! We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message for your records:</p>
        <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 1em;">
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </blockquote>
        <p>Best,<br/>The HackPSU Team</p>
      `,
    }

    // Send both emails
    await Promise.all([sendgrid.send(ownerMsg), sendgrid.send(userConfirmationMsg)])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("SendGrid error:", error)
    return NextResponse.json(
      { error: "An error occurred while sending your message. Please try again later." },
      { status: 500 },
    )
  }
}