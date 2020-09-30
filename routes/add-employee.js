var express = require("express");
var router = express.Router();
var usermodule = require("../module/user");
var jobRolemodel = require("../module/jobrole");
var employeemodels = require("../module/employee");
var payrolemodels = require("../module/pay_role");
var attandancemodels = require("../module/attandance");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { request } = require("express");

var getjobrole = jobRolemodel.find({});
var getallemployee = employeemodels.find({});
var payrolemodel = payrolemodels.find({});

function checkloginuser(req, res, next) {
  var usertoken = localStorage.getItem("usertoken");
  try {
    var decoded = jwt.verify(usertoken, "logintoken");
  } catch (err) {
    res.redirect("/");
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

function checkemail(req, res, next) {
  var email = req.body.email;
  var exitemail = usermodule.findOne({ email: email });
  exitemail.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render("signup", {
        title: "Employee managment system",
        msg: "Email already exit",
      });
    }
    next();
  });
}
function checkusername(req, res, next) {
  var username = req.body.username;
  var exitemail = usermodule.findOne({ username: username });
  exitemail.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render("signup", {
        title: "Employee managment system",
        msg: "username already exit",
      });
    }
    next();
  });
}
router.get("/", checkloginuser, function (req, res, next) {
    var loginUser = localStorage.getItem("loginUser");
    getjobrole.exec(function (err, data) {
      if (err) throw err;
      res.render("add_employee", {
        title: "Employee managment system",
        loginUser: loginUser,
        recods: data,
        success: "",
      });
    });
  });
  
  router.post("/", checkloginuser, function (req, res, next) {
    var loginUser = localStorage.getItem("loginUser");
  
    var employee_name = req.body.employeename;
    var employee_email = req.body.email;
    var employee_number = req.body.number;
    var employee_gender = req.body.gender;
    var employee_city = req.body.city;
    var employee_adress = req.body.Adress;
    var employee_salery = req.body.salery;
    var role_detail = req.body.role_details;
    var employee_details = new employeemodels({
      Ename: employee_name,
      Eemail: employee_email,
      Enumber: employee_number,
      gender: employee_gender,
      city: employee_city,
      Eadress: employee_adress,
      Esalery: employee_salery,
      job: role_detail,
    });
  
    employee_details.save(function (err, data) {
      console.log(employee_details);
      getjobrole.exec(function (err, data) {
        if (err) throw err;
        res.render("add_employee", {
          title: "Employee managment system",
          loginUser: loginUser,
          recods: data,
  
          success: "employee details inserted successfully",
        });
      });
    });
  });
  module.exports = router;