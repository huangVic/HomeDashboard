
$( document ).ready(function() {
    console.log( " document ready!" );
    
    $('.start_time, .end_time').datepicker({
        format: "yyyy/mm/dd",
        language: "zh-TW",
        autoclose: true,
        todayHighlight: true
    });
});