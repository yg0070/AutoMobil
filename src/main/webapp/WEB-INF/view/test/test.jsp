<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base>
    	
    <title>城市信息管理</title>
    <c:forEach items="list" var="mm">
    	<p>${mm.name}</p>
    	<%-- <c:forEach items="${mm.list}" var="ss">
    		<p>${ss.name}</p>	
    	</c:forEach> --%>
    </c:forEach>

  </head>
  <body>
   	<div>
	    	
	</div>
  </body>
</html>
