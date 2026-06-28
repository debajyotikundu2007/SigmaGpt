export function generateOTP(){
    return Math.floor(10000+ Math.random()*90000).toString();
}



export function getOtpHtml(otp){
    return `<!DOCTYPE html>
<html>
<head>
    <style>
        body{
            font-family: Arial, sans-serif;
            background-color:#f4f4f4;
            margin:0;
            padding:0;
        }

        .container{
            max-width:500px;
            margin:50px auto;
            background:white;
            padding:30px;
            text-align:center;
            border-radius:10px;
            box-shadow:0 2px 10px rgba(0,0,0,0.1);
        }

        .otp{
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
            color:#2563eb;
            background:#eff6ff;
            padding:15px;
            border-radius:8px;
            margin:20px 0;
        }

        p{
            color:#555;
            line-height:1.6;
        }

        h2{
            color:#222;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Email Verification</h2>

        <p>Please use the OTP below to verify your email address.</p>

        <div class="otp">
            ${otp}
        </div>

        <p>
            This OTP is valid for 10 minutes.
            Do not share this code with anyone.
        </p>
    </div>
</body>
</html>`
}

