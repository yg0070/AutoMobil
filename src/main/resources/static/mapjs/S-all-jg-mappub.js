/*
 文件名:S-all_jg-mappub.js
创建人:黄清华
类型:js
创建日期:
最新修改日期:
 */
// 加载地图样式
/*var sel = document.getElementById('stylelist');
for ( var key in mapstyles) {
	var style = mapstyles[key];
	var item = new Option(style.title, key);
	sel.options.add(item);
}*/
var _LASTCAR="";
var map = new BMap.Map("dituContent");// 在百度地图容器中创建一个地图
var myDis = new BMapLib.DistanceTool(map);// 开启地图测距工具
// 获取通用Id的方法
function getfromid(obj) {
	return document.getElementById(obj);
}

var _ISGT = getfromid("slideThree").checked;//聚合判断
var _SWCO = getfromid("slideThree2").checked;//显示车号
var _XSCO = getfromid("xs").checked;//行驶
var _JZCO = getfromid("jz").checked;//静止
var _LXCO = getfromid("lx").checked;//离线
var _ALCO = getfromid("qc").checked;//所有
var _OLZD = getfromid("onlyzd").checked;//仅显示站点

// 全局变量
var ctrl;// 路况的全局变量
var sfz=true; //是否显示收费站
var xsname="收费站";
// 创建和初始化地图函数：
function initMap() {
	createMap();// 创建地图
	setMapEvent();// 设置地图事件
	addMapControl();// 向地图添加控件
}

// 创建地图函数：
function createMap() {
	var point = new BMap.Point(130.561564,35.786801);// 定义一个中心点坐标
	map.centerAndZoom(point, 5);// 设定地图的中心点和坐标并将地图显示在地图容器中
	window.map = map;// 将map变量存储在全局
	getfromid("bigmapleave").innerHTML = "地图级别: " + map.getZoom();
	getfromid("min").innerHTML = "<i class='fa fa-eye-slash'></i>地图级别: " + map.getZoom();

}
// 地图事件设置函数：
function setMapEvent() {
	map.enableDragging();// 启用地图拖拽事件，默认启用(可不写)
	map.enableScrollWheelZoom();// 启用地图滚轮放大缩小
	map.enableDoubleClickZoom();// 启用鼠标双击放大，默认启用(可不写)
	map.enableKeyboard();// 启用键盘上下左右键移动地图

}

// 地图控件添加函数：
function addMapControl() {
	// 向地图中添加缩放控件
	var opts = {
		type : BMAP_NAVIGATION_CONTROL_LARGE
	}; // 放大缩小样式
	map.addControl(new BMap.NavigationControl(opts));
	// 向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({
		anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
		isOpen : 0
	});
	map.addControl(ctrl_ove);
	// 向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({
		anchor : BMAP_ANCHOR_BOTTOM_LEFT
	});
	map.addControl(ctrl_sca);

	// 添加地图路况图控件
	var opts = {
		showPanel : false
	};
	ctrl = new BMapLib.TrafficControl(opts);
	map.addControl(ctrl);
	
	/*var stCtrl = new BMap.PanoramaControl(); //构造全景控件
	stCtrl.setOffset(new BMap.Size(20, 20));
	map.addControl(stCtrl);//添加全景控件
*/};

// 设置地图级别产生改变事件
var dtflag=false;//站点显示的标示
var loadmark=getfromid("loadzd").checked;
function updateloadtype(){//是否加载站点的选择
	if(getfromid("loadzd").checked){//如果checkbox被选中
		if(map.getZoom()>=10){//地图级别大于10
			startload();//开始加载站点
			dtflag=true;//标示改变
		}
	}else{
		loadmark=false;
		cleanallzd();
	}
}
function cleanallzd(){//清除所有站点
	if(arforclean!=null&&arforclean!=""&&arforclean.length>0){
		getfromid("loadzdname").checked=false;
		for (var int = 0; int < arforclean.length; int++) {
			arforclean[int].remove();
		}
		zdnamecheck=false;//checkbox的判断条件
		arforp=[];//保存所有站点区域
		arforr=[];//保存站点旗子
		arforpf=[];//保存站点文字
		arfora=[];//保存站点范围
		arforclean=[];
	}
}

