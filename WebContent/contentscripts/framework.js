(function(){
	var content = chrome.extension.getURL("contentscripts/content.js");
	var t = chrome.extension.getURL("contentscripts/constant.js");
	var contentS = $("<script></script>");
	var tS = $("<script></script>");
	contentS.attr("src", content);
	tS.attr("src", t);
	$("head").append(tS);
	$("head").append(contentS);
})();