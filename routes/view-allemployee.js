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
var getallemployee = employeemodels.find({}).populate('job','username');
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
    var perPage = 3;
      var page = req.params.page || 1;
  
  getallemployee.skip((perPage * page) - perPage)
  .limit(perPage).exec(function(err,data){
    if (err) throw err;
    employeemodels.countDocuments({}).exec((err,count)=>{   
    res.render("view_allemployee", {
      title: "Employee managment system",
      loginUser: loginUser,
      recods: data,
        current: page,
        pages: Math.ceil(count / perPage) 
    });
  });
});
});

router.get("/:page", checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem("loginUser");
  var perPage = 3;
    var page = req.params.page || 1;

getallemployee.skip((perPage * page) - perPage)
.limit(perPage).exec(function(err,data){
  if (err) throw err;
  employeemodels.countDocuments({}).exec((err,count)=>{   
  res.render("view_allemployee", {
    title: "Employee managment system",
    loginUser: loginUser,
    recods: data,
      current: page,
      pages: Math.ceil(count / perPage) 
  });
});
});
});

router.get("/delete/:id", checkloginuser, function (
  req,
  res,
  next
) {
  var loginUser = localStorage.getItem("loginUser");
  var employee_id = req.params.id;
  var emp_del = employeemodels.findByIdAndDelete(employee_id);
  console.log(employee_id);
  emp_del.exec((err) => {
    if (err) throw err;
    res.redirect("/view-allemployee");
  });
});

router.get("/edit/:id", checkloginuser, function (
  req,
  res,
  next
) {
  var loginUser = localStorage.getItem("loginUser");
  var employee_id = req.params.id;
  var emp_details = employeemodels.findById(employee_id);
  emp_details.exec((err, doc) => {
    if (err) throw err;
    getjobrole.exec(function (err, data) {
      res.render("edit_employee", {
        title: "Employee managment system",
        loginUser: loginUser,
        success: "",
        recod: doc,
        recods: data,
        id: employee_id,
      });
    });
  });
});

router.post("/edit/", checkloginuser, function (
  req,
  res,
  next
) {
  var loginUser = localStorage.getItem("loginUser");
  var employee_id = req.body.id;
  var employee_name = req.body.employeename;
  var employee_email = req.body.email;
  var employee_city = req.body.city;
  var employee_jobrole = req.body.role_details;
  var update_employee = employeemodels.findByIdAndUpdate(employee_id, {
    Ename: employee_name,
    Eemail: employee_email,
    city: employee_city,
    job: employee_jobrole,
  });

  update_employee.exec(function (err, data) {
    if (err) throw err;
    res.redirect("/view-allemployee");
  });
});

  module.exports = router;