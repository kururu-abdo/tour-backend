const express = require('express')
const router = express.Router();
var db = require('../db/db')
const db2 = require('../models')
var LocationType = db2.tour_type;
var Location = db2.location;
var TourLocation = db2.tour_location;
var Facilitate_location = db2.tour_facilitate_location;
var workTimes =  db2.work_time;
var Facilitate = db2.facilitate_location;
const day = db2.day;
const { sequelize } = require("../config/db.config");
const { Op } = require("sequelize");
const { json } = require('express');


router.get("/" , (req , res , next)=>{

    LocationType.findAll().then(function (result) {
        res.render('location', {
            order: result 
        })
    }).catch(next);
  
})


  


router.get('/near', (req, res, next) => {

    var lat = req.query.lat;
    var lon = req.query.lon;
    var range= req.query.range||10;

    const query2 = `SELECT location_id ,  location_en_name , location_ar_name, lat, lng, ((ACOS(SIN(${lat} * PI() / 180) * SIN(lat * PI() / 180) + COS(${lat} * PI() / 180) * COS(lat * PI() / 180) * COS((${lon} - lng) * PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344) as distance FROM locations HAVING distance <= ${req.query.range} ORDER BY distance ASC`;
    const nearByMeQuery = `SELECT location_id ,  location_en_name , location_ar_name, lat, lng, ((ACOS(SIN(lat * PI() / 180) * SIN(${lat} * PI() / 180) + COS(lat * PI() / 180) * COS(${lat} * PI() / 180) * COS((lng - ${lon}) * PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344)  AS distance FROM locations HAVING    distance > ' +  10 + ' ORDER BY distance`;
    sequelize.query(


  query2

       // nearByMeQuery
        , {
        model: Location,
        mapToModel: true, // pass true here if you have any mapped fields ,

    }


    )
        .then(function name(result) {
            res.json({
                status: 1,
                data: result
            })
        }).catch(next);




    //     Location.findAll({

    //         attributes:


    //         {


    //                 //  SELECT 
    //             //    SQRT(POW(69.1 * (lat - ' + ${req.query.lat} + '), 2) + POW(69.1 * (' + ${req.query.lon} + ' - lng) * COS(lat / 57.3), 2))
    //             include: [
    //                 [
    //                     sequelize.literal(`(



    // )`), 'distance',


    //                 ] ,


    //             ] ,

    //             where : {
    //                 distance: 100
    //             }
    //         },



    //         include: [




    //             {

    //                 model: db2.state


    //             },
    //             {

    //                 model: db2.city,


    //             },

    //             {

    //                 model: db2.location_type, as: "type",
    //                 inclue: [
    //                     db2.tour_location,

    //                 ]




    //             },

    //             {

    //                 model: db2.location_pic


    //             },
    //             {
    //                 model: db2.location_tag, include: [db2.tag]
    //             }

    //         ],
    //         order: sequelize.literal('distance'),

    //         where:{

    //         }

    //     }).then(function name(result) {
    //         res.json({
    //             status: 1,
    //             data: result
    //         })
    //     }).catch(next);

})


router.get('/work_times/:id', (req, res, next) => { 
  var id = req.param("id");
    workTimes.findAll({

       include:[
           {
               model:day
           }
       ],
        where :  {
            facilitateLocationFcilitateLocId :  id
        }
    }).then(function name(result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);


 })


router.get('/types', (req, res, next) => {

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
    var io = req.app.get('socketio');

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






});
router.get("/facilitate", (req, res, next) => {
    var location_id = req.param("location_id");
    var type = req.param("type");
    console.log("---------------------FETCH FACILITATE LOCATIONS-------------------------");
    Facilitate_location.findAll({
       
        include: [
          

            // {
            //     model: db2.location,

            // },
            {
                model: db2.facilitate_location ,
            //     include:[ 
            //         {
            //             model : db2.facilitate_location_type ,
                    
            //           where :{
            //               type_id: type
            //           }
            //         }
            //    ]
            } ,
            {
                model: db2.facilitate_location_type,

            }

            //     // include: [

            //     //     {

            //     //         model: db2.state


            //     //     },
            //     //     {

            //     //         model: db2.city,


            //     //     },

            //     //     {

            //     //         model: db2.location_type, as: "type",
            //     //         inclue: [
            //     //             db2.tour_location,

            //     //         ]




            //     //     },] ,
            //     }  ,




        ],



        where: {
            location_id: location_id,
            type_id  :  type
            
        }


    }

    ).then(function (result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next)






})


router.get("/facilitate_loc", (req, res, next) =>{

Facilitate.findAll({

    incluede: [


        {
            model: db2.facilitate_location_type,

        }

    
    
    ]


})

.then(function (result) {
    res.json({
        status: 1,
        data: result
    });


}).catch(next);


})



router.get("/get_location", (req, res, next) => {
    Location.findAll({
        attributes: {
            inclued: [

                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS reaction
                    WHERE
                        reaction.location_id = locations.location_id
                      
                )`),
                    'likes'
                ],




                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS like
                    WHERE
                        locations.location_id = like.location_id
                      
                )`),
                    'likes'
                ],
            ]
        },
        // order: [
        //     [sequelize.literal('likes'), 'DESC']
        // ] ,
        include: [



            {

                model: db2.state


            },
            {

                model: db2.city,


            },

            {

                model: db2.tour_type, as: "type",




            },

            {

                model: db2.location_pic


            },
            {
                model: db2.location_tag, include: [db2.tag]
            },



            // {
            //     model: db2.like,

            // },

            // {
            //     model: db2.rank,
            //     inclue: [
            //         {
            //             model: db2.user
            //         }
            //     ]

            // }









        ],

where: {
    location_id :  req.query.id
}

    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next)


})



