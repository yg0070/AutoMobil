package com.jy.am.model.vo;

import com.jy.am.common.base.ModelParent;

import java.util.Date;

/**
 * <p>
 * 日志表
 * </p>
 *
 * @author joyi
 * @since 2018-01-09
 */
public class SysLog extends ModelParent {

    private static final long serialVersionUID = 1L;

    private String id;
    /**
     * 操作人
     */
    private String userId;
    /**
     * 登录名称
     */
    private String userAccount;
    /**
     * 操作人名
     */
    private String userName;
    /**
     * 请求地址
     */
    private String requestUrl;
    /**
     * 请求方法
     */
    private String requestMethod;
    /**
     * 请求参数
     */
    private String requestParameters;

    private String requestIp;
    /**
     * 模块
     */
    private String modular;
    /**
     * 操作
     */
    private String operation;

    private Date updateTime;
    /**
     * 返回参数
     */
    private String responseParam;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public void setRequestMethod(String requestMethod) {
        this.requestMethod = requestMethod;
    }

    public String getRequestParameters() {
        return requestParameters;
    }

    public void setRequestParameters(String requestParameters) {
        this.requestParameters = requestParameters;
    }

    public String getRequestIp() {
        return requestIp;
    }

    public void setRequestIp(String requestIp) {
        this.requestIp = requestIp;
    }

    public String getModular() {
        return modular;
    }

    public void setModular(String modular) {
        this.modular = modular;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getResponseParam() {
        return responseParam;
    }

    public void setResponseParam(String responseParam) {
        this.responseParam = responseParam;
    }

    @Override
    public String toString() {
        return "SysLog{" +
                "id=" + id +
                ", userId=" + userId +
                ", userAccount=" + userAccount +
                ", userName=" + userName +
                ", requestUrl=" + requestUrl +
                ", requestMethod=" + requestMethod +
                ", requestParameters=" + requestParameters +
                ", requestIp=" + requestIp +
                ", modular=" + modular +
                ", operation=" + operation +
                ", updateTime=" + updateTime +
                ", responseParam=" + responseParam +
                "}";
    }
}
