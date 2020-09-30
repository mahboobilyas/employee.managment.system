var express = require("express");
var router = express.Router();
var jobRolemodel = require("../module/jobrole");
var employeemodels = require("../module/employee");
const mongoose = require("mongoose");
const jobrole = require('./controller/addjob_role')
var checkAuth = require("../api/middleware/auth")



router.get("/get-jobrole",checkAuth, jobrole.getalljobrole)
router.post("/add-jobrole",checkAuth, jobrole.postalljobrole);
router.put("/add-update-jobrole/:id", jobrole.putalljobrole);
router.patch("/update-jobrole", jobrole.patchalljobrole);
router.delete("/delete-jobrole", jobrole.deletealljobrole);
module.exports = router;
//---------------------------------for employee collections--------------


