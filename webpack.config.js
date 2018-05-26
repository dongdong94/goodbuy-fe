var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置 dev/online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
//获取html-webpack-plugin参数的方法(这里的name指代的是不同页面，common是要多次使用的公共的模块)
var getHtmlConfig = function(name,title){
    return {
         //原始html模板地址
         template : './src/view/' + name + '.html',
         //打包输出路径已经配置所以直接会到dist文件夹下
         filename : 'view/' + name + '.html',
         //页面标题
         title    : title,
         //inject指的是是否将javascript文件插入到body底部
         inject   : true,
         hash     : true,
         //注入的模块选择
         chunks   : ['common',name]
    }
}
//webpack config
var config = {
    entry : {
        'common'                  : ['./src/page/common/index.js'],
        'index'                   : ['./src/page/index/index.js'],
        'user-login'              : ['./src/page/user-login/index.js'],
        'user-center'             : ['./src/page/user-center/index.js'], 
        'user-center-update'      : ['./src/page/user-center-update/index.js'],                       
        'user-register'           : ['./src/page/user-register/index.js'],  
        'user-pass-reset'         : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'        : ['./src/page/user-pass-update/index.js'],                                                    
        'result'                  : ['./src/page/result/index.js']
    },
    output : {
        //文件存放路径
        path : './dist',
        //访问路径
        publicPath : '/dist',
        filename : 'js/[name].js'
    },
    //引入外部模块
    externals : {
        'jquery' : 'window.jQuery'
    },
    module :{
        loaders : [
            { test : /\.css$/,loader : ExtractTextPlugin.extract("style-loader","css-loader") },
            //字体和图片的处理
            { test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader : 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test : /\.string$/,loader : 'html-loader' }
            
            
        ]
    },
    //路径别名
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',            
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
            
        }
    },
    //插件
    plugins : [
        //提取公共模块插件
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            //因为之前输出路径已经配置所以直接会到dist文件夹下
            filename : 'js/base.js'
        }),
        //分离css单独打包插件（使用前先引入）
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),                        
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),    
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),   
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),                            
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))      
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;