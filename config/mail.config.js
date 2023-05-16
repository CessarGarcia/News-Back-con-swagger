const nodemailer = require('nodemailer');


const mail = {
    user: "agenspresse@gmail.com",
    pass: "mqnihdchplqpnshy",
}

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
        user: mail.user, // generated ethereal user
        pass: mail.pass, // generated ethereal password
    },
});

const sendEmail = async (email, username, subject) => {
    try {
        await transporter.sendMail({
            from: '"AgensPresse"', // sender address
            to: email, // list of receivers
            subject: "Hello " + username, // Subject line
            text: "Gracias por registrarte a AgensPresse", // plain text body
        });
    } catch (error) {
        console.log("Algo no esta funcionando con el correo", error);
        res.status(200).send({ success: false, error: err });
    }
}

module.exports = {sendEmail}