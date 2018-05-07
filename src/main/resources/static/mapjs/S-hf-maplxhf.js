/*
 文件名:S-hf-maplxhf.js
创建人:黄清华
类型:js
创建日期:
最新修改日期:
 */
// 变量区
var lushu;//路书-百度
var drv;//驾车实例-百度
var pts = new Array();// 声明保存所有坐标点的集合
//var map = new Map();
var pts2=new Array();
var cheng=new Array();//里程集合
var CARNO="";//保存车号
var KMBYPTS=[];//保存走到当前的坐标数返回里程
var SPEEDKM=[];//保存所有的速度
var THISTIME=[];//保存所有的时间
var SITEPOINT=[];//保存所有停留点的集合
var _SPEED=100;//回放速度设置
var _ANGLES=[];//保存角度
var licheng=0;
var he=0;
var liMessage;
var tapSlider;
// 创建和初始化地图函数：
var map;
var carno2;
var times2;
var suoding=0;
var dbna="";
var myNode;
var grid2 = $("#tldg").DataTable({
	"processing": true,
    "serverSide": true,
    "pagingType":"full_numbers",
    "searching": false,
    "dom": "<lf<t>ip>",
    "select" : {
		style : 'multi',
	},
	"scrollX" : true,
	"scrollY" : true,
	"ajax": {
		"url" : "map.do?method=gettld",
		"data" : function(d){
			d.carno=carno2;
			d.times=times2;
			d.dbname=dbna;
			d.guolv=$("#guo").val();
		}
	},
	columns : [
	{
		"title" : "开始时间",
		"data" : "stopstart",
		"width": "250px",
		"render":function(data,type,full){
			return data.substring(5,data.length);
		}
	}, {
		"title" : "停留时间",
		"data" : "stoptimelong",
		"render":function(data,type,full){
			return formatSeconds(parseFloat(data)*60);
		}
	}, {
		"title" : "当前坐标",
		"data" : "lng",
		"width": "250px",
		"render":function(data,type,full){
			return "<a href='javascript:void(0)' name='"+full.lng+","+full.lat+"' id="+full.jid+" onclick='shouadd(this)'>显示位置</a>";
		}
			
	},{
		"title" : "结束时间",
		"data" : "stoptimeend",
		"width": "250px",
		"render":function(data,type,full){
			return data.substring(5,data.length);
		}
	}
	],
	"language" : {
		"lengthMenu" : "",
		"zeroRecords" : "没有匹配结果",
		"info" : "",
		"infoEmpty" : "共 0 项",
		"infoFiltered" : "(由 _MAX_ 项结果过滤)",
		"infoPostFix" : "",
		"url" : "",
		"paginate" : {
			"first" : "",
			"previous" : "上一页",
			"next" : "下一页",
			"last" : ""
		},
		"select": {
            rows: {
                _: "",
                1: ""
            }
        }
	}
});
$('#tldg tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
    	grid2.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
} );
function initMap() {
	createMap();//创建地图
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
		offset : new BMap.Size(15, 45)
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
initMap();
var carico = new BMap.Icon("./images/car.png", new BMap.Size(25,55), {imageOffset: new BMap.Size(0, 0) });
var nodeico = new BMap.Icon("./images/node.png", new BMap.Size(15,15), {imageOffset: new BMap.Size(0, 0) });
var tl = new BMap.Icon("./images/stop.png", new BMap.Size(25, 25), {anchor: new BMap.Size(5, 15)});
var geoc = new BMap.Geocoder();
var _SITESHOWORHIDEFLAG=true;//站点名称显示隐藏的判断条件☞ 
map.addEventListener("zoomend", function() {
	getfromid("min").innerHTML = "<i class='fa fa-eye-slash'></i>地图级别:" + map.getZoom();
	if(map.getZoom()>=10&&_SITESHOWORHIDEFLAG){
		//showzdremark();
		/*if(null!=arforpf&&arforpf.length>0){
			for (var g = 0; g < arforpf.length; g++) {
				arforpf[g].getLabel().show();
			}
		}
		_SITESHOWORHIDEFLAG=false;//站点名称显示隐藏的判断条件*/
	}else{
		//hidezdremark();
		/*if(null!=arforpf&&arforpf.length>0){
			for (var g = 0; g < arforpf.length; g++) {
				arforpf[g].getLabel().hide();
			}
		}
		_SITESHOWORHIDEFLAG=true;//站点名称显示隐藏的判断条件*/
	}
});

// 请求开始的方法
function createtime(){
	getfromid("sjip").value=CurentTime(7, null) + " 至 " + CurentTime(null, 7);
}

var stl=false;
var linname;
var tels;
var departmentname;
var indexxx;
var keyindex=0;

var opts = {
		title : "<span style='color:#D2693C;font-size: 14px;font-weight: bold'></span>", // 信息窗口标题
		enableAutoPan : true, // 自动平移
		offset : new BMap.Size(0, 0)
	// 偏离值
	};
function huaxian(pts3){
	/*var opts = {
		        width: 20,     // 信息窗口宽度
		        height: 10,     // 信息窗口高度
		        title: "海底捞王府井店", // 信息窗口标题
		        enableMessage: true,//设置允许信息窗发送短息
		        message: "3333333333333"
		    };
	 var infoWindow = new BMap.InfoWindow("22222222222222", opts);*/
	var polyline=new BMap.Polyline(pts3, {
		strokeColor : "#EF5350",//"#2DCD1F",
		strokeWeight : 4,
		strokeOpacity : 1
	});
	map.addOverlay(polyline);
	
	polyline.addEventListener("click",function(e){
		geoc.getLocation(e.point, function(rs){
			var addComp = rs.addressComponents;
			add=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
			infoWindow = new BMap.InfoWindow("<table  style='color: rgb(0, 0, 0);border-collapse: collapse; border-spacing: 0;line-height: 20px;white-space: nowrap;color:#333;font-size: 12px;ont-family: ''Microsoft YaHei',微软雅黑,Arial,Helvetica,Sans-Serif''>"
					+"<tr> <td>定位时间：</td><td>"+ THISTIME[keyindex]+ "</td> </tr><tr> <td>当前位置：</td><td>"+ add+ "</td> </tr><tr> <td>经纬度：</td><td>"+ pts[keyindex].lng+ ","+ pts[keyindex].lat
					+"</td> </tr></table>",opts);
			map.openInfoWindow(infoWindow, e.point); // 开启信息窗口
		});
	});
}
function getPixPoints(_points,zoom) {
	var zoom = zoom || map.getZoom();
	var last_point;
	var i = 0, routeNodes = [];
	for (var j = 0; j < _points.length; j++) {
		var point = map.pointToPixel(_points[j]);
		point.x = parseInt(0.5+point.x);
		point.y = parseInt(0.5+point.y);

		if (j==0 || last_point.x != point.x || last_point.y != point.y) {
			routeNodes.push(point.x);
			routeNodes.push(point.y);
			routeNodes.push(i); // store the index of polyline containing this node
			last_point = point;
		}
		i++;
	}
	//if(routeNodes.length) routeNodes = routeNodes;
	return routeNodes;
};
map.addEventListener("mousemove",function(e){
	toweizhi(e);
});
function setMyNode() {
	if (myNode == null) {
		// 创建用于显示和拖动鼠标在显示时的路线标记
		var center = map.getCenter();
		myNode = new BMap.Marker(center, {icon:nodeico});
		myNode.addEventListener("click",function(e){
			geoc.getLocation(e.point, function(rs){
				var addComp = rs.addressComponents;
				add=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
				infoWindow = new BMap.InfoWindow("<table  style='color: rgb(0, 0, 0);border-collapse: collapse; border-spacing: 0;line-height: 20px;white-space: nowrap;color:#333;font-size: 12px;ont-family: ''Microsoft YaHei',微软雅黑,Arial,Helvetica,Sans-Serif''>"
						+"<tr> <td>定位时间：</td><td>"+ THISTIME[keyindex]+ "</td> </tr><tr> <td>当前位置：</td><td>"+ add+ "</td> </tr><tr> <td>经纬度：</td><td>"+ pts[keyindex].lng+ ","+ pts[keyindex].lat
						+"</td> </tr></table>",opts);
				map.openInfoWindow(infoWindow, e.point); // 开启信息窗口
			});
		});
	}
	//myNode.enableDragging();
};
var hflabel = new BMap.Label("", {
	style:{
		color : "red",
		fontSize : "12px",
	},
    offset: new BMap.Size(20, 20),
    bmode: true,
    marker: false,
    simple: false
});
function toweizhi(e) {
	var mouseLatLng = e.point;
	var routeNodes,zoom = map.getZoom();
	if(!myNode) {
		//生成标点
		setMyNode();
		//myNode.setLabel(hflabel);
	}
	if (routeNodes == null) {
		var _points = pts;//gpoly.getPath();
		routeNodes = getPixPoints(_points,zoom);
	}
	var l = routeNodes.length;
	if (!mouseLatLng || l <= 1) // no route is displayed or route is already being dragged
		return;

	var mousePx = map.pointToPixel(mouseLatLng);
	var mouseX = mousePx.x;
	var mouseY = mousePx.y;

	var x = routeNodes[0];
	var y = routeNodes[1];
	//我们将搜索最近点鼠标位置显示标记拖动
	var minX = x; // we will search closest point on the line to mouse position for displaying marker there available for dragging
	var minY = y;
	var minDist = 99999;
	
	for (var n = 3; n < l; n +=3) {
		var x0 = x;
		var y0 = y;
		x = routeNodes[n];
		y = routeNodes[n+1];

		if ((x < mouseX-50 && x0 < mouseX-50) || (x > mouseX+50 && x0 > mouseX+50)) {
			continue;
		}
		if ((y < mouseY-50 && y0 < mouseY-50) || (y > mouseY+50 && y0 > mouseY+50)) {
			continue;
		}

		var dx = x - x0;
		var dy = y - y0;
		var d = dx*dx + dy*dy; // lenght^2 of segment n

		var u = ((mouseX - x) * dx + (mouseY - y) * dy) / d; // a bit of vector algebra :)
		var x2 = x + (u*dx); // x,y coordinates in pixels of closest point to mouse in segment n
		var y2 = y + (u*dy);

		var dist = (mouseX - x2)*(mouseX - x2) + (mouseY - y2)*(mouseY - y2); // distance^2 from mouse to closest point in segment n

		if (minDist > dist) { // closest point in segment n is closest point overall so far
			var d1 = (mouseX - x0)*(mouseX - x0) + (mouseY - y0)*(mouseY - y0); // distance^2 from mouse to end of segment n in pixels
			var d2 = (mouseX - x)*(mouseX - x) + (mouseY - y)*(mouseY - y)

			if ((d1 - dist) + (d2 - dist) > d) { // closest point is outside the segment, so the real closest point is either start or end of segment
				//最近点跑到外面去了，所以是真正的最接近点段的开始或结束
				if (d1 < d2) {
					dist = d1;
					x2 = x0;
					y2 = y0;
				}
				else {
					dist = d2;
					x2 = x;
					y2 = y;
				}
			}
		}

		if (minDist > dist) { // closest point in segment n is closest point overall so far.最洁净的点
			minDist = dist;
			minX = x2;
			minY = y2;
			keyindex = routeNodes[n+2]; // remember index of segment closest to mouse,记得段指数最接近鼠标
		}
	}
	if (minDist > 2500) { // mouse is not close enough to the displayed line,鼠标距离线不够近,
		if(myNode) {
			//myNode.hide();
			map.removeOverlay(myNode);
		} // do not display marker for dragging the polyline,不显示拖动的折线标记
	}
	else {
		myNode.setPosition(pts[keyindex]);//map.pixelToPoint(new BMap.Pixel(minX, minY)));
		hflabel.setContent(THISTIME[keyindex]);
		myNode.setLabel(hflabel);
		map.addOverlay(myNode);
		//myNode.show();
	}
};


function kaishiHua(carno,beidouid,times,r,xun){
	var date=new Date();
	$.ajax({
		type : "POST",
		url : "map.do?method=gethfinfonozero",
		data : {
			carno : carno,
			beidouid:beidouid,
			times : times,
			dbname:dbna,
			page:r
		},
		async : true,
		success : function(ms) {
			////console.log("fanhuile"+(new Date().getTime()-date.getTime()));
			var msg=ms.split("^!@")[0];
			//console.log("2222   "+ms.split("^!@")[1]+"    "+licheng);
			licheng=(parseFloat(ms.split("^!@")[1])+parseFloat(licheng)).toFixed(2);
			pts2=new Array();
			if(msg!=null&&msg.length>2){
				$.each(JSON.parse(msg), function(i, itme) {
					var point=new BMap.Point(itme.lng,itme.lat);
					pts.push(point);
					pts2.push(point);
					cheng.push(itme.nowspace);
					CARNO=itme.carno;
					SPEEDKM.push(itme.gpsstate);
					THISTIME.push(itme.nowdate);
					_ANGLES.push(itme.angle);
					linname=itme.linname;
					tels=itme.tels;
					departmentname=itme.departmentname;
				});
				/*var pts4=new Array();
				var lennnn=Math.ceil(pts2.length/100);
				for(var arr=0;arr<lennnn;arr++){
					pts4=[];
					for(var sss=arr*100;sss<(arr+1)*100;sss++){
						if(sss<pts2.length){
							pts4.push(pts2[sss]);
						}
					}
					huaxian(pts4);
				}*/
				huaxian(pts2);
				if(r==(xun-1)){
					createlin();
					createTiao();
					startlin(CARNO);
				}
				////console.log("xun:"+pts2.length);
				r++;
				if(r<xun){
					kaishiHua(carno,beidouid,times,r,xun);
				}
			}
		},error:function(){
			$("#loadingMessage").html("系统错误,请联系程序猿!");
			//layer.msg("系统错误,无法查看回放线路,请联系程序猿");
		}
	});
}

function gethfinfo(carno,beidouid,dbname) {
		map.clearOverlays();
		licheng=0;
		he=0;
		dbna=dbname;
		$("#loadingMessage").html("正在加载数据...");
		$("#tiao").html("");
		$("#tiao").html("<div id='slider'></div>");
		times = getfromid("sjip").value;
		_carno=carno;
		if (carno != null || carno != "") {
			startload(carno,dbna);
			/*$.ajax({//加载坐标点,生成停留点
				type : "POST",
				url : "map.do?method=gethfinfo",
				data : {
					carno : carno,
					beidouid:beidouid,
					times : times
				},
				async : false,
				success : function(msg) {
				}
			});*/
			
			$.ajax({
				type:"post",
				url:"map.do?method=gethfpage",
				data:{
					carno : carno,
					beidouid:beidouid,
					times : times,
					dbname:dbna
				},
				async:true,
				success:function(count){
					//console.log("kaishi"+count);
					if(count!=0){
						var xun= Math.ceil(count/1000);//parseInt(count/1000);
						/*if(count%1000!=0){
							xun+1;
						}*/
						//console.log("1111"+xun);
						pts=[];
						SPEEDKM=[];
						THISTIME=[];
						_ANGLES=[];
						cheng=[];
						
						kaishiHua(carno,beidouid,times,0,xun);
						//for(var r=0;r<xun;r++){
							
							//huoquPageXian();
							//sleep(200);
						//}
						//huaxian(pts);
					}else{
						$("#loadingMessage").html("回放时间内没有数据!");
					}
				},error:function(){
					$("#loadingMessage").html("系统错误,请联系程序猿!");
					//layer.msg("系统错误,无法查看回放线路,请联系程序猿");
				}
				
			});
			
			
			times2=times;
			carno2=carno;
			$.ajax({//加载停留点
				type : "POST",
				url : "map.do?method=getmaptldinfo",
				async : true,
				data : {
					carno : carno,
					beidouid:beidouid,
					times : times,
					dbname:dbna
				},
				success : function(msg) {
						$.each(JSON.parse(msg), function(i, itme) {
							var label = new BMap.Label(itme.jid, {
								offset : new BMap.Size(-20, -20)
							});
							label.setStyle({
								color : "black",
								fontSize : "13px",
								fontWeight : "bolder",
								height : "16px",
								lineHeight : "16px",
								fontFamily : "微软雅黑",
								borderColor : "black",
								backgroundColor : "#FFF774",
							    display: "none"
								});
							var point=new BMap.Point(itme.lng, itme.lat);
							var marker = new BMap.Marker(point, {
								icon : tl
							});  // 创建标注
							marker.addEventListener("click", showcarinfor);
							marker.setLabel(label);
							map.addOverlay(marker);               // 将标注添加到地图中
						});
						////console.log("times"+times+" ||| carno"+carno);
						grid2.draw();
						////console.log("diaoyongle");
					},error:function(){
						$("#loadingMessage").html("系统错误,请联系程序猿!");
						layer.msg("系统错误,无法查看回放线路,请联系程序员");
					}
					
			});
		}
}
function closeInfo(){
	if(carMk!=null){
		carMk.getLabel().setStyle({display:"none"});
	}
}
function createTiao(){
	tapSlider = document.getElementById('slider');
	noUiSlider.create(tapSlider, {
		start: 0,
		step: 1,
		behaviour: 'snap',
		connect: 'lower',
		range: {
			'min':  0,
			'max':  pts.length==1?1:pts.length-1
		}
	});
	tapSlider.noUiSlider.on('update', function( values, handle ) {
		i=values;
		////console.log("i============="+i);
		/*if(i<paths){*/
			if(carMk!=null){
				i=parseInt(i);
				carMk.setPosition(pts[i]);
				if(follow.checked==true){
					map.panTo(pts[i]);
				}
				var i2=i;
				if(i>0){
					he=(parseFloat(cheng[i-1])-parseFloat(cheng[0])).toFixed(2);
				}
				carMk.setRotation(_ANGLES[i]);
				geoc.getLocation(pts[i], function(rs){
					var addComp = rs.addressComponents;
					address=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
					cityname = addComp.city;
					cityname = cityname.substring(0, cityname.length - 1);
					////console.log(pts[i]);
					i2=parseInt(i2);
					////console.log(i+"   "+SPEEDKM[i]+"     "+THISTIME[i]);
					var lbtext =  '<div class="panel panel-primary" id="taskPanel" style="position:relatvie;font-size:12px;font-weight:normal;text-align:left;">'+
                    '    <div class="panel-heading padding-5" style="overflow:hidden">'+
                    '        <span style="display:inline-block;float:left;"><i class="fa fa-angle-double-right "></i> '+"车辆详情"+'</span>'+
                    '        <a href="javascript:void(0);" onclick="closeInfo()" class="close_review_panel" style="display:inline-block;float:right;color:#000;">关闭</a>'+
                    '    </div>'+
                    '    <div class="panel-body padding-5" style="background:#FFFFFF">'+
                    '        <table style="line-height:18px;">'+
                    '            <tr>'+
                    '                <td align="right">车牌号：</td>'+
                    '                <td>'+CARNO+'</td>'+
                    '            </tr>'+     
                    '            <tr>'+
                    '                <td align="right">当前位置：</td>'+
                    '                <td>'+address+'</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">天气状况：</td>'+
                    '                <td  id="hfweat">'+""+'</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">时速：</td>'+
                    '                <td>'+SPEEDKM[i2]+'km/h</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">当前里程：</td>'+
                    '                <td>'+he+'/km</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">定位时间：</td>'+
                    '                <td>'+THISTIME[i2]+'</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">线路名称：</td>'+
                    '                <td>'+linname+'</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">联系方式：</td>'+
                    '                <td>'+tels+'</td>'+
                    '            </tr>'+
                    '            <tr>'+
                    '                <td align="right">部门名称：</td>'+
                    '                <td>'+departmentname+'</td>'+
                    '            </tr>'+
                    '        </table>'+
                    '    </div>'+
                    '    <img src="./images/iw_tail.png" style="z-index: 1; position: absolute; width: 60px; height: 29px; left: 50%; right:50%; margin-left:-29px; bottom: -29px;">'+
                    '</div>';
					
					/*var lbtext="<table  style='  border-collapse: collapse; " +
							"border-spacing: 0;line-height: 18px;white-space: " +
							"nowrap;color:#333;font-size: 12px;font-family: " +
							"''Microsoft YaHei',微软雅黑,Arial,Helvetica,Sans-Serif''><tr><td>车牌号："
							+CARNO+"</td></tr><tr><td>当前位置："+address+"</td></tr><tr><td id='hfweat'>天气状况："
							+""+"</td></tr><tr><td>时速："+SPEEDKM[i2]+"Km/h</td></tr><tr><td>当前里程："
							+he+"km</td></tr><tr><td>定位时间："+THISTIME[i2]+"</td></tr><tr><td>线路名称："+
							linname+"</td></tr><tr><td>联系方式："+tels+"</td></tr><tr><td>部门名称："+departmentname+
							"</td></tr></table><div style=' height: 0px;border: 30px;border-style: solid;" +
							"border-color: white transparent transparent;width: 0px;margin-top: -10;margin-left: 30%;'></div>";*/
					liMessage="里程数:&nbsp;&nbsp;"+he+"&nbsp;km/"+licheng+"km";
					$("#loadingMessage").html("");
					$("#loadingMessage").html(liMessage);
					//tapSlider.noUiSlider.set(i);
					//获取当前天气
					$.ajax({url : "http://php.weather.sina.com.cn/js.php?"+ $.param({
						city : cityname, // 城市
						day : 0,
						password : "DJOYnieT8234jlsK"
						}),
						dataType : "script",success : function(json) {
							$("#hfweat").html( status1 + " " + temperature2+ '°~' + temperature1 + '°');
						}
					});
					
					/*if(carMk.getLabel()){
						carMk.getLabel().remove();
					}*/
					label.setContent(lbtext);
					carMk.setTop(true);
				});
			}
			if(i==paths-1){
				////console.log("guanle");
				window.clearTimeout(timer);
				i=0;
				f=false;
				getfromid("bts").src='images/bf.png';
			}
	});
}
var infoWindow;
function showcarinfor(e) {
	point = e.target.getPosition();// point
	tlid = e.target.getLabel().content;//停留点的id
	var opts = {
			title : "<span style='color:#D2693C;font-size: 14px;font-weight: bold'></span>", // 信息窗口标题
			enableAutoPan : true, // 自动平移
			offset : new BMap.Size(0, 0)
		// 偏离值
		};
		myGeo.getLocation(point,function(rs) {
			addComp = rs.addressComponents;
			add = addComp.province + addComp.city+ addComp.district + addComp.street+ addComp.streetNumber;
			cityname = addComp.city;
			cityname = cityname.substring(0, cityname.length - 1);
			////console.log("tlid:"+tlid);
				$.getJSON("map.do?method=loadtldbyid",{"tlid" : tlid,"time":getfromid("sjip").value,"dbname":dbna},function(mapinfos) {
					////console.log(mapinfos);
					infoWindow = new BMap.InfoWindow("<table  style='  border-collapse: collapse; border-spacing: 0;line-height: 18px;white-space: nowrap;color:#333;font-size: 12px;ont-family: ''Microsoft YaHei',微软雅黑,Arial,Helvetica,Sans-Serif''> <tr> <td>停留开始时间：</td><td>"
					+ mapinfos[0].stopstart+ "</td> </tr><tr> <td>停留结束时间：</td><td>"+ mapinfos[0].stoptimeend
					+ "</td> </tr><tr> <td>停留时长：</td><td>"+ formatSeconds(parseFloat(mapinfos[0].stoptimelong)*60)
					+ "</td> </tr><tr> <td>当前位置：</td><td>"+ add
					+ "</td> </tr></table>",opts);
					map.openInfoWindow(infoWindow, point); // 开启信息窗口
					});
			});
}

//点击停留点的自动定位
function autoshowcarinfor(pt,td) {
	point = pt;// point
	tlid = td;//停留点的id
	var opts = {
			title : "<span style='color:#D2693C;font-size: 14px;font-weight: bold'></span>", // 信息窗口标题
			enableAutoPan : true, // 自动平移
			offset : new BMap.Size(0, 0)
		// 偏离值
		};
		myGeo.getLocation(point,function(rs) {
			addComp = rs.addressComponents;
			add = addComp.province + addComp.city+ addComp.district + addComp.street+ addComp.streetNumber;
			cityname = addComp.city;
			cityname = cityname.substring(0, cityname.length - 1);
			////console.log("tlid"+tlid);
				$.getJSON("map.do?method=loadtldbyid",{"tlid" : tlid,"time":getfromid("sjip").value,"dbname":dbna},function(mapinfos) {
					////console.log(mapinfos);
					infoWindow = new BMap.InfoWindow("<table  style='  border-collapse: collapse; border-spacing: 0;line-height: 18px;white-space: nowrap;color:#333;font-size: 12px;ont-family: ''Microsoft YaHei',微软雅黑,Arial,Helvetica,Sans-Serif''> <tr> <td>停留开始时间：</td><td>"
					+ mapinfos[0].stopstart+ "</td> </tr><tr> <td>停留结束时间：</td><td>"+ mapinfos[0].stoptimeend
					+ "</td> </tr><tr> <td>停留时长：</td><td>"+ formatSeconds(parseFloat(mapinfos[0].stoptimelong)*60)
					+ "</td> </tr><tr> <td>当前位置：</td><td>"+ add
					+ "</td> </tr></table>",opts);
					map.openInfoWindow(infoWindow, point); // 开启信息窗口
					});
			});
}
//js把毫秒转换为 xx小时xx分钟xx秒的通用方法
function formatSeconds(value) { 
	var theTime = parseInt(value);// 秒 
	var theTime1 = 0;// 分 
	var theTime2 = 0;// 小时 
	// alert(theTime); 
	if(theTime > 60) { 
		theTime1 = parseInt(theTime/60); 
		theTime = parseInt(theTime%60); 
		// alert(theTime1+"-"+theTime); 
		if(theTime1 > 60) { 
			theTime2 = parseInt(theTime1/60); 
			theTime1 = parseInt(theTime1%60); 
		} 
	}
	var result = ""+parseInt(theTime)+"''"; 
	if(theTime1 > 0) { 
		result = ""+parseInt(theTime1)+"'"+result; 
	} 
	if(theTime2 > 0) { 
		result = ""+parseInt(theTime2)+"h"+result; 
	} 
	return result; 
} 

var options = {
		onSearchComplete : function(results) {
			if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
				// 获取第一条方案
				var plan = results.getPlan(0);
				// 获取方案的驾车线路
				var route = plan.getRoute(0);
				zlc = plan.getDistance(true);
				// 获取每个关键步骤,并输出到页面
				// 获取方案的驾车线路
				var points = plan.getDragPois();
			}
		},
		renderOptions : {
			map : map,
			panel : "",
			enableDragging : false
		// 起终点可进行拖拽
		}
	};
	var driving = new BMap.DrivingRoute(map, options);// policy:BMAP_DRIVING_POLICY_AVOID_HIGHWAYS

