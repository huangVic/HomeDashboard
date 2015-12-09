var express = require('express');
var router = express.Router();
var PowerModel = require('../models/PowerModel.js'); 
var WaterModel = require('../models/WaterModel.js');
var GasModel = require('../models/GasModel.js');

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
 * 電費資料寫入(家用)
*****************/

router.post('/power/add', function (req, res, next) {
    console.log(" ---- power/add ----")
	
	var params = {};
	
	if (req.body.start_time != undefined) {
		params.start_time = req.body.start_time;
		params.start_time_ms = new Date(req.body.start_time).getTime();
	}
	
	if (req.body.end_time != undefined) {
		params.end_time = req.body.end_time;
		params.end_time_ms = new Date(req.body.end_time).getTime();
	}
	
	if (req.body.type != undefined) {
		params.type = req.body.type;
	}
	
	if (req.body.degree != undefined) {
		params.degree = req.body.degree;
	}
	
	if (req.body.current_degree != undefined) {
		params.current_degree = req.body.current_degree;
	}
	
	if (req.body.base_fee != undefined) {
		params.base_fee = req.body.base_fee;
	}
	
	if (req.body.share_fee != undefined) {
		params.share_fee = req.body.share_fee;
	}
	
	if (req.body.other_fee != undefined) {
		params.other_fee = req.body.other_fee;
	}
	
	if (req.body.total != undefined) {
		params.total = req.body.total;
	}
	
	if (req.body.remark != undefined) {
		params.remark = req.body.remark;
	}
	
	params.user_id = req.session.user.id;
    params.group = "home";
	
	console.log(" PowerStore add params: ")
	console.log(params)

	var PowerStore = new PowerModel();
	
	PowerStore.addItemAtHome(params, function (result) {
		if (!result) {
			res.json({ success: 'ok' , status: 999, msg: "Failed to create power object" })
		}
		else {
			res.json({ success: 'ok' , status: 100, msg: "Create success.", item_id: result.id })
		}

	});

})



/***************
 * 水費資料寫入(家用)
*****************/

router.post('/water/add', function (req, res, next) {
	console.log(" ---- water/add ----")
	
	var params = {};

	if (req.body.start_time != undefined) {
		params.start_time = req.body.start_time;
		params.start_time_ms = new Date(req.body.start_time).getTime();
	}
	
	if (req.body.end_time != undefined) {
		params.end_time = req.body.end_time;
		params.end_time_ms = new Date(req.body.end_time).getTime();
	}
	
	if (req.body.type != undefined) {
		params.type = req.body.type;
	}
	
	if (req.body.degree != undefined) {
		params.degree = req.body.degree;
	}
	
	if (req.body.base_fee != undefined) {
		params.base_fee = req.body.base_fee;
	}
	
	if (req.body.used_fee != undefined) {
		params.used_fee = req.body.used_fee;
	}
	
	if (req.body.other_fee != undefined) {
		params.other_fee = req.body.other_fee;
	}
	
	if (req.body.total != undefined) {
		params.total = req.body.total;
	}
	
	if (req.body.remark != undefined) {
		params.remark = req.body.remark;
	}
	
	params.user_id = req.session.user.id;
    params.group = "home";
	
	var WaterStore = new WaterModel();
	
	WaterStore.addItemAtHome(params, function (result) {
		if (!result) {
			res.json({ success: 'ok' , status: 999, msg: "Failed to create water object" })
		}
		else { 
			res.json({ success: 'ok' , status: 100, msg: "Create success.",  item_id: result.id})
		}

	});

	
})



/***************
 * 瓦斯費資料寫入(家用)
*****************/

router.post('/gas/add', function (req, res, next) {
	console.log(" ---- gas/add ----")
	
	var params = {};

	if (req.body.start_time != undefined) {
		params.start_time = req.body.start_time;
		params.start_time_ms = new Date(req.body.start_time).getTime();
	}
	
	if (req.body.end_time != undefined) {
		params.end_time = req.body.end_time;
		params.end_time_ms = new Date(req.body.end_time).getTime();
	}
	
	if (req.body.type != undefined) {
		params.type = req.body.type;
	}
	
	if (req.body.degree != undefined) {
		params.degree = req.body.degree;
	}
	
	if (req.body.current_degree != undefined) {
		params.current_degree = req.body.current_degree;
	}

	if (req.body.total != undefined) {
		params.total = req.body.total;
	}
	
	if (req.body.remark != undefined) {
		params.remark = req.body.remark;
	}
	
	params.user_id = req.session.user.id;
    params.group = "home";

	var GasStore = new GasModel();
	
	GasStore.addItemAtHome(params, function (result) {
		if (!result) {
			res.json({ success: 'ok' , status: 999, msg: "Failed to create gas object" })
		}
		else {
			res.json({ success: 'ok' , status: 100, msg: "Create success.", item_id: result.id })
		}

	});
		
})

module.exports = router;
