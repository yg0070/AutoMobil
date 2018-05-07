package com.jy.am;

import com.baomidou.mybatisplus.plugins.Page;
import com.jy.am.common.unit.Paging;
import com.jy.am.model.po.Payee;
import com.jy.am.service.PayeeService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AutoMobileApplicationTests {
	@Resource
    PayeeService service;
	@Test
	public void contextLoads() {
		Page<Payee> payeePage = service.selectPage(Paging.getPageInfo(1,10));
		System.out.println(payeePage.getSize());
	}

}
