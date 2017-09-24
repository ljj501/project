/* 
* @Author: Marte
* @Date:   2017-09-23 16:25:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-24 19:37:37
*/
require.config({
    // baseUrl:
    
    // 配置短路径（别名）
    paths:{
        jquery:'../lib/jquery-3.1.1',
        lcarousel:'../lib/jquery-lCarousel/jquery.lcarousel',
    },

    // 配置依赖
    shim:{
        // xcarousel依赖jquery
        lcarousel:['jquery']
    }
});
require(['jquery','lcarousel'],function($){
    //轮播图
    $('.carousel .container').lCarousel({
        imgs:['../images/b1.jpg','../images/b2.jpg','../images/b3.jpg','../images/b4.jpg','../images/b5.jpg','../images/b6.jpg','../images/b7.jpg','../images/b8.jpg',],
        type:'fade',
        width:1200,
        height:470,
        showPage:true
    });

    //底部滚动
    var $ul =  $('.copyright .box ul');
    var i=0;
    setInterval(function(){
        i++;
        if(i>=2){
            i=0;
        }
        
        $ul.animate({top:-36*i})

    },2000)

});

