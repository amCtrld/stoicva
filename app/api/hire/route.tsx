import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, tasks } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !tasks) {
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
    formData.append("subject", `New VA Hire Request - ${firstName} ${lastName}`)
    formData.append(
      "html",
      `
      <h2>New VA Hire Request</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif;">
        <h3 style="color: #14b8a6; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${company ? escapeHtml(company) : 'Not specified'}</p>
        
        <h3 style="color: #14b8a6;">Requirements</h3>
        <p><strong>Tasks needed:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #14b8a6;">
          ${escapeHtml(tasks).replace(/\n/g, "<br>")}
        </div>
        
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          <em>This request was submitted on ${new Date().toLocaleString()} via the StoicVA website.</em>
        </p>
      </div>
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
      const errorText = await response.text()
      console.error("Mailgun error:", errorText)
      throw new Error(`Mailgun error: ${response.statusText}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Hire request submitted successfully" 
    }, { status: 200 })
    
  } catch (error) {
    console.error("Hire form error:", error)
    return NextResponse.json({ 
      error: "Failed to submit hire request" 
    }, { status: 500 })
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