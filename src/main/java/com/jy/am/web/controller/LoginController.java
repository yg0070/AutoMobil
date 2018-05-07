package com.jy.am.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @RequestMapping("/test")
    public String test(HttpServletRequest request){
        List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> map=new ArrayList<Map<String,Object>>();

		Map<String,Object> object=new HashMap<String,Object>();
		object.put("name","mapName");
		object.put("id","iddddd");

		map.add(object);

		Map<String,Object> listobject=new HashMap<String,Object>();
		listobject.put("name","listname");
		listobject.put("list",map);
		list.add(listobject);
		request.setAttribute("list",list);
        return "test/test";
    }

}
