const express = require('express')
const app = express()
//const db = require("./models");
const path =  require('path');
var device = require('express-device');
var geoip = require('geoip-lite');
const dotenv = require("dotenv")
let jwt = require('jwt-simple');
const user = require('./controllers/user/userController');

var bodyParser = require('body-parser')
var auth = require('./config/passport')()
const router = express.Router();

var config = require('./config/keyconfig')

//// tourist facilities
//force: false, alter: true
// db.sequelize.sync({ force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user' ,  require('./user/user'))
app.use('/country' ,  require('./country/country'))
app.use(device.capture());
dotenv.config()
app.use(auth.initialize());
app.get('/me', (req, res) => {



})

//db.sequelize.sync();
router.get('/' ,  (req,res)=>{
  res.sendFile(path.join(__dirname + '/index.html'));
})
app.use('/', router);

app.get('/all', (req, res) => {
  user.findAll(req,res);

})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})