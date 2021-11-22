var mysql = require('mysql');


// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'sql4423528',
//     parseJSON: true,

// });

var connection = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5453000',
    password: 'NK26Xz8LaQ',
    database: 'sql5453000',
    parseJSON: true,

});

/*

Username: xfZEcHQfNB

Database name: xfZEcHQfNB

Password: 5Oqvzfjg5S

Server: remotemysql.com

Port: 3306
*/


// var connection = mysql.createConnection({
//     host: 'remotemysql.com',
//     user: 'xfZEcHQfNB',
//     password: '5Oqvzfjg5S',
//     database: 'xfZEcHQfNB',
//     Port: 3306  ,
//     parseJSON: true,
    
// });

connection.connect(function (err) {
    if (err) throw err;

    console.log('Connected to the MySQL server:   '+connection.config.host);
});


 module.exports = connection;


