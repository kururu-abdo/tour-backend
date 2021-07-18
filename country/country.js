const express = require('express')
const router = express.Router();
const db =  require('../db/db');
router.get('/countries', (req, res) => {




console.log("inside country")
 db.query('select * from country ', (err, result) => {

        if (err) {
           res.status(500).json({
               "message" :  "server error  ,  plz try later"
           })
        }

     
            

  
            res.status(200).json({
                "status": true,
                "data" :  result
            })


    })


})

module.exports = router;