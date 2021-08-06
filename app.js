const express = require('express')
const app = express()
const db = require("./models");
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

// // tourist facilities
// force: false, alter: true
//force: true
// db.sequelize.sync({ force: false, alter: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//middlewares for images
app.use(express.static(__dirname + '/public'));
app.use('/photos/location', express.static('photos/location/'));
app.use('/photos/company', express.static('photos/company/'));


//routes

app.use('/user' ,  require('./user/user'))
app.use('/country' ,  require('./country/country'))
app.use('/location' ,  require('./location/location'))




app.use(device.capture());
dotenv.config()
app.use(auth.initialize());
app.get('/me', (req, res) => {



})
app.use(function (err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.json({
    status: 0,
    data: err.message
  });
});
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