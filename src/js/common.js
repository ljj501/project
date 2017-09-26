/* 
* @Author: Marte
* @Date:   2017-09-25 20:12:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-26 19:33:14
*/

(function($){
   
   setTimeout(function(){
        //底部滚动
        var $ul =  $('#footer .copyright .box ul');
        console.log($ul)
        var i=0;
        setInterval(function(){
            i++;
            if(i>=2){
                i=0;
            }
            $ul.animate({top:-36*i})

        },2000)
    
         //右侧固定栏淡入淡出
        $('#footer .rightFixedBar').on('mouseenter','a',function(){
        console.log(666)
            var $box=$(this).find('.iconBox_tips')
            $box.css({'display':'block'});
            $box.stop().animate({'right':15,opacity:1})
        }).on('mouseleave','a',function(){
            var $box=$(this).find('.iconBox_tips')
            $box.stop().animate({'right':80,opacity:0},function(){
                $box.css({'display':'none'});
            })
        })

        $pit = $('#footer .rightFixedBar').find('.pit')
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
      
       $('#footer .rightFixedBar .to-top').on('click',function(){
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
   },1000)
})(jQuery);