//声明变量做显示站点名称的checkbox使用
var zdnamecheck=false;
map.addEventListener("zoomend", function() {
	getfromid("bigmapleave").innerHTML = "地图级别: " + map.getZoom();
	getfromid("min").innerHTML = "<i class='fa fa-eye-slash'></i>地图级别:" + map.getZoom();
	if (map.getZoom() < 12) {
		var allOverlay = map.getOverlays();
		for (var i = 0; i < allOverlay.length - 1; i++) {
		}
	}
	/*if(map.getZoom()<11){
		//getfromid("slideThree2").checked=false;
		//hidecarno();
	}*/
	if(map.getZoom()>=10&&dtflag==false&&loadmark==true){//地图级别=10
		startload();//开始加载站点
		dtflag=true;
		loadmark=false;
		zdnamecheck=true;
	}
	if(map.getZoom()>=10&&dtflag==true){
		showzdremark();
	}
	if(map.getZoom()<=9&&dtflag==true){
		hidezdremark();
	}
});

initMap();

map.enableScrollWheelZoom();
var myGeo = new BMap.Geocoder();
// 创建mark自定义图片
var nullcarIcon = new BMap.Icon("images/kc.png", new BMap.Size(34,35), {// 行驶图片
	imageOffset : new BMap.Size(0, 0),
	anchor : new BMap.Size(20, 20)
});
var carIcon = new BMap.Icon("images/zc.png", new BMap.Size(34,35), { // 静止图片
	imageOffset : new BMap.Size(0, 0),
	anchor : new BMap.Size(20, 20)
});
var nocarIcon = new BMap.Icon("images/lx.png", new BMap.Size(34,35), {// 离线图片
	imageOffset : new BMap.Size(0, 0),
	anchor : new BMap.Size(20, 20)
});


var markers = [];//行驶
var nullmarkers = [];//静止
var nomarkers = [];//离线
var labels = [];
var overlays = [];//全部车辆
var zcar = [];
var qcaar = [];
var zcxs = [];// 重车行驶
var zcjz = [];// 重车静止
var zclx = [];// 重车离线
var qcxs = [];// 轻车行驶
var qcjz = [];// 轻车静止
var qclx = [];// 轻车离线
var carAllMk=[];
var labelAll=[];
var dbna="";
// var pto = new Array();获取map加载的所有信息
var timecoloter=false;
$.ajaxSettings.async = false;
$.getJSON("map.do?method=loadmapinfo&dbname="+dbna, function(json) {
	$(json).each(function(i) {
		createmark(json[i]);
	});
	//setTimeout("markjh()",1000);
	addnum();
	timecoloter=true;
});

function fuzhi(dbname){
	dbna=dbname;
	map.clearOverlays();
	markerClusterer.clearMarkers();
	getmarkinfobydata();
}

if(timecoloter){//加载完毕更改timecoloter状态
	//setTimeout("dingshiCreate()",5000);
}
function getmarkinfobydata(){
	if(map.getInfoWindow()==null){
		_LASTCAR="";
		map.closeInfoWindow();
	}
	markerClusterer.clearMarkers();
	if(_LASTCAR!=""){//如果打开info则重新等位到该point
		for (var z = 0; z < overlays.length; z++) {
			if (overlays[z].getLabel().content == _LASTCAR) {
				var seach_points = overlays[z].point;
				overlays[z].setZIndex(99);
				careteinfor(seach_points, _LASTCAR);
				//map.setZoom(12);
				map.panTo(seach_points);
			}
		}
	}
	carAllMk=[];
	markers = [];	nullmarkers = [];	nomarkers = [];
	labels = [];	overlays = [];	zcar = [];	qcaar = [];	zcxs = [];// 重车行驶	
	zcjz = [];// 重车静止
	zclx = [];// 重车离线	
	qcxs = [];// 轻车行驶	
	qcjz = [];// 轻车静止	
	qclx = [];// 轻车离线
		$.ajaxSettings.async = false; 
		$.getJSON("map.do?method=loadmapinfo&dbname="+dbna, function(json) {
			$(json).each(function(i) {
				if(json[i]!=null&&json[i]!=""){
					createmark(json[i]);
				}
			});
		});
	//checkusersetting();
	//setTimeout("markjh()",100);
	addnum();
}

