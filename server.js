// app.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your HTML file is in a "public" directory

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yashsharmaharsh@gmail.com', // replace with your Gmail email address
            pass: '8534090503yash' // replace with your Gmail password (use an app password if using 2-factor authentication)
        }
    });

    // Define email options
    const mailOptions = {
        from: 'your_email@gmail.com', // replace with your Gmail email address
        to: 'recipient_email@example.com', // replace with the recipient's email address
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
