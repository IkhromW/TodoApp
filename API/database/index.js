const express = require('express');
const app = express()
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root!@#456',
  database: 'latihan2',
  port: 3306,
  
})
module.exports = db;


// db.connect( (err) => {
//   if (err){
//     console.log(err);
    
//   }
//   else{
//     console.log("Connected!");
//     const sql = "INSERT INTO users (idusers, username, password) VALUES ?";
//     let values = [
//       [1,'admin', 'admin'],
//       [2,'Ikhrom', 'mantap123'],
//     ];
//     db.query(sql, [values],  (err, result) => {
//       if (err){
//         console.log(err);
        
//       }
//       console.log(result);
      
//       //console.log("Number of records inserted: " + result.affectedRows);
//     });
//   };
//   //Make SQL statement:
//   //Make an array of values:
  
//   //Execute the SQL statement, with the value array: 
// });




