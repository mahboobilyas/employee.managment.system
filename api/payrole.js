var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var payrolemodels = require("../module/pay_role");
const payrole = require('./controller/payrole')



router.get("/get-payrole",payrole.getallpayrole);
router.post("/add_payrole",payrole.postallpayrole)
router.delete("/delete-payrole",payrole.deleteallpayrole);








module.exports = router;