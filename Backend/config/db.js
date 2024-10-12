// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

//for-----local

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0,
// });


// // const db = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: 'Passcode@123',
// //     database: 'VProject',
// //   });
 

// // we use below only when using createConnection()

// // db.connect((err) => {
// //     if (err) throw err;
// //     console.log('Database connected successsfully');
// //   });




//----------------for railway
const db = mysql.createPool(process.env.DB_URL);

module.exports = db;
