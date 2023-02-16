const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

const {getEmail, validateEmail} = require('../helper-functions/functions')

module.exports.getReportData = async(req, res) => {
    let {type, idList} = req.body;
    let email = getEmail(req.headers.authorization).then((email) => {return email;});

    var request_valid = true;

    // generate SQL statement in multiple steps
    var sql = '';
    if(type == "accounts"){
        sql = 'SELECT Balances.account_id AS id, account_name AS name, Balances.balance, date FROM Balances ' +
            'INNER JOIN Accounts ON Accounts.account_id = Balances.account_id ' + 
            'WHERE Balances.account_id IN (';
    } else if(type == "budgets"){
        sql = 'SELECT Budget_Balances.budget_id AS id, category_name AS name, Budget_Balances.balance, date FROM Budget_Balances ' +
            'INNER JOIN Budgets ON Budgets.budget_ID = Budget_Balances.budget_id ' + 
            'WHERE Budget_Balances.budget_id IN (';
    } else {
        // if invalid type, return error
        res.status(404).json('invalid report type');
        request_valid = false;
    }

    if(request_valid){
        for(var i = 0; i < idList.length; i++){
            sql += idList[i];
            if(i < idList.length - 1){
                sql += ', ';
            }
        }

        sql += ');';

        connection.query(sql, function(err, rows)
            {
                if (err){
                //If error
                res.status(400).json('Retrieval Error');
                console.log("Error getting report data : %s ",err );
                }
            else
                //If success
                res.status(200).json(rows);

        });
    }
}