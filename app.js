const express = require('express')
const app = express()
const server  = require("http").createServer(app);
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
const multer = require('multer');
const upload = multer({ dest: __dirname + '/photos/users' });
var config = require('./config/keyconfig')
const io = require('socket.io')(server)
//const nodeApiDocGenerator = require('node-api-doc-generator')(app, 'localhost', 8000);
//var photos =  require("./photos/users")
// // tourist facilities
// force: false, alter: true
//force: true


// db.sequelize.sync({ force: false, alter: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });



app.set('socketio', io);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(__dirname, 'public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//middlewares for images
app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));
app.use('/photos/location', express.static('photos/location/'));
app.use('/photos/company', express.static('photos/company/'));
app.use('/photos/users', express.static('photos/users/'));


//routes
var locations = require('./location/location')(io)
app.use('/user', require('./user/user')(io))
app.use('/country' ,  require('./country/country'))
app.use('/location',locations)


app.post('/upload', function (req, res) {

  upload_image(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }

    res.send(req.file);
  });
});
//multer  config 
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    
    callback(null, "./photos/users");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname));
  }
})
var upload_image = multer({
  storage: storage,


  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },

}).single('image');

app.use(device.capture());
dotenv.config()
app.use(auth.initialize());
app.get('/me', (req, res) => {



})

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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




// router.post('/upload/image', imageUpload.single('image'), (req, res) => {
//   res.send(req.file)
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message })
// })


io.on('connection', () => {

  console.log("CONNECTED");
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})