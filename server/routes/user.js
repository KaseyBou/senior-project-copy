const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const functions = require('../helper-functions/functions')
const {hashPassword, isPasswordCorrect, getEmail, passwordValidation, validateEmail, validatePhone} = require('../helper-functions/functions')
//---------------User Posts------------------------------------------------

//register user
module.exports.registerUser = (req,res) => {

    let {first_Name, last_Name, email, password, phone, profile_image, is_admin} = req.body;
  
    if(!first_Name) return res.status(464).json('First Name can not be blank');
    if(!last_Name) return res.status(463).json('Last Name cant be blank');
    if(!validateEmail(email)) return res.status(460).json('Email Not Valid');
    if(!validatePhone(phone)) return res.status(461).json('Phone Not Valid');
    if(!passwordValidation(password)) return res.status(462).json('Password does not meet requirements');

    let returnData = hashPassword(password)
    salt = returnData[0];
    hash = returnData[1];
    
    //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
    var sql = `INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('${first_Name}', '${last_Name}', '${email}', '${hash}', '${salt}','${phone}', ${profile_image}, ${is_admin})`;
  
    connection.query(sql, function(err, rows)
    {
  
      if (err){
        if(err.errno === 1062) {

          console.log(err.sqlMessage)
          if(err.sqlMessage.includes('email_UNIQUE')) {
              res.status(460).json('Sorry, Email already Taken');
          }
          if(err.sqlMessage.includes('phone_UNIQUE')) {
            res.status(461).json('Sorry, Phone already Taken');
          }

          //console.log("Error inserting : %s ",err );
        } else {
        //If error
          res.status(400).json('Sorry, Unable To Add');
          console.log("Error inserting : %s ",err.errno );
        }

        return err;
      }
    else
      //If success
      res.status(200).json('Account Added Successfully!!')
      
    });
    
  
  
};
  
//edit user account
module.exports.editUser = async(req,res) => {
  
    let {first_Name, last_Name, email, password, phone, profile_image, user_id} = req.body;

    if(!first_Name) return res.status(464).json('First Name can not be blank');
    if(!last_Name) return res.status(463).json('Last Name cant be blank');
    if(!validateEmail(email)) return res.status(460).json('Email Not Valid');
    if(!validatePhone(phone)) return res.status(461).json('Phone Not Valid');
    if(!passwordValidation(password)) return res.status(462).json('Password does not meet requirements');

    if(password === "") {
  
        var sql = `Update Users SET first_name = '${first_Name}', last_name = '${last_Name}', email = '${email}', phone = '${phone}', profile_image = ${profile_image} WHERE user_id = ${ user_id}`;
    } 
    else {
        let returnData = hashPassword(password)
        salt = returnData[0];
        hash = returnData[1];
        var sql = `Update Users SET first_name = '${first_Name}', last_name = '${last_Name}', email = '${email}', password = '${hash}', password_salt = '${salt}', phone = '${phone}', profile_image = ${profile_image} WHERE user_id = ${user_id}`;
    }

  try {

     connection.query(sql, function(err, rows)
    {
  
      if (err){
        if(err.errno === 1062) {

          console.log(err.sqlMessage)
          if(err.sqlMessage.includes('email_UNIQUE')) {
              res.status(460).json('Sorry, Email already Taken');
          }
          if(err.sqlMessage.includes('phone_UNIQUE')) {
            res.status(461).json('Sorry, Phone already Taken');
          }

          //console.log("Error inserting : %s ",err );
        } else {
        //If error
          res.status(400).json('Sorry, Unable To Add');
          console.log("Error inserting : %s ",err.errno );
        }
      }else {
          //  create JWT token
          token = jwt.sign(
          {
            userEmail: email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "1h" }
        );
      //If success
      res.status(200).json(token)
        }
    });
  }catch(err) {
    console.log(err)
  }
  
};
  
//delete user account
module.exports.deleteUser = (req,res) => {
  
  let {user_id, pw_attempt} = req.body;

  if(!pw_attempt) return res.status(462).json('Password cannot be blank');

  var sql = `SELECT password, password_salt FROM Users WHERE user_id = '${user_id}';`;

  try {

      connection.query(sql, function(err, rows)
      {
        if (err){
          //If error
          res.status(400).json('Unable to retrieve user information');
          console.log("Error retrieving : %s ",err );
        } else {
          // If password details retrieved successfully, compare to attempt
          if(isPasswordCorrect(rows[0].password, rows[0].password_salt, pw_attempt)){

            // run delete if password matches
            var sql = `DELETE FROM Users WHERE user_id = ${user_id}`;
            connection.query(sql, function(err, rows)
            {
          
              if (err){
                //If error
                  res.status(400).json('Unable To Edit');
                  console.log("Error inserting : %s ",err );
              }
            else
              //If success
              res.status(200).json('Account deleted Successfully!!')
          
            });

          } else {
            res.status(301).json('incorrect password');
          }
        }
      });
  } catch (err) {
      
  }
};
  
//login
module.exports.userLogin = (req,res) => {
  
    let {email, password} = req.body;
    if(!validateEmail(email)) return res.status(460).json('Email Not Valid');
    if(!password) return res.status(461).json('Phone Not Valid');
    var sql = `SELECT password, password_salt FROM Users WHERE email = '${email}'`;
  
    try {
        connection.query(sql, function(err, rows)
        {
          if (err){
            //If error
              res.status(400).json('Sorry!!Unable To Find');
              console.log("Error Finding : %s ",err );
          }
          else {
        
              try {
                  let correct = isPasswordCorrect(rows[0]['password'], rows[0]['password_salt'], password)
                  //console.log(correct)
                  //If success
                  if(correct) {

                    //   create JWT token
                    const token = jwt.sign(
                      {
                        userEmail: email,
                      },
                      "RANDOM-TOKEN",
                      { expiresIn: "1h" }
                    );

                      //   return success response
                      res.status(200).send({
                      message: "Login Successful",
                      email: email,
                      token,
                    });
                  } else {
                    res.status(400).json('Incorrect password');
                  }
            } catch(e) {
                return false;
            }
    
      }
      });

    } catch(err) {
      console.log(err);
    }
  
};

module.exports.getAccountDetails = async(req, res) => {
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  if(!email) return res.status(460).json('Email Not Valid');
  var sql = `SELECT user_id, email, first_name, last_name, phone, profile_image FROM Users WHERE email = '${ await email}';`;

    connection.query(sql, function(err, rows)
    {

      if (err){
        //If error
        res.status(400).json('Unable to retrieve user information');
         console.log("Error retrieving : %s ",err );
      }
    else
      //If success
      res.status(200).json(rows)
    });
}