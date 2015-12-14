
$(document).ready(function () {
    console.log(" document ready!"); 
    loadTotalList()
});



function loadTotalList(callback) {
    restful.get(api_url.all.home.totalList, null, function (result) {
        console.log(" << total list >>")
        console.log(result)
        loadTemplate("", "", result, "water-dataList", function (html) {
            $("#spinner-loading").remove();
            $("#water-bill-list").append(html);
            $('#waterDataList').DataTable(dataTable_config);
            
            if (callback && typeof callback === "function") {
                callback()
            }
        });
    })
}