require("./index.css");
var _mm = require('util/mm.js');
//通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword 存在则 回填
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        //jquery 中无法直接使用this
        var _this = this;
         //点击搜索按钮，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    //搜索提交
    searchSubmit : function(){
       var keyword = $.trim($('#search-input').val());
       //如果提交时有 keyword 正常跳转页面，没有则返回主页
       if(keyword){
           window.location.href = './list.html?keyword=' + keyword;
       }else{
           _mm.goHome();
       }
    }

}
header.init();