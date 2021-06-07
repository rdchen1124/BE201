var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ryan',
  password : 'ryan',
  database : 'ryan'
});

module.exports = connection;


// connection.query('SELECT * FROM `todos`', function (error, results, fields) {
//   if (error) throw error;
//   results.forEach(todo => {
//       console.log(todo)
//   });
// });

// connection.end();