require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('page/common/nav-simple/index.js');
var navSide       = require('page/common/nav-side/index.js');
var　_mm          = require('util/mm.js');
var　_user        = require('service/user-service.js');


//page 逻辑部分
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())             
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户密码
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './user-login.html';
                }),function(errMsg){
                    _mm.errorTips(errMsg);
                };
            }else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    
    //验证字段信息
    validateForm : function(userInfo){
        var result = {
            status : false,
            msg    : ''
        };
        //验证原密码是否为空
        if(!_mm.validate(userInfo.password,'require')){
            result.msg = '请输入原密码';
            return result;
        };
        //验证新密码的长度
        if(!userInfo.passwordNew || userInfo.passwordNew.length < 6){
            result.msg = '请输入不少于6位的新密码';
            return result;
        };
        //再次确认密码
        if(userInfo.passwordConfirm != userInfo.passwordNew ){
            result.msg = '两次输入的新密码不相同';
            return result;
        };
        //验证成功
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})