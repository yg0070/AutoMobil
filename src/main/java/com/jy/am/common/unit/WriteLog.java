package com.jy.am.common.unit;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Created by Administrator on 17/11/30.
 */
public class WriteLog {
    private static Logger logger= LoggerFactory.getLogger(WriteLog.class);

    public static void writeInfo(String msg){
        logger.info(msg);
    }
    /**
     * 将try..catch..的错误信息写入到log中并打印到控制台
     * @param ex 异常类
     */
    public static void writeExceptionToLog(Exception ex){
        StringWriter sw=new StringWriter();
        ex.printStackTrace(new PrintWriter(sw));
        System.out.println(sw.getBuffer().toString());
        logger.error(sw.getBuffer().toString());
    }

    public static void writeExceptionToLog(String msg,Exception expception){
        logger.error(msg);
        writeExceptionToLog(expception);
    }

    /**
     * 记录日志
     * @param message
     */
    public static void writeLogMsg(String message){
        logger.error(message);
    }
}
