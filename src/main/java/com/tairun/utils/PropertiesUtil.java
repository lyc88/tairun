package com.tairun.utils;

import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.util.Properties;

/**
 * Created by lyc on 2017/6/26.
 */
public class PropertiesUtil {
    private static Properties properties;
    static{
        InputStream is = null;
        try {
            if(properties == null) {
                properties = new Properties();
                is = PropertiesUtil.class.getResourceAsStream("/email.properties");
                properties.load(is);
            }
        } catch (Exception e) {
           e.printStackTrace();
        }  finally {
            IOUtils.closeQuietly(is);
        }
    }

    public static String getPropsAsString(String key) {
        return properties.getProperty(key);
    }
}
