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

//functions from routes
const {insertIncome, getIncomes, updateIncome, deleteIncome} = require('./routes/income');
const { addBill, getBills, updateBill, deleteBill } = require("./routes/bills.js");
const {userLogin, deleteUser, editUser, registerUser } = require('./routes/user');
const {addAccount, editAccount, deleteAccount} = require('./routes/bankAccount');
const {logError} = require('./routes/bankAccount');
const { addDeposit, getDeposit, updateDeposit, deleteDeposit } = require("./routes/deposits");
const { addExpenditure, getExpenditure, updateExpenditure, deleteExpenditure } = require("./routes/expenditures");

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

// DEPOSITS ***************************************************************************************************
  
app.post('/Deposits', addDeposit);

app.get('/Deposits/:user_id', getDeposit);

app.put('/Deposits/:deposit_id', updateDeposit);

app.delete('/Deposits/:deposit_id', deleteDeposit);

// EXPENDITURES ***************************************************************************************************
  
app.post('/Expenditures', addExpenditure);

app.get('/Expenditures/:user_id', getExpenditure);

app.put('/Expenditures/:expenditure_id', updateExpenditure);

app.delete('/Expenditures/:expenditure_id', deleteExpenditure);



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