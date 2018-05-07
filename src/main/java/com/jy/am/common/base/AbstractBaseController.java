package com.jy.am.common.base;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Administrator on 2018/4/2.
 */
public abstract class AbstractBaseController<T extends BaseService>{
    protected Logger logger= LoggerFactory.getLogger(AbstractBaseController.class);
    @Autowired
    protected T service;
}
