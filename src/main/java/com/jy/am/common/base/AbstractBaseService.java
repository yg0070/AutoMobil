package com.jy.am.common.base;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Administrator on 2018/4/2.
 */
public abstract class AbstractBaseService<M extends BaseMapper<T>,T extends ModelParent> extends ServiceImpl implements BaseService{
    protected Logger logger= LoggerFactory.getLogger(AbstractBaseService.class);
    @Autowired
    protected M baseDao;
}
