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

//---------------User Posts------------------------------------------------

//register user
module.exports.registerUser = (req,res) => {

    let {first_Name, last_Name, email, password, phone, profile_image, is_admin} = req.body;
  
    let returnData = functions.hashPassword(password)
    salt = returnData[0];
    hash = returnData[1];
    
    /*if(!firstName) return res.status(400).json('First Name can not be blank');
    if(!lastName) return res.status(400).json('Last Name cant be blank');
    if(!email) return res.status(400).json('Email cant be blank');
    if(!password) return res.status(400).json('Password cant be blank');*/
    
      //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
     var sql = `INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('${first_Name}', '${last_Name}', '${email}', '${hash}', '${salt}','${phone}', ${profile_image}, ${is_admin})`;
  
     connection.query(sql, function(err, rows)
    {
  
      if (err){
        //If error
          res.status(400).json('Sorry!!Unable To Add');
          console.log("Error inserting : %s ",err );
          return err;
      }
     else
      //If success
      res.status(200).json('Account Added Successfully!!')
      
    });
  
  
};
  
//edit user account
module.exports.editUser = (req,res) => {
  
    let {first_Name, last_Name, email, password, phone, profile_image, user_id} = req.body;
  
    if(password === "") {
  
        var sql = `Update Users SET first_name = '${first_Name}', last_name = '${last_Name}', email = '${email}', phone = '${phone}', profile_image = ${profile_image} WHERE user_id = ${user_id}`;
    } 
    else {
        let returnData = functions.hashPassword(password)
        salt = returnData[0];
        hash = returnData[1];
        //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
        var sql = `Update Users SET first_name = '${first_Name}', last_name = '${last_Name}', email = '${email}', password = '${hash}', password_salt = '${salt}', phone = '${phone}', profile_image = ${profile_image} WHERE user_id = ${userID}`;
    }
    /*if(!firstName) return res.status(400).json('First Name can not be blank');
    if(!lastName) return res.status(400).json('Last Name cant be blank');
    if(!email) return res.status(400).json('Email cant be blank');
    if(!password) return res.status(400).json('Password cant be blank');*/
  
     connection.query(sql, function(err, rows)
    {
  
      if (err){
        //If error
          res.status(400).json('Unable To Edit');
          console.log("Error inserting : %s ",err );
      }
     else
      //If success
      res.status(200).json('Account editted Successfully!!')
  
    });
  
};
  
//delete user account
module.exports.deleteUser = (req,res) => {
  
    let {user_id, pw_attempt} = req.body;

    var sql = `SELECT password, password_salt FROM Users WHERE user_id = '${user_id}';`;

    connection.query(sql, function(err, rows)
    {
      if (err){
        //If error
        res.status(400).json('Unable to retrieve user information');
        console.log("Error retrieving : %s ",err );
      } else {
        // If password details retrieved successfully, compare to attempt
        if(functions.isPasswordCorrect(rows[0].password, rows[0].password_salt, pw_attempt)){

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
  };
  
//login
module.exports.userLogin = (req,res) => {
  
    let {email, password} = req.body;
  
    var sql = `SELECT password, password_salt FROM Users WHERE email = '${email}'`;
  
     connection.query(sql, function(err, rows)
    {
  
      if (err){
        //If error
          res.status(400).json('Sorry!!Unable To Find');
          console.log("Error inserting : %s ",err );
          //console.log(res)
      }
     else {
  
      let correct = functions.isPasswordCorrect(rows[0]['password'], rows[0]['password_salt'], password)
      //console.log(correct)
      //If success
      if(correct) {

        //   create JWT token
        const token = jwt.sign(
          {
            userEmail: email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
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
  
     }
    });
  
};

module.exports.getAccountDetails = (req, res) => {
  user_id = req.params.user_id;

  var sql = `SELECT email, first_name, last_name, phone, profile_image FROM Users WHERE user_id = '${user_id}';`;

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