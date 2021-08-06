const Sequelize = require('sequelize');
const sequelize = new Sequelize('tourbackend', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

//测试数据库链接
sequelize.authenticate().then(function() {
    console.log("数据库连接成功");
}).catch(function(err) {
    //数据库连接失败时打印输出
    console.error(err);
    throw err;
});

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;

// module.exports = {
//     // HOST: "remotemysql.com",
//     // USER: "xfZEcHQfNB",
//     // PASSWORD: "5Oqvzfjg5S",
//     // DB: "xfZEcHQfNB",
//     // dialect: "mysql",
//     // pool: {
//     //     max: 5,
//     //     min: 0,
//     //     acquire: 30000,
//     //     idle: 10000
//     // }


//  HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "tourbackend",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }


// };