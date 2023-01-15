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
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

//connection.connect()

/*connection.query('SELECT * FROM `account` WHERE `firstName` = "David"', function (error, results, fields) {
  console.log(results)
});*/

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
    }
   else
    //If success
    res.status(200).json('Account Added Successfully!!')

  });


  });

app.post

app.post('/Login',(req,res)=>{

  let {email, password} = req.body;

  console.log(email)
  console.log(password)
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
    console.log(rows[0])
    console.log(rows[0])
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

app.post

// INCOME ***************************************************************************************************

app.post('/Income',(req,res)=>{

  let {account_id, gross_pay, pay_day, pay_frequency, user_id} = req.body;
  
  var sql = `INSERT INTO Incomes (account_id, gross_pay, pay_day, pay_frequency, user_id) Values ('${account_id}', '${gross_pay}', '${pay_day}', '${pay_frequency}','${user_id}')`;

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

  });

  app.get('/Income/:user_id', (req,res)=>{
    console.log(req)
    user_id = req.params.user_id;

    var sql = `SELECT * FROM Incomes WHERE user_id = ${user_id}`;
  
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
  
    });

  app.put('/Income/:income_id', (req, res) => {
    income_id = req.params.income_id;

    let {account_id, gross_pay, pay_day, pay_frequency} = req.body;
  
  var sql = `UPDATE Incomes SET account_id = '${account_id}', gross_pay = '${gross_pay}', pay_day = '${pay_day}', pay_frequency = '${pay_frequency}' WHERE income_id = '${income_id}'`;

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
  })

  app.delete('/Income/:income_id', (req, res) => {
    income_id = req.params.income_id;

    var sql = `DELETE FROM Incomes WHERE income_id = '${income_id}'`

    connection.query(sql, function(err, rows)
    {
      if (err){
        //If error
        res.status(400).json('Sorry!!Unable To Add');
         console.log("Error deleting : %s ",err );
      }
    else
      //If success
      res.status(200).json('Income deleted Successfully!!')
    });
  })

  // BILLS ***************************************************************************************************
  
  app.post('/Bills', (req, res) => {
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
  })

  app.get('/Bills/:user_id', (req, res) => {
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
  })

  app.put('/Bills/:bill_id', (req, res) => {
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
  })

  app.delete('/Bills/:bill_id', (req, res) => {
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
  })

//connection.end()

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