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
    var all = 0;
    function showcar(){

        carlist.forEach(function(obj){
            var $table = $('<table/>').addClass('tbcart');
            var $tr = $('<tr/>').addClass(obj.id)

            var $checkbox = $('<input/>').attr({type:'checkbox'}).addClass('gou');
            var $td_check = $('<td/>').append($checkbox);

            var $img = $('<img/>').attr({src:obj.imgurl}).css({height:50})
            var $td_pit = $('<td/>').append($img);

            var $title = $('<a/>').html(obj.title);
            var $td_title = $('<td/>').append($title);

            var $td_price = $('<td/>').html('¥'+obj.price);

            var $td_yh = $('<td/>').html('-');

            var $jian = $('<span/>').html('-').addClass('jian');
            var $num = $('<input/>').attr({value:obj.qty}).addClass('num');
            var $jia = $('<span/>').html('+').addClass('jia');
            var $td_btn = $('<td/>').append($jian,$num,$jia);

            var $all = $('<b/>').html('¥'+obj.price*obj.qty).addClass('price');
            var $td_all = $('<td/>').append($all);

            var $delete = $('<a/>').html('删除').addClass('delBtn');
            var $td_del = $('<td/>').append($delete);
            $tr.append($td_check,$td_pit,$td_title,$td_price,$td_yh,$td_btn,$td_all,$td_del );
            $table.append($tr);
            $table.appendTo($('.car_goods'))
            
            
            all += Number(obj.qty);
        })
    }
    showcar();

    $('.m1').find('strong').html(all)

    //点击按钮加减
    $('.jian').on('click',function(){
        var num = $(this).parent().find('.num').attr('value')
        num--;
        if(num<1){
            num=1;
        }
        $(this).parent().find('.num').attr({'value':num})
       var id = $(this).parent().parent().attr('class');
        for(var i=0;i<carlist.length;i++){
            if(carlist[i].id === id){
                carlist[i].qty = num;
            }
        }
        //写入
        var date = new Date();
        date.setDate(date.getDate()+15);
        document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString();
        
        $('.car_goods').html('');
        showcar();

    })
    $('.jia').on('click',function(){
        var num = $(this).parent().find('.num').attr('value')
        num++;
        $(this).parent().find('.num').attr({'value':num})
        var id = $(this).parent().parent().attr('class');
        for(var i=0;i<carlist.length;i++){
            if(carlist[i].id === id){
                carlist[i].qty = num;
            }
        }
        var date = new Date();
        date.setDate(date.getDate()+15);
        document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString();
        $('.car_goods').html('');
        showcar();
    })
    //全选
    var status = true;
    var $checkbox = $('.tbcart .gou');
    $('.check_ll').on('click',function(){
        $checkbox.prop('checked',this.checked)
        $('.check_ll').prop('checked',this.checked)
    })

    var All = 0;
    $checkbox.on('click',function(){
        //过滤出已经被选中的复选框
        var $checkedbox = $checkbox.filter(':checked');
        console.log($checkedbox)
        $('.check_ll').prop('checked',$checkedbox.length === $checkbox.length);
    })
    console.log(carlist)
    //删除购物车商品
    $('.delBtn').on('click',function(){
        $(this).parent().parent().css({'display':'none'})
        var id = $(this).parent().parent().attr('class');
        for(var i=0;i<carlist.length;i++){
            if(carlist[i].id === id){
                //删除第i行 仅此1行
                carlist.splice(i,1);
            }
        }
        var date = new Date();
        date.setDate(date.getDate()+15);
        document.cookie = 'carlist=' + JSON.stringify(carlist) + ';expires=' + date.toUTCString();
    })
})