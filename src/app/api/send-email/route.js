// File: app/api/send-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company") || "Not provided";
    const message = formData.get("message");
    const recipientEmail = formData.get("recipientEmail") || "hamzagroup145@gmail.com";
    
    // Handle CV file if it exists
    const cvFile = formData.get("cv");
    let attachments = [];
    
    if (cvFile && cvFile.size > 0) {
      // Convert file to buffer
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      
      // Get temp file path
      const filename = cvFile.name || "cv.pdf";
      const tempFilePath = join(tmpdir(), filename);
      
      // Write to temp file
      await writeFile(tempFilePath, buffer);
      
      // Add attachment
      attachments.push({
        filename: filename,
        path: tempFilePath,
        contentType: 'application/pdf'
      });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Set this in your .env file
        pass: process.env.EMAIL_PASSWORD, // Set this in your .env file
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <h3 style="margin-top: 20px; color: #333;">Message:</h3>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
          ${cvFile ? `<p><strong>CV:</strong> Attached</p>` : ''}
          <p style="color: #777; margin-top: 30px; font-size: 12px;">This email was sent from your website contact form.</p>
        </div>
      `,
      attachments: attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}

// Configure for file size limits
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};