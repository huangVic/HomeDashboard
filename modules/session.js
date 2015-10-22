
var SESSION = function () {

	var exports = {};
	var currentUser;
	var isLogin = false;

	var setLoginStatus = exports.setLoginStatus = function setLoginStatus(value) {
		if (value) {
			isLogin = true;
		} else {
			isLogin = false;
		}
	}

	var setCurrentUser = exports.setCurrentUser = function setCurrentUser(user) {
		if (user) {
			currentUser = user;
		}
	}

	var getCurrentUser = exports.getCurrentUser = function getCurrentUser() {
		return currentUser;
	}

	var getLoginStatus = exports.getLoginStatus = function getLoginStatus(callback) {
        debugConsole(" #### session 取得資料登入狀態 ####")

		globalObject.messageListener.sendMessage({
			action: "Query.CurrentUser",
			callback: callback
		})
	}

	var auth = exports.auth = function auth(status, user) {
		debugConsole(" #### session 登入驗證 ####")
		
		console.log(status)
		
		// if (status == true) {
		// 	setLoginStatus(status);
		// 	if (user && user != null) {
		// 		setCurrentUser(user);
		// 	}
		// } else {
		// 	console.log("xxx")
		// 	window.location.href = chrome.extension.getURL('html/auth.html');
		// }
		

	}


	return exports;
}



var session = new SESSION();


// session.getLoginStatus(function (status) {
// 	debugConsole("[session.getLoginStatus]")
// 	console.log(status)
// 	if (status) {
// 		globalObject.loadHandlebarsTemplate.loadIdTemplate("tmp-main-header", {
// 			appName: chrome.runtime.getManifest().name
// 		}, function (html) {
// 			$("#loading-wrapper").hide();
// 			$("#main-header").html(html);
// 		});
// 	}
// })
