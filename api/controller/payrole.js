const mongoose = require("mongoose");
var payrolemodels = require("../../module/pay_role");

exports.getallpayrole = function (err, res, next) {

    payrolemodels.find()
        .select('pay_role_statu employee_name')
        .populate('employee_name', "Ename")
        .then((data) => {
            res.status(200).json({
                message: "success",
                result: data,
            });
        })
        .catch((err) => {
            res.json(err);
        });
}

exports.postallpayrole = function (req, res, next) {
    var employee_name = req.body.employeename_key;
    var pay_status = req.body.pay_key

    var paydetails = new payrolemodels({
        employee_name: employee_name,
        pay_role_statu: pay_status
    })
    paydetails.save()
        .then(doc => {
            res.status(201).json({
                message: "insertd sucessfully",
                result: doc
            })
        })
        .catch(err => {
            res.json(err.message);
        })
}

exports.deleteallpayrole = function (req, res, next) {
    var id = req.body.id;

    payrolemodels.findByIdAndDelete(id)
        .exec()
        .then((data) => {
            res.status(200).json({
                message: "delete",
                result: data,
            });
        })
        .catch((err) => {
            res.json(err);
        });
}