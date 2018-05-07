/*
 文件名:S-lx-maplxgh.js
创建人:黄清华
类型:js
创建日期:
最新修改日期:
 */
//创建和初始化地图函数：
function initMap() {
	createMap();// 创建地图
	setMapEvent();// 设置地图事件
	addMapControl();// 向地图添加控件
}
function createMap() {
	map = new BMap.Map("dituContent");
	map.centerAndZoom(new BMap.Point(116.403874, 39.914889), 6);
}
function setMapEvent() {
	map.enableScrollWheelZoom();
	map.enableKeyboard();
	map.enableDragging();
	map.enableDoubleClickZoom();
}
// 向地图添加控件
function addMapControl() {
	var scaleControl = new BMap.ScaleControl({
		anchor : BMAP_ANCHOR_BOTTOM_LEFT,
		offset : new BMap.Size(10, 60)
	});
	scaleControl.setUnit(BMAP_UNIT_METRIC);
	
	map.addControl(scaleControl);
	var navControl = new BMap.NavigationControl({
		anchor : BMAP_ANCHOR_TOP_LEFT,
		type : 0
	});
	map.addControl(navControl);
	var overviewControl = new BMap.OverviewMapControl({
		anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
		isOpen : false
	});
	map.addControl(overviewControl);
}
var map;
var tj;
var lxpts = [];// 坐标集合
var zlc;// 具体路线信息框
initMap();// 初始地图


var _SITESHOWORHIDEFLAG=true;//站点名称显示隐藏的判断条件
map.addEventListener("zoomend", function() {
	if(map.getZoom()>=10&&_SITESHOWORHIDEFLAG){
		if(null!=arforpf&&arforpf.length>0){
			for (var g = 0; g < arforpf.length; g++) {
				arforpf[g].getLabel().show();
			}
		}
		_SITESHOWORHIDEFLAG=false;//站点名称显示隐藏的判断条件
	}else{
		if(null!=arforpf&&arforpf.length>0){
			for (var g = 0; g < arforpf.length; g++) {
				arforpf[g].getLabel().hide();
			}
		}
		_SITESHOWORHIDEFLAG=true;//站点名称显示隐藏的判断条件
	}
});



var options = {
	onSearchComplete : function(results) {
		if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
			// 获取第一条方案
			var plan = results.getPlan(0);
			// 获取方案的驾车线路
			var route = plan.getRoute(0);
			zlc = plan.getDistance(true);
			// 获取每个关键步骤,并输出到页面
			var s = [];
			for (var i = 0; i < route.getNumSteps(); i++) {
				var step = route.getStep(i);
				s
						.push("<span style='margin-left: 20px;  text-align: start;  width: 260px;  display: block;'>"
								+ (i + 1)
								+ ") "
								+ step.getDescription()
								+ "</span>");
			}
			document.getElementById("resplan").innerHTML = s.join("<hr/>");
			var pts = plan.getRoute(0).getPath();
			var pt = new BMap.Point(114.31911,37.096642);
			var ply = new BMap.Polyline(pts);
			var result = BMapLib.GeoUtils.isPointOnPolyline(pt, ply);
			/*var dds = new BMap.Marker(pt, {
				icon : bzd
			});
			map.addOverlay(dds);*/
			/*if (result == true) {
				// alert("点在折线上");
			} else {
				// alert("点在折线外");
			}*/
			// 获取方案的驾车线路
			var points = plan.getDragPois();
			lxpts = "";
			for (var j = 0; j < points.length; j++) {
				lxpts = lxpts + points[j].point.lng + "," + points[j].point.lat
						+ "|";
			}
			lxpts = lxpts.substring(0, lxpts.length - 1);
			savepoints(start, lxpts, end);
		}
	},
	renderOptions : {
		map : map,
		panel : "",
		enableDragging : true
	// 起终点可进行拖拽
	}
};
var driving = new BMap.DrivingRoute(map, options);// policy:BMAP_DRIVING_POLICY_AVOID_HIGHWAYS

