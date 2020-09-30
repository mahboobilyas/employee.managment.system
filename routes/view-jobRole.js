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
      res.render("view_jobROle", {
        title: "Employee managment system",
        loginUser: loginUser,
        recods: data,
      });
    });
  });
  
  router.get("/delete/:id", checkloginuser, function (
    req,
    res,
    next
  ) {
    var loginUser = localStorage.getItem("loginUser");
    var jobrole_id = req.params.id;
    var jobrole_delete = jobRolemodel.findByIdAndDelete(jobrole_id);
    jobrole_delete.exec(function (err) {
      if (err) throw err;
      res.redirect("/view-jobRole");
    });
  });
  
  router.get("/edit/:id", checkloginuser, function (req, res, next) {
    var loginUser = localStorage.getItem("loginUser");
    var jobrole_id = req.params.id;
    var jobrole_edit = jobRolemodel.findById(jobrole_id);
    jobrole_edit.exec(function (err, data) {
      if (err) throw err;
      res.render("edit_jobrole", {
        title: "Employee managment system",
        success: "",
        loginUser: loginUser,
        recods: data,
        id: jobrole_id,
      });
    });
  });
  
  router.post("/edit/", checkloginuser, function (req, res, next) {
    var loginUser = localStorage.getItem("loginUser");
    var jobrole_id = req.body.id;
    var jobrole_name = req.body.jobrole;
    var update_jobrole = jobRolemodel.findByIdAndUpdate(jobrole_id, {
      username: jobrole_name,
    });
    update_jobrole.exec(function (err, data) {
      if (err) throw err;
      res.redirect("/view-jobRole");
    });
  });
  module.exports = router;