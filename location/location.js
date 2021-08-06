const express = require('express')
const router = express.Router();
var db =  require('../db/db')

//    //SELECT B.* FROM Titles A INNER JOIN TitleDetails B ON A.id = B.title_id WHERE A.id = 2;

router.get('/locations', (req, res) => {

     
    db.query("SELECT B.* FROM location A INNER JOIN location_type B ON A.locatin_id = B.locatin_id   INNER JOIN  tour_location C  on ")

})





router.get('/types', (req, res) => {


    db.query({
        sql: 'SELECT * FROM tour_location_type',
        //     timeout: 40000, // 40s
        //    nestTables:"_"
    }, function (error, rows) {
      
        if (error) {
            res.status(500).json({
                "status": false,
                "msg": "server error   ,  try again later",
            })
        }


        res.status(200).json({
            "status": true,
            "data": rows,
        })
        //     "data": results
        // })
    });


})

router.get('/tags', (req, res) => {


    db.query({
        sql: 'SELECT * FROM tags',
        //     timeout: 40000, // 40s
        //    nestTables:"_"
    }, function (error, rows) {

        if (error) {
            res.status(500).json({
                "status": false,
                "msg": "server error   ,  try again later",
            })
        }


        res.status(200).json({
            "status": true,
            "data": rows,
        })
        //     "data": results
        // })
    });


})


module.exports = router