// 查询路线
function searchlx(strat, pt, end) {
	slng = start.split(",")[0];// 分割
	slat = start.split(",")[1];
	elng = end.split(",")[0];
	elat = end.split(",")[1];// end
	if (pt == null || pt == "") {// 没有经过点
		driving.search(new BMap.Point(slng, slat), new BMap.Point(elng, elat));
	} else {// 有经过点
		driving.search(new BMap.Point(slng, slat), new BMap.Point(elng, elat),
				{
					waypoints : pt
				});
	}
}
// 线路拖动后的回调方法，给具体路线的div放值
driving.setPolylinesSetCallback(function(routes) {
	var plan = driving.getResults().getPlan(0);
	var totalMileage = plan.getDistance(true);
	totalMileage = totalMileage.substring(0,totalMileage.length-2);
	var pts = plan.getRoute(0).getPath();
	var paths = pts.length;//获得有几个点
	var routePointsString = "";
	for(var i=0;i<paths;i++){
		routePointsString +=pts[i].lng + "," + pts[i].lat + "|";
		
	}
	if(paths>0){
		routePointsString = routePointsString.substring(0, routePointsString.length - 1);
	}
	document.getElementById("pointsString").value = routePointsString;
	zlc = zlc.substring(0, zlc.length - 2);
	document.getElementById("lcs").value = zlc;
	document.getElementById("resplan").style.height = "200px";
});

// 把必须的值保存到隐藏（包括id，和坐标的集合）
function savepoints(start, pts, end) {
	var slng, slat;// 开始lng,lat
	var elng, elat;// 结束
	slng = start.split(",")[0];// 分割
	slat = start.split(",")[1];
	elng = end.split(",")[0];
	elat = end.split(",")[1];// end
	var ptsinput = document.getElementById("pst");
	var ptsstring = slng + "," + slat + "|" + pts + "|" + elng + "," + elat;
	ptsinput.value = ptsstring;
}
// linid,name,bh,type,lc ,bz ,cid,zb
// 修改方法，获取单条记录把值塞入
function craetelinforupdate(linid, name, bh, type, lc, bz, cid, zb) {
	$("#linbx").attr("disabled", true);
	document.getElementById("linid").value = linid;
	document.getElementById("xlname").value = name;
	document.getElementById("linbh").value = bh;
	document.getElementById("linfatype").value = type;
	document.getElementById("lcs").value = lc;
	document.getElementById("linbz").value = bz;
	document.getElementById("hdid").value = cid;
	document.getElementById("pst").value = zb;
	var arr = new Array();
	arr = zb.split("|");// 按照，把坐标分割
	for(var i = 0 ;i<arr.length;i++)
	 {
	   if(arr[i] == "" || typeof(arr[i]) == "undefined")
	    {
	    arr.splice(i,1);
	    i= i-1;
	    }
	 }
	start = arr[0];// 获取第一个为起始坐标
	end = arr[arr.length - 1];
	// 起始 结尾坐标对象生成end
	var uplng, uplat;// 经过点的分割接收
	for (var x = 1; x < arr.length - 1; x++) {
		uplng = arr[x].split(",")[0];// 分割
		uplat = arr[x].split(",")[1];
		pts[x - 1] = new BMap.Point(uplng, uplat);// 生成经过点集合
	}
	searchlx(start, pts, end);// 调用方法
}
// 创建线路s
var start = "", end = "";
var ptp = "";
var pts = [];
/*
 * var pstart="",pend="",cpt=""; var psran=0,peran=0, cpran=0;
 */
