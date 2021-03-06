
google.load('visualization', '1', {packages: ['corechart', 'bar']});
var store = new STORE();
var tableComponents = new TABLE_COMPONENTS();

$(document).ready(function () {
    console.log(" document ready!");

    loadTemplate("", "", null, "spinner-loading-template", function (html) {
        $("#home-section").append(html);
        loadHomeData();
    })

});




var loadHomeData = function loadHomeData() {
    store.loadDataFromServer(api_url.all.home.totalList, function (result) {
        if (result) {
            store.dataToStorage(result);
            
            var baseYear = new Date().getFullYear();
            var lastYear = baseYear - 1;
            
            // 最新資訊:電費
            if ( result.totalList.power && result.totalList.power.length > 0){
                var poweritem = result.totalList.power[0];
                // 日期
                var powerStartDataArr = poweritem.start_time.split("/")
                var powerEndDataArr = poweritem.end_time.split("/")
                var powerDateStr = powerStartDataArr[0] + "年 " + powerStartDataArr[1] + "月 - " + powerEndDataArr[1] + "月";
                $(".power-date").text(powerDateStr);
                
                //費用
                if(poweritem.total != undefined){
                  $(".power-total").text("NT $" + formatNumber(poweritem.total));  
                }
                
                appendTableList("power-table", result.totalList.power) 
            }
            
            //console.log(dataSet)
            
            // 最新資訊:水費
            if ( result.totalList.water && result.totalList.water.length > 0){
                var wateritem = result.totalList.water[0];
                // 日期
                var waterStartDataArr = wateritem.start_time.split("/")
                var waterEndDataArr = wateritem.end_time.split("/")
                var waterDateStr = waterStartDataArr[0] + "年 " + waterStartDataArr[1] + "月 - " + waterEndDataArr[1] + "月";
                $(".water-date").text(waterDateStr);
                
                //費用
                if(wateritem.total != undefined){
                  $(".water-total").text("NT $" + formatNumber(wateritem.total));  
                }
                
                appendTableList("water-table", result.totalList.water)
            }
            
            
            // 最新資訊:瓦斯費
            if ( result.totalList.gas && result.totalList.gas.length > 0){
                var gasitem = result.totalList.gas[0];
                // 日期
                var gasStartDataArr = gasitem.start_time.split("/")
                var gasEndDataArr = gasitem.end_time.split("/")
                var gasDateStr = gasStartDataArr[0] + "年 " + gasStartDataArr[1] + "月 - " + gasEndDataArr[1] + "月";
                $(".gas-date").text(gasDateStr);
                
                 //費用
                if(gasitem.total != undefined){
                  $(".gas-total").text("NT $" + formatNumber(gasitem.total));  
                }
                
                appendTableList("gas-table", result.totalList.gas)
            }
            
            
            
            
            
             
            var dataSet = [];
             
             
            // 彙整畫圖資料
            for (var y = lastYear; y <= baseYear; y++ ) {
                
                var yearItem = {
                    year: y,
                    month: []
                }
                
                for (var i = 1; i <= 12; i++) {
                    var monthItem = {
                        month: i,
                        power: 0,
                        water: 0,
                        gas: 0
                    }
                    // -------- power -----------
                    for (var j = 0; j < result.totalList.power.length; j++) {
                        var _pItem = result.totalList.power[j];
                        var _pItem_end_time_arr = _pItem.end_time.split("/")
                        
                        // 判斷年月相等
                        if (parseInt(_pItem_end_time_arr[0]) == y && parseInt(_pItem_end_time_arr[1]) == i) {
                            monthItem.power = parseInt(_pItem.total);
                        }
                    }
                    
                    // water
                    for (var k = 0; k < result.totalList.water.length; k++) {
                        var _wItem = result.totalList.water[k];
                        var _wItem_end_time_arr = _wItem.end_time.split("/")
                          
                        // 判斷年月相等
                        if (parseInt(_wItem_end_time_arr[0]) == y && parseInt(_wItem_end_time_arr[1]) == i) {
                            monthItem.water = parseInt(_wItem.total);
                        }
                    }
                    
                    // gas
                    for (var l = 0; l < result.totalList.gas.length; l++) {
                        var _gItem = result.totalList.gas[l];
                        var _gItem_end_time_arr = _gItem.end_time.split("/")
                          
                        // 判斷年月相等
                        if (parseInt(_gItem_end_time_arr[0]) == y && parseInt(_gItem_end_time_arr[1]) == i) {
                            monthItem.gas = parseInt(_gItem.total);
                        }
                    }
                    
                    yearItem.month.push(monthItem);
                }
                
                dataSet.push(yearItem);
            }
             
            
            
            // 移除"載入中"
            $("#spinner-loading").remove();
            $("#home-section-body").show(); 
            
            //console.log(dataSet)
            drawPowerTrendlines(dataSet);
        }
    })
}



