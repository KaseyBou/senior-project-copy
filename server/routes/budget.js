const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {hashPassword, isPasswordCorrect, getEmail} = require('../helper-functions/functions')

module.exports.insertBudget = async(req,res) => {

    let {category_name, is_calculated, monthly_budget, percentage} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});
    
    var sql = `INSERT INTO Budgets (category_name, is_calculated, monthly_budget, percentage, user_id) 
      Values ('${category_name}', '${is_calculated}', '${monthly_budget}', '${percentage}',
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

  var sql = `SELECT * FROM Budgets INNER JOIN Users ON Users.user_id = Incomes.user_id WHERE email = '${await email}'`;

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

  var sql = `UPDATE Budgets SET category_name = '${category_name}', is_calculated = '${is_calculated}', monthly_budget = '${monthly_budget}',
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