var addpot = "";
function savecjxl() {
	var linname=$("#linbx").select2('data').text;
	$.ajax({
		type : "POST",
		url : "maplin.do?method=checkname",
		data : {
			linname : linname
		},
		success : function(msg) {
			if (msg == "ok") {
				$("#bclin").attr("disabled", false);
				$("#bcxjlin").attr("disabled", false);
				$("#bclin").css("background", "");
				$("#bcxjlin").css("background", "");
				var lxid = $("#linbx").select2("val");
				if (lxid != "") {
				$.getJSON("maplin.do?method=getlinnameandno", {
					"lxid" : lxid
				}, function(msg) {
				$("#xlname").val(msg[0].name);
				$("#linbh").val(msg[0].no);
				});
					$.getJSON("maplin.do?method=getlinbyid", {
						"lxid" : lxid
					}, function(msg) {
						start = "";
						end = "";
						ptp = "";
						addpot = "";
						$("#hdid").val(msg[0].id);
						$(msg).each(function(i) {
							if (msg[i].fl == "1") {
								start = msg[i].pt;
							} else if (msg[i].fl == "0") {
								end = msg[i].pt;
							} else {
								ptp += msg[i].pt + "|";
							}
							if (typeof msg[i].allpt != "undefined") {
								addpot += msg[i].allpt + "@";
							} else {
								addpot += msg[i].ran + "#" + msg[i].pt + "@";
							}
						});
						createpyandmar(addpot);
						var szlng, szlat;// 开始lng,lat
						ptp = ptp.substring(0, ptp.length - 1);
						if(ptp!=""){
							var arr = new Array();
							arr = ptp.split("|");
							for (var x = 0; x < arr.length; x++) {
								szlng = arr[x].split(",")[0];// 分割
								szlat = arr[x].split(",")[1];
								pts[x] = new BMap.Point(szlng, szlat);
							}
						}
						searchlx(start, pts, end);
					});
				} else {
					$.messager.alert('创建线路', '班线获取失败', 'info');
				}
			} else {
				$.messager.alert('添加线路', '不可创建重复线路,当前班线已有对应线路', 'info');
				$("#bclin").attr("disabled", true);
				$("#bcxjlin").attr("disabled", true);
				$("#bclin").css("background", "#cccccc");
				$("#bcxjlin").css("background", "#cccccc");
 			}
		}
	});
}
// 创建线路e
// 创建区域和旗子
function createpyandmar(allpts) {
	map.clearOverlays();
	var aplng, aplat;
	allpts = allpts.substring(0, allpts.length - 1);
	var arr = new Array();
	arr = allpts.split("@");// 做一个坐标分开
	for (var x = 0; x < arr.length; x++) {
		createzd(arr[x]);
	}
}
// label.setTitle(name); 为label添加鼠标提示
var bzd = new BMap.Icon("images/t3.png", new BMap.Size(50, 50), {
	anchor : new BMap.Size(45, 47)
});

function createzd(onept) {
	if (onept.indexOf("#") > 0) {// 点圆标注
		x = onept.split("#")[1].split(",")[0];
		y = onept.split("#")[1].split(",")[1];
		ran = onept.split("#")[0];
		var point = new BMap.Point(x, y);
		var d = new BMap.Marker(point, {
			icon : bzd
		});
		var cir = new BMap.Circle(point,ran, {
			fillColor : "red",
			strokeWeight : 1,
			fillOpacity : 0.3,
			strokeOpacity : 0.3
		});
		map.addOverlay(d);
		map.addOverlay(cir);
	} else if (onept.indexOf("|") > 0) {// 多边形标注
		var one=onept.split("|");
		var x,y;var apt=[];
		q=one[0].split(",")[0];
		z=one[0].split(",")[1];
		for(var o=1;o<one.length;o++){
			x=one[o].split(",")[0];
			y=one[o].split(",")[1];
			apt[o-1]=new BMap.Point(x,y);
		}
		var polyline = new BMap.Polygon(apt,{
			strokeColor : "red",
			strokeWeight : 3,
			fillOpacity : 0,
			strokeOpacity : 0.5,
			strokeStyle : 'soild'
		}); 
		map.addOverlay(polyline);
		p=new BMap.Point(q,z);
		var e = new BMap.Marker(p, {
			icon : bzd
		});
		map.addOverlay(e);
	} else {// 万一：有无距离坐标点生成旗子
		a=onept.split(",")[0];
		b=onept.split(",")[1];
		p=new BMap.Point(a,b);
		var c = new BMap.Marker(p, {
			icon : bzd
		});
		map.addOverlay(c);
	}
}
// end
// 保存线路并新建s
function savelx() {
	var s = document.getElementById("xlname").value;
	var cd = document.getElementById("lcs").value;
	var pts = document.getElementById("pst").value;
	if($("#mylxform").validationEngine('validate')){
	  	//可提交
		if (s == "") {
			//$.messager.alert('添加线路', '线路名称不能为空', 'info');
		} else if (cd == "" || cd == "单位千里" || isNaN(cd)) {
			//$.messager.alert('添加线路', '里程填写不正确', 'info');
		} else if (pts == "") {
			//	$.messager.alert('添加线路', '未创建路线', 'info');
		} else {
			document.getElementById("mylxform").action = "maplin.do?method=savexlpts";
			document.getElementById("mylxform").submit();
		}
	  }else{
	    $.messager.alert('添加线路', '必填信息不可为空', 'info');
	  }
}// 保存线路并新建e

