const express = require('express')
const router = express.Router();
var db =  require('../db/db')
const db2 = require('../models')
var LocationType = db2.tour_type;
var Location = db2.location;

//    //SELECT B.* FROM Titles A INNER JOIN TitleDetails B ON A.id = B.title_id WHERE A.id = 2;

router.get('/locations', (req, res) => {

   console.log("-------------FETCH LOCATIONS-----------------------");

    Location.findAll({
        include: [{

            model: db2.state 
        
        
        } ,
            {

                model: db2.city,


            },
            
            {

                model: db2.location_type, as: "type"


            } ,

            {

                model: db2.location_pic


            },
            {
                model: db2.location_tag, include: [db2.tag]
            }
    ]

    }).then(function name(result) {
        res.json({
            status: 1,
            data: result
        })
    });

})





router.get('/types', (req, res ,  next) => {

    LocationType.findAll().then(function (result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);
    // db.query({
    //     sql: 'SELECT * FROM tour_location_type',
    //     //     timeout: 40000, // 40s
    //     //    nestTables:"_"
    // }, function (error, rows) {
      
    //     if (error) {
    //         res.status(500).json({
    //             "status": false,
    //             "msg": "server error   ,  try again later",
    //         })
    //     }


    //     res.status(200).json({
    //         "status": true,
    //         "data": rows,
    //     })
    //     //     "data": results
    //     // })
    // });


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