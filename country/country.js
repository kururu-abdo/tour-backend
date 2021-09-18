const express = require('express')
const router = express.Router();
const db =  require('../db/db');
const db2 = require("../models")
var { sequelize } = require("../config/db.config")
const { Op } = require("sequelize");

var country =  db2.country;

/**
 * @api {get} /countries Request User information
 * @apiName countries
 * @apiGroup countries
 *
 * 
 *

 */
    router.get('/countries', (req, res , next) => {


        country.findAll({
            
        }).then(function (users) {
            res.json({
                status: 1,
                data: users
            });
        }).catch(next)

// console.log("inside country")
//  db.query('select * from country ', (err, result) => {

//         if (err) {
//            res.status(500).json({
//                "message" :  "server error  ,  plz try later"
//            })
//         }

     
            

  
//             res.status(200).json({
//                 "status": true,
//                 "data" :  result
//             })


//     })


})

module.exports = router;