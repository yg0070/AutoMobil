package com.jy.am.common.quartz;

import com.jy.am.service.PayeeService;
import com.jy.am.model.po.Payee;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2018/4/9.
 */
//@Component
public class TestQuartz {
    @Resource
    PayeeService commonService;

    @Scheduled(cron = "0/1 * * * * ?")
    public void test() throws InterruptedException {
        // 间隔2分钟,执行工单上传任务
        Thread current = Thread.currentThread();
        System.out.println("定时任务1:"+Thread.currentThread().getName() + "\t" + current.getId());
        Thread.sleep(10000);
    }

    @Scheduled(cron = "0/1 * * * * ?")
    public void test2() {
        // 间隔2分钟,执行工单上传任务
        Thread current = Thread.currentThread();
        System.out.println("定时任务2:" + Thread.currentThread().getName() + "\t" +current.getId());
    }

    @Scheduled(cron = "0/1 * * * * ?")
    public void test3() {
        Payee payee = (Payee)commonService.selectById("01d1b2f56ba84b9baebdde512fa59a64");
        System.out.println("进去了"+payee.getDepartmentName());
        // 间隔2分钟,执行工单上传任务
        Thread current = Thread.currentThread();
        System.out.println("定时任务3:" + Thread.currentThread().getName() + "\t" +current.getId());
    }
}
