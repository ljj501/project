/* 
* @Author: Marte
* @Date:   2017-09-23 16:25:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-28 14:55:58
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
    var $move =  $('.copyright').find('ul');
    var i=0;
    setInterval(function(){
        i++;
        if(i>=2){
            i=0;
        }
        $move.animate({'top':-36*i})

    },2000)

    //吸顶
    var $fixedSch_box=$('.content .fixedSch_box');
    $(window).scroll(function(){

        let currentTop = window.scrollY;
        if(currentTop>1200){
            $fixedSch_box.css({'display':'block'});
        }else{
             $fixedSch_box.css({'display':'none'});
        }
    })

    //右侧固定拦
    $('.rightFixedBar').on('mouseenter','a',function(){
       
            var $box=$(this).find('.iconBox_tips')
            $box.css({'display':'block'});
            $box.stop().animate({'right':15,opacity:1})
        }).on('mouseleave','a',function(){
            var $box=$(this).find('.iconBox_tips')
            $box.stop().animate({'right':80,opacity:0},function(){
                $box.css({'display':'none'});
            })
        })

        $pit = $('.rightFixedBar').find('.pit')
        $pit.on('mouseenter',function(){
            var $ewm = $(this).find('.tips_qrcode')
            $ewm.css({'display':'block'});
            $ewm.stop().animate({'right':30,opacity:1});

            var $zan = $(this).find('.tips_zan');
            $zan.css({'display':'block'});
            $zan.stop().animate({'right':32,opacity:1});
        }).on('mouseleave',function(){
            var $ewm = $(this).find('.tips_qrcode')
            $ewm.stop().animate({'right':90,opacity:0},function(){
                 $ewm.css({'display':'none'});
            });

            var $zan = $(this).find('.tips_zan');
            $zan.stop().animate({'right':80,opacity:0},function(){
                $zan.css({'display':'none'});
            });
        })
        
       //返回顶部
      
       $('.rightFixedBar .to-top').on('click',function(){
            let speed = 10;
            let timer = setInterval(()=>{
                        
                let scrollTop = window.scrollY;
                
                speed = Math.ceil(scrollTop/10);

                scrollTop -= speed;
                // 当滚动到
                if(scrollTop <= 10){
                    clearInterval(timer);
                }
                //TO从当前位置滑到目标位置 x,y
                window.scrollTo(0,scrollTop);
            },30);
       })

       //hover上升
       $('.content').on('mouseover','li',function(){
            $(this).stop().animate({'top':-5});
            $(this).css({'box-shadow':'0px 9px 40px #ccc'})
       }).on('mouseout','li',function(){
            $(this).stop().animate({'top':0});
            $(this).css({'box-shadow':'0 0 0'});
       })
      $a=$('.content').find('.fl')
      $a.on('mouseover',function(){
            $(this).stop().animate({'top':-5});
      }).on('mouseout',function(){
            $(this).stop().animate({'top':0});
      })

      //店家推荐  点击滑动
      $next =$('.dztj').find('.next');
      $prev =$('.dztj').find('.prev');
      $ul = $('.dztj').find('ul');
      $next.on('click',function(){
            $ul.animate({'left':-1220});
            $prev.css({'color':'#333','border':'1px solid #333'})
            $(this).css({'color':'#ccc','border':'1px solid #ccc'})
      })
      $prev.on('click',function(){
            $ul.animate({'left':0});
            $next.css({'color':'#333','border':'1px solid #333'})
            $(this).css({'color':'#ccc','border':'1px solid #ccc'})
      })
      
 
});