//创建线路
/**
 * 参数 speen 回放的mark运行速度
 */
//生成车辆上方信息的infobox的div块
var timer=null;
var label=null;//
var carMk=null;
var i=0;
var speed=300;
var follow;
follow=getfromid("follow");
var _time;
var paths;
var centerPoint;
//var driving=null;
var _lxtime;//时间变量
function startlin(carno){
	//
	var dbs=[];
	$.ajax({//加载非0的线路坐标
		type : "POST",
		url : "map.do?method=getbzxl",
		data : {
			lincarno : carno,
			dbname:dbna
		},
		async : false,
		success : function(msg) {
				if(msg!=""){
					arr = msg.split("|");// 按照，把坐标分割
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
						dbs[x - 1] = new BMap.Point(uplng, uplat);// 生成经过点集合
					}
					//alert("213123"+start);
					slng = start.split(",")[0];// 分割
					slat = start.split(",")[1];
					elng = end.split(",")[0];
					elat = end.split(",")[1];// end
					if (dbs == null || dbs == "") {// 没有经过点
						driving.search(new BMap.Point(slng, slat), new BMap.Point(elng, elat));
					} else {// 有经过点
						driving.search(new BMap.Point(slng, slat), new BMap.Point(elng, elat),
								{
									waypoints : dbs
								});
					}
				}
				
			}
		});
	//var pt="";
	//for (var int = 0; int < pts.length-1; int++) {
		//pt=pts[int+1];
	//}
	stl=true;
}
label = new BMap.Label("", {
	offset : new BMap.Size(-80, -215)
});
label.setStyle({
	color : "black",
	fontSize : "12px",
	height : "180px",
	lineHeight : "16px",
	fontFamily : "微软雅黑",
	borderColor : "#FFFFFF",
	backgroundColor : "#FFFFFF",
	borderRadius: "5px",
	padding:"0px",
	border: "0px solid rgb(255, 255, 255)",
	display:"block"
});
function createlin(){
		map.setZoom(15);
		map.setViewport(pts); 
		paths = pts.length;    //获得有几个点
		//console.log("zhixingwanle:"+pts.length);
		centerPoint = new BMap.Point(
				(pts[0].lng + pts[pts.length - 1].lng) / 2,
				(pts[0].lat + pts[pts.length - 1].lat) / 2);
		map.panTo(centerPoint);
		carMk = new BMap.Marker(pts[0],{icon:carico});
		carMk.setLabel(label);
		carMk.addEventListener("click",function(){
			carMk.getLabel().setStyle({display:"block"});
		});
		carMk.getLabel().setStyle({display:"block"});
		map.addOverlay(carMk);
		liMessage="里程数:&nbsp;&nbsp;"+(he)+"&nbsp;km/"+licheng+"km";
		$("#loadingMessage").html(liMessage);
}

