
var TABLE_COMPONENTS = function TABLE_COMPONENTS() {
    var exports = {};
    
    
    var indexPage_listItem = exports.indexPage_listItem = function indexPage_listItem(data, callback) {
        loadTemplate("", "", data, "indexPage-dataItem", function (html) {
            if (callback) {
                callback(html);
            }
        })
    }
    
    
    return exports;
}