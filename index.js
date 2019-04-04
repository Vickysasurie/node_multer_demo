const express = require('express');
var mongoose = require('mongoose');

//require the express router
var router = express.Router();
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
//var db = require('./database');
var infoRouter = require('./api/router/student_info_router');

var db = require('./database');
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
const student_info = require('./api/router/student_info_router');
var cors = require('cors');
//app.use(express.static(path.join(_dirname, '/dist/demo-file')));
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
}); 
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');
mongoose.connect(db.db);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));




db.once('open', () =>{
 console.log('connected to a database');   
                  
});

//global._basedir = _dirname;
app.get('/', (req,res) => {
    //for send file to view
    //res.sendFile("Welcome to task node project");
    //for send text
    // res.json({"message":"Welcome to task node project"});
    res.send('Hello all! Welcome to test app node js');
});

app.use(cors()); 
app.use('/api', infoRouter);

//our file upload function.
app.post('/', function (req, res, next) {
    console.log("multer post");
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       path = req.file.path;
       return res.send("Upload Completed for "+path); 
 });     
})
var qr = require('qr-image');
app.post('/qr', function(req,res,next){
  var arr=[]
  //var arr = req.query.value
console.log(req.body.value);
req.body.value.forEach((a)=>{
  
 
  arr.push( qr.image(a));

})
  
  res.setHeader('Content-type', 'application/octet-stream');  //sent qr image to client side
  res.set("Content-Dispostion", "attachment;filename = google.png");
  res.writeHead(200, {'Content-Type': 'image/png'}); //for image display as qr
  img.pipe(res);
  
  });
  app.use(express.static(path.join(__dirname, 'image')));
  var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './image/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage });

  app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
  });

module.exports = app;