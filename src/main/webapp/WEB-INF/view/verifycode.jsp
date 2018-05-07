<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
    <head>  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="js/verifyCode.js"></script> 
         
        <title>test verify code</title>  
    </head>  
    <body>  
    <input id="veryCode"  type="text" name="veryCode" style="width: 60px;height: 40px;line-height: 40px;border: none"/> 
        <a href="#"><img id="imgObj" style="vertical-align: middle;"  src="verifyimage.create" width="100px" height="40px" onclick="changeImg()" border="0"/></a>  
        
        	<!-- <input type="button" onclick="isRightCode()"/ value="验证"> 
        <!-- <div id="info"></div> -->
        
    </body>  
</html>