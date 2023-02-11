const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {getEmail, validateEmail} = require('../helper-functions/functions')

module.exports.insertBudget = async(req,res) => {

    let {category_name, is_calculated, monthly_budget, percentage} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});
    if(!category_name) return res.status(400).json('Category Name Not Valid');
    if(!monthly_budget) return res.status(400).json('Monthly Budget Not Valid');
    if(!email) return res.status(400).json('Account Email Not Valid');
    console.log(is_calculated);
    
    var sql = `INSERT INTO Budgets (category_name, is_calculated, monthly_budget, percentage, user_id) 
      Values ('${category_name}', ${is_calculated}, '${monthly_budget}', '${percentage}',
      (SELECT user_id FROM Users WHERE email = '${await email}'))`;
  
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
}

// TODO: don't use SELECT * because that gives out encrypted passwords and stuff
module.exports.getBudget = async(req,res)=>{
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  if(!email) return res.status(400).json('Account Email Not Valid');
  var sql = `SELECT * FROM Budgets INNER JOIN Users ON Users.user_id = Budgets.user_id WHERE email = '${await email}'`;

  connection.query(sql, function(err, rows)
    {

      if (err){
        //If error
        res.status(400).json('Sorry!!Unable To Add');
         console.log("Error inserting : %s ",err );
      } else {
        //If success
        res.status(200).json(rows)
      }

    });

  }

module.exports.updateBudget = async(req, res) => {
  budget_id = req.params.budget_id;

  let {category_name, is_calculated, monthly_budget, percentage} = req.body;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  if(!budget_id) return res.status(400).json('Budget Id Not Valid');
  if(!category_name) return res.status(400).json('Category Name Not Valid');
  if(!monthly_budget) return res.status(400).json('Monthly Budget Not Valid');
  if(!email) return res.status(400).json('Account Email Not Valid');

  var sql = `UPDATE Budgets SET category_name = '${category_name}', is_calculated = ${is_calculated}, monthly_budget = '${monthly_budget}',
    percentage = '${percentage}' WHERE budget_id = '${budget_id}'
    AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

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
}

module.exports.deleteBudget = async(req, res) => {
  budget_id = req.params.budget_id;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});
  if(!email) return res.status(400).json('Account Email Not Valid');
  var sql = `DELETE FROM Budgets WHERE budget_id = '${budget_id}'
    AND user_id=(SELECT user_id FROM Users WHERE email = '${await email}')`;

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
}

module.exports.getBudgetsByIncome = async(req, res) => {
  income_id = req.params.income_id;
  let email = getEmail(req.headers.authorization).then((email) => {return email;});

  var sql = `SELECT budget_ID, conn_percentage FROM Budget_Connections WHERE connection_type = 'income' AND linked_id = ${income_id};`;
  connection.query(sql, function(err, rows){
    if(err){
      res.status(400).json('Retrieval error');
      console.log('Retrieval error: %s', err)
    } else {
      res.status(200).json(rows);
    }
  })
}