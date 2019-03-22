var express = require('express');
var StudentInfo = require('../model/student_info_model');
//var StudentAddress = require('../model/student_address_model');
var mongoose = require('mongoose');
var infoRouter = express.Router();
//mongoose.model('studentAddress');

// infoRouter
// .route('/upload')

// .post( function (req, res, next) {
// console.log("multer post");
// var path = '';
// upload(req, res, function (err) {
//    if (err) {
//      // An error occurred when uploading
//      console.log(err);
//      return res.status(422).send("an Error occured")
//    }  
//   // No error occured.
//    path = req.file.path;
//    return res.send("Upload Completed for "+path); 
// }); 
// });
infoRouter
  .route('/studentinfo')

  .post(function (request, response) {
    console.log('POST /studentinfo');
    console.log("data: ",request.body);

var info = new StudentInfo({
  '_id' : new mongoose.Types.ObjectId(),
  'student_name' : request.body.student_name,
  'register_number' : request.body.register_number,
  'mobile_number' : request.body.mobile_number
});

info.save( function (err) {
  console.log(err);
console.log('success post');
response.status(201).send(info);

}
);
    // var address=new StudentAddress({
      
    //   '_id':new mongoose.Types.ObjectId(),
    //   'state': request.body.address.state,
    //   'city': request.body.address.city,
    //   'village' :  request.body.address.village

    //   }
    // );
    
    // address.save(
    //   function (err) {
    //     if (err) console.error(err.stack);
    //     // var s1= new StudentInfo;
    //     // var  info = new StudentInfo({
    //     //     s1.Student_Name = request.body.Student_Name,
    //     //     StudentInfo.Register_Number = request.body.Register_Number,
    //     //     StudentInfo.Mobile_Number = request.body.Mobile_Number,
    //     //     StudentInfo.Address = address._id

    //     // });
    //    var info=new StudentInfo(Object.assign(request.body,{address:address._id,_id:new mongoose.Types.ObjectId()}));
    //    info.save( function (err) {
    //     if (err) console.error(err.stack)
    //   console.log('Success')
    //    response.status(201).send(info);})
    //   }
    // )
    
     
})
       

   
.get(function (request, response) {

    console.log('GET /info');

    StudentInfo.find().exec(function (error, info) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(info);

      response.json(info);
    });
  });

  //get and put data by 
infoRouter
.route('/studentinfo/:studentId')
.get(function (request, response) {

  console.log('GET /info/:studentId', request.params.studentId);

  var studentId = request.params.studentId;

  StudentInfo.findOne({ _id: studentId }).exec( function (error, studentInfo,address) {

    if (error) {
      response.status(500).send(error);
      return;
    }
    // var id = studentInfo.address 
    //   StudentAddress.findOne({ _id:id}).exec ( function (error, studentAddress) {
    //     if (error) {
    //       response.status(500).send(error);
    //       return;
    //     }
    //     console.log(studentAddress);
    //     //var object = Object.assign(studentInfo,studentAddress);
    //     //console.log("combined: "+object);
    //   });
   
    console.log(studentInfo);
    response.setHeader('Access-Control-Allow-Origin','*');

    response.json(studentInfo);

  });
})
.put(function (request, response) {

  console.log('PUT /studentInfo/:studentId');

  var studentId = request.params.studentId;

  StudentInfo.findOne({ _id: studentId }).exec( function (error, studentInfo) {

    if (error) {
      response.status(500).send(error);
      return;
    }

    if (studentInfo) {
        studentInfo.student_name = request.body.student_name;
        studentInfo.register_number = request.body.register_number;
        studentInfo.mobile_number = request.body.mobile_number;
        // StudentInfo.Address.State = request.body.Address.State;
        // StudentInfo.Address.City = request.body.Address.City;
        // StudentInfo.Address.Village = request.body.Address.Village;
      
     //let temp=request.body.Address;
     //studentInfo.Address=temp._id=new mongoose.Types.ObjectId();
     //console.warn("studentInfo.address"+studentInfo.address);
    // let add=new Address(temp);
    //  add.save(function(error){
    //    if(error) response.status(500).send(error);
    //    studentInfo.save();
    //  })
    studentInfo.save();
     console.log(request.body);
      response.setHeader('Access-Control-Allow-Origin','*');

      response.json(studentInfo);
      return;
    }

    response.status(404).json({
      message: 'studentInfo with id ' + studentId + ' was not found.'
    });
  });
})
.patch(function (request, response) {

  console.log('PATCH /studentInfo/:studentId');

  var studentId = request.params.studentId;

  StudentInfo.findOne({ _id: studentId }).exec( function (error, studentInfo) {
    
    if (error) {
      response.status(500).send(error);
      return;
    }

    if (studentInfo) {

      for (var property in request.body) {
        if (request.body.hasOwnProperty(property)) {
          if (typeof studentInfo[property] !== 'undefined') {
            if(property=='address'){
              let temp=request.body[property];
              temp._id=new mongoose.Types.ObjectId();
              let add=new Address(temp);
              add.save(function(err){
               if(err) console.log(err);
               studentInfo[property]=add._id;
              })
            }
            studentInfo[property] = request.body[property];
          }
        }
      }

      console.log(studentInfo);
      studentInfo.save();
       response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
       response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
       response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
       response.setHeader('Access-Control-Allow-Credentials', true);
       response.setHeader('Access-Control-Allow-Origin','*');
      response.json(studentInfo);
      return;
    }

    response.status(404).json({
      message: 'studentInfo with id ' + studentId + ' was not found.'
    });
  });
})
.delete(function (request, response) {

  console.log('DELETE /studentInfo/:studentId');

  var studentId = request.params.studentId;

  StudentInfo.findOne({ Address: studentId }).exec( function (error, studentInfo) {
    
    if (error) {
      response.status(500).send(error);
      return;
    }

    if (studentInfo) {
      Address.findOne({'StudentAddress':StudentInfo.Address}).exec(function(error,address){
        if(error) response.status(500).send(error);
        address.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

     
        });
        StudentInfo.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'studentInfo with id ' + studentId + ' was removed.'
          });
        });
      });
     
    } else {
      response.status(404).json({
        message: 'studentInfo with id ' + studentId + ' was not found.'
      });
    }
  });
});



module.exports=infoRouter;