function dingshiCreate(){
	if(map.getInfoWindow()==null){
		_LASTCAR="";
		map.closeInfoWindow();
	}
	markerClusterer.clearMarkers();
	if(_LASTCAR!=""){//如果打开info则重新等位到该point
		for (var z = 0; z < overlays.length; z++) {
			if (overlays[z].getLabel().content == _LASTCAR) {
				var seach_points = overlays[z].point;
				overlays[z].setZIndex(99);
				careteinfor(seach_points, _LASTCAR);
				map.panTo(seach_points);
			}
		}
	}
	markers = [];	nullmarkers = [];	nomarkers = [];
	labels = [];	overlays = [];	zcar = [];	qcaar = [];	zcxs = [];// 重车行驶	
	zcjz = [];// 重车静止
	zclx = [];// 重车离线	
	qcxs = [];// 轻车行驶	
	qcjz = [];// 轻车静止	
	qclx = [];// 轻车离线
	$.ajaxSettings.async = false;
		var num=0;
		$.getJSON("map.do?method=loadmapinfo&dbname="+dbna, function(json) {
			$(json).each(function(i) {
				if(json[i]!=null&&json[i]!=""){
					createmark2(json[i],num);
					num++;
				}
			});
			if(num<carAllMk.length){
				for(var k=num;k<carAllMk.length;k++){
					map.removeOverlay(carAllMk[num]);
					carAllMk.splice(num,1);
					labelAll.splice(num,1);
					
				}
			}
		});
	//setTimeout("markjh()",100);
	//checkusersetting();
	addnum();
	//setTimeout("dingshiCreate()",5000);
}
function checkusersetting(){//检查用户按钮的控制，展示不同的数据展示
	if(_ISGT){//聚合判断
		markerClusterer.setMinClusterSize(2);
	}else{
		markerClusterer.setMinClusterSize(9999999);
	}
	if(!_XSCO){
		for(var x=0;x<markers.length;x++){
			markers[x].hide();
		}
		xsmr=markerClusterer.removeMarkers(markers);
		$("#qcsl").text(parseInt($("#qcsl").text())-parseInt(markers.length));
	}
	if(!_JZCO){
		for(var x=0;x<nullmarkers.length;x++){
			nullmarkers[x].hide();
		}
		jzmr=markerClusterer.removeMarkers(nullmarkers);
		$("#qcsl").text(parseInt($("#qcsl").text())-parseInt(nullmarkers.length));
	}
	if(!_LXCO){
		for(var x=0;x<nomarkers.length;x++){
			nomarkers[x].hide();
		}
		lxmr=markerClusterer.removeMarkers(nomarkers);
		$("#qcsl").text(parseInt($("#qcsl").text())-parseInt(nomarkers.length));
	}
	if(_ALCO){
		for (var z = 0; z < overlays.length; z++){
			overlays[z].hide();
		}
		qcmar=markerClusterer.removeMarkers(overlays);
		$("#fzsta").prop('checked',true);
	}
	if(_OLZD){
		for (var z = 0; z < overlays.length; z++){
			overlays[z].hide();
		}
		_HIDEZD=markerClusterer.removeMarkers(overlays);
	}
}
//nullmarkers//行驶 markers//静止 nomarkers//离线
//按钮车辆显示隐藏控制
//负值数量
function addnum(){
$("#xssl").text(markers.length);
$("#jzsl").text(nullmarkers.length);
$("#lxsl").text(nomarkers.length);
$("#qcsl").text(overlays.length);
$("#zcsl").text(overlays.length);
}
function createmark2(pto,num){
	if(pto!=null){
		if(num<carAllMk.length){
			var point = new BMap.Point(pto.lng, pto.lat);
			labelAll[num].setContent(pto.carno);
			if (pto.state == 1) {//行驶
				carAllMk[num].setPosition(point);
				carAllMk[num].setIcon(nullcarIcon);
				carAllMk[num].setRotation(pto.angle);
				
				markers.push(carAllMk[num]);
				overlays.push(carAllMk[num]);
				$("#zhuangtai"+pto.carno).html("<div title='行驶' style='width: 12px;height: 12px;background:#05FD0A; -moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px;  margin: 3px auto;' ></div>");
			}
			if (pto.state == 2) {//静止
				carAllMk[num].setPosition(point);
				carAllMk[num].setIcon(carIcon);
				carAllMk[num].setRotation(pto.angle);
				
				nullmarkers.push(carAllMk[num]);
				overlays.push(carAllMk[num]);
				
				$("#zhuangtai"+pto.carno).html("<div title='静止' style='width: 12px;height: 12px;background:#F9E442; -moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px;  margin: 3px auto;' ></div>");
			}
			if (pto.state == 3) {//离线
				carAllMk[num].setPosition(point);
				carAllMk[num].setIcon(nocarIcon);
				carAllMk[num].setRotation(pto.angle);
				
				nomarkers.push(carAllMk[num]);
				overlays.push(carAllMk[num]);
				$("#zhuangtai"+pto.carno).html("<div title='离线' style='width: 12px;height: 12px;background:#D0E2D2; -moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px;  margin: 3px auto;' ></div>");
			}
		}else{
			createmark(pto);
		}
	}else{
	}
}

