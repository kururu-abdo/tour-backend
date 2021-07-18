var mysql = require('mysql');



var connection = mysql.createConnection({
    host: 'sql4.freemysqlhosting.net',
    user: 'sql4423528',
    password: 'lV6tfxCgF8',
    database: 'sql4423528', 
    parseJSON: true,
    
});

connection.connect(function (err) {
    if (err) throw err;

    console.log('Connected to the MySQL server.');
});


module.exports = connection;