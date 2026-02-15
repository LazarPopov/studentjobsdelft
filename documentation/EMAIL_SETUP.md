# Email Notification Setup

## 🎯 Overview

The system now sends automatic email notifications when:
1. **New job is submitted** → Email sent to `info@domakin.nl`
2. **Confirmation to employer** → Email sent to employer's email

## 📧 Email Features

### Admin Notification Email
Sent to: `info@domakin.nl`

Includes:
- ✅ All job details (company, contact, job info)
- ✅ Submission ID for tracking
- ✅ Company logo (if uploaded)
- ✅ Direct link to Supabase dashboard
- ✅ Beautiful HTML template
- ✅ Plain text fallback

### Employer Confirmation Email
Sent to: Employer's email address

Includes:
- ✅ Confirmation of successful submission
- ✅ What happens next
- ✅ Review timeline (24 hours)
- ✅ Professional branding

## 🔧 Setup Instructions

### Step 1: Create Gmail App Password

Since you're using Gmail with 2FA, you need an **App Password**:

1. Go to Google Account: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Under "How you sign in to Google", click **2-Step Verification**
4. Scroll to bottom, click **App passwords**
5. Create new app password:
 - Select app: **Mail**
 - Select device: **Other (Custom name)**
 - Name it: "Student Jobs Rotterdam"
6. Click **Generate**
7. **Copy the 16-character password** (you'll use this below)

### Step 2: Configure Environment Variables

Add to your `.env.local` file:

```env
# Gmail SMTP Configuration
GMAIL_HOST=smtp.gmail.com
GMAIL_PORT=587
GMAIL_USERNAME=notificationdomakin@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx # Your 16-char app password from Step 1
GMAIL_FROM_ADDRESS=notification@domakin.nl
GMAIL_FROM_NAME="Student Jobs Rotterdam"
GMAIL_RECEIVER=info@domakin.nl
```

**Important:**
- Replace `GMAIL_PASSWORD` with your actual App Password
- Don't use your regular Gmail password
- Keep the spaces in the app password (or remove them, both work)

### Step 3: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

You should see:
```
[EMAIL_CONFIG] Server is ready to send emails
```

### Step 4: Test Email Notifications

1. Go to `http://localhost:3000/employers`
2. Fill out and submit a job
3. Check two places:
 - **info@domakin.nl** inbox → Admin notification
 - **Employer's email** inbox → Confirmation

## 📊 Email Templates

### Admin Notification Preview
```
Subject: 🆕 New Job: Barista at Coffee Shop

┌─────────────────────────────────────┐
│ 🎉 New Job Submission    │
│ Student Jobs Rotterdam    │
└─────────────────────────────────────┘

[PENDING REVIEW]

Company Information:
 Company: Coffee Shop
 Contact: John Doe
 Email: john@coffeeshop.com
 
Job Details:
 Title: Barista
 Type: PART TIME
 Category: hospitality
 Location: Rotterdam, Centrum
 Salary: €13.50 - €15.00/hour
 
Description:
 We're looking for an enthusiastic barista...
 
[Review in Supabase Dashboard →]
```

### Employer Confirmation Preview
```
Subject: Job Submitted: Barista

✅ Job Submitted Successfully!

Hi John Doe,

Thank you for submitting your job posting 
for Barista!

What happens next:
1. Our team reviews your job posting
2. We'll contact you if needed
3. Once approved, it goes live
4. You'll start receiving applications

Best regards,
Student Jobs Rotterdam Team
```

## 🔐 Security

- ✅ Uses TLS encryption (port 587)
- ✅ App password instead of real password
- ✅ Environment variables (not in code)
- ✅ Emails send in background (non-blocking)
- ✅ Errors logged but don't break submissions

## 🐛 Troubleshooting

### "Invalid login" error
❌ **Problem:** Wrong username or password
✅ **Solution:** 
- Check `GMAIL_USERNAME` is correct
- Use App Password, not regular password
- Generate new App Password if needed

### "Connection timeout"
❌ **Problem:** Firewall or network issue
✅ **Solution:**
- Check port 587 is not blocked
- Try different network
- Verify SMTP settings

### "Email not received"
❌ **Problem:** Email in spam or wrong address
✅ **Solution:**
- Check spam folder
- Verify `GMAIL_RECEIVER` is correct
- Check Gmail "Sent" folder
- Look at server logs for errors

### Check logs
```bash
# Terminal should show:
[EMAIL_CONFIG] Server is ready to send emails # ✅ Config OK
[EMAIL_SENT] { messageId: '...', to: 'info@domakin.nl' } # ✅ Sent
[EMAIL_SEND_ERROR] ... # ❌ Error details
```

## 🧪 Testing Commands

### Test configuration only (no email sent)
```bash
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });
const transport = nodemailer.createTransport({
 host: process.env.GMAIL_HOST,
 port: 587,
 auth: { 
 user: process.env.GMAIL_USERNAME, 
 pass: process.env.GMAIL_PASSWORD 
 }
});
transport.verify().then(() => console.log('✅ SMTP OK')).catch(console.error);
"
```

## 📈 Production Deployment

### Vercel Environment Variables

When deploying to Vercel:

1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add each variable:
 ```
 GMAIL_HOST = smtp.gmail.com
 GMAIL_PORT = 587
 GMAIL_USERNAME = notificationdomakin@gmail.com
 GMAIL_PASSWORD = [your app password]
 GMAIL_FROM_ADDRESS = notification@domakin.nl
 GMAIL_FROM_NAME = Student Jobs Rotterdam
 GMAIL_RECEIVER = info@domakin.nl
 ```
4. Redeploy your app

### Alternative: Use Vercel Edge Config

For better security, consider using Vercel Edge Config or secrets management.

## 🎨 Customization

### Change Email Templates

Edit `src/lib/email.ts`:

```typescript
// Admin notification template
const htmlContent = `...`;

// Employer confirmation template
const htmlContent = `...`;
```

### Change Recipients

In `.env.local`:
```env
GMAIL_RECEIVER=your-email@example.com # Admin email
```

### Disable Employer Confirmation

In `src/app/api/employer-lead/route.ts`:
```typescript
// Comment out this line:
// sendEmployerConfirmation({ submission, submissionId: data.id }),
```

## 💡 Advanced Features

### Multiple Recipients

```typescript
to: 'info@domakin.nl, admin@domakin.nl, manager@domakin.nl'
```

### CC/BCC
```typescript
cc: 'backup@domakin.nl',
bcc: 'archive@domakin.nl'
```

### Attachments
```typescript
attachments: [{
 filename: 'logo.png',
 path: submission.logo_url
}]
```

### HTML Templates from Files
```typescript
import fs from 'fs';
const template = fs.readFileSync('./templates/notification.html', 'utf8');
```

## ✅ Verification Checklist

- [ ] App Password created in Google Account
- [ ] `.env.local` configured with all variables
- [ ] Dev server restarted
- [ ] "Server ready to send emails" appears in console
- [ ] Test submission sent successfully
- [ ] Admin email received at info@domakin.nl
- [ ] Employer confirmation received
- [ ] Emails not in spam folder
- [ ] Logo displays in email (if uploaded)
- [ ] All variables set in Vercel (production)

## 🎉 You're Done!

Email notifications are now active! Every job submission will trigger:
1. 📧 Notification to admin team
2. ✅ Confirmation to employer
3. 📊 Logged in console

Monitor your inbox and server logs to ensure everything works smoothly!

