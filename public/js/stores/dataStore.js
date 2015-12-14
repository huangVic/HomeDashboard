var STORE = function STORE() {
    var exports = {};

    // 資料存儲 localStorage
    var dataToStorage = exports.dataToStorage = function dataToStorage(data) {
        if (data && data != undefined) {
            data = JSON.stringify(data);
            localStorage.setItem("totalList", data);
        }
    }

    // 取得 localStorage 資料
    var getDataInStorage = exports.getDataInStorage = function getDataInStorage() {
        var list = localStorage.getItem("totalList");
        if (list != null) {
            list = JSON.parse(list)
            return list;
        } else {
            return null;
        }
    }

    // 從 Server 取得 list 資料
    var loadDataFromServer = exports.loadDataFromServer = function loadDataFromServer(url, callback) {
        restful.get(url, null, function (result) {
            if (callback && typeof callback === "function") {
                callback(result)
            }
        })
    }


    return exports;
}

