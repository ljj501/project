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
   var id = href.slice(-1);
   //发起ajax请求
   require_common.ajax({
        type:'get',
        url:'../api/search.php?id='+id,
        success:function(data){
            var obj = data[0];
            //左边小图
            var $span = $('<span/>').html(obj.title);
            title = obj.title;

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
            //商品信息
            var $itemtitle = $('<h3/>').html(obj.title).addClass('itemtitle');
            var $redad = $('<p/>').addClass('redad').html('酒友钟爱 大家共享.独特享受 美不胜言');
            $('.itemshow .itemmsg').prepend($itemtitle,$redad);
            
            var $strong = $('<strong/>');
            var $rmbIcon = $('<span/>').addClass('rmbIcon').html('¥');
            var $price = $('<span/>').addClass('price').html(obj.price);
            $strong.append($rmbIcon,$price);

            $('.priceBox .newPrice').append($strong);

            var $gzd = $('<p/>').html('累积评价&nbsp;');
            var $em = $('<em/>').html(obj.pj_qty);
            $gzd.append($em);
            $('.upmsg .pay').append($gzd);

            //商品飞入购物车
            $('.addToCart').on('click',function(){
                var $img = $('.itempicshow').children().first();
                var $copyimg = $img.clone();
                var $box = $('<div/>').css({'width':40,'height':40,'border-radius':'50%','overflow':'hidden','text-align':'center'}).append($copyimg)
                $box.css({'position':'absolute','top':20,'left':260})
                $(this).append($box);
                target_top = $box.offset().top-$('.car').offset().top;
                target_left = $('.car').offset().left-$box.offset().left;
                var target = {
                    top:35-target_top,
                    left:target_left+250
                }
                $box.animate(target,1000,function(){
                    $('.addToCart').empty()
                })
                //,存入cookie
                var $sp_qty = $('.numbox .nums').attr('value');
                var has = false;
                for(var i=0;i<carlist.length;i++){
                    // 已经存在
                    if(carlist[i].id === id){
                        carlist[i].qty = Number(carlist[i].qty)+Number($sp_qty)
                        has=true;
                        break;
                    }
                }
                        // 不存在
                if(!has){
                    var goods = {
                        id:id,
                        qty:$sp_qty,
                        title:obj.title,
                        price:obj.price,
                        imgurl:obj.imgurl
                    }

                    carlist.push(goods)
                }


                // 写入cookie
                var date = new Date();
                date.setDate(date.getDate()+15);
                document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString();
             
            })
        }

   });
    //hover小图加边框换大图
    console.log($('.itempicshow').firstChild)

    //点击按钮数量加1或减1
    var $num = $('.numbox .nums');
    var num = $num.attr('value');
    $('.addBtn .add').on('click',function(){
        num++;
        $num.attr('value',num);
    });
    $('.addBtn .diff').on('click',function(){
        num--;
        if(num<1){
            num = 1;
            $('.alert').css({'display':'block'});
            setTimeout(function(){
                
                $('.alert').css({'display':'none'})
            },2000)
        }
        $num.attr('value',num);
    })

    //进入页面前先获取之前的cookie值
    //购物车中的商品数量
        var all= 0;
        var carlist = [];
        var cookies = document.cookie;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(cookie){
                var temp = cookie.split('=');
                if(temp[0] === 'carlist'){
                    carlist = JSON.parse(temp[1]);
                }
            })
        }
        carlist.forEach(function(obj){
            all += Number(obj.qty);
        })
        setTimeout(function(){
            $('.itemNum').html(all)
        }, 300)
});