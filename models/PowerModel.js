﻿var DB = require('../common/db');


var POWER = function POWER() {

	var exports = {};


	// 新增
	var addItem = exports.addItem = function addItem(data, callback) {
		if (!data) {
			callback(null)
		}

		var Power = DB.Object.extend("Power");
		var power = new Power();
		
		/*
		if (data.start_time && data.start_time != undefined) {
			water.set("start_time", data.start_time);

			var start_time_ms = new Date(data.start_time).getTime();
			water.set("start_time_ms", start_time_ms);
		}

		if (data.end_time && data.end_time != undefined) {
			water.set("end_time", data.end_time);
			
			var end_time_ms = new Date(data.end_time).getTime();
			water.set("end_time_ms", end_time_ms);
		}

		if (data.type && data.type != undefined) {
			water.set("type", data.type);
		}
		
		if (data.degree && data.degree != undefined) {
			water.set("degree", data.degree);
		}
		
		if (data.base_fee && data.base_fee != undefined) {
			water.set("base_fee", data.base_fee);
		}

		if (data.used_fee && data.used_fee != undefined) {
			water.set("used_fee", data.used_fee);
		}

		if (data.other_fee && data.other_fee != undefined) {
			water.set("other_fee", data.other_fee);
		}

		if (data.total && data.total != undefined) {
			water.set("total", data.total);
		}

		if (data.remark && data.remark != undefined) {
			water.set("remark", data.remark);
		}
		 * */
		//console.log(" water add params: ")
		//console.log(data)

		power.save(data, {
			success: function (result) {
				// Execute any logic that should take place after the object is saved.
				console.log('power object created with objectId: ' + result.id);
				if (callback) {
					callback(result);
				}
			},
			error: function (gameScore, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and description.
				console.log('Failed to create power object, with error code: ' + error.description);
				if (callback) {
					callback(null);
				}
			}
		});
	    
	}



    var getTotalList = exports.getTotalList = function getTotalList() {
        var Power = DB.Object.extend("Power");
		var query = new DB.Query(Power);
		query.equalTo("playerName", "Dan Stemkoski");
		query.find({
			success: function (results) {
				alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned Parse.Object values
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					alert(object.id + ' - ' + object.get('playerName'));
				}
			},
			error: function (error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
    }


	return exports;
}


module.exports = POWER;