router.get("/tour", (req, res, next) => {
    Location.findAll({
        attributes: {
            inclued: [

                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS reaction
                    WHERE
                        reaction.location_id = locations.location_id
                      
                )`),
                    'likes'
                ],




                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS like
                    WHERE
                        locations.location_id = like.location_id
                      
                )`),
                    'likes'
                ],
            ]
        },
        // order: [
        //     [sequelize.literal('likes'), 'DESC']
        // ] ,
        include: [



            {

                model: db2.state


            },
            {

                model: db2.city,


            },

            {

                model: db2.tour_type, as: "type",




            },

            {

                model: db2.location_pic


            },
            {
                model: db2.location_tag, include: [db2.tag]
            },



            // {
            //     model: db2.like,

            // },

            // {
            //     model: db2.rank,
            //     inclue: [
            //         {
            //             model: db2.user
            //         }
            //     ]

            // }









        ],



    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next)


})
router.get("/likes", (req, res, next) => {
    var id = req.param("id");
    db2.like.count({
        where: {
            location_id: {
                [Op.eq]: id
            }
        }
    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
})
router.get("/ilikeit", (req, res, next) => {
    var id = req.param("id");
    var user =  req.param("user_id");
    db2.like.count({
        where: {
            location_id: {
                [Op.eq]: id
            } ,
            user_id:{
                [Op.eq]: user
            }
        }
    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
})




router.get("/rating", async (req, res, next) => {
    var id = req.param("id");
   



    var totalRanks = await db2.rank.count({
        where: {
            location_id: {
                [Op.eq]: id
            }
        }
    });

    db2.rank.sum('rank', {
        attributes: {
            include: [

                sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM ranks AS rank
                    WHERE
                         rank.location_id=${id}
                      
                )`),
                'total'
            ]

        },
        where: {
            location_id: {
                [Op.eq]: id
            }
        }
    }).then(function (result) {
        res.json({
            status: 1,
            data: { "total": result, "total_users": totalRanks }
        });
    }).catch(next);
})
router.post("/rank", (req, res, next) => {
   
    var user = req.body.user_id;
    var location_id = req.body.location_id;
    var rate = req.body.rate;

    const sql = `  REPLACE INTO ranks 
    (user_id ,location_id  , rank) 
      VAlUES (${user} ,${location_id} , ${rate})`;
   

    sequelize.query(

        sql ,{
      //  'INSERT or  REPLACE INTO ranks (user_id ,location_id  , rank)   VAlUES (:id ,:user , :rank)   ', {
       
        type: sequelize.QueryTypes.INSERT ,
       
    //    replacements: { id: location_id,  user: user , rank: rate },
       
    })

    // db2.rank.create({
    //     user_id: user,
    //     location_id: location_id,
    //     rank: rate
    // })
    
    .then(function (result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);


})

router.post("/like", (req, res, next) => {
    var io = req.app.get('socketio');

    var user = req.body.user_id;
    var location_id = req.body.location_id;
  
    sequelize.query('  REPLACE INTO likes(user_id ,location_id  )   VAlUES(:user ,  :id  )   ', {
        replacements: { id: location_id, user: user },
        type: sequelize.QueryTypes.INSERT
    })
  
    // db2.like.create({
    //     user_id: user,
    //     location_id: location_id
    // })
    
    .then((result)=>{
   
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);



})

router.post("/comment", (req, res, next) => {
    var user = req.body.user_id;
    var location_id = req.body.location_id;
    var comment = req.body.comment;

    db2.comment.create({
        userUserId: user,
        locationLocationId: location_id,
        comment: comment,
        time: Date.now()
    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);



})


router.get("/comments/:id", (req, res, next) => {
    var id = req.param("id");

    db2.comment.findAll({
        include: [



            {

                model: db2.user


            },
           
        ],
        where: {
            locationLocationId: id
        }
    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);



})






router.get("/comments", (req, res, next) => {
    

    db2.comment.findAll({
        
        include: [



            {

                model: db2.user,  
                include :[
                  { model: db2.country, as:"country"}

                ]

            } ,
            {
                model: db2.location
            }
            

        ],
        
                
    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);



})





router.get('/location', (req, res, next) => {



    console.log("-------------FETCH LOCATIONS-----------------------");

    Location.findOne({
        attributes: {
            inclued: [

                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS reaction
                    WHERE
                        reaction.location_id = locations.location_id
                      
                )`),
                    'likes'
                ],




                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS like
                    WHERE
                        locations.location_id = like.location_id
                      
                )`),
                    'likes'
                ],
            ]
        },
        // order: [
        //     [sequelize.literal('likes'), 'DESC']
        // ] ,
        include: [



            {

                model: db2.state


            },
            {

                model: db2.city,


            },

            {

                model: db2.tour_type, as: "type",




            },

            {

                model: db2.location_pic


            },
            {
                model: db2.location_tag, include: [db2.tag]
            },



            // {
            //     model: db2.like,

            // },

            // {
            //     model: db2.rank,
            //     inclue: [
            //         {
            //             model: db2.user
            //         }
            //     ]

            // }









        ],
        where: {
            location_id: req.param("id")
        }

    }).then(function name(result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);

})


router.get('/filter', (req, res, next) => {
    console.log("-------------FETCH LOCATIONS-----------------------");
    var types = req.query.types || [];
    var filters = JSON.parse(types);



    
    Location.findAll({
        include: [

            {

                model: db2.state


            },
            {

                model: db2.tour_type, as: "type",




            },
            {

                model: db2.city,


            },





            // },

            {

                model: db2.location_pic


            },
            {
                model: db2.location_tag, include: [db2.tag],

            }
        ],
        where: {
            tourLocationTypeTypeId: { [Op.in]: filters }
        }

    }).then(function name(result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);

})






router.get('/types', (req, res, next) => {

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

router.get("/search", (req, res, next) => {

    Location.findAll({
        attributes: {
            inclued: [

                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS reaction
                    WHERE
                        reaction.location_id = locations.location_id
                      
                )`),
                    'likes'
                ],




                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM likes AS like
                    WHERE
                        locations.location_id = like.location_id
                      
                )`),
                    'likes'
                ],
            ]
        },
        // order: [
        //     [sequelize.literal('likes'), 'DESC']
        // ] ,
        include: [



            {

                model: db2.state


            },
            {

                model: db2.city,


            },

            {

                model: db2.tour_type, as: "type",




            },

            {

                model: db2.location_pic


            },
            {
                model: db2.location_tag, include: [db2.tag]
            },



            // {
            //     model: db2.like,

            // },

            // {
            //     model: db2.rank,
            //     inclue: [
            //         {
            //             model: db2.user
            //         }
            //     ]

            // }









        ],

        where: {
            [Op.or]: [
                { location_ar_name: { [Op.substring]: `${req.param("loc")}` } },

                { location_en_name: { [Op.substring]: `${req.param("loc")}` } }


            ],
        }

    }).then(function (result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next)

})

router.get("/facilitate_types" ,  (req , res,next)=>{
    db2.facilitate_location_type.findAll({})
        .then(function (result) {
            res.json({
                status: 1,
                data: result
            })
        }).catch(next)
        
        
})




const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

module.exports = function (io) {

    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        socket.on('admin', function () {
            console.log('Successful Socket Test');
        });
        socket.on("like", (data) => {

            //  io.emit("update" ,    )
        })
        //End ON Events
        socket.on("comment", data => {


        })
    });
    return router;
};



// module.exports = router
// module.exports =(io)=>{
//     io.on('connection', function (socket) {
//         console.log("connected");
//         socket.on('message', function (message) {
//             socket.emit('ditConsumer', message.value);
//             console.log('from console', message.value);
//         });
//     });
// }