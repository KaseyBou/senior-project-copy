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

const sendRecoveryEmail = (Email, verificationString) => {

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
        subject: "Reset Password",
        html: `Confirm <a href=http://localhost:3000/Reset/${verificationString}> here </a> to reset your password.`
    };

    Transport.sendMail(emailOptions, function(error, response) {
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }
    })
}

const sendUpdateEmailEmail = (Email, verificationString) => {

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
        subject: "Update Email",
        html: `Confirm <a href=http://localhost:3000/Update/${verificationString}> here </a> to update your email.`
    };

    Transport.sendMail(emailOptions, function(error, response) {
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }
    })
}

module.exports = {sendVerificationEmail, sendRecoveryEmail, sendUpdateEmailEmail}