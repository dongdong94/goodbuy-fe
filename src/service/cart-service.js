var _mm = require('util/mm.js');

var _cart = {
    getCartCount :  function(resolve,reject){
        _mm.request({
            //获取后端接口地址
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        })
    }
}
module.exports = _cart;