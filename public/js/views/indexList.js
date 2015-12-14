
var store = new STORE();

$(document).ready(function () {
    console.log(" document ready!");

    store.loadDataFromServer(api_url.all.home.totalList, function (result) {
        if (result) {
            store.dataToStorage(result);
        }
    })

});