//通过实时放入数组返回里程书
function backkmbypts(pts){
	 var dis = BMapLib.GeoUtils.getPolylineDistance(pts);
	 dis=dis/1000;
	 //alert("共" + dis.toFixed(2));
	 return dis.toFixed(2)+"km";
}

function szsd(obj){
	_SPEED=obj.value;
}

var f = false;
function play(){
	if(stl){
	map.addOverlay(new BMap.Polyline([pts[i], pts[i+1]], {strokeColor: "red", strokeWeight: 1, strokeOpacity: 1}));
	////console.log("nicainicai你猜"+(i<paths-2));
	if (i <=paths-2) {
		//console.log(stl);
		//point =pts[i];
		i++;
		timer = window.setTimeout("play(" + i + ")", _SPEED);
		tapSlider.noUiSlider.set(i);
	}else{
		////console.log("timer::----------");
		////console.log(timer);
		////console.log(timer!=null);
		if (timer) {
			window.clearTimeout(timer);
			i=0;
			f=false;
			getfromid("bts").src='images/bf.png';
		}
	}
	}
}
var myGeo = new BMap.Geocoder();
function shouadd(obj){
	//var id=obj.parentNode.parentNode.firstChild.innerText;
	var id=obj.id;
	////console.log(id);
	var add=obj.name;
	var str=add+"";
	if(str.lastIndexOf(",")>-1){
		ln=add.split(",")[0];
		la=add.split(",")[1];
		var point=new BMap.Point(ln, la);
		myGeo.getLocation(point,function(rs) {
			if(id.length==32){
				/*carMk.setPosition(rs);
				map.panTo(rs);*/
				autoshowcarinfor(point,id);
			}
			if (point) {
				autoshowcarinfor(point,id);
				map.panTo(point);
				addComp = rs.addressComponents;
				adds = addComp.province + addComp.city+ addComp.district + addComp.street+ addComp.streetNumber;
				if(adds!=""){
					obj.innerText=adds;
				}
			}else{
				layer.alert('您选择地址没有解析到结果!');
			}
		});
	}else{
		
	}
}

