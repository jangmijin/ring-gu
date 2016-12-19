;(function( $ ) {

var UI = {
	preFuncInit : function() {
		$('ul, ol').addClass(function(){
			$(this).find('>li:first-child').addClass('first-child');
			$(this).find('>li:last-child').addClass('last-child');
		});
		
		// 레이어_열기
		function layerOpen(my) {
			var lay_dp = $(my).next('.laypop').css('display');
			if (lay_dp === 'none') {
				$('.layer').removeClass('on');
				$(my).parent('.layer').addClass('on');
			} else {
				$(my).parent('.layer').removeClass('on');
			}
		}
		$(document).on('click', '.laytit', function(e){
				e.stopImmediatePropagation();
				layerOpen(this);
				return false;
		});

		// 레이어_닫기
		$(document).on({
			click : function(event) {
				if( $('.laypop:visible').length > 0 ) {
					if( !$(event.target).is('.laypop, .laypop *') ) {
						$('.layer').removeClass('on');
					}
				}
			}
		});

		// 썸네일 투명라인
		$('img.thumb').each(function(){
			var _$thumb = $($(this));
			_$thumb.parent().css('position','relative');
			_$thumb.after('<span class="thumline" />').next('span.thumline').css({'width':_$thumb.width()-2 + 'px', 'height':_$thumb.height()-2 + 'px'});
		});

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

		// 기사 뷰 글자크기 제어
		$('.article_option button').click( function(){
			var _$contents = $('.article_view');
			var fontSize = _$contents.css('fontSize');
			var num = parseFloat(fontSize, 10);
			var unit = fontSize.slice(-2);
			if((this.id == 'fontBig') && (num < 17)) {
				num += 1;
			}
			else if((this.id == 'fontSmall') && (num > 11)) {
				num -= 1;
			}
			_$contents.css('fontSize', num + unit);
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