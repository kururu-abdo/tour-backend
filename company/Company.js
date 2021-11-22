const express = require('express')
const router = express.Router();

const db2 = require('../models')
var LocationType = db2.tour_type;
var company = db2.company;

const day = db2.day;
const { sequelize } = require("../config/db.config");
const { Op } = require("sequelize");



router.get("/companies", (req, res, next) => {

    company.findAll().then(function (result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);

})


router.get("/companies/:id", (req, res, next) => {
    var id = req.params.id

    company.findAll({
        where:{
            id: id
        }
    }).then(function (result) {
       res.json({
           status :1, 
           data: result
       })
    }).catch(next);

})



module.exports = router;