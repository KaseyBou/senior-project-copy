const crypto = require('node:crypto');
const jwt = require("jsonwebtoken");

function hashPassword(password) {
    let salt = crypto.randomBytes(128).toString('base64');
    let iterations = 100000;
    let hash = '';

    hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha256').toString('hex');

    return [
        salt,
        hash,
        iterations
    ];
}

function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    const savedIterations = 100000
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha256').toString('hex');
}

const passwordValidation = (password) =>{
    // Regex to check if a string contains uppercase, lowercase special character & number
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    //if password
    if (password.length >= 8 ) {
     
        //comparing password with regex
        return passwordRegex.test(password);
       
    }
}

const validatePhone =(phone) => {

    var phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

    return phoneRegex.test(phone);
}

const validateEmail = (email) => {

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(email);
}

const getEmail = async(token) => {
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN", async(err, decodedToken) => {
        if(err){
          console.log(err);
        }
        return decodedToken;
      });
    return decodedToken.userEmail;
}

const generateString = () => {

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 255;
    let counter = 0;
    while (counter < charactersLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = {hashPassword, isPasswordCorrect, passwordValidation, validateEmail, validatePhone, getEmail, generateString}
