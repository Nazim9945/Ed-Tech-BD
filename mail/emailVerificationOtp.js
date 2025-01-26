exports.OtpVerification=(otp)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial, sans-serif';
      color: #333;
      line-height: 1.6;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .otp {
      text-align: center;
      margin: 20px 0;
      padding: 10px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      font-size: 24px;
      font-weight: bold;
    }
    .quote {
      font-style: italic;
      color: #555;
      margin-top: 20px;
      text-align: center;
    }
  </style>
  <title>StudyPath OTP Verification</title>
</head>
<body>
  <div class="container">
    <h2>StudyPath OTP Verification</h2>
    <p>Dear User,</p>
    <p>We have received a request to verify your email address for your StudyPath account.</p>
    <p>Your One-Time Password (OTP) for email verification is:</p>
    <div class="otp">
      ${otp} 
    </div>
    <p>Please enter this OTP on the verification page to complete the process.</p>
    <p>If you did not request this verification, please ignore this email.</p>
    <p>Best Regards,</p>
    <p>The StudyPath Team</p>
    <div class="quote">
      "Learning is a treasure that will follow its owner everywhere."
    </div>
  </div>
</body>
</html>
`
}

