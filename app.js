var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dashboard = require("./routes/dashboard");
var ADDjob_role = require("./routes/add-jobrole");
var viewjob_role = require("./routes/view-jobRole");
var add_employee = require("./routes/add-employee");
var view_allemployee = require("./routes/view-allemployee");
var pay_role = require("./routes/pay-role");
var view_allpay = require("./routes/view-Allpay");
var emp_attandance = require("./routes/employee-attandance");
var add_roleapi = require("./api/addjob_role");
var employeeapi = require("./api/employee");
var payroleapi = require("./api/payrole");
var attandanceapi = require("./api/attandance");
var userapii = require("./api/users");


const { format } = require("path");

var app = express();

// let today = new Date();
// console.log(today)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboard);
app.use("/add-jobrole", ADDjob_role);
app.use("/view-jobRole", viewjob_role);
app.use("/add-employee", add_employee);
app.use("/view-allemployee", view_allemployee);
app.use("/pay-role", pay_role);
app.use("/view-ALLpay", view_allpay);
app.use("/employee-attandance", emp_attandance);
app.use("/api", add_roleapi);
app.use("/payapi", payroleapi);
app.use("/empapi", employeeapi);
app.use("/attanapi", attandanceapi);
app.use("/userapi", userapii);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
  res.status(404).json({
    error: "page ot found",
  });
  res.status(500).json({
    error: "internal server error",
  });
});

module.exports = app;
