;(function( $ ) {

var UI = {
	preFuncInit : function() {
		// 통합검색
		var _$totalSearchInput = $('.total_search .inp_sear');
		_$totalSearchInput.focus(function() {
			$(this).parents('.total_search').addClass('on');
		});
		_$totalSearchInput.blur(function() {
			var keyword = $.trim($(this).val());
			if (keyword === '') {
				$(this).parents('.total_search').removeClass('on');	
			}
		});


		// 여백광고 체크
		// if (($('.ad_left_wing').is(':visible')) && ($('.ad_right_wing').is(':visible'))) {
		// 	$('#wrapper').css('min-width','1407px');
		// }
	},
	slider : function() {
		if ($.fn.touchSlider) {
			$("#article_slider").touchSlider({
				initComplete : function (e) {
					var _this = this;
					var $this = $(this);
					var paging = $this.next(".paging");
					
					paging.html("");
					$this.find(" > ul > li").each(function (i, el) {
						var num = (i+1) / _this._view;
						if((i+1) % _this._view == 0) {
							paging.append('<button type="button" class="btn_page">page' + num + '</button>');
						}
					});
					paging.find(".btn_page").bind("click", function (e) {
						_this.go_page($(this).index());
					});
				},
				counter : function (e) {
					$(this).next(".paging").find(".btn_page").removeClass("on").eq(e.current-1).addClass("on");
				},
				transition : false,
				autoplay : {
					enable : true,
					pauseHover : true,
					addHoverTarget : "", // 다른 오버영역 추가 ex) ".someBtn, .someContainer"
					interval : 3500
				},
				btn_prev : $("#article_slider").next().next().find(".btn_prev"),
				btn_next : $("#article_slider").next().next().find(".btn_next")
			});
		}
	} 
};

$(function() {
	// UI.preFuncInit
	UI.preFuncInit();

	// UI.slider 
	UI.slider();
});
}( jQuery ));