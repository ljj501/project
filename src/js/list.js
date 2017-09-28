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
   var href = location.href;
   var id = href.slice(-1)
   //发起ajax请求
   require_common.ajax({
        type:'get',
        url:'../api/search.php?id='+id,
        success:function(data){
            var obj = data[0];
            //左边小图
            var $span = $('<span/>').html(obj.title);
            var $zxkf = $('<a/>').addClass('zxkf').addClass('fr');
            $('.buybox .category').append($span,$zxkf);

            var $pit1 = $('<img/>').attr({src:obj.imgurl});
            var $li1 = $('<li/>').addClass('listpic').append($pit1);

            var $pit2 = $('<img/>').attr({src:obj.bimgurl});
            var $li2 = $('<li/>').addClass('listpic').append($pit2);
            var $pit3 = $('<img/>').attr({src:obj.imgurl});
            var $li3 = $('<li/>').addClass('listpic').append($pit3);

            var $pit4 = $('<img/>').attr({src:obj.bimgurl});
            var $li4 = $('<li/>').addClass('listpic').append($pit4);

            var $pit5 = $('<img/>').attr({src:obj.imgurl});
            var $li5 = $('<li/>').addClass('listpic').append($pit5);
            $('.itemshow .pic-minlist').append($li1,$li2,$li3,$li4,$li5);

            //右边大图
            var $pit = $('<img/>').attr({src:obj.imgurl});
            var $bpit = $pit.clone(true).addClass('none');
            $('.picshowbox .itempicshow').append($pit,$bpit);
                    }

   })

})