var express = require("express");
var router = express.Router();
var employeemodels = require("../../module/employee");
const mongoose = require("mongoose");
// var checkAuth = require("../api/middleware/auth")


exports.getallemployee = function (req, res, next) {
    employeemodels
      .find()
      .select("_id Ename Eemail Enumber gender city Eadress Esalery job")
      .populate("job", "-_id username")
      .exec()
      .then((data) => {
        res.status(200).json({
          message: "ok",
          result: data,
        });
      })
      .catch((err) => {
        res.json(err.message);
      });
  }

  exports.postallemployee =  function (req, res, next) {
    var employee_name = req.body.employeename_key;
    var employee_email = req.body.email_key;
    var employee_number = req.body.number_key;
    var employee_gender = req.body.gender_key;
    var employee_city = req.body.city_key;
    var employee_adress = req.body.Adress_key;
    var employee_salery = req.body.salery_key;
    var role_detail = req.body.role_details_key;
    var employee_details = new employeemodels({
      _id: mongoose.Types.ObjectId(),
      Ename: employee_name,
      Eemail: employee_email,
      Enumber: employee_number,
      gender: employee_gender,
      city: employee_city,
      Eadress: employee_adress,
      Esalery: employee_salery,
      job: role_detail,
    });
    employee_details.save().then((doc) => {
      res.status(201)
        .json({
          message: "inserted successfully",
          result: doc,
        })
        .catch((err) => {
          res.json(err);
        });
    });
  }

  exports.delallemployee = function (req, res, next) {
    id = req.body._id;
    employeemodels
      .findByIdAndRemove(id)
      .then((data) => {
        res.status(200).json({
          message: "deleted",
          result: data,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }