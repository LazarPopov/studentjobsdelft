// src/lib/email.ts
import nodemailer from 'nodemailer';
import type { EmployerJobSubmission } from './supabase';

// Create transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.GMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports (TLS)
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD, // App-specific password
  },
});

// Check if emails are enabled
const isEmailEnabled = () => {
  // Disable in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && (process.env.ENABLE_EMAILS ?? 'false') !== 'true') {
    return false;
  }
  
  // Check if required env vars are present
  if (!process.env.GMAIL_USERNAME || !process.env.GMAIL_PASSWORD) {
    return false;
  }
  
  return true;
};

// Verify transporter configuration on startup (only if enabled)
if (isEmailEnabled() && process.env.NODE_ENV !== 'development') {
  transporter.verify((error, success) => {
    if (error) {
      console.error('[EMAIL_CONFIG_ERROR]', error);
    } else {
      console.log('[EMAIL_CONFIG] Server is ready to send emails');
    }
  });
} else if (process.env.NODE_ENV === 'development') {
  console.log('[EMAIL_CONFIG] Emails disabled in development (set ENABLE_EMAILS=true to enable)');
}

interface JobSubmissionEmailData {
  submission: EmployerJobSubmission;
  submissionId: string;
}

export async function sendJobSubmissionNotification(data: JobSubmissionEmailData): Promise<void> {
  // Skip if emails are disabled
  if (!isEmailEnabled()) {
    console.log('[EMAIL_SKIPPED] Emails disabled in development mode');
    return;
  }

  const { submission, submissionId } = data;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0e9c63 0%, #18b777 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #555; margin-bottom: 5px; display: block; }
        .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #e0e0e0; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-english { background: #dbeafe; color: #1e40af; }
        .footer { background: #333; color: #999; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
        .btn { display: inline-block; padding: 12px 24px; background: #0e9c63; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New Job Submission</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Student Jobs Maastricht</p>
        </div>
        
        <div class="content">
          <p><span class="badge badge-pending">PENDING REVIEW</span></p>
          
          <div class="field">
            <span class="label">Submission ID</span>
            <div class="value"><code>${submissionId}</code></div>
          </div>

          <h2 style="margin-top: 30px; color: #0e9c63;">Company Information</h2>
          
          <div class="field">
            <span class="label">Company Name</span>
            <div class="value">${submission.company}</div>
          </div>
          
          <div class="field">
            <span class="label">Contact Person</span>
            <div class="value">${submission.contact_name}</div>
          </div>
          
          <div class="field">
            <span class="label">Email</span>
            <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
          </div>
          
          ${submission.phone ? `
          <div class="field">
            <span class="label">Phone</span>
            <div class="value"><a href="tel:${submission.phone}">${submission.phone}</a></div>
          </div>
          ` : ''}

          <h2 style="margin-top: 30px; color: #0e9c63;">Job Details</h2>
          
          <div class="field">
            <span class="label">Job Title</span>
            <div class="value"><strong>${submission.job_title}</strong></div>
          </div>
          
          <div class="field">
            <span class="label">Employment Type</span>
            <div class="value">${submission.employment_type.replace('_', ' ')}</div>
          </div>
          
          <div class="field">
            <span class="label">Category</span>
            <div class="value">${submission.category}</div>
          </div>
          
          <div class="field">
            <span class="label">Location</span>
            <div class="value">${submission.city}${submission.area ? `, ${submission.area}` : ''}</div>
          </div>
          
          ${submission.base_salary_min || submission.base_salary_max ? `
          <div class="field">
            <span class="label">Salary Range</span>
            <div class="value">
              €${submission.base_salary_min || '?'} - €${submission.base_salary_max || '?'} per hour
            </div>
          </div>
          ` : ''}
          
          ${submission.english_friendly ? `
          <div class="field">
            <span class="badge badge-english">🌍 English-friendly role</span>
          </div>
          ` : ''}
          
          <h2 style="margin-top: 30px; color: #0e9c63;">Pricing Plan</h2>
          
          <div class="field">
            <span class="label">Selected Plan</span>
            <div class="value"><strong>${submission.plan || 'basic'}</strong> ${submission.plan_price_eur ? `- €${submission.plan_price_eur}` : ''}</div>
          </div>
          
          <div class="field">
            <span class="label">Job Description</span>
            <div class="value" style="white-space: pre-wrap;">${submission.description}</div>
          </div>
          
          ${submission.external_url ? `
          <div class="field">
            <span class="label">External Apply URL</span>
            <div class="value"><a href="${submission.external_url}" target="_blank">${submission.external_url}</a></div>
          </div>
          ` : ''}
          
          ${submission.logo_url ? `
          <div class="field">
            <span class="label">Company Logo</span>
            <div class="value">
              <img src="${submission.logo_url}" alt="${submission.logo_alt || 'Company logo'}" style="max-width: 150px; max-height: 150px; border-radius: 8px;" />
            </div>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <p style="margin: 0;"><strong>Next Steps:</strong></p>
            <ol style="margin: 10px 0;">
              <li>Review the job details above</li>
              <li>Check for quality and compliance</li>
              <li>Approve or reject in Supabase dashboard</li>
              <li>Contact employer if needed</li>
            </ol>
            
            <a href="${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://app.supabase.com'}" class="btn" style="color: white;">
              Review in Supabase Dashboard →
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from Student Jobs Maastricht</p>
          <p>Submission received at ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Maastricht' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Job Submission - Student Jobs Maastricht
==========================================

SUBMISSION ID: ${submissionId}
Status: PENDING REVIEW

COMPANY INFORMATION
-------------------
Company: ${submission.company}
Contact: ${submission.contact_name}
Email: ${submission.email}
${submission.phone ? `Phone: ${submission.phone}` : ''}

JOB DETAILS
-----------
Title: ${submission.job_title}
Type: ${submission.employment_type.replace('_', ' ')}
Category: ${submission.category}
Location: ${submission.city}${submission.area ? `, ${submission.area}` : ''}
${submission.base_salary_min || submission.base_salary_max ? `Salary: €${submission.base_salary_min || '?'} - €${submission.base_salary_max || '?'}/hour` : ''}
${submission.english_friendly ? 'English-friendly: Yes' : ''}

PRICING PLAN
-----------
Plan: ${submission.plan || 'basic'}${submission.plan_price_eur ? ` - €${submission.plan_price_eur}` : ''}

DESCRIPTION
-----------
${submission.description}

${submission.external_url ? `\nApply URL: ${submission.external_url}` : ''}
${submission.logo_url ? `\nLogo: ${submission.logo_url}` : ''}

---
Review this submission in your Supabase dashboard.
Received at ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Maastricht' })}
  `.trim();

  const mailOptions = {
    from: `"${process.env.GMAIL_FROM_NAME || 'Student Jobs Maastricht'}" <${process.env.GMAIL_FROM_ADDRESS || process.env.GMAIL_USERNAME}>`,
    to: process.env.GMAIL_RECEIVER || 'info@domakin.nl',
    subject: `🆕 New Job: ${submission.job_title} at ${submission.company}`,
    text: textContent,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[EMAIL_SENT] Admin notification sent', {
      messageId: info.messageId,
      to: mailOptions.to,
      company: submission.company,
      jobTitle: submission.job_title,
    });
  } catch (error) {
    console.error('[EMAIL_SEND_ERROR] Failed to send admin notification:', error);
    // Don't throw - we don't want to fail the job submission if email fails
    // Just log the error and continue
  }
}

// Optional: Send confirmation email to employer
export async function sendEmployerConfirmation(data: JobSubmissionEmailData): Promise<void> {
  // Skip if emails are disabled
  if (!isEmailEnabled()) {
    console.log('[EMAIL_SKIPPED] Employer confirmation disabled in development mode');
    return;
  }

  const { submission } = data;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0e9c63 0%, #18b777 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        .footer { background: #f9f9f9; color: #666; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Job Submitted Successfully!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Student Jobs Maastricht</p>
        </div>
        
        <div class="content">
          <p>Hi ${submission.contact_name},</p>
          
          <p>Thank you for submitting your job posting for <strong>${submission.job_title}</strong>!</p>
          
          <p>We've received your submission and our team will review it shortly. Most jobs are reviewed and published within 24 hours.</p>
          
          <h3>What happens next?</h3>
          <ol>
            <li>Our team reviews your job posting</li>
            <li>We'll contact you if we need any additional information</li>
            <li>Once approved, your job will be published on Student Jobs Maastricht</li>
            <li>You'll start receiving applications from interested students</li>
          </ol>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>
          <strong>Student Jobs Maastricht Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Student Jobs Maastricht | Connecting students with opportunities</p>
          <p><a href="https://studentjobsmaastricht.nl">studentjobsmaastricht.nl</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${process.env.GMAIL_FROM_NAME || 'Student Jobs Maastricht'}" <${process.env.GMAIL_FROM_ADDRESS || process.env.GMAIL_USERNAME}>`,
    to: submission.email,
    subject: `Job Submitted: ${submission.job_title}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('[CONFIRMATION_EMAIL_SENT] Employer confirmation sent', { to: submission.email });
  } catch (error) {
    console.error('[CONFIRMATION_EMAIL_ERROR] Failed to send employer confirmation:', error);
    // Don't throw - email failure should not block the submission
  }
}