var drawPowerTrendlines = function drawPowerTrendlines(dataList){
    
      var data = new google.visualization.DataTable();
      data.addColumn('string', '日期');
      data.addColumn('number', '電費');
      data.addColumn('number', '水費');
      data.addColumn('number', '瓦斯費');
      data.addColumn('number', '總計');


      
      var data_array = [];
      
      for(var y = 0; y < dataList.length; y++) {
          for (var i = 1; i <= 12; i++){
                data_array.push([ 
                    dataList[y].year + '/' + dataList[y].month[i-1].month, 
                    dataList[y].month[i-1].power, 
                    dataList[y].month[i-1].water, 
                    dataList[y].month[i-1].gas, 
                    (dataList[y].month[i-1].power + dataList[y].month[i-1].water + dataList[y].month[i-1].gas)
                ])
           } 
      }
      
     
      data.addRows(data_array)
    //   data.addRows([
    //       ['2014', 1000, 400, 200, 1001],
    //       ['2015', 1170, 460, 250, 2013],
    //       ['2016', 660, 1120, 300, 2331],
    //       ['2017', 1030, 540, 350, 1245]
    //   ]);

      var options = {
        title: '今年度統計資料',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        focusTarget: 'category',
        backgroundColor: "transparent",
        colors: ['cornflowerblue', 'tomato', '#7E57C2' , '#66BB6A'],
        fontName: 'Open Sans',
        seriesType: 'bars',
        chartArea: {
            left: 50,
            top: 10,
            width: '100%',
            height: '70%'
        },
        bar: {
            groupWidth: '70%'
        },
        series: { 3: { type: 'area' } },
        hAxis: {
            baselineColor: '#DDD',
            textStyle: {
                fontSize: 11
            },
            gridlines: { 
                color: '#000', 
                count: 23 
            }
        },
        vAxis: {
            minValue: 0,
            maxValue: 1500,
            baselineColor: '#DDD',
            gridlines: {
                color: '#DDD', 
                count: 7
            },
            textStyle: {
                fontSize: 11
            }
        },
        legend: {
            backgroundColor: "#fff",
            position: 'bottom',
            textStyle: {
                fontSize: 12
            }
        },
        animation: {
            duration: 1200,
            easing: 'out',
            startup: true
        }
        /*
        annotations: {
          boxStyle: {
            // Color of the box outline.
            stroke: '#888',
            // Thickness of the box outline.
            strokeWidth: 1,
            // x-radius of the corner curvature.
            rx: 10,
            // y-radius of the corner curvature.
            ry: 10,
            // Attributes for linear gradient fill.
            gradient: {
              // Start color for gradient.
              color1: '#fbf6a7',
              // Finish color for gradient.
              color2: '#33b679',
              // Where on the boundary to start and
              // end the color1/color2 gradient,
              // relative to the upper left corner
              // of the boundary.
              x1: '0%', y1: '0%',
              x2: '100%', y2: '100%',
              // If true, the boundary for x1,
              // y1, x2, and y2 is the box. If
              // false, it's the entire chart.
              useObjectBoundingBoxUnits: true
            }
          }
        },*/
        
      };

 
    //   var options = {
    //     title: "",
    //     trendlines: {
    //       0: {type: 'linear', lineWidth: 5, opacity: .3},
    //       1: {type: 'exponential', lineWidth: 10, opacity: .3}
    //     },
    //     hAxis: {
    //       title: 'year',
    //       format: 'h:mm a',
    //       viewWindow: {
    //         min: [7, 30, 0],
    //         max: [17, 30, 0]
    //       }
    //     },
    //     vAxis: {
    //       title: 'Rating (scale of 1-10)'
    //     },
    //     backgroundColor: "transparent"
    //   };

      var chart = new google.visualization.ComboChart(document.getElementById('chart-area'));
       google.visualization.events.addListener(chart, 'ready', function(){
           //console.log(11111111)
       });
      chart.draw(data, options);
}




var appendTableList = function appendTableList(id, data){
    if (data){
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var item = {
                year: data[i].start_time.split("/")[0],
                start_month: data[i].start_time.split("/")[1],
                end_month: data[i].end_time.split("/")[1],
                total: data[i].total
            }
            if ( parseInt(data[i].end_time.split("/")[0]) >  parseInt(data[i].start_time.split("/")[0]) ) {
                item.end_month += " (" + data[i].end_time.split("/")[0] + ")"
            }
            tableComponents.indexPage_listItem(item, function(res){
                html += res;
            })
        }
        
        $("#" + id + " table tbody").append(html)
    }
}