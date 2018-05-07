document.write('<a href="http://www.51.la/?2131133" title="51.La &#x7F51;&#x7AD9;&#x6D41;&#x91CF;&#x7EDF;&#x8BA1;&#x7CFB;&#x7EDF; VIP &#x7528;&#x6237;" target="_blank">&#x8D35;&#x5BBE;&#x7EDF;&#x8BA1;</a>\n');
var a1133tf = "51la";
var a1133pu = "";
var a1133pf = "51la";
var a1133su = window.location;
var a1133sf = document.referrer;
var a1133of = "";
var a1133op = "";
var a1133ops = 1;
var a1133ot = 1;
var a1133d = new Date();
var a1133color = "";
if (navigator.appName == "Netscape") {
	a1133color = screen.pixelDepth;
} else {
	a1133color = screen.colorDepth;
}
try {
	a1133tf = top.document.referrer;
} catch (e) {}
try {
	a1133pu = window.parent.location;
} catch (e) {}
try {
	a1133pf = window.parent.document.referrer;
} catch (e) {}
try {
	a1133ops = document.cookie.match(new RegExp("(^| )AJSTAT_ok_pages=([^;]*)(;|$)"));
	a1133ops = (a1133ops == null) ? 1 : (parseInt(unescape((a1133ops)[2])) + 1);var a1133oe = new Date();
	a1133oe.setTime(a1133oe.getTime() + 60 * 60 * 1000);
	document.cookie = "AJSTAT_ok_pages=" + a1133ops + ";path=/;expires=" + a1133oe.toGMTString();
	a1133ot = document.cookie.match(new RegExp("(^| )AJSTAT_ok_times=([^;]*)(;|$)"));
	if (a1133ot == null) {
		a1133ot = 1;
	} else {
		a1133ot = parseInt(unescape((a1133ot)[2]));
		a1133ot = (a1133ops == 1) ? (a1133ot + 1) : (a1133ot);
	}
	a1133oe.setTime(a1133oe.getTime() + 365 * 24 * 60 * 60 * 1000);
	document.cookie = "AJSTAT_ok_times=" + a1133ot + ";path=/;expires=" + a1133oe.toGMTString();
} catch (e) {}
try {
	if (document.cookie == "") {
		a1133ops = -1;
		a1133ot = -1;
	}
} catch (e) {}
a1133of = a1133sf;
if (a1133pf !== "51la") {
	a1133of = a1133pf;
}
if (a1133tf !== "51la") {
	a1133of = a1133tf;
}
a1133op = a1133pu;try {
	lainframe
} catch (e) {
	a1133op = a1133su;
}
a1133src = '//web.users.51.la/go.asp?svid=6&id=2131133&tpages=' + a1133ops + '&ttimes=' + a1133ot + '&tzone=' + (0 - a1133d.getTimezoneOffset() / 60) + '&tcolor=' + a1133color + '&sSize=' + screen.width + ',' + screen.height + '&referrer=' + escape(a1133of) + '&vpage=' + escape(a1133op) + '&vvtime=' + a1133d.getTime();
setTimeout('a1133img = new Image;a1133img.src=a1133src;', 0);