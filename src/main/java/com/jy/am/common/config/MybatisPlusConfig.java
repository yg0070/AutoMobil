package com.jy.am.common.config;

import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.plugins.PerformanceInterceptor;
import com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.ObjectUtils;

import javax.sql.DataSource;

/**
 *
 * @author niujiwei
 * @date 2017/11/9
 */
@Configuration
@MapperScan("com.jy.am.dao")
public class MybatisPlusConfig {
    @Qualifier("dataSource")
    @Autowired
    private DataSource dataSource;
    @Autowired(required = false)
    private Interceptor[] interceptors;

    /**
     * mybatis-plus SQL执行效率插件【生产环境可以关闭】
     */
    @Bean
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }
    /**
     * mybatis-plus分页插件<br>
     * 文档：http://mp.baomidou.com<br>
     */
    @Bean
    public SqlSessionFactory paginationInterceptor() throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();

        PaginationInterceptor pagination = new PaginationInterceptor();
        pagination.setLocalPage(true);
        sqlSessionFactory.setDataSource(dataSource);


        if (!ObjectUtils.isEmpty(this.interceptors)) {
            sqlSessionFactory.setPlugins(this.interceptors);
        }
        // 具体参考自己设置，参考 xml 参数说明或源码注释
        sqlSessionFactory.setPlugins(new Interceptor[]{
                pagination
        });
    /*    GlobalConfiguration globalConfiguration = new GlobalConfiguration();
        globalConfiguration.setMetaObjectHandler(new MyMetaObjectHandler());
        sqlSessionFactory.setGlobalConfig(globalConfiguration);*/
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactory.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
        return sqlSessionFactory.getObject();
    }

}
