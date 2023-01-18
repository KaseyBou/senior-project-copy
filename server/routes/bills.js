const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

module.exports.addBill = (req, res) => {
    let {user_id, bill_name, bill_source, pay_frequency, next_due, amount, account_id, budget_id} = req.body;

    var sql = `INSERT INTO Bills(user_id, bill_name, bill_source, pay_frequency, next_due, amount, account_id, budget_id) VALUES ('${user_id}', '${bill_name}', '${bill_source}', '${pay_frequency}', '${next_due}', '${amount}', '${account_id}', '${budget_id}')`;

    connection.query(sql, function(err, rows)
    {

      if (err){
        //If error
          res.status(400).json('Sorry!!Unable To Find');
          console.log("Error inserting : %s ",err );
          //console.log(res)
      }
    else {
      //If success
      res.status(200).json('Bill Added Successfully!!')
    }
    });
  }

module.exports.getBills = (req, res) => {
    user_id = req.params.user_id;

    var sql = `SELECT * FROM Bills WHERE user_id = ${user_id}`;
  
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

module.exports.updateBill = (req, res) => {
    bill_id = req.params.bill_id;

    let {account_id, bill_name, bill_source, amount, next_due, pay_frequency, budget_id} = req.body;
  
    var sql = `UPDATE Bills SET account_id = '${account_id}', bill_name = '${bill_name}', bill_source = '${bill_source}', amount = '${amount}', next_due = '${next_due}', pay_frequency = '${pay_frequency}', budget_id = '${budget_id}'`;

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

module.exports.deleteBill = (req, res) => {
    bill_id = req.params.bill_id;

    var sql = `DELETE FROM Bills WHERE bill_id = '${bill_id}'`

    connection.query(sql, function(err, rows)
    {
      if (err){
        //If error
        res.status(400).json('Sorry!!Unable To Add');
         console.log("Error deleting : %s ",err );
      }
    else
      //If success
      res.status(200).json('Bill deleted Successfully!!')
    });
  }