package com.tairun.web;

import com.alibaba.fastjson.JSON;
import com.tairun.pojo.Msg;
import com.tairun.services.SendEmailService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by lyc on 2017/6/23.
 */
@Controller
public class SendMsg {
    @Resource
    private SendEmailService sendEmailService;

    @RequestMapping("sendEmail")
    @ResponseBody
    public String sendMsg(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin","*");
        String data = request.getParameter("data");
        Msg msg = null;
        if(StringUtils.isNotBlank(data)) {
            try {
                msg = JSON.parseObject(data, Msg.class);
                sendEmailService.sendEmail(msg);
            }catch (Exception e){
                e.printStackTrace();
                return "error";
            }
        }
        return "success";
    }
}
