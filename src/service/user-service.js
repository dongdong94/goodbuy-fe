var _mm = require('util/mm.js');

var _user = {
    //退出登录
    logout : function(resolve,reject){
        _mm.request({
            //获取后端接口地址
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    },
    checkLogin : function(resolve,reject){
        _mm.request({
            //获取后端接口地址
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _user;