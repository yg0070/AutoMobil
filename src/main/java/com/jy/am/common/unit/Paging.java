package com.jy.am.common.unit;

import com.baomidou.mybatisplus.plugins.Page;

/**
 * @author niiujiwei
 * @date 2017/11/29
 */
public class Paging {
    /**
     * 初始化开始条数
     */
    public static final int page = 0;
    /**
     * 初始化开始大小
     */
    public static final int size = 10;

    public static Page<?> getPageInfo() {
        return new Page<>(page, size);
    }

    public static Page<?> getPageInfo(int page, int limit) {
        return new Page<>(page, limit);
    }

    public static <T> Page<T> getPageInfo(int page, int limit, Class<T> tClass) {
        return new Page<>(page, limit);
    }
}
