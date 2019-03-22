const express = require('express');
var mongoose = require('mongoose');

//require the express router
var router = express.Router();
const app = express();
//const path = require('path');
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
    res.json({"message":"Welcome to task node project"});
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



module.exports = app;