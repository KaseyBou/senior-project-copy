const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
});

const {getEmail, validateEmail} = require('../helper-functions/functions')

module.exports.addExpenditure = async(req, res) => {
  let { recipient, date, total_amount, account_id, budget_id } = req.body;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  if(!recipient) return res.status(400).json('Expenditure Recepient Not Valid');
  if(!date) return res.status(400).json('Expenditure Date Not Valid');
  if(!total_amount) return res.status(400).json('Expenditure amount Not Valid');
  if(!account_id) return res.status(400).json('Expenditure account Not Valid');
  if(!budget_id) return res.status(400).json('Expenditure category Not Valid');
  if(!email) return res.status(400).json('Account Email Not Valid');

  var sql = 'CALL `financial_planner`.`Create_Expenditure`(' + account_id + ', "' + recipient + '", "' + date +
  '", ' + total_amount + ', ' + budget_id + ', "' + await email + '");';

  console.log(sql);

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Insertion Error');
      console.log('Error inserting : %s ', err);
      //console.log(res)
    } else {
      //If success
      res.status(200).json(rows);
    }
  });
};

module.exports.getExpenditure = async(req, res) => {
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  if(!email) return res.status(400).json('Account Email Not Valid');
  var sql = `SELECT * FROM Expenditures INNER JOIN Users ON Users.user_id = Expenditures.user_id WHERE email = '${await email}'`;

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

module.exports.updateExpenditure = async(req, res) => {
  expenditure_id = req.params.expenditure_id;
  let { account_id, recipient, date, total_amount, budget_id } = req.body;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  if(!recipient) return res.status(400).json('Expenditure Recipient Not Valid');
  if(!date) return res.status(400).json('Expenditure Date Not Valid');
  if(!total_amount) return res.status(400).json('Expenditure amount Not Valid');
  if(!account_id) return res.status(400).json('Expenditure account Not Valid');
  if(!budget_id) return res.status(400).json('Expenditure category Not Valid');
  if(!expenditure_id) return res.status(400).json('Expenditure ID Not Valid');
  if(!email) return res.status(400).json('Account Email Not Valid');

  var sql = 'CALL `financial_planner`.`Edit_Expenditure`(' + expenditure_id + ', ' + account_id + ', "' + recipient +
  '", "' + date + '", ' + total_amount + ', ' + budget_id + ');';

  connection.query(sql, function (err, rows) {
    if (err) {
      //If error
      res.status(400).json('Edit Error');
      console.log('Error editing : %s ', err);
    }
    //If success
    else res.status(200).json(rows);
  });
};

module.exports.deleteExpenditure = async(req, res) => {
  expenditure_id = req.params.expenditure_id;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  if(!email) return res.status(400).json('Account Email Not Valid');
  if(!expenditure_id) return res.status(400).json('Expenditure ID Not Valid');
  var sql = 'CALL `financial_planner`.`Delete_Expenditure`(' + expenditure_id + ');';

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
