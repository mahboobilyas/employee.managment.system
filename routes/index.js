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
var attandance = attandancemodels.find({});

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

// ---------------------------------------------------------------------------------------
/* GET home page. */
router.get("/", function (req, res, next) {
  var loginUser = localStorage.getItem("loginUser");
  if (loginUser) {
    res.redirect("/dashboard");
  } else {
    res.render("index", { title: "Employee managment system", msg: "" });
  }
});
router.post("/", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var checkUser = usermodule.findOne({ username: username });
  checkUser.exec((err, data) => {
    if (err) throw err;

    var getUserid = data._id;
    var getpassword = data.password;
    if (bcrypt.compareSync(password, getpassword)) {
      var token = jwt.sign({ userID: getUserid }, "logintoken");
      localStorage.setItem("usertoken", token);
      localStorage.setItem("loginUser", username);
      res.redirect("./dashboard");
    } else {
      res.render("index", {
        title: "Employee managment system",
        msg: "invalid username or password",
      });
    }
  });
});
// ------------------------------------------------------------------------------------
router.get("/signup", function (req, res, next) {
  var loginUser = localStorage.getItem("loginUser");
  if (loginUser) {
    res.redirect("/dashboard");
  } else {
    res.render("signup", { title: "Employee managment system", msg: "" });
  }
});

router.post("/signup", checkusername, checkemail, function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirmpassword = req.body.confirm_password;
  if (password != confirmpassword) {
    res.render("signup", {
      title: "Employee managment system",
      msg: "password not match",
    });
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var userDetail = new usermodule({
      username: username,
      email: email,
      password: password,
    });
    userDetail.save((err, doc) => {
      if (err) throw err;
      res.render("signup", {
        title: "Employee managment system",
        msg: "user registered successfully",
      });
    });
  }
});

// ------------------------------------------------------------------------------------
router.get("/logout", function (req, res, next) {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("loginUser");
  res.redirect("/");
});
// router.get("/view_attandance", function (req, res, next) {
//   res.render("view_attandance", {
//     title: "Employee managment system",
//   });
// });
module.exports = router;
// ------------------------------------------------------------------------------------
