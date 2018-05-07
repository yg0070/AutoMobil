<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="zh-cmn">
<head>
    <title>
    	清分管理系统
    </title>
    <script type="text/javascript" src="easyui/jquery.min.js"></script>
<!--  	<link href="logoin.css" rel="stylesheet" />
 -->	<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<link href="css/loginnew.css" rel="stylesheet" />
		<link rel="stylesheet" href="css/layout.css" type="text/css"></link>
	
<!-- 	<script type="text/javascript" src="layer/layer.js"></script>
 --> 	<script type="text/javascript" src="js/verifyCode.js"></script>
 	 <script type="text/javascript" src="js/toastr/toastr.min.js"></script>
 	<link rel="stylesheet" href="js/toastr/toastr.min.css" type="text/css"></link>
 	 	<link rel="stylesheet" href="./css/newslogin.css" type="text/css"></link>
 	 	<script type="text/javascript" src="./js/canvas-particle.js"></script>
 	 	
 	<script type="text/javascript">
    window.onload = function () {
        var config = {
            vx: 4,
            vy: 4,
            height: 2,
            width: 2,
            count: 100,
            color: "#f39502",
            stroke: "100,200,180",
            dist: 6000,
            e_dist: 20000,
            max_conn: 10
        }
        CanvasParticle(config);
    }
</script>
 	
 <style type="text/css">
 	/* input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
 		background-color: rgb(238, 238, 238);
    	background-image: none;
    	color: rgb(0, 0, 0);
 	}
 	.layui-layer-page .layui-layer-content {
    position: relative;
    overflow: auto;
    background-color: #E24D46;
    overflow: hidden;
    } */
    .username,.password {
	margin-top: 36px;
}

.inputButton {
	margin-top: 18px;
}

.divclient {
	float: right;
	right: 50px;
}

.client {
	display: block;;
	margin-top: 30px;
	font-weight: bold;
}
 </style>
  </head>
<body>
<div class="header" id="canvas-particle">
    <p class="inner"><span class="logo"></span><span class="little">清分信息管理系统</span></p>
</div>
<div class="banner">
    <div class="inner">
        <div class="login">
            <p><span class="i1"></span><span class="i2"></span></p>
            <div class="iner">
                <h3>用户登录</h3>
					 <form action="login.do" id="myform" method="post" autocomplete="off" >
					 <input type="hidden" value="login" name="method">
                    <div class="user"><i></i><input type="text" name="username" id="username" placeholder="请输入用户名"/></div>
                    <div class="password"><i></i><input type="password" name="password" id="password" placeholder="请输入密码"/></div>
                    <div class="code"><i></i><jsp:include page="verifycode.jsp"></jsp:include>
                    
                    </div>
                    <div class="input">
                        <input class="gongyingshang" id="form_button" onclick="loginUser()" value="登录" type="button"></input>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="foot">
    <div class="inner">
        <h6>
            <a href="javaScript:void(0)">关于我们</a>
            <a href="javaScript:void(0)">法律声明</a>
            <a href="javaScript:void(0)">服务条款</a>
            <a href="javaScript:void(0)">联系方式</a>
        </h6>
        <p>地址：山东省济南市天桥区黄台电子商业产业园 邮编：250000 Copyight © 2017-2018 </p>
        <p>建议使用IE8以上的浏览器 鲁ICP 01001101号 </p>
    </div>
</div>
</body>
<script type="text/javascript">
		 
		document.onkeydown=function(event){ 
				e = event ? event :(window.event ? window.event : null); 
				if(e.keyCode==13){ 
				//执行的方法 
					loginUser();
				} 
			};
		/* function beforloginUser(){
				$('body').addClass('lyouts');
				setTimeout(loginUser, 500);
		} */
		var flag='<%=session.getAttribute("flag")%>';
		console.log("jinlaile"+flag);
		if(flag!=null){
			if(flag=="success"){
	   			$("#form_button").text("登录成功");
	   			toastr.success('登录成功！', '提示信息');
	   			shou();
	   		}else if(flag=="errornote"){
	   			$("#form_button").text("重新登录");
	   			toastr.error('用户没有指定权限', '登录失败');
	   		}else if(flag=="erroruser"){
	   			$("#form_button").text("重新登录");
	   			toastr.error('用户名或密码不正确！', '登录失败');
	   		}else if(flag=="errorusercustomer"){
	   			$("#form_button").text("重新登录");
	   			toastr.error('该用户不存在，请联系管理人员！', '登录失败');
	   		}else if(flag=="erroryzm"){
	   			$("#form_button").text("重新登录");
	   			toastr.error('验证码不正确', '登录失败');
	   		}else if(flag=="erroryzmk"){
	   			$("#form_button").text("重新登录");
	   			toastr.error('验证码不能为空！', '登录失败');
	   		}
			<%
			session.setAttribute("flag",null);
			%>
		}
		function loginUser(){
			$.cookie("usertime", null, { path: '/' });  //删除cookie
			if($('#checkboxmima').is(':checked')) {
				$.cookie("username", $("#username").val(), { path: '/' });
				$.cookie("password", $("#password").val(), { path: '/' });  //添加cookie
			}else{
				$.cookie("password", null, { path: '/' });  //删除cookie
				$.cookie("username", null, { path: '/' });
			}
			/* $.ajax({
					   type: "POST",
					   url: "login.do?method=login",
					   data:$('#myform').serialize(),
					   success: function(msg){
					   		var msg=$.parseJSON(msg);
					   		console.log(msg.flag);
					   }
			}); */
 			$("#myform").submit();
		}
		function shou(){
			$('body').addClass('lyouts');
			setTimeout(tijiao, 1000);
		}
		function tijiao(){
		$("#myform").submit();
		}
		function closeerror(){
			$("#myAlert").alert('close');
		}
	</script>
</html>