const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const bodyParser = require("body-parser")

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'financial-planner.c3p10rqx8lpz.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'Capital34Candy',
  database:'financial-planner'
  
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* Set Cookie Settings 
app.use(
    session({
      name: 'session',
      secret: 'secretKeyWooo',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })
);*/

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});