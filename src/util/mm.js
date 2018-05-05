var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {
    //网络请求
    request : function(param){
        //在ajax中无法直接访问_mm
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要登陆
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            //请求错误
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取后端的接口地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam : function(name){
        //例如 /product/list.do?keyword=1
        //用正则匹配截取 key (以name或&开头 key =非&的多个 以&或直接结束)
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //window.location.search把?之前的去掉 substr(1)过滤掉问号截取 再匹配正则
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染网页
    renderHtml : function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate);
        var result   = template.render(data);
        return result
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功')
    },
    //错误成功提示
    errorTips : function(msg){
        alert(msg || '出错了哦')
    },
    //输入验证 非空 手机 邮箱
    validate : function(value,type){
        //去除空白字符 返回字符串类型
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机验证
        if('phone' === type){
           return  /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
        }
    },
    //进行登录处理
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //返回首页
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;