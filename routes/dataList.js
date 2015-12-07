var express = require('express');
var router = express.Router();
var PowerModel = require('../models/PowerModel.js'); 
var WaterModel = require('../models/WaterModel.js');
var GasModel = require('../models/GasModel.js');



/* GET users listing. */
router.get('/', function (req, res, next) {
    var cssList = [
        {src: "/css/dataTables.bootstrap.min.css"}
    ]
    var jsList = [
        {src: "/libs/handlebars-v4.0.4.js"},
        {src: "/libs/jquery.dataTables.min.js"},
        {src: "/js/views/dataList.js"}
    ]
    console.log(req.session)
    res.render('dataList', {mainId: "dataList", cssList: cssList, jsList: jsList });
});



module.exports = router;