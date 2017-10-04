require.config({
     // baseUrl:
        
    // 配置短路径（别名）
    paths:{
        jquery:'../lib/jquery-3.1.1'
            
    },

        // 配置依赖
    shim:{
           common:['jquery']
    }
});
require(['jquery','require_common'],function($,require_common){
    var cookies = document.cookie;
    var carlist = [];
    if(cookies.length>0){
        cookies = cookies.split('; ');
        cookies.forEach(function(cookie){
            var temp = cookie.split('=');
            if(temp[0] === 'carlist'){
                // 把json字符串转成数组
                carlist = JSON.parse(temp[1]);
            }
        });
    }
    console.log(carlist)
    carlist.forEach(function(obj){
        console.log(obj.title)
        var $table = $('<table/>').addClass('tbcart');
        var $tr = $('<tr/>')

        var $checkbox = $('<input/>').attr({type:'checkbox'})
        var $td_check = $('<td/>').append($checkbox);

        var $img = $('<img/>').attr({src:obj.imgurl}).css({height:50})
        var $td_pit = $('<td/>').append($img);

        var $title = $('<a/>').html(obj.title);
        var $td_title = $('<td/>').append($title);

        var $td_price = $('<td/>').html('¥'+obj.price);

        var $td_yh = $('<td/>').html('-');

        var $jian = $('<span/>').html('-');
        var $num = $('<input/>').attr({value:obj.qty});
        var $jia = $('<span/>').html('+');
        var $td_btn = $('<td/>').append($jian,$num,$jia);

        var $all = $('<b/>').html('¥'+obj.price*obj.qty);
        var $td_all = $('<td/>').append($all);

        var $delete = $('<a/>').html('删除');
        var $td_del = $('<td/>').append($delete);
        $tr.append($td_check,$td_pit,$td_title,$td_price,$td_yh,$td_btn,$td_all,$td_del);
        $table.append($tr);
        $table.appendTo($('.car_goods'))
    })
})