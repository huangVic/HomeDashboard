
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
        debugConsole(" #### session getLoginStatus ####")
		if (isLogin) {
			callback(true);
		} else {
			globalObject.messageListener.sendMessage({
				action: "getCurrentUser",
				callback: "session.auth"
			})
		}

	}

	var auth = exports.auth = function auth(status, user) {
		debugConsole(" #### session auth ####")
		
		console.log(status)
		
		if (status == true) {
			setLoginStatus(status);
			if (user && user != null) {
				setCurrentUser(user);
			}
			globalObject.loadHandlebarsTemplate.loadIdTemplate("tmp-main-header", {
				appName: chrome.runtime.getManifest().name
			}, function (html) {
				$("#loading-wrapper").hide();
				$("#main-header").html(html);
			});
		} else {
			console.log("xxx")
			//window.location.href = chrome.extension.getURL('html/auth.html');
		}
		

	}


	return exports;
}



var session = new SESSION();


session.getLoginStatus(function (status) {
	debugConsole("[session.getLoginStatus]")
	console.log(status)
	if (status) {
		globalObject.loadHandlebarsTemplate.loadIdTemplate("tmp-main-header", {
			appName: chrome.runtime.getManifest().name
		}, function (html) {
			$("#loading-wrapper").hide();
			$("#main-header").html(html);
		});
	}
})
