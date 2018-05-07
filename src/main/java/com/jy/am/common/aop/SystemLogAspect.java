package com.jy.am.common.aop;

import com.alibaba.fastjson.JSON;
import com.jy.am.common.unit.UUIDUtil;
import com.jy.am.model.vo.SysLog;
import com.jy.am.common.unit.WriteLog;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

/**
 * Created by Administrator on 2018/4/9.
 */
@Aspect
@Component
public class SystemLogAspect {
    @Pointcut("execution(public * com.jy.wms.api.web..*.*(..))")
    public void webLog() {
    }

    @Pointcut("within(com.jy.action..*) && @annotation(syslog)")
    public void service(SystemServiceLog syslog){
    }

    @Before("service(syslog)")
	public void doBefore(JoinPoint joinPoint, SystemServiceLog syslog) {
        System.out.println(syslog.modular()+"\t"+syslog.method()+"\t"+syslog.description());
    }


    public SysLog doBefore(JoinPoint joinPoint) throws Throwable {
        // 接收到请求，记录请求内容
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        SysLog sysLog = new SysLog();
        sysLog.setId(UUIDUtil.getUUID());
        sysLog.setRequestUrl(request.getRequestURL().toString());
        sysLog.setRequestMethod(request.getMethod());
        sysLog.setRequestUrl(request.getRequestURL().toString());
        sysLog.setModular(joinPoint.getSignature().getDeclaringTypeName());
        sysLog.setOperation(joinPoint.getSignature().getName());
        try {
//            sysLog.setRequestParameters(JSONObject.toJSON(Arrays.asList(joinPoint.getArgs())).toString());
        } catch (Exception e) {
            sysLog.setRequestParameters(joinPoint.getArgs().toString());
        }
        sysLog.setRequestIp(getIpAddress(request));
        // 记录下请求内容
        WriteLog.writeInfo("-------------------请求开始线----------------------------");
        WriteLog.writeInfo("REQUEST_URL : " + request.getRequestURL().toString());
        WriteLog.writeInfo("REQUEST_METHOD : " + request.getMethod());
        WriteLog.writeInfo("REQUEST_IP : " + getIpAddress(request));
        WriteLog.writeInfo("MODULAR : " + joinPoint.getSignature().getDeclaringTypeName());
        WriteLog.writeInfo("OPERATION : " + joinPoint.getSignature().getName());
        WriteLog.writeInfo("REQUEST_PARAMETERS : " + Arrays.asList(joinPoint.getArgs()));
        return sysLog;
    }

    //  @AfterReturning(returning = "ret", pointcut = "webLog()")
    public String doAfterReturning(Object ret) throws Throwable {
        // 处理完请求，返回内容
        try {
            WriteLog.writeInfo("RESPONSE : " +JSON.toJSONString(ret));
            return JSON.toJSONString(ret);
        } catch (Exception e) {
            return ret == null ? "" : ret.toString();
        }
    }

    //应用周围通知
    @Around("webLog()")
    public Object doAround(ProceedingJoinPoint call) throws Throwable {
        Object result = null;
        try {
            result = call.proceed();
            //访问参数
            this.doBefore(call);
            //返回值
            System.out.println(this.doAfterReturning(result));
        } catch (Exception e) {
            //this.afterThrowing();  //相当于异常抛出后通知
            WriteLog.writeExceptionToLog(String.format("类名称:%s %n 方法名:%s",call.getSignature().getDeclaringTypeName(),call.getSignature().getName()), e);
            return result;
        } finally {
            WriteLog.writeInfo("-------------------请求结束线----------------------------");
        }
        return result;
    }


    /**
     * 获取用户真实IP地址，不使用request.getRemoteAddr();的原因是有可能用户使用了代理软件方式避免真实IP地址,
     * 参考文章： http://developer.51cto.com/art/201111/305181.htm
     *
     * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值，究竟哪个才是真正的用户端的真实IP呢？
     * 答案是取X-Forwarded-For中第一个非unknown的有效IP字符串。
     *
     * 如：X-Forwarded-For：192.168.1.110, 192.168.1.120, 192.168.1.130,
     * 192.168.1.100
     *
     * 用户真实IP为： 192.168.1.110
     *
     * @param request
     * @return
     */
    public static String getIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
