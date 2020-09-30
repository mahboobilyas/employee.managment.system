var jobRolemodel = require("../../module/jobrole");
var getjobrole = jobRolemodel.find({});
const mongoose = require("mongoose");

exports.getalljobrole = (err, res, next)=> {
    
    getjobrole
      .exec()
      .then((data) => {
        res.status(200).json({
          message: "success",
          result: data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  };
  
  exports.postalljobrole = function (req, res, next) {
    var jobrole = req.body.jobrole_key;
    var job_role_detail = new jobRolemodel({
      username: jobrole,
    });
    // job_role_detail.save(function (err, data) {
    //   //if (err) throw err;
    //   // res.send("successfuly inserted");
    //   res.status(201).json({
    //     message:'data interted successfully',
    //     result:data
    //   })
    // });
    //-----------validation path require and duplcate----------------
    job_role_detail
      .save()
      .then((data) => {
        res.status(201).json({
          message: "data interted successfully",
          result: data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }


  exports.putalljobrole = function (req, res, next) {
    var id = req.params.id;
    var jobrole = req.body.jobrole_key;
    jobRolemodel.findById(id, function (err, data) {
      data.username = jobrole ? jobrole : data.username;
      // data.save(function (err, doc) {
      //   if (err) throw err;
      //   // res.send("data updated successfully in put mathod");
      //   res.status(201).json({
      //     message: "data put and update successfully",
      //     result: doc,
      //   });
      // });
  
      //----------------validation and duplicate-------------
      data
        .save()
        .then((doc) => {
          res.status(201).json({
            message: "data put and update successfully",
            result: doc,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    });
  }

  exports.patchalljobrole =  async function (req, res, next) {
    try {
      var id = req.body.id;
      var jobrole = req.body.jobrole_key;
      // jobRolemodel.findOneAndUpdate({ _id: id }, {
      //   $set: {
      //     username: jobrole
      //   }
      // }, function (err, data) {
      //   data
      //     .save()
      //     .then((doc) => {
      //       res.status(201).json({
      //         message: "data put and update successfully",
      //         result: doc,
      //       });
      //     })
      //     .catch((err) => {
      //       res.json(err);
      //     });
      // });
  
      const result = await jobRolemodel.findOneAndUpdate({ _id: id }, {
        $set: {
          username: jobrole
        }
      }, { new: true });
      res.status(201).json({
        message: "data put and update successfully",
        result: result,
      });
    } catch (error) {
      res.json(error.message);
    }
  
  }

  exports.deletealljobrole = function (req, res, next) {
    var id = req.body._id;
    // jobRolemodel.findByIdAndDelete(id, function (err, doc) {
    //   if (err) throw err;
    //   // res.send("recod deleted successfully");
    //   res.status(201).json({
    //     message: "data deleted successfully",
    //     result: doc,
    //   });
    // });
    jobRolemodel
      .findByIdAndDelete(id)
      .then((doc) => {
        res.status(201).json({
          message: "data deleted successfully",
          result: doc,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  };