function createmark(pto) {
		if(pto!=null){
			var label = new BMap.Label(pto.carno, {
				offset : new BMap.Size(-20, -20)
			});
			label.setStyle({
				color : "black",
				fontSize : "13px",
				fontWeight : "bolder",
				/*height : "16px",
				width : "20px",*/
				lineHeight : "16px",
				fontFamily : "微软雅黑",
				borderColor : "black",
				backgroundColor : "#FFF774",
				display:"none"
			});
			labelAll.push(label);
			var point = new BMap.Point(pto.lng, pto.lat);
		if (pto.state == 1) {//行驶
			var carMk = new BMap.Marker(point, {
				icon : nullcarIcon
			});
			carMk.addEventListener("click", showcarinfor);
			carMk.setRotation(pto.angle);
			carMk.setLabel(label);
			carMk.enableMassClear();
			
			markers.push(carMk);
			overlays.push(carMk);
			
			carAllMk.push(carMk);
			map.addOverlay(carMk);
			$("#zhuangtai"+pto.carno).html("<div title='行驶' style='width: 12px;height: 12px;background:#05FD0A; -moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px;  margin: 3px auto;' ></div>");
		}
		if (pto.state == 2) {//静止
				var carMk2 = new BMap.Marker(point, {
					icon : carIcon
				});
				carMk2.addEventListener("click", showcarinfor);
				carMk2.setRotation(pto.angle);
				carMk2.setLabel(label);
				carMk2.enableMassClear();

				nullmarkers.push(carMk2);
				overlays.push(carMk2);
				
				carAllMk.push(carMk2);
				map.addOverlay(carMk2);
				$("#zhuangtai"+pto.carno).html("<div title='静止' style='width: 12px;height: 12px;background:#F9E442; -moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px;  margin: 3px auto;' ></div>");
		}
		if (pto.state == 3) {//离线
			var carMk3=new BMap.Marker(point, {
				icon : nocarIcon
			});
			carMk3.addEventListener("click", showcarinfor);
			carMk3.setRotation(pto.angle);
			carMk3.setLabel(label);
			carMk3.enableMassClear();
			
			nomarkers.push(carMk3);
			overlays.push(carMk3);
			
			carAllMk.push(carMk3);
			map.addOverlay(carMk3);
			$("#zhuangtai"+pto.carno).html("<div title='离线' style='width: 12px;height: 12px;background:#D0E2D2; -moz-border-radius: 8px;-webkit-border-radius: 8px; border-radius: 8px;  margin: 3px auto;' ></div>");
		}
		}else{
		}
}
function showcarinfor(e) {
	point = e.target.getPosition();// point
	labcon = e.target.getLabel().content;// 车牌号
	_LASTCAR=labcon;
	careteinfor(point, labcon);
}

