var HTTP_REQUEST_TYPE_KEY = "X-Requested-With";
var HTTP_REQUEST_TYPE_AJAX = "XMLHttpRequest";

/**
 * 所有页面初始化时都要执行的函数
 */
$(document).ready(function(){
	//禁用所有的input的按回车就提交功能
	$("input").attr("onkeydown","if(event.keyCode==13){return false;}");
	//ajax预处理
	$.ajaxPretrate();
})
/**
 * ajax预处理
 */
jQuery.extend({ajaxPretrate:function(){
	$(document).ajaxSend(function(event,XMLHttpRequest,options){
		XMLHttpRequest.setRequestHeader(HTTP_REQUEST_TYPE_KEY, HTTP_REQUEST_TYPE_AJAX);
	}).ajaxStart(function() {
		$.forbidALL();
	}).ajaxSuccess(function(event, XMLHttpRequest, ajaxOptions) {
		$.ajaxSuccessException(event, XMLHttpRequest, ajaxOptions);
	}).ajaxError(function(event, XMLHttpRequest, ajaxOptions, thrownError) {
		$.ajaxErrorException(event, XMLHttpRequest, ajaxOptions);
	}).ajaxComplete(function() {
		$.allowAll();
	});
}});

jQuery.extend({
	forbidALL:function(){
		$.addScreen();
	},
	allowAll:function(){
		$.deleteScreen();
	}
});

jQuery.extend({
	addScreen:function(){
		$("#positionDisable").append("<div id = 'ajaxScreen' style='position:absolute;top:0px;'></div>");
		$("#ajaxScreen").css({
			height:document.body.scrollHeight,
			width:document.body.scrollWidth,
			"background-color":"rgba(1,1,1,0)",
		})
	},
	deleteScreen:function(){
		$("#ajaxScreen").remove();
	}
});

jQuery.extend({
	ajaxErrorException:function(event, XMLHttpRequest, ajaxOptions){
		alert("连接失败");
	}
});

jQuery.extend({
	ajaxSuccessException:function(event, XMLHttpRequest, ajaxOptions){
		return;
	}
});

/**
 * 递归循环来对一个js对象进行转义
 */
jQuery.extend({objectConvert:function(o){
	for(var name in o){
		if(o[name]==null){
			o[name] = "";
		}else{
			if(typeof o[name] =="object"){
				$.objectConvert(o[name]);
			}else{
				o[name] = $.stringConvert(o[name]);
			}
		}
	}
	return o;
}});

/**
 * 对一个字符串进行转义
 */
jQuery.extend({stringConvert:function(string){
	if (string != null&&(typeof string === "string")) {
		string = string.replace(/&/ig, "&amp;");
		string = string.replace(/ /ig, "&nbsp;");
		string = string.replace(/</ig, "&lt;");
		string = string.replace(/>/ig, "&gt;");
		string = string.replace(/'/ig, "&apos;");
		string = string.replace(/"/ig, "&quot;");
        string = string.replace(/\r\n|\r|\n|\n\r/ig, "<br>");
		string = string.replace(/'\'/g, "&#92;");
	}
	if(string==null){
		string = "";
	}
	return string;
}});

function callAjax(url, data, type, cache, dataType, callback) {
	if (url.indexOf('?') != -1) {
		url = url + '&random=' + Math.random();
	} else {
		url = url + '?random=' + Math.random();
	}
	$.ajax({
		url :  url,
		type : type,
		data : data,
		cache: cache,
		async : true,
		dataType: dataType,
		success : function(data) {
			callback(data);
		}
	});
}

