const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {hashPassword, isPasswordCorrect, getEmail} = require('../helper-functions/functions')

module.exports.insertIncome = async(req,res) => {

    let {account_id, gross_pay, pay_day, pay_frequency} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});
    
    var sql = `INSERT INTO Incomes (account_id, gross_pay, pay_day, pay_frequency, user_id) 
      Values ('${account_id}', '${gross_pay}', '${pay_day}', '${pay_frequency}',
      (SELECT user_id FROM Users WHERE email = '${await email}'))`;
  
    connection.query(sql, function(err, rows)
      {
  
        if (err){
          //If error
          res.status(400).json('Sorry!!Unable To Add');
           console.log("Error inserting : %s ",err );
        }
      else
        //If success
        res.status(200).json('Income Added Successfully!!')
  
      });
}

// TODO: don't use SELECT * because that gives out encrypted passwords and stuff
module.exports.getIncomes = async(req,res)=>{
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `SELECT * FROM Incomes INNER JOIN Users ON Users.user_id = Incomes.user_id WHERE email = '${await email}'`;

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

module.exports.updateIncome = async(req, res) => {
  income_id = req.params.income_id;

  let {account_id, gross_pay, pay_day, pay_frequency} = req.body;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `UPDATE Incomes SET account_id = '${account_id}', gross_pay = '${gross_pay}', pay_day = '${pay_day}',
    pay_frequency = '${pay_frequency}' WHERE income_id = '${income_id}'
    AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
      res.status(400).json('Sorry!!Unable To Add');
       console.log("Error inserting : %s ",err );
    }
  else
    //If success
    res.status(200).json('Income Added Successfully!!')

  });
}

module.exports.deleteIncome = async(req, res) => {
  income_id = req.params.income_id;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `DELETE FROM Incomes WHERE income_id = '${income_id}'
    AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

  connection.query(sql, function(err, rows)
  {
    if (err){
      //If error
      res.status(400).json('Sorry!!Unable To Add');
       console.log("Error deleting : %s ",err );
    }
  else
    //If success
    res.status(200).json('Income deleted Successfully!!')
  });
}