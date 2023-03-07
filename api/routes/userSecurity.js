const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {hashPassword, isPasswordCorrect, getEmail, passwordValidation, validateEmail, validatePhone, generateString} = require('../helper-functions/functions');

const {sendUpdateEmailEmail, sendRecoveryEmail} = require('../helper-functions/nodemailer');
//---------------User security------------------------------------------------

//email verification for user
module.exports.verifyUser = async(req, res) => {

  const verification_string = req.params.verificationString
  let email = getEmail(req.params.verificationString).then((email) => {return email;});
  email = await email;

  var sql = `SELECT user_id, email, is_verified FROM Users WHERE verification_string = '${verification_string}'`;

    connection.query(sql, function(err, rows)
    {

        if (err){
          //If error
          res.status(400).json('Unable to retrieve user information');
          console.log("Error retrieving : %s ",err );
        }
        else {
          //If success
          if(rows[0].is_verified === false) {

            var sql = `Update Users SET email = true WHERE user_id = ${rows[0].user_id} AND email = '${rows[0].email}'`;
          }else {

            var sql = `Update Users SET email = '${email}' WHERE user_id = ${rows[0].user_id} AND email = '${rows[0].email}'`;
          }
          connection.query(sql, function(err, rows)
          {
      
              if (err){
                //If error
                res.status(400).json('Unable to Verify');
                console.log("Error retrieving : %s ",err );
              }
              else {
                //If success
      
                res.status(200).json(rows) 
              }
          });

        }
    });
}

//email verification for user
module.exports.recoverUser = (req, res) => {

  const {email} = req.body

  var sql = `SELECT user_id, email FROM Users WHERE email = '${email}'`;

    connection.query(sql, function(err, rows)
    {

        if (err){
          //If error
          res.status(468).json('Email Not Found');
          console.log("Error retrieving : %s ",err );
        }
        else {
          //If success
          if( rows.length !== 0) {
              //   create JWT token
              const token = jwt.sign(
                {
                  userEmail: email,
                },
                "RANDOM-TOKEN"
              );

              let expirationDate = new Date()
              expirationDate.setMinutes(expirationDate.getMinutes() + 10);
              expirationDate = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

              var sql = `Update Users SET verification_string = '${token}', reset_exp_date = '${expirationDate}' WHERE email = '${email}'`;

              connection.query(sql, function(err, rows)
              {
          
                  if (err){
                    //If error
                    res.status(400).json('Unable to Verify');
                    console.log("Error retrieving : %s ",err );
                  }
                  else {
                    //If success
          
                    sendRecoveryEmail(email, token);
                    res.status(200).json(rows) 
                  }
              });
          } else {
            res.status(468).json('Email Not Found');
          }

        }
    });
}

//reset password
module.exports.resetValidity = async(req,res) => {
  
  const verification_string = req.params.verificationString

  if(!verification_string) return res.status(400).json('Invalid verification String');

  let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  var sql = `SELECT user_id, email FROM Users WHERE verification_string = '${verification_string}' AND reset_exp_date > '${currentDate}'`;

  try {

    connection.query(sql, function(err, rows)
    {

      if (err){
        console.log(err)
      }else {
        
        if(rows === undefined || rows.length === 0) {
          res.status(460).json('Not Found.')
        } else {
          //If success
          res.status(200).json('Successfully found')
        }
        }
    });
  }catch(err) {
    console.log(err)
  }

};

//reset password
module.exports.passwordReset = async(req,res) => {
  
    const verification_string = req.params.verificationString

    console.log(verification_string)
    let {password} = req.body;

    if(!passwordValidation(password)) return res.status(462).json('Password does not meet requirements');
    let returnData = hashPassword(password)
    salt = returnData[0];
    hash = returnData[1]; 

    let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var sql = `Update Users SET password = '${hash}', password_salt = '${salt}' WHERE verification_string = '${verification_string}' AND reset_exp_date > '${currentDate}'`;
  
    try {

      connection.query(sql, function(err, rows)
      {

        if (err){
          console.log(err)
        }else {
          
        //If success
        res.status(201).json('Successfully Changed Password')
          }
      });
    }catch(err) {
      console.log(err)
    }

};

//email verification for user
module.exports.updateEmailVerification = async(req, res) => {
  let userEmail = getEmail(req.headers.authorization).then((userEmail) => {return userEmail;});
  userEmail = await userEmail;
  const {email, user_id} = req.body

  var sql = `SELECT email FROM Users WHERE email = '${email}'`;
  
    connection.query(sql, function(err, rows)
    {
        if(err) {
            //If error
            //res.status(468).json('Email Not Found');
            console.log("Error retrieving : %s ",err );
        }

        if (rows.length === 0){
            //   create JWT token
            const token = jwt.sign(
              {
                userEmail: email,
              },
              "RANDOM-TOKEN"
            );

            let expirationDate = new Date()
            expirationDate.setMinutes(expirationDate.getMinutes() + 10);
            expirationDate = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

            console.log(userEmail)
            var sql2 = `Update Users SET verification_string = '${token}', reset_exp_date = '${expirationDate}' WHERE email = '${userEmail}'`;
            connection.query(sql2, function(err, rows)
            {
        
                if (err){
                  //If error
                  res.status(400).json('Unable to Verify');
                  console.log("Error retrieving : %s ",err );
                }
                else {
                  //If success
        
                  sendUpdateEmailEmail(email, token);
                  res.status(200).json(rows) 
                }
            });

        }
        else {res.status(201).json(res.response)}
    });
}