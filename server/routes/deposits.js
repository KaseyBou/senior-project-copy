const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
});

module.exports.addDeposit = (req, res) => {
  let { user_id, deposit_source, date, total_amount, account_id } = req.body;

  var sql = `INSERT INTO Deposits(user_id, deposit_source, date, total_amount, account_id) VALUES ('${user_id}', '${deposit_source}', '${date}', '${total_amount}', '${account_id}'`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To Find');
      console.log('Error inserting : %s ', err);
      //console.log(res)
    } else {
      //If success
      res.status(200).json('Deposit Added Successfully!!');
    }
  });
};

module.exports.getDeposit = (req, res) => {
  user_id = req.params.user_id;

  var sql = `SELECT * FROM Deposits WHERE user_id = ${user_id}`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To Add');
      console.log('Error inserting : %s ', err);
    }
    //If success
    else res.status(200).json(rows);
  });
};

module.exports.updateDeposit = (req, res) => {
  deposit_id = req.params.deposit_id;

  let { account_id, deposit_source, date, total_amount } = req.body;

  var sql = `UPDATE Deposits SET account_id = '${account_id}', deposit_source = '${deposit_source}', date = '${date}', total_amount = '${total_amount}'`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To Add');
      console.log('Error inserting : %s ', err);
    }
    //If success
    else res.status(200).json('Deposit updated Successfully!!');
  });
};

module.exports.deleteDeposit = (req, res) => {
  expenditure_id = req.params.expenditure_id;

  var sql = `DELETE FROM Deposits WHERE deposit_id = '${deposit_id}'`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To delete');
      console.log('Error deleting : %s ', err);
    }
    //If success
    else res.status(200).json('Deposit deleted Successfully!!');
  });
};
