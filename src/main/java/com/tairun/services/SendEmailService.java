package com.tairun.services;

import com.tairun.pojo.Msg;
import com.tairun.utils.PropertiesUtil;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import java.util.Properties;
@Service
public class SendEmailService {
    public static String from;
    public static String password;
    public static String to;
    static Properties properties = new Properties();

    static {
        properties.put("mail.smtp.host", "smtp.qq.com");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.port", "465");
        from = PropertiesUtil.getPropsAsString("from");
        password = PropertiesUtil.getPropsAsString("pwd");
        to = PropertiesUtil.getPropsAsString("to");
    }

    public boolean sendEmail(Msg msg) {
        String body = "姓名:" + msg.getName() + "<br/>电话:"
                + msg.getTelephone()
                + "<br/>qq:" + msg.getTelephone() + "<br/>需求:" + msg.getContent();

        String subject = body;
        Session session = Session.getDefaultInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication
                    getPasswordAuthentication() {
                        return new PasswordAuthentication(from, password);
                    }});
        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(to));
            message.setSubject(MimeUtility.encodeText(subject, "gb2312", "B"));
            message.setContent(body, "text/html;charset=utf-8");
            Transport.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}
