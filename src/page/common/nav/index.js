require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//导航
var nav = {
    //初始化
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    //绑定事件
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
           _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                //success 刷新页面
                window.location.reload();
            },function(errMsg){
                //error 弹出错误对话框
                _mm.errorTips(errMsg);
            });
        });
    },
    //读取用户信息
    loadUserInfo : function(){
        _user.checkLogin(
            function(res){
                //success 成功登录 进行操作
               $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
            },function(errMsg){
                //do nothing
            }
        );
    },
    //读取购物车信息
    loadCartCount : function(){
        _cart.getCartCount(
            function(res){
                //success 成功登录 进行操作
               $('.nav .car-count').text(res || 0);
            },function(errMsg){
                $('.nav .car-count').text(0);
            }
        );
    }

};
module.exports = nav.init();