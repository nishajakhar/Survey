
const mysql = require('mysql');
exports.connection = mysql.createConnection({
  host: "localhost",
  user: "nisha",
  password: "Nisha@123",
  database: 'Survey'
});

// module.exports = connection;
