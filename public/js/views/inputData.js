var api_url = {
    power: {
        add: "/input/power/add"
    }
}

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
});