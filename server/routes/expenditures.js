const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
});

module.exports.addExpenditure = (req, res) => {
  let { user_id, recipient, date, total_amount, account_id, budget_id } =
    req.body;

  var sql = `INSERT INTO Expenditures(user_id, recipient, date, total_amount, account_id, budget_id) VALUES ('${user_id}', '${recipient}', '${date}', '${total_amount}', '${account_id}', '${budget_id}')`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To Find');
      console.log('Error inserting : %s ', err);
      //console.log(res)
    } else {
      //If success
      res.status(200).json('Expenditure Added Successfully!!');
    }
  });
};

module.exports.getExpenditure = (req, res) => {
  user_id = req.params.user_id;

  var sql = `SELECT * FROM Expenditures WHERE user_id = ${user_id}`;

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

module.exports.updateExpenditure = (req, res) => {
  expenditure_id = req.params.expenditure_id;

  let { account_id, recipient, date, total_amount, budget_id } = req.body;

  var sql = `UPDATE Expenditures SET account_id = '${account_id}', recipient = '${recipient}', date = '${date}', total_amount = '${total_amount}', budget_id = '${budget_id}'`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To Add');
      console.log('Error inserting : %s ', err);
    }
    //If success
    else res.status(200).json('Expenditure updated Successfully!!');
  });
};

module.exports.deleteExpenditure = (req, res) => {
  expenditure_id = req.params.expenditure_id;

  var sql = `DELETE FROM Expenditures WHERE expenditure_id = '${expenditure_id}'`;

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Sorry!!Unable To delete');
      console.log('Error deleting : %s ', err);
    }
    //If success
    else res.status(200).json('Expenditure deleted Successfully!!');
  });
};
