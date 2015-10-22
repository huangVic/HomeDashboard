// ################# initial Message Listener  ################
globalObject.messageListener = {
    addMessageListener: function () {
        debugConsole(" 訊息監聽器 : 初始化 ")
        chrome.extension.onMessage.addListener(function (request, sender, response) {
             debugConsole('訊息監聽器 : 接收訊息 - ' + request.callback);
             switch (request.callback) {
                 case "Result.AuthResult":
                     console.log("Result.AuthResult: " + request.value)
                     //session.auth(request.value, request.user);
                    break;
                    
                 case "Result.CurrentUser":   
                      console.log("Result.CurrentUser: " + request.value)
                      if( request.value == undefined || request.value == false ){
                          
                          if (globalObject.app_view != "auth") {
                              // 顯示登入訊息
                              var msg = {
                                  title: "錯誤!!",
                                  message: " 真抱歉, 此系統為私人使用, 需進行身分驗證才能繼續使用..."
                              }
                              globalObject.loadHandlebarsTemplate.loadIdTemplate("tmp-alert-danger-messages", msg, function (html) {
                                  $("#main-content").html(html);
                              });
                          
                              // 顯示登入按鈕
                              $("#menu-login-btn").show();
                          }
                          
                      }
                      else{
                          // 關閉登入按鈕
                          $("#menu-login-btn").show();
                      }
             }
        })
    },
    sendMessage: function (message) {
        chrome.extension.sendMessage(message);
    }
}



globalObject.messageListener.addMessageListener();