// 保存线路s
function savelxcx() {
	//var routePointsString = document.getElementById("pointsString").value;
	/*var pointarray=[];
	pointarray = routePointsString.split("|");
	alert(pointarray.length);*/
	//console.log(routePointsString);
	var s = document.getElementById("xlname").value;
	var cd = document.getElementById("lcs").value;
	var pts = document.getElementById("pst").value;
	if($("#mylxform").validationEngine('validate')){
	  	//可提交
		if (s == "") {
			//$.messager.alert('添加线路', '线路名称不能为空', 'info');
		} else if (cd == "" || cd == "单位千里" || isNaN(cd)) {
			//$.messager.alert('添加线路', '里程填写不正确', 'info');
		} else if (pts == "") {
			///$.messager.alert('添加线路', '未创建路线', 'info');
		} else {
			//document.getElementById("mylxform").action = "maplin.do?method=savexlptsgo";
			//document.getElementById("mylxform").submit();
			$.ajax({
				type : "POST",
				async : false,
				url : 'maplin.do?method=savexlptsgo',
				data : $('#mylxform').serialize(),
				success : function(data) {
				if(data){
		  			parent.layer.msg('保存成功');
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index);
					
				}else{
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index);
					parent.layer.msg('保存失败');
				}
			
				}
			});
		}
	}else{
	    $.messager.alert('添加线路', '必填信息不可为空', 'info');
	}
}
// 保存线路e

// 选择类型
function sw(obj) {
	if (obj.value == 0) {
		driving.setPolicy();
	} else if (obj.value == 1) {
		driving.setPolicy(BMAP_DRIVING_POLICY_AVOID_HIGHWAYS);
	} else if (obj.value == 2) {
		driving.setPolicy(BMAP_DRIVING_POLICY_LEAST_TIME);
	} else if (obj.value == 3) {
		driving.setPolicy(BMAP_DRIVING_POLICY_LEAST_DISTANCE);
	}
	searchlx(start, pts, end);
}
// 检查名字是否存在
function checkname(obj) {
	var linname = obj.value;
	$.ajax({
		type : "POST",
		url : "maplin.do?method=checkname",
		data : {
			linname : linname
		},
		success : function(msg) {
			if (msg == "ok") {
				$("#bclin").attr("disabled", false);
				$("#bcxjlin").attr("disabled", false);
				$("#bclin").css("background", "");
				$("#bcxjlin").css("background", "");
			} else {
				$.messager.alert('添加线路', '线路名称重复', 'info');
				$("#bclin").attr("disabled", true);
				$("#bcxjlin").attr("disabled", true);
				$("#bclin").css("background", "#cccccc");
				$("#bcxjlin").css("background", "#cccccc");
 			}
		}
	});
}
// end

function cleanall(){
	map.setZoom(6);
	map.panTo(new BMap.Point(116.403874, 39.914889));
	map.clearOverlays(); 
	document.getElementById("xlname").value="";
	document.getElementById("linbh").value="";
	document.getElementById("linfatype").value="0";
	document.getElementById("lcs").value="0";
	document.getElementById("linbz").value="";
	$("#linbx").select2("val","");
}

// 返回
function backto() {
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index);
	/*document.getElementById("bc").action = "maplin.do?method=golin";
	document.getElementById("bc").submit();*/
}

// div特效jquery区
$(document).ready(function() {
	 $("#mylxform").validationEngine('attach', { 
		 promptPosition:'centerLeft:45,-35'/*'topRight:-50,0'*/,
		 autoPositionUpdate:true,
		 scroll:false,
		 maxErrorsPerField:1,
		 autoHidePrompt:true,//	是否自动隐藏提示信息
		 autoHideDelay:1000
		 });
	
	
	$("#sms").click(function() {
		$("#mins").fadeIn(1000);
		$("#maxs").animate({
			left : '-=450px',
		});
	});
	$("#mins").click(function() {
		$("#mins").fadeOut(000);
		$("#maxs").animate({
			left : '+=450px',
		});
	});
});