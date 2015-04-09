var timer;

(function(){
	
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
	//添加输入框
	var input = $("#<input type='text' id='min' value='10S为单位'/>");
	input.bind("focus", function(){
		if(typeof($(this).val()) != "number")
			$(this).val("");
	});
	input.bind("focusout", function(){
		if($(this).val() == "")
			$(this).val("10S为单位");
	});
	var interval = $("<span>刷新间隔：</span>");
	interval.attr("style", interStyle);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(interval);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(input);
	$("#ctl00_ContentPlaceHolder2_lblInfo").parent().parent().parent().parent().before(button);
	
	//执行刷新
	var tempMin = localStorage.getItem("min");
	if(tempMin == undefined || tempMin == "" || tempMin == "0")
		console.log(tempMin);
	else {
		$("#timer").val("停止刷新");
		timer = setTimeout(exec, Number(tempMin) * 1000);
	}
	
	//处理返回数据
	console.log($("#ctl00_ContentPlaceHolder2_gvCoachInfo tr:contains('可预约')"));
	//$("#ctl00_ContentPlaceHolder2_GridView1 tr:contains('普桑')").remove();
	$("#ctl00_ContentPlaceHolder2_gvCoachInfo tr:contains('可预约')").each(function(index, tr){
		var flag = false;
		$(tr).children().each(function(i,td){
			if(i == 6 && $(td).text() == "可预约")
				flag = true;
			if(flag && (i == 7 && $(td).text() == "可预约")){
				clearTimeout(timer);
				localStorage.setItem("min", 0);
				notifyMe();
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
