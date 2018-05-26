require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('page/common/nav-simple/index.js');
var navSide       = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
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
            name : 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.btn-submit',function(){
            var userInfo ={
                phone    : $.trim($('#phone').val()),
                email    : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val())               
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户信息
                _user.updateUserInfo(userInfo,function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }),function(errMsg){
                    _mm.errorTips(errMsg);
                };
            }else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    //加载用户信息
    loadUserInfo :  function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    },
    //验证字段信息
    validateForm : function(userInfo){
        var result = {
            status : false,
            msg    : ''
        };
        //验证手机
        if(!_mm.validate(userInfo.phone,'phone')){
            result.msg = '请输入正确的手机号码';
            return result;
        };
        //验证邮箱
        if(!_mm.validate(userInfo.email,'email')){
            result.msg = '请输入正确的邮箱';
            return result;
        };
        //验证密码提示问题是否为空
        if(!_mm.validate(userInfo.question,'require')){
            result.msg = '请输入密码提示问题';
            return result;
        };
        //验证密码提示问题答案是否为空
        if(!_mm.validate(userInfo.answer,'require')){
            result.msg = '请输入密码提示问题答案';
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