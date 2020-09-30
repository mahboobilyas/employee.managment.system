var express = require("express");
var router = express.Router();
var employeemodels = require("../module/employee");
const mongoose = require("mongoose");
const employee = require('./controller/employee')

router.get("/getallemployee",employee.getallemployee);
  
  router.post("/addemployee",employee.postallemployee);
  
  // router.patch("/update-employee", async function (req, res, next) {
  //   try {
  //   var id=req.body.id
  //   var employee_name = req.body.employeename_key;
  //   var employee_email = req.body.email_key;
  //   var employee_number = req.body.number_key;
  //   var employee_gender = req.body.gender_key;
  //   var employee_city = req.body.city_key;
  //   var employee_adress = req.body.Adress_key;
  //   var employee_salery = req.body.salery_key;
  //   var role_detail = req.body.role_details_key;
  //   const data = await employeemodels.findOneAndUpdate({ _id: id }, {
  //     $set: {
  //       _id: mongoose.Types.ObjectId(),
  //     Ename: employee_name,
  //     Eemail: employee_email,
  //     Enumber: employee_number,
  //     gender: employee_gender,
  //     city: employee_city,
  //     Eadress: employee_adress,
  //     Esalery: employee_salery,
  //     job: role_detail,
  //     }
  //   }, { new: true });
  //   res.status(201).json({
  //     message: "data put and update successfully",
  //     result: data,
  //   });
  // } catch (error) {
  //   res.json(error.message);
  // }
  // });
  
  
  router.delete("/deleteemployee",employee.delallemployee);
  module.exports = router;