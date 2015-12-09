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



router.get('/list/power', function (req, res, next) {
    //console.log(req.session)
    var powerStore = new PowerModel();
    
    var params = { user_id: req.session.user.id };
    powerStore.getTotalList(params, function(result){
        if (!result){
            res.json({ success: 'ok' , status: 999, msg: "Failed" })
        }
        else{
            res.json({ success: 'ok' , status: 100, msg: "Success.",  list: result})
        }
    })
});



module.exports = router;