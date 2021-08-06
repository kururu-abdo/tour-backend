const express = require('express')
const router = express.Router();
const db = require('../db/db')
const db2 = require('../models')
var { sequelize }  =  require("../config/db.config")
const { Op } = require("sequelize");

// var User = sequelize.import("../models/user")
var User = db2.user;


router.post('/signup', (req, res ,  next) => {

    //get data  from user 



    //SELECT B.* FROM Titles A INNER JOIN TitleDetails B ON A.id = B.title_id WHERE A.id = 2;


    var name = req.param('user_name');
    var phone = req.param('phone')
    var email = req.param('email')

    var password = req.param('password')
    var address = req.param('address')

    var country = req.param('country_id')
   
        
    User.create ({
    user_name: name,
    email :  email ,
    phone :phone ,
    password: password ,
    address : address ,
    country_id : country ,
        userTypeTypeId:1

    }).then(function (result) {
        res.json({
            status:1, 
            data: result
        })
    }).catch(next);

    //send data to mysql

    // db.query('insert into   user  (user_name         ,password ,phone ,address,  email   ,  country_id  )  values (? ,? ,? ,?, ?,?)', [
    //     name, password, phone, address, email, country

    // ],

    //     (err, result) => {


    //         if (err) {

    //             console.log(err)
    //             if (err.code == 1062) {
    //                 res.status(403).json({
    //                     "status": false,
    //                     "message": "phone number already taken"
    //                 })
    //             }
    //             res.status(403).json({
    //                 "status": false,
    //                 "message": "server error"
    //             })

    //         }

    //         console.log(result)
    //         res.status(200).json({
    //             "status": true,
    //             "msg": "signup done succesfullty ",
    //         })


    //     })




});
router.get('/users', (req, res ,  next) => {
    User.findAll({
        include: [{
         
            model: db2.userType, as:"user_type"
            

        } ,{
            model: db2.country, as: "country",
        }]
    }).then(function (users) {
        res.json({
            status: 1,
            data: users
        });
    }).catch(next);

})

router.get('/all', async (req, res) => {


    db.query({
        sql: 'select A.* ,  B.*    from user A  RIGHT    JOIN country  B   on A.country_id=B.country_id',
    //     timeout: 40000, // 40s
    //    nestTables:"_"
    }, function (error, rows) {
        var result = [], index = {};
        if (error) {
            throw error
        }

console.log(rows.length);
        rows.forEach(row => {
          

            if (!(row.user_id in index)) {
                console.log(row.country_code);
                index[row.user_id] = {
                    user_id: row.user_id,
                    name: row.user_name,
                    address: row.address,
                    phone: row.phone,
                    email: row.email,
                    password: row.password,

                    country: {

                        id: row.country_id,
                        ar_name: row.country_ar_name,
                        en_name: row.county_en_name
                    }

                };



                result.push(index[row.user_id])
            }

            // index[row.user_id].country = {
            //     id: row.country_id,
            //     ar_name: row.country_ar_name,
            //     en_name: row.county_en_name
            // }
        });

        console.log(result);
        // res.status(200).json({

        //     "data": results
        // })
    });













    // db.query('select A.* ,  B.*    from user A    join country  B ', (error, results) => {
    //     var result = [], index = {};


    //     if (error) {
    //         throw error
    //     }


    //     results.forEach(row => {
    //         console.log("///////");
    //         console.log(row.country_code);
    //         console.log("********");

    //         if (!(row.user_id in index)) {
    //             index[row.user_id] = {
    //                 user_id: row.user_id,
    //                 name: row.user_name,
    //                 address: row.address,
    //                 phone: row.phone,
    //                 email: row.email,
    //                 password: row.password,

    //                 country: {

    //                     // id: row.country_id,
    //                     // ar_name: row.country_ar_name,
    //                     // en_name: row.county_en_name
    //                 }

    //             };



    //             result.push(index[row.user_id])
    //         }

    //         index[row.user_id].country = {
    //             id: row.country_id,
    //             ar_name: row.country_ar_name,
    //             en_name: row.county_en_name
    //         }
    //     });

    //     console.log(result);
    //     // res.status(200).json({

    //     //     "data": results
    //     // })


    // })
})

router.get('/login', async (req, res , next) => {

    //get user data
    var phone = req.query.phone ||"";
    var password = req.query.password ;
    var email = req.query.email || "";

    console.log(phone)
    //send data to mysql

    User.findAll({
        where: {
            password: password ,

        //     phone: phone
        //  ,
            [Op.or]: [
                { phone: phone },
                { email: email }
            ]
            
        } ,
        include: [{

            model: db2.userType, as: "user_type"


        }, {
            model: db2.country, as: "country",
        }]
    }).then(function (result) {
        if (result.length>0) {
            res.json({
                status: 1,
                data: result
            })
        } else {
            res.json({
                status: -1,
                data: "Wrong phone/password"
            })
        }
       
        
    }).catch(next);
    
    



//     db.query({
//         sql: 'select A.* ,  B.*  from user A RIGHT JOIN country B on  A.country_id=B.country_id   WHERE  A.phone =? AND A.password =?',
//         //     timeout: 40000, // 40s
//         values: [phone, password]
//         //    nestTables:"_"
//     }, function (error, rows) {
//         console.log(error);
//         var result = [], index = {};
//         if (error) {
//             res.status(500).json({
//                 "message": "server error  ,  plz try later"
//             })
//         }

//         console.log(rows);
// if(rows.length>0){

//     rows.forEach(row => {
//         if (!(row.user_id in index)) {
//             index[row.user_id] = {
//                 user_id: row.user_id,
//                 name: row.user_name,
//                 address: row.address,
//                 phone: row.phone,
//                 email: row.email,
//                 password: row.password,

//                 country: {

//                     country_id: row.country_id,
//                      country_ar_name: row.country_ar_name,
//                      country_en_name: row.county_en_name ,
//                     country_code:  row.country_code
//                 }

//             };



//             result.push(index[row.user_id])
//         }

//         // index[row.user_id].country = {
//         //     id: row.country_id,
//         //     ar_name: row.country_ar_name,
//         //     en_name: row.county_en_name
//         // }
//     });

//     res.status(200).json({
//         "status": true,
//         "msg": "login done succesfullty ",
//         "data": result
//     })

// }else{
//     res.status(404).json({
//         "status": false,
//         "msg": "password/email not correct"
//     })
// }



     
//         // res.status(200).json({

//         //     "data": results
//         // })
//     });
























    




})


module.exports = router