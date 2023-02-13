const nodemailer = require("nodemailer");

const sendVerificationEmail = (Email, verificationString) => {

    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "financial.planner.email@gmail.com",
            pass: "wzgxopiprypkicea"
        }
    });

    let emailOptions;
    let sender = "Financial Planner";

    emailOptions = {
        from: sender,
        to: Email,
        subject: "Email Confirmation",
        html: `Confirm <a href=http://localhost:3000/Verify/${verificationString}> here </a> to verify your email.`
    };

    Transport.sendMail(emailOptions, function(error, response) {
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }
    })
}

module.exports = {sendVerificationEmail}