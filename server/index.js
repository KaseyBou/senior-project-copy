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
const { addDeposit, getDeposit, updateDeposit, deleteDeposit } = require("./routes/deposits");
const { addExpenditure, getExpenditure, updateExpenditure, deleteExpenditure } = require("./routes/expenditures");

//connection.connect()

/*connection.query('SELECT * FROM `account` WHERE `firstName` = "David"', function (error, results, fields) {
  console.log(results)
});*/

//---------------User Posts------------------------------------------------

//register user account
app.post('/Register',(req,res)=>{

  let {first_Name, last_Name, email, password, phone, profile_image, is_admin} = req.body;

  let returnData = functions.hashPassword(password)
  salt = returnData[0];
  hash = returnData[1];
  
  /*if(!firstName) return res.status(400).json('First Name can not be blank');
  if(!lastName) return res.status(400).json('Last Name cant be blank');
  if(!email) return res.status(400).json('Email cant be blank');
  if(!password) return res.status(400).json('Password cant be blank');*/
  
    //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
   var sql = `INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('${first_Name}', '${last_Name}', '${email}', '${hash}', '${salt}','${phone}', ${profile_image}, ${is_admin})`;

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Add');
        console.log("Error inserting : %s ",err );
        return err;
    }
   else
    //If success
    res.status(200).json('Account Added Successfully!!')
    
  });


});

//edit user account
app.post('/EditUser',(req,res)=>{

  let {first_Name, last_Name, email, password, phone, profile_image, user_id} = req.body;

  if(password === "") {

      var sql = `Update Users SET first_name = '${first_Name}', last_name = '${last_Name}', email = '${email}', phone = '${phone}', profile_image = ${profile_image} WHERE user_id = ${user_id}`;
  } 
  else {
      let returnData = functions.hashPassword(password)
      salt = returnData[0];
      hash = returnData[1];
      //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
      var sql = `Update Users SET first_name = '${first_Name}', last_name = '${last_Name}', email = '${email}', password = '${hash}', password_salt = '${salt}', phone = '${phone}', profile_image = ${profile_image} WHERE user_id = ${userID}`;
  }
  /*if(!firstName) return res.status(400).json('First Name can not be blank');
  if(!lastName) return res.status(400).json('Last Name cant be blank');
  if(!email) return res.status(400).json('Email cant be blank');
  if(!password) return res.status(400).json('Password cant be blank');*/

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Unable To Edit');
        console.log("Error inserting : %s ",err );
    }
   else
    //If success
    res.status(200).json('Account editted Successfully!!')

  });

});

//delete user account
app.post('/DeleteUser',(req,res)=>{

  let {user_id} = req.body;


  var sql = `DELETE FROM Bills, Deposits, Expenditures, Budgets, Incomes, Accounts, Users WHERE user_id = ${user_id}`;
 

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Unable To Edit');
        console.log("Error inserting : %s ",err );
    }
   else
    //If success
    res.status(200).json('Account deleted Successfully!!')

  });

});


app.post('/Login',(req,res)=>{

  let {email, password} = req.body;

  var sql = `SELECT password, password_salt FROM Users WHERE email = '${email}'`;

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Find');
        console.log("Error inserting : %s ",err );
        //console.log(res)
    }
   else {

    let correct = functions.isPasswordCorrect(rows[0]['password'], rows[0]['password_salt'], password)
    //let correct = functions.isPasswordCorrect('5ff9a7610f342f90274da0747e3dfa08ad8adddf3f166', 'qXGmD9z7L77Ob2q9TwUDXyDAXmukdQAV3PdC/mPP/CF/J0AvAACqQoCJM/lIG9e29OoUkyIt+jr3Fa5jFGZfVtfFjv9DYtFZHR4Ibh871Xm4fbYQMmFAl8q94dpy0a8gPqzBgzUKX6w4HBWB0fM7yv6lnZpqMWk8zcf5E0Hmohk=', password)
    console.log(correct)
    //If success
    if(correct) {
      res.status(200).json('Login Succeful' + correct)
    } else {
      res.status(400).json('Incorrect password');
    }

   }
  });

});

// BANK ACCOUNT ********************************************************************************************

//add bank account
app.post('/BankAccount',(req,res)=>{

  let {account_name, account_type, balance, interest, monthlyFees, user_id} = req.body;
  
    //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
   var sql = `INSERT INTO Accounts (account_name, account_type, balance, interest, monthlyFees, user_id) Values ('${account_name}', '${account_type}', '${balance}', '${interest}', '${monthlyFees}','${user_id}')`;

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Add');
        console.log("Error inserting : %s ",err );
        return err;
    }
   else
    //If success
    res.status(200).json('Account Added Successfully!!')
    
  });


});

//edit bank account
app.post('/EditAccount',(req,res)=>{

  let {account_name, account_type, balance, interest, monthlyFees, user_id} = req.body;
  
    //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
   var sql = `Update Accounts SET account_name = '${account_name}', account_type = '${account_type}', balance = '${balance}', interest = '${interest}', monthlyFees = '${monthlyFees}', user_id = '${user_id}' WHERE user_id = ${userID} AND account_id = ${account_id}`;
   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Add');
        console.log("Error inserting : %s ",err );
        return err;
    }
   else
    //If success
    res.status(200).json('Account Added Successfully!!')
    
  });


});

//edit bank account
app.post('/DeleteAccount',(req,res)=>{

  let {account_id} = req.body;
  
    //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
   var sql = `DELETE FROM Accounts WHERE user_id = ${userID} AND account_id = ${account_id}`;
   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Add');
        console.log("Error inserting : %s ",err );
        return err;
    }
   else
    //If success
    res.status(200).json('Account Added Successfully!!')
    
  });


});

// ERROR LOG ********************************************************************************************

//add error
app.post('/Error',(req,res)=>{

  let {error_message, user_id, date} = req.body;

   var sql = `INSERT INTO ErrorLog (error_message, user_id, date) Values ('${error_message}', '${user_id}', '${date})`;

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Add');
        console.log("Error inserting : %s ",err );
        return err;
    }
   else
    //If success
    res.status(200).json('Account Added Successfully!!')
    
  });


});

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