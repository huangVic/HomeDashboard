var express = require('express');
var router = express.Router();

// data
var UsersModel = require('../models/UsersModel.js');
var PowerModel = require('../models/PowerModel.js');
var WaterModel = require('../models/WaterModel.js');
var GasModel = require('../models/GasModel.js');

// controller
router.use('/auth', require('./auth'));
router.use('/input', require('./input'));
router.use('/dataList', require('./dataList'));


// home page
router.get('/', function (req, res, next) {

        if (!req.session.user) {
                res.redirect('/auth');
                return;
        }

        var cssList = [
                { src: "/css/index.css" }
        ]
        var jsList = [
                { src: "https://www.google.com/jsapi" },
                { src: "/libs/handlebars-v4.0.4.js" },
                { src: "/js/stores/dataStore.js" },
                { src: "/js/components/table_components.js" },
                { src: "/js/views/indexList.js" }
        ];
        
        var year = new Date().getFullYear()

        res.render('index', { 
                mainId: "home", 
                user: req.session.user, 
                cssList:cssList, 
                jsList: jsList,
                year: year  
        });
});


// get total list
router.get('/home/totalList', function (req, res, next) {

        var totalList = {
            power: [], 
            water: [], 
            gas: [] ,
        }

        var params = {
                user_id: req.session.user.id,
                group: "home"
        };

        function geGasList() {
                console.log(" << geGasList >>")
                var gasStore = new GasModel();
                gasStore.getTotalListAtHome(params, function (result) {
                        if (result && result.length > 0) {
                                totalList.gas = result
                        }
                        finishLoad()
                })
        }

        function getWaterList() {
                console.log(" << getWaterList >>")
                var waterStore = new WaterModel();
                waterStore.getTotalListAtHome(params, function (result) {
                        if (result && result.length > 0) {
                                totalList.water = result
                        }
                        geGasList()
                })
        }

        function getPowerList() {
                console.log(" << getPowerList >>")
                var powerStore = new PowerModel();
                powerStore.getTotalListAtHome(params, function (result) {
                        if (result && result.length > 0) {
                                totalList.power = result
                        }
                        getWaterList()
                })
        }

        function finishLoad() {
                console.log(" <<----- finishLoad ----->> ")
                //console.log(totalList)
                //req.session.totalList = totalList;
                res.json({ success: 'ok', status: 100, msg: "Success.", totalList: totalList })
        }

        function startLoadData() {
                console.log(" <<----- startLoadData ----->> ")
                getPowerList()
        }

        startLoadData();
});


module.exports = router;
