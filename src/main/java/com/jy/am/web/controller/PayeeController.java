package com.jy.am.web.controller;

import com.jy.am.common.base.AbstractBaseController;
import com.jy.am.common.unit.Paging;
import com.jy.am.model.po.Payee;
import com.jy.am.service.PayeeService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2018/4/9.
 */
@RestController
@RequestMapping(value = "payee")
@Api("测试一下")
public class PayeeController extends AbstractBaseController<PayeeService> {
    @GetMapping("/test")
    public List<Payee> getPayee(){
        return service.selectPage(Paging.getPageInfo(1,10)).getRecords();
    }
}
