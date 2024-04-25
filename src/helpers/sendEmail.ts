import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

async function sendEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: process.env.FROM_EMAIL!, // Replace with your sender email
    subject,
    html,
  }

  try {
    await sgMail.send(msg)
    console.log('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
    throw error // Re-throw for handling in controller
  }
}

export default sendEmail
