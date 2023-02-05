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

    let {account_id, gross_pay, pay_day, pay_frequency, budgets} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});

    // generate string from list of IDs and percentages to be connected
    var idList = "";
    var percentList = "";
    console.log(budgets.budgets);
    for(key of Object.keys(budgets.budgets)){
      idList += key.substring(7) + ", ";
      percentList += budgets.budgets[key] + ", ";
    }

    var sendQuery = `INSERT INTO Incomes (account_id, gross_pay, pay_day, pay_frequency, user_id) Values ('${account_id}', '${gross_pay}', '${pay_day}', '${pay_frequency}', (SELECT user_id FROM Users WHERE email = '${await email}'))`
    
    var sql = 'CALL `financial_planner`.`Create_Budget_Connections`("'+ sendQuery + '", "income", "' + idList + '", "' + percentList + '")';
  
    connection.query(sql, function(err, rows)
      {
  
        if (err){
          //If error
          res.status(400).json('Sorry!!Unable To Add');
           console.log("Error inserting : %s ",err );
        } else {
          res.status(200).json(rows);
        }
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

            var dateString = (income.pay_day.getYear() + 1900) + "-" + (income.pay_day.getMonth() + 1) + "-" + income.pay_day.getDate();

            // update SQL server, both on pay day and account
            var updateSql = 'CALL `financial_planner`.`Update_Incomes`(' + income.income_id + ', ' + income.account_id + ', ' + income.gross_pay + ', "' + dateString + '");';
            console.log(updateSql);

            connection.query(updateSql, function(update_err, update_rows){
              if (update_err){
                console.log(update_err);
                res.status(500).json("Update Error");
              } else {
                console.log(update_rows);
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