const express = require('express')
const router = express.Router();
var db =  require('../db/db')

//    //SELECT B.* FROM Titles A INNER JOIN TitleDetails B ON A.id = B.title_id WHERE A.id = 2;

router.get('/locations', (req, res) => {

     
    db.query("SELECT B.* FROM location A INNER JOIN location_type B ON A.locatin_id = B.locatin_id   INNER JOIN  tour_location C  on ")

})



module.exports = router