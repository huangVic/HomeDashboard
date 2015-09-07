
var DATAMODEL = function () {
    var exports = {};

    var getDataSet = exports.getDataSet = function getDataSet(data, callback) {
        console.log(" #### DataModel getDataSet #### ")
        
        var query = new Parse.Query("DataSet")
        
        // add a constraint to the query
        if (data) {
            if (data.type && data.type != undefined) {
                query.equalTo("type", data.type);
            }
            if (data.year && data.year != undefined) {
                query.equalTo("year", data.year);
            }
            if (data.month && data.month != undefined) {
                query.equalTo("month", data.month);
            }
        }
        
        
        query.find({
            success: function (results) {
                // results is an array of Parse.Object.
                console.log(" [getDataSet] query results")

                var dataSet = [];
                results.forEach(function (item) {
                    var o = {
                        type: item.get("type"),
                        year: item.get("year"),
                        month: item.get("month"),
                        items: item.get("items")
                    }
                    dataSet.push(o)
                }, this);

                console.log(dataSet)

                if (callback) {
                    callback(dataSet)
                }
            },
            error: function (error) {
                // error is an instance of Parse.Error.
                console.log(" [getDataSet] error: " + error)
            }
        });
    }

    var setDataRow = exports.setDataRow = function setDataRow(data, callback) {
        console.log(" #### DataModel setDataRow #### ")

        var row = new Parse.Object("DataSet")
        row.set("type", data.type)
        row.set("year", data.year)
        row.set("month", data.month)
        row.set("items", data.items)
        row.set("author", Parse.User.current())

        row.save().then(function (result) {
            console.log(" [setDataRow] result")
            console.log(result)

            if (callback) {
                callback()
            }

        }, function (error) {
            console.log(" [setDataRow] error: " + error)
        })
    }


    return exports;
}



var dataModel = new DATAMODEL();
//dataModel.getDataSet()


// var d = new Date();

// var row = {
//     type: "電費",
//     year: d.getFullYear(),
//     month: (d.getMonth() + 1),
//     items: [
//         {
//             type: "scales",
//             value: 107
//         },
//         {
//             type: "bill",
//             value: 498
//         }
//     ]
// }

// dataModel.setDataRow(row, function () {
//     dataModel.getDataSet()
// })