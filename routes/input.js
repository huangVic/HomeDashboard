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
    console.log(req.session)
    res.render('input', {mainId: "inputData", cssList: cssList, jsList: jsList });
});


/***************
 * 電費資料寫入
*****************/

router.post('/power/add', function (req, res, next) {
    console.log(" ---- power/add ----")
    console.log(" start_time: " +  req.body.start_time)
    console.log(req.session)
    res.json({ success: 'ok' , start_time: req.body.start_time, user: req.session.user })
})




module.exports = router;
