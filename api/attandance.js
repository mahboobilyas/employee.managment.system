var express = require("express");
var router = express.Router();
const attandancemodels = require("../module/attandance");
router.get("/get-attandance", function (err, res, next) {
    attandancemodels.find()
        .exec()
        .then((data) => {
            res.status(200).json({
                message: "success",
                result: data,
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.delete("/delete-attandance", function (req, res, next) {
    var id=req.body.id;
    attandancemodels.findByIdAndRemove(id)
        .exec()
        .then((data) => {
            res.status(200).json({
                message: "success",
                result: data,
            });
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports = router;
