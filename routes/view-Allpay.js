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
var payrolemodel = payrolemodels.find().populate('employee_name', 'Ename');

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
  payrolemodel.exec(function (err, data) {
    if (err) throw err;
    res.render("view_allpay", {
      title: "Employee managment system",
      loginUser: loginUser,
      recods: data,
    });
  });
});

router.get("/delete/:id", checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem("loginUser");
  var payrole_id = req.params.id
  var pay_delete = payrolemodels.findByIdAndDelete(payrole_id)
  pay_delete.exec(function (err) {
    if (err) throw err;
    res.redirect('/view-Allpay')
  });
});

module.exports = router;