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

  let {first_Name, last_Name, email, password, password_salt, phone, profile_image, is_admin} = req.body;

  let returnData = functions.hashPassword(password)

  password_salt = returnData[0];
  hashPass = returnData[1];
  
  /*if(!firstName) return res.status(400).json('First Name can not be blank');
  if(!lastName) return res.status(400).json('Last Name cant be blank');
  if(!email) return res.status(400).json('Email cant be blank');
  if(!password) return res.status(400).json('Password cant be blank');*/
  
    //var sql = "INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('firstName', 'lastName', 'testingg@testing.com', 'password', 'password_salt', 'phone', 'profile_image', 'is_admin')";
   var sql = `INSERT INTO Users (first_name, last_name, email, password, password_salt, phone, profile_image, is_admin) Values ('${first_Name}', '${last_Name}', '${email}', '${hashPass}', '${password_salt}','${phone}', ${profile_image}, ${is_admin})`;

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

  
  var sql = `SELECT userPass, salt FROM account WHERE emailAddress = '${email}'`;

   connection.query(sql, function(err, rows)
  {

    if (err){
      //If error
        res.status(400).json('Sorry!!Unable To Find');
        console.log("Error inserting : %s ",err );
        //console.log(res)
    }
   else {

    let correct = functions.isPasswordCorrect(rows[0]['userPass'], rows[0]['salt'], password)
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
        console.log(rows)
        res.status(200).json(rows)
  
      });
  
    });
  
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
        console.log(rows)
        res.status(200).json(rows)
  
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