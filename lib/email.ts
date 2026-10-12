// Email notification utility for new business inquiries
// Supports Resend, Webhook, and SMTP-compatible endpoints
// Falls back gracefully without blocking database persistence

export interface LeadNotificationPayload {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  budget?: string | null
  timeline?: string | null
  message: string
}

export async function sendLeadNotification(lead: LeadNotificationPayload): Promise<{
  success: boolean
  provider?: string
  error?: string
}> {
  const notificationWebhook = process.env.LEAD_NOTIFICATION_WEBHOOK
  const resendApiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFICATION_RECIPIENT_EMAIL || 'haseebsays123@gmail.com'

  // 1. Webhook Notification (e.g. Slack / Discord / Zapier)
  if (notificationWebhook) {
    try {
      const response = await fetch(notificationWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🔥 New Lead Captured: ${lead.name} (${lead.company || 'Individual'})\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nService: ${lead.service || 'General'}\nBudget: ${lead.budget || 'N/A'}\nTimeline: ${lead.timeline || 'N/A'}\nMessage: ${lead.message}`,
          lead,
        }),
      })

      if (response.ok) {
        return { success: true, provider: 'webhook' }
      }
    } catch (err: any) {
      console.error('[Notification Error - Webhook]:', err?.message || err)
    }
  }

  // 2. Resend API Email Integration
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Four Front Lab <notifications@fourfrontlab.tech>',
          to: [notifyEmail],
          subject: `⚡ New Project Inquiry: ${lead.name} (${lead.service || 'General'})`,
          html: `
            <div style="font-family: Arial, sans-serif; background: #080A10; color: #ffffff; padding: 32px; border-radius: 8px;">
              <h2 style="color: #22d3ee; margin-top: 0;">New Project Inquiry — Four Front Lab</h2>
              <table style="width: 100%; color: #e2e8f0; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${lead.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${lead.email}" style="color: #22d3ee;">${lead.email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${lead.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${lead.company || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${lead.service || 'General Inquiry'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Budget:</td><td>${lead.budget || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Timeline:</td><td>${lead.timeline || 'Not specified'}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #131722; border-left: 4px solid #22d3ee; border-radius: 4px;">
                <h4 style="margin: 0 0 8px 0; color: #94a3b8;">Project Description:</h4>
                <p style="margin: 0; line-height: 1.6;">${lead.message}</p>
              </div>
            </div>
          `,
        }),
      })

      if (response.ok) {
        return { success: true, provider: 'resend' }
      }
    } catch (err: any) {
      console.error('[Notification Error - Resend]:', err?.message || err)
    }
  }

  // Graceful fallback: lead is safely stored in database
  return {
    success: false,
    error: 'External email service not configured. Lead successfully persisted in local CRM database.',
  }
}
