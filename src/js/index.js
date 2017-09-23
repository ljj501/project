/* 
* @Author: Marte
* @Date:   2017-09-23 16:25:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-23 17:13:34
*/
require.config({
    // baseUrl:
    
    // 配置短路径（别名）
    paths:{
        jquery:'../lib/jquery-3.1.1',
        xcarousel:'../lib/jquery-xCarousel/jquery.xcarousel',
    },

    // 配置依赖
    shim:{
        // xcarousel依赖jquery
        xcarousel:['jquery']
    }
});
require(['jquery','xcarousel'],function($){
  
    $('.carousel .container').xCarousel({
        imgs:['../images/b1.jpg','../images/b2.jpg','../images/b3.jpg','../images/b4.jpg','../images/b5.jpg','../images/b6.jpg','../images/b7.jpg','../images/b8.jpg',],
        tpye:'horizontal',
        width:1200,
        height:470,
        showPage:true
    });
   
});

