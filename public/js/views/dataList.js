

$(document).ready(function () {
    console.log(" document ready!");

    loadTemplate( "", "", null, "power-dataList", function(html){
		$("#power-bill").append(html);
	});
});