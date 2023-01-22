const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  database: 'financial_planner',
  password: 'Capital34Candy',
  
})

//add error
module.exports.logError = (req,res)=>{

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
  
  
};