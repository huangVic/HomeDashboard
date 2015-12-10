

$(document).ready(function () {
    console.log(" document ready!"); 
    getActiveTab()

    $(".nav-tabs li").on("click", function () {
        var type = $(this).attr("data-id")
        getActiveTab(type) 
        
    })
});


function getActiveTab(type){
    //var item = $(".nav-tabs .active")[0]
    //var type = $(__this).attr("data-id")
    
    //console.log(" activeTab: " + type)
    switch (type) {
 
        case "water":
            $("#water-bill-list").empty();
            loadTemplate("", "", null, "spinner-loading-template", function (html) {
                $("#water-bill-list").append(html);
                loadWaterList()
            })
            break;

        case "gas":
            $("#gas-bill-list").empty();
            loadTemplate("", "", null, "spinner-loading-template", function (html) {
                $("#gas-bill-list").append(html);
                loadGasList()
            })
            break;

        case "network":
            $("#network-bill-list").empty();
            loadTemplate("", "", null, "spinner-loading-template", function (html) {
                $("#network-bill-list").append(html);
                //loadPowerList()
            })
            break;

        case "power":
        default:
            $("#power-bill-list").empty();
            loadTemplate("", "", null, "spinner-loading-template", function (html) {
                $("#power-bill-list").append(html);
                loadPowerList()
            })
            break;
    }
}


// power
function loadPowerList(callback){
    restful.get(api_url.power.home.totalList, null, function (result) {  
        loadTemplate("", "", result, "power-dataList", function (html) {
            $("#spinner-loading").remove();
            $("#power-bill-list").append(html);
            $('#powerDataList').DataTable(dataTable_config);

            if (callback && typeof callback === "function") {
                callback()
            }
        });
    })
}

// water
function loadWaterList(callback) {
    restful.get(api_url.water.home.totalList, null, function (result) {
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

// gas
function loadGasList(callback) {
    restful.get(api_url.gas.home.totalList, null, function (result) {
        loadTemplate("", "", result, "gas-dataList", function (html) {
            $("#spinner-loading").remove();
            $("#gas-bill-list").append(html);
            $('#gasDataList').DataTable(dataTable_config);
            
            if (callback && typeof callback === "function") {
                callback()
            }
        });
    })
}