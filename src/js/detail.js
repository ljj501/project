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
                
                    var path = 'list.html?id='+obj.id;
                    var $li = $('<li/>').addClass('proitem');
                    var $a = $('<a/>').addClass('proitem_a').attr({href:path,target:'_blank'});
                    var $itpic = $('<div/>').addClass('itpic');

                    var $img = $('<img/>').attr({src:obj.imgurl});
                    var $bimg = $('<img/>').attr({src:obj.bimgurl}).addClass('move');
                    $itpic.append($img,$bimg);

                    var $itemname = $('<span/>').addClass('itemname').html(obj.title);
                    var $em = $('<em/>').html('抢')
                    var $pretype = $('<span/>').addClass('pretype').html('真正实惠 传奇波尔多').prepend($em);
                    var $itemprice = $('<span/>').addClass('itemprice').html(obj.price);
                    var $strong = $('<strong/>').html('￥').appendTo($itemprice)
                    var $addshopcar = $('<a/>').addClass('addshopcar').html('加入购物车');
                    var $assnum = $('<span/>').addClass('assnum').html('评价 : '+obj.pj_qty);
                    $a.append($itpic,$itemname,$pretype,$itemprice,$addshopcar,$assnum);
                    $a.appendTo($li);
                    $('.listbox .product-list .prolist').append($li);

            })
            
        }
    });
    
    //hover商品滚动
    $('.prolist').on('mouseenter','div',function(){
        var $move = $(this).find('.move');
        $move.stop().animate({'left':0},300)
    }).on('mouseleave','div',function(){
        var $move = $(this).find('.move');
        $move.stop().animate({'left':235})
    })

    //吸顶
    var $fixednav=$('.content .fixnav');
    $(window).scroll(function(){

        let currentTop = window.scrollY;
        if(currentTop>1200){
            $fixednav.css({'display':'block'});
        }else{
             $fixednav.css({'display':'none'});
        }
    })

})