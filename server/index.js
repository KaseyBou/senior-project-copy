const functions = require("./helper-functions/functions.js")

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())
const bodyParser = require("body-parser")
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const { Console } = require("console");
const e = require("express");
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {insertIncome, getIncomes, updateIncome, deleteIncome} = require('./routes/income');
const { addBill, getBills, updateBill, deleteBill } = require("./routes/bills.js");
const {userLogin, deleteUser, editUser, registerUser } = require('./routes/user');
const {addAccount, editAccount, deleteAccount} = require('./routes/bankAccount');
const {logError} = require('./routes/bankAccount');
//connection.connect()

/*connection.query('SELECT * FROM `account` WHERE `firstName` = "David"', function (error, results, fields) {
  console.log(results)
});*/

//---------------User Posts------------------------------------------------

//register user account
app.post('/Register', registerUser);

//edit user account
app.post('/EditUser', editUser);

//delete user account
app.post('/DeleteUser', deleteUser);

app.post('/Login', userLogin);

// BANK ACCOUNT ********************************************************************************************

//add bank account
app.post('/BankAccount', addAccount);

//edit bank account
app.post('/EditAccount', editAccount);

//edit bank account
app.post('/DeleteAccount', deleteAccount);

// ERROR LOG ********************************************************************************************

//add error
app.post('/Error', logError);

// INCOME ***************************************************************************************************

app.post('/Income', insertIncome);

app.get('/Income/:user_id', getIncomes);

app.put('/Income/:income_id', updateIncome);

app.delete('/Income/:income_id', deleteIncome);

// BILLS ***************************************************************************************************
  
app.post('/Bills', addBill);

app.get('/Bills/:user_id', getBills);

app.put('/Bills/:bill_id', updateBill);

app.delete('/Bills/:bill_id', deleteBill);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});