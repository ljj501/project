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
require(['jquery','common','require_common'],function($,common,require_common){
    $('#header').load('../html/_header.html');
    $('#footer').load('../html/_footer.html');
    
    //ajax加载数据
    require_common.ajax({
        type:'get',
        url:'../api/goodslist.php',
        success:function(data){
            //数据处理
            data.forEach(function(obj){
                
                    var $li = $('<li/>').addClass('proitem');
                    var $a = $('<a/>').addClass('proitem_a');
                    var $itpic = $('<div/>').addClass('itpic');

                    var $img = $('<img/>').attr({src:obj.imgurl});
                    var $bimg = $('<img/>').attr({src:obj.bimgurl});
                    $itpic.append($img,$bimg);

                    var $itemname = $('<span/>').addClass('itemname').html(obj.title);
                    var $itemprice = $('<span/>').addClass('itemprice').html(obj.price);
                    var $addshopcar = $('<a/>').addClass('addshopcar').html('加入购物车');
                    var $assnum = $('<span/>').addClass('assnum').html(obj.pj_qty);
                    $a.append($itpic,$itemname,$itemprice,$addshopcar,$assnum);
                    $a.appendTo($li);
                    $('.listbox .product-list .prolist').append($li);
                    
                
            })
        }
    });
})