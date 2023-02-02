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

  var sql = `SELECT income_id, gross_pay, pay_day, pay_frequency, account_id
    FROM Incomes INNER JOIN Users ON Users.user_id = Incomes.user_id
    WHERE email = '${await email}'`;

  connection.query(sql, function(err, rows)
    {

      if (err){
        //If error
        res.status(400).json('Retrieval Error');
         console.log("Error retrieving incomes: %s ",err );
      } else {
        //If success
        // check if any incomes should have been deposited, and add them as appropriate
        for(income of rows){
          if(income.pay_day < Date.now()){
            // add pay frequency length to find next pay day
            income.pay_day.setDate(income.pay_day.getDate() + income.pay_frequency);

            // turn new date into string
            let dateString = (income.pay_day.getYear()+1900) +"/"+ (income.pay_day.getMonth()+1) +"/"+ income.pay_day.getDate();

            // update SQL server, both on pay day and account
            var updateSql = `UPDATE Incomes INNER JOIN Accounts ON Incomes.account_id = Accounts.account_id
              SET Incomes.pay_day = '${dateString}',
              Accounts.balance = Accounts.balance + Incomes.gross_pay
              WHERE Incomes.income_id = ${income.income_id}`
            console.log(updateSql);

            connection.query(updateSql, function(err, rows){
              if (err){
                console.log(err);
                res.status(500).json("Update Error");
              }
            })
          }
        }

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

  console.log(sql);

connection.query(sql, function(err, rows)
  {
    if (err){
      //If error
      res.status(400).json('Sorry!!Unable To Add');
       console.log("Error inserting : %s ",err );
    }
  else
    //If success
    console.log(rows);
    res.status(200).json('Income Update Successful')

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