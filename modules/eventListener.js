
var EventListener = function (){
	
	
    var exports = {};
	
	var mainHeaderEvent = exports.mainHeaderEvent = function mainHeaderEvent() {
		    
			// 下拉選項
			$('body').on('click', '.dropdown.open .dropdown-menu', function (e) {
				e.stopPropagation();
			});
			
			$('.dropdown').on('click', function(e){
				console.log($(this).attr("class"))
				if( $(this).attr("class").indexOf("open") >= 0){
					$(this).removeClass("open")
				}
				else{
					$(this).addClass("open")
				}
			})
			
			// 更多選項
			$(".menu-more").on('click', function(e){
				e.preventDefault();
			})
			
			// 下拉選項 > 子選項
			$(".dropdown-menu > li > a").on('click', function(e){
				e.preventDefault()
			})
			
			// 搜尋按鈕
			$('body').on('click', '#top-search > a', function (e) {
				e.preventDefault();
				$('#header').addClass('search-toggled');
			});

			$('body').on('click', '#top-search-close', function (e) {
				e.preventDefault();
				$('#header').removeClass('search-toggled');
			});
            
			// 登入選項
			$("#menu-login-btn").on("click", function(e){
				e.preventDefault();
				window.location.href = chrome.extension.getURL('html/auth.html');
			})
            /*
			$('.dropdown').on('shown.bs.dropdown', function (e) {
				if ($(this).attr('data-animation')) {
					$animArray = [];
					$animation = $(this).data('animation');
					$animArray = $animation.split(',');
					$animationIn = 'animated ' + $animArray[0];
					$animationOut = 'animated ' + $animArray[1];
					$animationDuration = ''
					if (!$animArray[2]) {
						$animationDuration = 500; //if duration is not defined, default is set to 500ms
					}
					else {
						$animationDuration = $animArray[2];
					}

					$(this).find('.dropdown-menu').removeClass($animationOut)
					$(this).find('.dropdown-menu').addClass($animationIn);
				}
			});

			$('.dropdown').on('hide.bs.dropdown', function (e) {
				if ($(this).attr('data-animation')) {
					e.preventDefault();
					$this = $(this);
					$dropdownMenu = $this.find('.dropdown-menu');

					$dropdownMenu.addClass($animationOut);
					setTimeout(function () {
						$this.removeClass('open')

					}, $animationDuration);
				}
			});
			*/

	}
   
   
   return exports;
}


var eventListener = new EventListener()