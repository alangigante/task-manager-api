const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendConfirmationEmail = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirm your account',
        text: `Your confirmation code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);
};


exports.sendBirthdayEmail = async (user) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Happy Birthday!',
        text: `Happy Birthday, ${user.name}! 🎉 We wish you a great year ahead!`,
    };

    await transporter.sendMail(mailOptions);
};

exports.sendTaskNotificationEmail = async (user, task) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Task Reminder',
        text: `Hello, ${user.name}! Don't forget your task: "${task.title}" starts tomorrow!`,
    };

    await transporter.sendMail(mailOptions);
};