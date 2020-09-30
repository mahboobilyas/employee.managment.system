var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
var usermodule = require("../module/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



router.post("/signup", function (req, res, next) {
    var username = req.body.username_key;
    var email = req.body.email_key;
    var password = req.body.password_key;
    var Cpassword = req.body.Cpasword_key;
    if (password !== Cpassword) {
        res.json({
            message: "password not match",


        });
    } else {

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return res.json({
                    message: "something wrong try later",
                    error: err
                })
            } else {
                var user_details = new usermodule({
                    _id: mongoose.Types.ObjectId(),
                    username: username,
                    email: email,
                    password: hash,

                });
                user_details.save().then((doc) => {
                    res.status(201)
                        .json({
                            message: "user registered  successfully",
                            result: doc,
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                });
            }
        });

    }

});

//============================

router.post("/login", function (req, res, next) {
    var username = req.body.username_key;
    var password = req.body.password_key;
    usermodule.find({ username: username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({
                    message: " user not exit",
                    user: user
                })
            } else {

                bcrypt.compare(password, user[0].password, function (err, result) {
                    if (err) {
                        res.status(404).json({
                            message: " auth failed",
                            user: user
                        })
                    }
                    if (result) {
                        var token = jwt.sign(
                            {
                                username: user[0].username,
                                userid: user[0]._id
                            },
                            'secret',
                            {
                                expiresIn: "1h"
                            })

                        res.status(200).json({
                            message: "user found",
                            token: token
                        })
                    } else {
                        res.status(404).json({
                            message: " auth failed",
                            user: user
                        })
                    }
                });

            }
        })
        .catch(err => {
            res.json({
                error: err
            })
        })

});
module.exports = router;
