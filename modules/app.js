
// 初始化 : 載入樣板
globalObject.loadHandlebarsTemplate.locadCommonTemplate(null, null, function () {

	globalObject.loadHandlebarsTemplate.loadIdTemplate("tmp-main-header", {
		appName: chrome.runtime.getManifest().name
	}, function (html) {
		$("#main-header").html(html);
		eventListener.mainHeaderEvent()
		
		// 查詢登入狀態
		session.getLoginStatus("Result.CurrentUser")
	});
});