// 创建windows信息展示窗口
var infoWindow = null;
function careteinfor(point, carno) {
	var opts = {
		title : "<span style='color:#D2693C;font-size: 14px;font-weight: bold'></span>", // 信息窗口标题
		enableAutoPan : false, // 自动平移
		offset : new BMap.Size(-5, -15)
	// 偏离值
	};
	var carsno=carno;
	var addComp = "";
	var add = "";
	var cityname = "";
	var weather = "";
	myGeo.getLocation(point,function(rs) {
		addComp = rs.addressComponents;
		add = addComp.province + addComp.city+ addComp.district + addComp.street+ addComp.streetNumber;
		cityname = addComp.city;
		cityname = cityname.substring(0, cityname.length - 1);
		$.getJSON("map.do?method=loadmapinfo",{"carno" : carsno,"dbname":dbna},function(mapinfos) {
			infoWindow = new BMap.InfoWindow("<table  style='color: rgb(0, 0, 0);border-collapse: collapse; border-spacing: 0;line-height: 20px;white-space: nowrap;color:#333;font-size: 12px;ont-family: ''Microsoft YaHei',微软雅黑,Arial,Helvetica,Sans-Serif''> <tr> <td>车牌号：</td><td>"
			+ carsno+ "</td> </tr><tr> <td>所属机构：</td><td>"+ mapinfos[0].deptname
			+ "</td> </tr><tr> <td>设备号：</td><td>"+ mapinfos[0].beidouid
			+ "</td> </tr><tr> <td>状态(速度)：</td><td>"+ mapinfos[0].gpsstate
			+ "km/h</td> </tr><tr> <td>当前位置：</td><td>"+ add+ "</td> </tr><tr> <td>定位时间：</td><td>"
			+ mapinfos[0].nowdate+ "</td> </tr><tr> <td>天气状况：</td><td id='weat'>"
			+ ""+ "</td> </tr><tr> <td>经纬度：</td><td>"+ point.lng+ ","+ point.lat
			+"</td> </tr><tr> <td>最新信号：</td><td>"+ mapinfos[0].xintiaoTime
			+ "</td> </tr><tr><td colspan='2'><a id='carhf' onclick='carhf("+ '"'+ carsno+ '"'+ ","+ '"'+ mapinfos[0].beidouid+ '"'+","+ '"'+ dbname+ '"'+ ")' href='javascript:void(0);'>回放</a>&nbsp;<a onclick='cargz("+ '"'+ carsno+ '"'+","+ '"'+ dbname+ '"'+")' href='javascript:void(0);'>跟踪</a></td></tr></table>",opts);
			map.openInfoWindow(infoWindow, point); // 开启信息窗口
		});
		$.ajax({url : "http://php.weather.sina.com.cn/js.php?"+ $.param({
					city : cityname, // 城市
					day : 0,
					password : "DJOYnieT8234jlsK"
				}),
			dataType : "script",success : function(json) {
				$("#weat").text(status1 + " " + temperature2+ '°~' + temperature1 + '°');
			}
		});
		/*$.ajax({type:"post",url : "map.do?method=getWeather&city="+cityname, dataType:"json",
			success : function(json) {
				//console.log(json);
				$("#weat").text(json.txt+ " " +json.tmp);
				//weather = status1 + " " + temperature2+ '°~' + temperature1 + '°';
				
			}
		});*/
	});
}
// 最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
var markerClusterer=null;
var myStyles = [{
    url: 'images/m1.png',
    size: new BMap.Size(53, 52),
    opt_anchor: [16, 0],
    textColor: '#333',
    opt_textSize: 10
}, {
    url:'images/m2.png',
    size: new BMap.Size(56, 55),
    opt_anchor: [40, 35],
    textColor: '#333',
    opt_textSize: 12
}];
//地图聚合的方法
function markjh() {
	options = {
		markers : overlays,
	};
	markerClusterer = new BMapLib.MarkerClusterer(map, options);
	markerClusterer.setStyles(myStyles);
	if(_SWCO){//显示车号
		showcarno();
	}
	checkusersetting();
}
//隐藏所有车牌号
function hidecarno(){
	if(overlays!=null&&overlays!=""){
		for (var z = 0; z < overlays.length; z++){
			overlays[z].getLabel().setStyle({display:"none"});
		}
	}
}
//显示所有车牌号
function showcarno(){
	for (var z = 0; z < overlays.length; z++){
		overlays[z].getLabel().setStyle({display:"block"});
	}
}

