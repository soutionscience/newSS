var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


/* GET users listing. */
router.post('/', function(req, res, next) {
    const message = `<p>You have a new email with the following details:</p>
                    <ul>
                    <li>name: ${req.body.name}</li>
                    <li>Product: ${req.body.product}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Message: ${req.body.message}</li>

                    </ul>
    `;
    console.log('what is in', req.body.name)
  res.send('Hitting post');
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.sstech.co.ke',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'customers@sstech.co.ke', // generated ethereal user
            pass: process.env.password // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"My contact form 👻" <customers@sstech.co.ke>', // sender address
        to: 'rubinnjagi@yahoo.com, rubin@solutionscience.co.ke', // list of receivers
        subject: 'New Client', // Subject line
        text: 'Hello world?', // plain text body
        html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});






});

module.exports = router;
