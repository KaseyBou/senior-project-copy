const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {getEmail} = require('../helper-functions/functions')

module.exports.addBill = async(req, res) => {
    let {bill_name, bill_source, pay_frequency, next_due, amount, account_id, budget_id} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});

    // since the code is set up to take a list, we still have to pass in the single value in list string format
    var idList = budget_id + ", ";

    var sendQuery = `INSERT INTO Bills(bill_name, bill_source, pay_frequency, next_due, amount, account_id, budget_id, user_id) 
    VALUES ('${bill_name}', '${bill_source}', '${pay_frequency}', '${next_due}', '${amount}', '${account_id}', '${budget_id}',
    (SELECT user_id FROM Users WHERE email = '${await email}'))`;

    var sql = 'CALL `financial_planner`.`Create_Budget_Connections`("'+ sendQuery + '", "bill", "' + idList + '", "100, ")';

    console.log(sql);

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

module.exports.getBills = async(req, res) => {
    user_id = req.params.user_id;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});
    var sql = `SELECT * FROM Bills INNER JOIN Users ON Users.user_id = Bills.user_id WHERE email = '${await email}'`;
  
    connection.query(sql, function(err, rows)
      {
  
        if (err){
          //If error
          res.status(400).json('Sorry!!Unable To Add');
           console.log("Error inserting : %s ",err );
        }
      else
        for(bill of rows){
          while(bill.next_due < Date.now()){
            // add pay frequency length to find next pay day
            bill.next_due.setDate(bill.next_due.getDate() + bill.pay_frequency);

            var dateString = (bill.next_due.getYear() + 1900) + "-" + (bill.next_due.getMonth() + 1) + "-" + bill.next_due.getDate();

            // update SQL server, both on pay day and account
            var updateSql = 'CALL `financial_planner`.`Update_Bills`(' + bill.bill_id + ', ' + bill.account_id + ', ' + bill.amount + ', "' + dateString + '");';
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
      });
  }

module.exports.updateBill = async(req, res) => {
    bill_id = req.params.bill_id;

    let {account_id, bill_name, bill_source, amount, next_due, pay_frequency, budget_id} = req.body;
    console.log(req.body)
    let email = getEmail(req.headers.authorization).then((email) => {return email;});
  
    var sql = `UPDATE Bills SET account_id = '${account_id}', bill_name = '${bill_name}', bill_source = '${bill_source}', amount = '${amount}', next_due = '${next_due}', pay_frequency = '${pay_frequency}' 
    WHERE budget_id = '${budget_id}' AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

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

module.exports.deleteBill = async(req, res) => {
    bill_id = req.params.bill_id;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});

    var sql = `DELETE FROM Bills WHERE bill_id = '${bill_id}'
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
      res.status(200).json('Bill deleted Successfully!!')
    });
  }