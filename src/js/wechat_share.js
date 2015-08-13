var v_number  = document.querySelector('.v-number'),
 	v_recom_close = document.querySelector('.v-close'),
 	v_recom   = document.querySelector('.v-recom'),
 	subscribe_text = document.querySelector('.subscribe-text'),
 	share     = document.querySelector('.share-social'),
	forward   = document.querySelector('#icon-f'),
	wechat    = document.querySelector('.wechat'),
	qq        = document.querySelector('.qq'),
	weibo     = document.querySelector('.weibo'),
	qzone     = document.querySelector('.qzone'),
	share_send   = document.querySelector('#shareSend'),
	yk_winsha = document.querySelector('.yk-winshare'),
	share_close = document.querySelector('.share-close'),
	teledrama_list = document.querySelector('.teledrama-list'),
	current_list = document.querySelector('.current-list'),
	more_list = document.querySelector('.more-list'),
	interval_list = document.querySelector('.interval-list'),
	display_all = document.querySelector('.display-all'),
	watch_later = document.querySelector('#watch-later'),
	tbd    = document.querySelector('.tbd'),
	broadcast_wrap = document.querySelector('.broadcast-wrap'),
	broadcast_show = document.querySelector('.broadcast-more'),
	broadcast_ico = document.querySelector('.broadcast-h .more-ico');

var shareTo = (function () {
	var weiboUrl = 'http://service.weibo.com/share/share.php?url=',
	 	qzoneUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=',
	 	qqUrl    = 'http://connect.qq.com/widget/shareqq/index.html?url=',
		_shareWeibo = function () {
			location.href = weiboUrl + document.URL + '&title=' + document.title;
		},
		_shareQzone = function () {
			location.href = qzoneUrl + document.URL + '&title=' + document.title;
		},
		_shareQq = function () {
			location.href = qqUrl + document.URL + '&title=' + document.title + '&style=201&width=32&height=32';
		};
	return {
		shareWeibo : _shareWeibo,
		shareQzone : _shareQzone,
		shareQq    : _shareQq
	};
})();

v_number.addEventListener('touchstart', function() {
	v_recom.classList.add('active');
}, false);

v_recom_close.addEventListener('touchstart', function() {
	v_recom.classList.remove('active');
}, false);

broadcast_show.addEventListener('click', function() {
	if(!broadcast_wrap.classList.contains('block')){
		broadcast_wrap.classList.add('block');
		broadcast_ico.classList.add('active');
	}else{
		broadcast_wrap.classList.remove('block');
		broadcast_ico.classList.remove('active');
	}
});

forward.addEventListener('touchstart', function (e) {
	if(!share.classList.contains('block')) {
		share.classList.add('block');
	}else {
		share.classList.remove('block');
	}
}, false);

share_close.addEventListener('touchstart', function () {
	if(share.classList.contains('block')) {
		forward.classList.remove('act');
		share.classList.remove('block');
	}
}, false);

wechat.addEventListener('touchstart', function () {
	if(share_send.classList.contains('none')) {
		share_send.classList.remove('none');
	}
}, false);

qq.addEventListener('touchstart', function () {
	shareTo.shareQq();
}, false);

weibo.addEventListener('touchstart', function () {
	shareTo.shareWeibo();
}, false);

qzone.addEventListener('touchstart', function () {
	shareTo.shareQzone();
}, false);

share_send.addEventListener('touchstart', function () {
	if(!share_send.classList.contains('none')) {
		share_send.classList.add('none');
	}
}, false);

window.onload = function() {
	if(current_list) {
		current_list.addEventListener('touchstart', function() {
			if(!current_list.classList.contains('rotate')) {
				current_list.classList.add('rotate');
				more_list.classList.add('block');
			}else {
				current_list.classList.remove('rotate');
				more_list.classList.remove('block');
			}
		}, false);
	}
	if(display_all) {
		display_all.addEventListener('touchstart', function() {
			teledrama_list.replaceChild(interval_list, display_all);
		}, false);
	}
}

<!-- 关于分享到朋友圈的js代码开始 -->
//shareTitle表示在朋友圈内显示时展现的图片,需替换为相应的的头图
var imgUrl = "http://10.10.63.49/mobile/demo/images/video_bg.jpg";
//lineLink表示链接地址,需替换为相应的链接
var lineLink = document.URL//"http://10.10.63.49/mobile/wechat_share.php";
var descContent = "";
//shareTitle表示在朋友圈内显示时内容的描述,需替换为相应的描述
var shareTitle = document.title;
var appid = "";
function shareFriend(){
	WeixinJSBridge.invoke(
		"sendAppMessage",
		{"appid":appid,"img_url":imgUrl,"img_width":"200","img_height":"200","link":lineLink,"desc":descContent,"title":shareTitle},
		function(a){}
	);
};
function shareTimeline(){
	WeixinJSBridge.invoke(
		"shareTimeline",
		{"img_url":imgUrl,"img_width":"200","img_height":"200","link":lineLink,"desc":descContent,"title":shareTitle},
		function(a){}
	);
};
function shareWeibo(){
	WeixinJSBridge.invoke(
		"shareWeibo",
		{"content":descContent,"url":lineLink,},
		function(a){}
	);
};
document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
WeixinJSBridge.on("menu:share:appmessage",function(a){
	shareFriend();
});
WeixinJSBridge.on("menu:share:timeline",function(a){
	shareTimeline();
});
WeixinJSBridge.on("menu:share:weibo",function(a){
	shareWeibo();
});
},false);
<!-- 关于分享到朋友圈的js代码结束 -->