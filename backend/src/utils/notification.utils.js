import nodemailer from 'nodemailer';

export const sendStatusEmailNotification = async (toEmail, flight) => {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE, // "gmail"
      auth: {
        user: process.env.SMTP_USER,     // your gmail id
        pass: process.env.SMTP_PASSWORD, // app password
      },
    });

    // Email details
    const mailOptions = {
      from: `"Flight Management" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Update on your flight ${flight.flightNumber}`,
      html: `
        <h2>Flight Status Update</h2>
        <p>Your flight <strong>${flight.flightNumber}</strong> operated by <strong>${flight.airline}</strong> is now <b>${flight.Status.toUpperCase()}</b>.</p>
        <p>Thank you for choosing us!</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId} to ${toEmail}`);
    return true;
  } catch (err) {
    console.error("Email sending failed:", err.message);
    return false;
  }
};
