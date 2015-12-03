var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var cssList = [
        {src: "/libs/datepicker/css/bootstrap-datepicker3.min.css"}
    ]
    var jsList = [
        {src: "/libs/datepicker/js/bootstrap-datepicker.min.js"},
        {src: "/libs/datepicker/locales/bootstrap-datepicker.zh-TW.min.js"},
        {src: "/js/views/inputData.js"}
    ]
    res.render('input', {mainId: "inputData", cssList: cssList, jsList: jsList });
});

module.exports = router;
