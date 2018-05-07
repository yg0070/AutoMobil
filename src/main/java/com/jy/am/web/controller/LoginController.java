package com.jy.am.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2018/4/9.
 */
@Controller
public class LoginController {
    @RequestMapping("")
    public String index(){
        System.out.println("进来了");
        return "login";
    }
}
