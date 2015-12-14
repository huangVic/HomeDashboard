var express = require('express');
var router = express.Router();
var PowerModel = require('../models/PowerModel.js');
var WaterModel = require('../models/WaterModel.js');
var GasModel = require('../models/GasModel.js');



/* GET users listing. */
router.get('/', function (req, res, next) {
    var cssList = [
        { src: "/css/dataTables.bootstrap.min.css" }
    ]
    var jsList = [
        { src: "/libs/handlebars-v4.0.4.js" },
        { src: "/libs/jquery.dataTables.min.js" },
        { src: "/js/views/dataList.js" }
    ]
    console.log(req.session)
    res.render('dataList', { mainId: "dataList", cssList: cssList, jsList: jsList });
});


/***************
 * 電費資料列表(家用)
*****************/
router.get('/home/powerList', function (req, res, next) {
    //console.log(req.session)
    var powerStore = new PowerModel();

    var params = {
        user_id: req.session.user.id,
        group: "home"
    };
    powerStore.getTotalListAtHome(params, function (result) {
        if (!result) {
            res.json({ success: 'ok', status: 999, msg: "Failed" })
        }
        else {
            res.json({ success: 'ok', status: 100, msg: "Success.", list: result })
        }
    })
});


/***************
 * 水費資料列表(家用)
*****************/
router.get('/home/waterList', function (req, res, next) {
    //console.log(req.session)
    var waterStore = new WaterModel();

    var params = {
        user_id: req.session.user.id,
        group: "home"
    };
    waterStore.getTotalListAtHome(params, function (result) {
        if (!result) {
            res.json({ success: 'ok', status: 999, msg: "Failed" })
        }
        else {
            res.json({ success: 'ok', status: 100, msg: "Success.", list: result })
        }
    })
});


/***************
 * 瓦斯費資料列表(家用)
*****************/
router.get('/home/gasList', function (req, res, next) {
    //console.log(req.session)
    var gasStore = new GasModel();

    var params = {
        user_id: req.session.user.id,
        group: "home"
    };
    gasStore.getTotalListAtHome(params, function (result) {
        if (!result) {
            res.json({ success: 'ok', status: 999, msg: "Failed" })
        }
        else {
            res.json({ success: 'ok', status: 100, msg: "Success.", list: result })
        }
    })
});


module.exports = router;