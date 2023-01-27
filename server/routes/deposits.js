const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
});

const {hashPassword, isPasswordCorrect, getEmail} = require('../helper-functions/functions')

module.exports.addDeposit = async(req, res) => {
  let {deposit_source, date, total_amount, account_id } = req.body;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `INSERT INTO Deposits(source, date, total_amount, account_id, user_id) 
  VALUES ('${deposit_source}', '${date}', '${total_amount}', '${account_id}',
   (SELECT user_id FROM Users WHERE email = 'test@test.com'))`;
  //(SELECT user_id FROM Users WHERE email = '${await email}')'`;

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

module.exports.getDeposit = async(req, res) => {
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  console.log(email)
  var sql = `SELECT * FROM Deposits INNER JOIN Users ON Users.user_id = Deposits.user_id WHERE email = 'test@test.com'`;

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

module.exports.updateDeposit = async(req, res) => {
  deposit_id = req.params.deposit_id;

  let { account_id, deposit_source, date, total_amount } = req.body;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `UPDATE Deposits SET account_id = '${account_id}', source = '${deposit_source}', date = '${date}',
   total_amount = '${total_amount}' WHERE deposit_id = '${deposit_id}'
   AND user_id=(SELECT user_id FROM Users WHERE email = 'test@test.com')`;
   //AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

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

module.exports.deleteDeposit = async(req, res) => {
  deposit_id = req.params.deposit_id;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  var sql = `DELETE FROM Deposits WHERE deposit_id = '${deposit_id}'
  AND user_id=(SELECT user_id FROM Users WHERE email = 'test@test.com')`;
  //AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

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
