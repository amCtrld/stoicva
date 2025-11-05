import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const apiKey = process.env.MAILGUN_API_KEY
    const domain = process.env.MAILGUN_DOMAIN

    if (!apiKey || !domain) {
      console.error("Mailgun credentials not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Prepare Mailgun request
    const formData = new FormData()
    formData.append("from", `noreply@${domain}`)
    formData.append("to", "stoicvas@gmail.com")
    formData.append("cc", email)
    formData.append("subject", `New Contact Form: ${subject}`)
    formData.append(
      "html",
      `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
    )

    // Send via Mailgun
    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Mailgun error: ${response.statusText}`)
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}
