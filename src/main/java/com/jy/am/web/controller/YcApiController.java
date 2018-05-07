package com.jy.am.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by Administrator on 2018/4/12.
 */
@Controller
@RequestMapping("/ycapi.do")
public class YcApiController {
    @PostMapping("")
    public void BackOtherOrder(HttpServletRequest request, HttpServletResponse response) throws IOException, ClassNotFoundException {
//        for(int i=0;i<10;i++) {
        ServletInputStream servletInputStream = request.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(servletInputStream));
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
        }
        bufferedReader.close();
        response.setContentType("application/x-java-serialized-object");
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(response.getOutputStream(), "UTF-8"));
        writer.write("0");
        writer.newLine();
        writer.flush();
        writer.write("msg");
        writer.newLine();
        writer.flush();
        writer.write("{\"subdetail\":[{\"works\":1,\"pono\":2,\"lineno\":3,\"matno\":4}],\"subhead\":[{\"works\":1,\"pono\":2,\"potype\":3,\"tasktype\":4,\"whouse\":5,\"supply\":6}]}");
        writer.newLine();
        writer.flush();
        writer.write("@msgbye@");
        writer.newLine();
        writer.flush();
        writer.close();
//            ObjectInputStream objectInputStream = new ObjectInputStream(servletInputStream);
//            Object ob=objectInputStream.readObject();
//        }

    }

}
