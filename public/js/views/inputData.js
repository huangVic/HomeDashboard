

$( document ).ready(function() {
    console.log( " document ready!" );
    
    $('.start_time, .end_time').datepicker({
        format: "yyyy/mm/dd",
        language: "zh-TW",
        autoclose: true,
        todayHighlight: true
    });
    
    // ---------- 電費 ---------
    $("#power-submit").on("click", function(e){
        var start_time = $("#power_start_time").val()
        var data = {
            start_time: start_time
        }
        $.post(api_url.power.add, data, function(result){
            console.log(result)
        })
	})




	// ---------- 水費 ---------
	$("#water-submit").on("click", function (e) {
		var start_time = $("#water_start_time").val().trim();
		var end_time = $("#water_end_time").val().trim();
		var bill_type = $("#water_bill_type").val();
		var degree = $("#water_degree").val().trim();
		var base_fee = $("#water_base_fee").val();
		var used_fee = $("#water_used_fee").val();
		var other_fee = $("#water_other_fee").val();
		var total = $("#water_total").val().trim();
		var remark = $("#water_bill_remark").val().trim();

		if (start_time == "" || end_time == "") {
			alert("請輸入計費區間!!");
			return;
		}
		
		if (degree == "") {
			alert("請輸入度數!!");
			return;
		}
		
		if (total == "") {
			alert("請輸入總額!!");
			return;
		}

		var params = {
			start_time: start_time,
			end_time: end_time,
			type: bill_type,
			degree: degree,
			base_fee: base_fee,
			used_fee: used_fee,
			other_fee: other_fee,
			total: total,
			remark: remark
		}
		

		restful.post(api_url.water.add, params, function (result) {
			console.log(result)
			if (result.status == 100) {
				alert("資料已新增!!")
				resetWaterForm();
			}
			else { 
				alert("資料新增失敗!! \r\n" + result.msg)
			}
		})
	})

});




function resetWaterForm() {
	$("#water_start_time").val("");
	$("#water_end_time").val("");
	$("#water_degree").val("");
	$("#water_base_fee").val("");
	$("#water_used_fee").val("");
	$("#water_other_fee").val("");
	$("#water_total").val("");
	$("#water_bill_remark").val("");
}