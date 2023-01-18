
module.exports.insertIncome = (req,res) => {

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
}
