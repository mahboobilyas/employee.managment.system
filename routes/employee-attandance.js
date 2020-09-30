const express = require("express");
const router = express.Router();
const usermodule = require("../module/user");
const jobRolemodel = require("../module/jobrole");
const employeemodels = require("../module/employee");
const payrolemodels = require("../module/pay_role");
const attandancemodels = require("../module/attandance");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  getallemployee.exec(function (err, data) {
    if (err) throw err;
    res.render("employee_attandance", {
      title: "Employee managment system",
      loginUser: loginUser,
      recods: data,
      success: "",
    });
  });
});

router.post("/", checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem("loginUser");
  var emp_name = req.body.attandance_details;
  console.log('body', req.body);
  console.log('attendence', emp_name);
  var emp_detail = new attandancemodels({
    username: emp_name,
  });

  emp_detail.save(function (err, doc) {
    getallemployee.exec(function (err, data) {
      console.log(data)
      if (err) throw err;
      res.render("employee_attandance", {
        title: "Employee managment system",
        loginUser: loginUser,
        recods: data,
        success: "employee attandance inserted successfully",
      });
    });
  });
});


module.exports = router;