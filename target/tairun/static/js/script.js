$(function() {

	// 计算banner图高度
/*	function changeHeight(){
		var bannerH=$(window).height()-$(".header").height();
		$(".banner").height(bannerH);
	}
	$(window).on('resize load',changeHeight);*/

	$("#nav li").click(function() {
		ScrollToTarget(this);
	});

	$('#pro-mid li').click(function() {
		ScrollToTarget(this);
	});
	
	$('#contactus').click(function() {
		var itemTop6 = $('#item6').offset().top;
		$("html,body").animate({
			scrollTop : itemTop6 + 180
		}, 500);
	});
	
	$('#send').click(function() {
		sendMessage();		
	});
	
	$(window).scroll(function() {
		// 导航栏的显示与隐藏
		var scrollTop = $(document).scrollTop();
		var mainTop = $('#main').offset().top;
		if (scrollTop >= mainTop) {
			$('#nav').fadeIn(300);
		} else {
			$('#nav').fadeOut(300);
		}
		
		// 导航定位，对应锚点高亮显示
		var nav = $('#nav');
		var items = $('#main').find('.bg-width');		
		var currentId = "";
		items.each(function() {
			var m = $(this);
			var itemTop = m.offset().top;
			if(scrollTop > itemTop - 200) {
				currentId = "#" + m.attr('id');
			}else {
				return false;
			}
		});
		var currentLink = nav.find(".current");
		if(currentId && currentLink.attr("data-id") != currentId){
			currentLink.removeClass("current");
			nav.find('a[data-id='+ currentId +']').addClass("current");
		}
	});

	// 文本框聚焦时，隐藏错误信息
	$("#form input[type='text']").focus(function(){
		hideErrortip();
	});
	$("#require").focus(function(){
		hideErrortip();
	});
});

// 网页定位导航缓动效果
function ScrollToTarget(target) {
	var aLink = $(target).index();
	switch (aLink) {
	case 0:
		var itemTop1 = $('#item1').offset().top;
		$("html,body").animate({
			scrollTop : itemTop1 -10
		}, 500);
		break;
	case 1:
		var itemTop2 = $('#item2').offset().top;
		$("html,body").animate({
			scrollTop : itemTop2 + 206
		}, 500);
		break;
	case 2:
		var itemTop3 = $('#item3').offset().top;
		$("html,body").animate({
			scrollTop : itemTop3 - 6
		}, 500);
		break;
	case 3:
		var itemTop4 = $('#item4').offset().top;
		$("html,body").animate({
			scrollTop : itemTop4 + 166
		}, 500);
		break;
	case 4:
		var itemTop5 = $('#item5').offset().top;
		$("html,body").animate({
			scrollTop : itemTop5 - 54
		}, 500);
		break;
	case 5:
		var itemTop6 = $('#item6').offset().top;
		$("html,body").animate({
			scrollTop : itemTop6 + 210
		}, 500);
		break;
	default:
		break;
	}
}
// 隐藏提示信息
function hideErrortip() {
	$(".error-tips").css('visibility','hidden');
}
// 发送留言
function sendMessage() {
	var contact = new Object();
	contact.name = $.trim($("#name").val());
	contact.telephone = $.trim($("#tel").val());
	contact.qq = $.trim($("#QQ").val());
	contact.content = $.trim($("#require").val());
	var data = JSON.stringify(contact);
	if (contact.name.length == 0 || contact.telephone.length == 0 ||
			 contact.qq.length == 0|| contact.content.length == 0) {
		$(".error-tips").text("请将所有信息填写完整！");
		$(".error-tips").css('visibility','visible');	
	} else {
		if (!checkTel() || !checkQQ()) {
			return;
		}else{
			$('.mask').show();
			hideErrortip();
			$.post("sendEmail", {
				"data":data
            }, function(result) {
				if (result == 'success') {
					window.open("success.html");
					// 清空数据	
					$('#name').val('');
					$('#tel').val('');
					$('#QQ').val('');
					$('#require').val('');
					$('.mask').hide();
				} else {
					$(".error-tips").text('邮件发送失败，请稍候重新发送！');
					$(".error-tips").css('visibility','visible');
					$('.mask').hide();
				}
			});
		}
	}
}

function hideErrortip() {
	$(".error-tips").css('visibility','hidden');
}

// 验证电话
function checkTel() {
	var tel = $.trim($("#tel").val());

	if (tel && tel.length > 0) {
		if (!(/(^(0[0-1]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^0?[1][34578][0-9]{9}$)/.test(tel))) {
			$(".error-tips").text('您的电话输入有误，请重新输入');
			$(".error-tips").css('visibility','visible');
			return false;
		}else {
			return true;
		}
	}
}

// 验证QQ
function checkQQ() {
	var QQ = $.trim($("#QQ").val());
	if (QQ && QQ.length > 0) {
		if (!(/^[1-9]([0-9]{5,11})$/.test(QQ))) {
			$(".error-tips").text('QQ输入有误，请重新输入');
			$(".error-tips").css('visibility','visible');
			return false;
		}else {
			return true;
		}
	}	
}


/*
var sUserAgent = navigator.userAgent.toLowerCase();
var pc=sUserAgent.match(/windows/i) == "windows";
*/
