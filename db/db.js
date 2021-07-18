var mysql = require('mysql');



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sql4423528', 
    parseJSON: true,
    
});

connection.connect(function (err) {
    if (err) throw err;

    console.log('Connected to the MySQL server.');
});


module.exports = connection;