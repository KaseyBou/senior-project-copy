const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {hashPassword, isPasswordCorrect, getEmail} = require('../helper-functions/functions')

//add bank account
module.exports.addAccount = async(req,res) => {

    let {account_name, account_type, balance, interest, monthlyFees, user_id} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});
      //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
     var sql = `INSERT INTO Accounts (account_name, account_type, balance, interest, monthlyFees, user_id) Values ('${account_name}', '${account_type}', '${balance}', '${interest}', '${monthlyFees}', (SELECT user_id FROM Users WHERE email = '${await email}'))`;
  
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
  
//edit bank account
module.exports.editAccount = async(req,res) => {
  account_id = req.params.account_id;
  
    let {account_name, account_type, balance, interest, monthlyFees} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});

      //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
     var sql = `Update Accounts SET account_name = '${account_name}', account_type = '${account_type}', balance = '${balance}', interest = '${interest}', monthlyFees = '${monthlyFees}' WHERE account_id = '${account_id}'
     AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

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
  
//edit bank account
module.exports.deleteAccount = async(req,res) => {
    account_id = req.params.account_id;

    let email = getEmail(req.headers.authorization).then((email) => {return email;});
     var sql = `DELETE FROM Accounts WHERE account_id = '${account_id}'
     AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;
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

module.exports.getAccounts = async(req, res) => {
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `SELECT account_id, account_name, account_type, balance, interest, monthlyFees
  FROM Accounts INNER JOIN Users ON Users.user_id = Accounts.user_id
  WHERE email = '${await email}'`;
  connection.query(sql, function(err, rows)
    {

      if (err){
        //If error
        res.status(400).json('Sorry!!Unable To Add');
         console.log("Error inserting : %s ",err );
      } else {
        //If success
        res.status(200).json(rows)
      }

    });
}