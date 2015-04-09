var timer;

(function(){
	//刷新间隔label
	var interval = $("<span>刷新间隔：</span>");
	interval.attr("style", interStyle);
	//添加输入框
	var input = $("<input type='text' id='min' value='10S为单位'/>");
	input.attr("style", inputStyle);
	input.bind("focus", function(){
		if(typeof($(this).val()) != "number")
			$(this).val("");
	});
	input.bind("focusout", function(){
		if($(this).val() == "")
			$(this).val("10S为单位");
	});
	//添加刷新按钮
	var button = $("<input type='button' id='timer' value='开始刷新'/>");
	button.bind("click", function(e){
		if($(this).val() == "开始刷新"){
			$(this).val("停止刷新");
			var min = $("#min").val();
			if(typeof(min) != "number" || min == undefined || min <= 0)
				min = 5;
			timer = setTimeout(exec, min * 1000);
			localStorage.setItem("min", min);
		} else if($(this).val() == "停止刷新"){
			$(this).val("开始刷新");
			clearTimeout(timer);
			localStorage.setItem("min", 0);
		}
	});
	//起止时间label
	var label = $("<span>起止时间:</span>");
	label.attr("style", labelStyle);
	//起止时间input
	var start = $("<input type='text' id='start' value='开始时间'/>");
	start.attr("style", inputStyle);
	start.bind("focus", function(){
		if(typeof($(this).val()) != "number")
			$(this).val("");
	});
	start.bind("focusout", function(){
		if($(this).val() == "")
			$(this).val("开始时间");
	});
	//起止时间input
	var end = $("<input type='text' id='start' value='结束时间'/>");
	end.attr("style", inputStyle);
	end.bind("focus", function(){
		if(typeof($(this).val()) != "number")
			$(this).val("");
	});
	end.bind("focusout", function(){
		if($(this).val() == "")
			$(this).val("结束时间");
	});
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(interval);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(input);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(label);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(start);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(end);	
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(button);
	
	//执行刷新
	var tempMin = localStorage.getItem("min");
	if(tempMin == undefined || tempMin == "" || tempMin == "0")
		console.log(tempMin);
	else {
		$("#timer").val("停止刷新");
		$("#input").val(tempMin);
		timer = setTimeout(exec, Number(tempMin) * 1000);
	}
	
	//处理返回数据
	var s = $("#start").val(), e = $("#end").val();
	if(typeof(s) != "number" || s < 7)
		s = 7;
	if(typeof(e) != "number" || e > 20)
		e = 20;
	//$("#ctl00_ContentPlaceHolder2_GridView1 tr:contains('普桑')").remove();
	$("#ctl00_ContentPlaceHolder2_gvCoachInfo tr:contains('可预约')").each(function(index, tr){
		var tds = $(tr).children();
		tds.each(function(i,td){
			if((s-5) < i && (e - 5) > i){
				if($(td).text() == "可预约" && $(tds.get(i+1)).text() == "可预约"){
					$("#timer").val("开始刷新");
					clearTimeout(timer);
					localStorage.setItem("min", 0);
					notifyMe();
				}
			}
		});
	});
	
})();

function exec(){
	$("#__VIEWSTATE").val(token);
	$("input[name='ctl00$ContentPlaceHolder2$txtBookingClassDate']").change();
};

function notifyMe() {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}else if (Notification.permission === "granted") {
		var notification = new Notification("提醒",{
			icon: "/image/logo.png",
			body: "可以预约了！"
		});
	}else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			if(!('permission' in Notification)) {
				Notification.permission = permission;
			}
			if (permission === "granted") {
				var notification = new Notification("提醒",{
					icon: "/image/logo.png",
					body: "可以预约了！"
				});
			}
		});
	}
}
