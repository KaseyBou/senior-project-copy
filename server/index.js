const functions = require("./helper-functions/functions.js")

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())
const bodyParser = require("body-parser")
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname));
// cookie parser middleware
const auth = require("./auth");

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
const {userLogin, deleteUser, editUser, registerUser, getAccountDetails, addSessionToken } = require('./routes/user');
const {addAccount, editAccount, deleteAccount, getAccounts} = require('./routes/bankAccount');
const {logError} = require('./routes/errorLog');
const { addDeposit, getDeposit, updateDeposit, deleteDeposit } = require("./routes/deposits");
const { addExpenditure, getExpenditure, updateExpenditure, deleteExpenditure } = require("./routes/expenditures");
const {insertBudget, getBudget, updateBudget, deleteBudget} = require("./routes/budget")

//---------------User Posts------------------------------------------------

//register user account
app.post('/User', auth,  registerUser);

//edit user account
app.put('/User',  auth, editUser);

//delete user account
app.delete('/User/:user_id',  auth, deleteUser);

app.post('/Login', userLogin);

//get user
app.get('/User',  auth, getAccountDetails);

// BANK ACCOUNT ********************************************************************************************

//add bank account
app.post('/BankAccount',  auth, addAccount);

// get list of bank accounts
app.get('/BankAccount', auth, getAccounts);

//edit bank account
app.put('/BankAccount/:account_id',  auth, editAccount);

//delete bank account
app.delete('/BankAccount/:account_id',  auth, deleteAccount);

// BUDGET ********************************************************************************************


app.post('/Budget',  auth, insertBudget);

app.get('/Budget',  auth, getBudget);

app.put('/Budget/:budget_id',  auth, updateBudget);

app.delete('/Budget/:budget_id', auth, deleteBudget);

// ERROR LOG ********************************************************************************************

//add error
app.post('/Error',  auth, logError);

// INCOME ***************************************************************************************************

app.post('/Income',  auth, insertIncome);

app.get('/Income',  auth, getIncomes);

app.put('/Income/:income_id',  auth, updateIncome);

app.delete('/Income/:income_id',  auth, deleteIncome);

// BILLS ***************************************************************************************************
  
app.post('/Bills',  auth, addBill);

app.get('/Bills/:user_id',  auth, getBills);

app.put('/Bills/:bill_id',  auth, updateBill);

app.delete('/Bills/:bill_id',  auth, deleteBill);

// DEPOSITS ***************************************************************************************************
  
app.post('/Deposits',  auth, addDeposit);

app.get('/Deposits',  auth, getDeposit);

app.put('/Deposits/:deposit_id',  auth, updateDeposit);

app.delete('/Deposits/:deposit_id',  auth, deleteDeposit);

// EXPENDITURES ***************************************************************************************************
  
app.post('/Expenditures',  auth, addExpenditure);

app.get('/Expenditures',  auth, getExpenditure);

app.put('/Expenditures/:expenditure_id',  auth, updateExpenditure);

app.delete('/Expenditures/:expenditure_id',  auth, deleteExpenditure);



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get("/api", auth, (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});