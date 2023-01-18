const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

module.exports.insertIncome = (req,res) => {

    let {account_id, gross_pay, pay_day, pay_frequency, user_id} = req.body;
    
    var sql = `INSERT INTO Incomes (account_id, gross_pay, pay_day, pay_frequency, user_id) Values ('${account_id}', '${gross_pay}', '${pay_day}', '${pay_frequency}','${user_id}')`;
  
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


module.exports.getIncomes = (req,res)=>{
  console.log(req)
  user_id = req.params.user_id;

  var sql = `SELECT * FROM Incomes WHERE user_id = ${user_id}`;

  connection.query(sql, function(err, rows)
    {

      if (err){
        //If error
        res.status(400).json('Sorry!!Unable To Add');
         console.log("Error inserting : %s ",err );
      }
    else
      //If success
      res.status(200).json(rows)

    });

  }

module.exports.updateIncome = (req, res) => {
  income_id = req.params.income_id;

  let {account_id, gross_pay, pay_day, pay_frequency} = req.body;

var sql = `UPDATE Incomes SET account_id = '${account_id}', gross_pay = '${gross_pay}', pay_day = '${pay_day}', pay_frequency = '${pay_frequency}' WHERE income_id = '${income_id}'`;

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

module.exports.deleteIncome = (req, res) => {
  income_id = req.params.income_id;

  var sql = `DELETE FROM Incomes WHERE income_id = '${income_id}'`

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