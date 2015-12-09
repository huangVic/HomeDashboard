

$(document).ready(function () {
    console.log(" document ready!");
    
	restful.get(api_url.power.totalList, null, function(result){
		
		loadTemplate( "", "", result, "power-dataList", function(html){
			 $("#power-bill-list-loading").remove();
			 $("#power-bill-list").append(html);
			 $('#powerDataList').DataTable(dataTable_config);
		});
	})
});