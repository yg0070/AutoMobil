package com.jy.am.service.impl;

import com.jy.am.common.base.AbstractBaseService;
import com.jy.am.service.PayeeService;
import com.jy.am.dao.PayeeMapper;
import com.jy.am.model.po.Payee;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2018/4/2.
 */
@Service
public class PayeeServiceImpl extends AbstractBaseService<PayeeMapper,Payee> implements PayeeService {
}