$(document).ready(function() {
	$("#pause").click(function() {
		if (!f) {
			$("#bts").attr("src", "images/zt.png");// 变成暂停的图标
			f = true;
			play();
		} else {
			$("#bts").attr("src", "images/bf.png");
			f = false;
			if (timer) {
				window.clearTimeout(timer);
			}
		}
	});

	var format = function(time, format){
	    var t = new Date(time);
	    var tf = function(i){return (i < 10 ? '0' : '') + i};
	    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
	        switch(a){
	            case 'yyyy':
	                return tf(t.getFullYear());
	                break;
	            case 'MM':
	                return tf(t.getMonth() + 1);
	                break;
	            case 'mm':
	                return tf(t.getMinutes());
	                break;
	            case 'dd':
	                return tf(t.getDate());
	                break;
	            case 'HH':
	                return tf(t.getHours());
	                break;
	            case 'ss':
	                return tf(t.getSeconds());
	                break;
	        }
	    })
	}
	/*$("#suoding").click(function(){
		if(suoding==0){
			suoding=1;
			$("#suoding").attr("value", "解锁");
		}else{
			suoding=0;
			$("#suoding").attr("value", "锁定");
		}
	});*/
	$("#loadhf").click(function(){
		qdsClick();
		carno=$("#number_search").select2('data').text;
		times = $("#sjip").val();
		gethfinfo(carno,$("#beidouid").val(),dbna);
	});

	function qdsClick(){
		////console.log($('#reservationT').data('daterangepicker').startDate);
		////console.log(($('#reservationT').data('daterangepicker').startDate._d.getTime()));
		st = format($('#reservationT').data('daterangepicker').startDate._d.getTime(),"yyyy-MM-dd HH:mm:ss");
		ed = format($('#reservationT').data('daterangepicker').endDate._d.getTime(),"yyyy-MM-dd HH:mm:ss");
		if (st != "" && ed != "") {
			$("#sjip").val(st + " 至 " + ed);
			////console.log($("#sjip").val());
		}
	}
	$("#qds").click(function() {
		st = $("#st").val();
		ed = $("#ed").val();
		if (st != "" && ed != "") {
			$("#sjip").val(st + " 至 " + ed);
		}
	});
	
});
function guolvTld(carno,beidouid,dbna){
	times = getfromid("sjip").value;
	$.ajax({//加载停留点
		type : "POST",
		url : "map.do?method=getmaptldinfo",
		async : true,
		data : {
			carno : carno,
			beidouid:beidouid,
			times : times,
			dbname:dbna,
			guolv:$("#guo").val()
		},
		success : function(msg) {
				/*$.each(JSON.parse(msg), function(i, itme) {
					var label = new BMap.Label(itme.jid, {
						offset : new BMap.Size(-20, -20)
					});
					label.setStyle({
						color : "black",
						fontSize : "13px",
						fontWeight : "bolder",
						height : "16px",
						lineHeight : "16px",
						fontFamily : "微软雅黑",
						borderColor : "black",
						backgroundColor : "#FFF774",
					    display: "none"
						});
					var point=new BMap.Point(itme.lng, itme.lat);
					var marker = new BMap.Marker(point, {
						icon : tl
					});  // 创建标注
					marker.addEventListener("click", showcarinfor);
					marker.setLabel(label);
					map.addOverlay(marker);               // 将标注添加到地图中
				});*/
				grid2.draw();
			},error:function(){
				$("#loadingMessage").html("系统错误,请联系程序猿!");
				layer.msg("系统错误,无法查看回放线路,请联系程序员");
			}
			
	});
}
Date.prototype.diff = function(date){
	  return (this.getTime() - date.getTime())/(24 * 60 * 60 * 1000);
};