// 点击左侧车牌号定位地图车辆
var circle=null;//创建圆形区域—百度
var local=null;//创建查询对象-百度
//var seach_points=null;//获取每个选中MARK的point对象
var seachlabel=null;//标注点的文本-百度
var seachlabels=[];//保存Lable
function showcarofpoint(carno) {
	if(null!=circle){
		map.removeOverlay(circle);
	}
	if(null!=local){
		local.clearResults();
	}
	if(null!=seachlabel){
		for(var s=0;s<seachlabels.length;s++){
			map.removeOverlay(seachlabels[s]);
		}
	}
	carn = carno.innerText;
	if(carn=="javascript:void(0)"){
		carn=carno.text;
	}
	_LASTCAR=carn;
	for (var z = 0; z < overlays.length; z++) {
		overlays[z].getLabel().content.hide;
		if (overlays[z].getLabel().content == carn) {
			var seach_points = overlays[z].point;
			createcirandseachkeyname(seach_points);
			overlays[z].setZIndex(99);
			careteinfor(seach_points, carn);
		}
	}
}

function createcirandseachkeyname(seach_points){
	 if(sfz){
		local=null; 
	    local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
	    local.searchNearby("["+xsname+"]",seach_points,10000);
	    
	    local.disableFirstResultSelection();
	    
	    local.setSearchCompleteCallback(function(results){
	    	// 判断状态是否正确
			if (local.getStatus() == BMAP_STATUS_SUCCESS){
				for (var i = 0; i < results.getCurrentNumPois(); i ++){
					seach_points_label=results.getPoi(i).point;
					seachlabel = new BMap.Label(results.getPoi(i).title ,{position :seach_points_label, offset:new BMap.Size(-30,0)});
					seachlabel.setStyle({
						color : "white",
						fontSize : "12px",
						height : "16px",
						lineHeight : "16px",
						fontFamily : "微软雅黑",
						borderColor : "#4D98DD",
						backgroundColor : "#4D98DD",
						borderRadius: "5px"
					});
					map.addOverlay(seachlabel); 
					seachlabels.push(seachlabel);
				}
			}else if(local.getStatus() == BMAP_STATUS_UNKNOWN_LOCATION){//解决二次点击问题（备注：没有根除根本问题）
				local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
			    local.searchNearby(xsname,seach_points,10000);
			    local.disableFirstResultSelection();
			}
	    });
	    circle =new BMap.Circle(seach_points,10000,{fillColor:"",strokeWeight: 4 ,fillOpacity: 0, strokeOpacity: 0});
	    map.addOverlay(circle);
	    map.setZoom(12);
		map.panTo(seach_points);
	}
}
// 改变地图背景事件
function changeMapStyle(style) {
	map.setMapStyle({
		style : style
	});
	$('#desc').html(mapstyles[style].desc);
}

function over(obj){
	obj.style.background='#5DA0FC';
	obj.style.color="white";
}

function out(obj){
	obj.style.background='white';
	obj.style.color="black";
}
function getaddress(obj){
	var add=obj.innerText;
	ln=add.split(",")[0];
	la=add.split(",")[1];
	var point=new BMap.Point(ln, la);
	myGeo.getLocation(point,function(rs) {
		addComp = rs.addressComponents;
		adds = addComp.province + addComp.city+ addComp.district;
		if(adds!=""){
			obj.innerText=adds;
		}
	});
}