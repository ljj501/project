require.config({
     // baseUrl:
        
    // 配置短路径（别名）
    paths:{
        jquery:'../lib/jquery-3.1.1'
            
    }   
});
require(['jquery','require_common'],function($,require_common){
    $('input').on('focus',function(){
        $(this).css({'outline':'none'})
        $(this).parent().css({'border':'1px solid rgb(102,175,233)','box-shadow':'0 0 5px rgba(102,175,233,1)'})
    }).on('blur',function(){
        $(this).parent().css({'border':'1px solid #c5c5c5','box-shadow':'none'})
    })
    //验证码
    $('.codebox').html(require_common.yanzhengma(6))
    $('.change').on('click',function(){
        $('.codebox').html(require_common.yanzhengma(6))
    })

    //用户密码验证
    $('.phone').on('blur',function(){
        var $username = $('.phone').val()
        if(!/^1[34578]\d{9}$/.test($username)){
            $(this).parent().find('.error').css({'display':'block'})
            $(this).parent().find('.meetIcon').css({'display':'none'})
            return false;
        }else{
            $(this).parent().find(this).parent().find('.error').css({'display':'none'})
            $(this).parent().find('.meetIcon').css({'display':'block'})
        }
    })
    $('#password1').on('blur',function(){
        var $password = $('#password1').val()
        if(!/\S{6,}/.test($password)){
            $(this).parent().find('.error').css({'display':'block'})
            $(this).parent().find('.meetIcon').css({'display':'none'})
        }else{
            $(this).parent().find(this).parent().find('.error').css({'display':'none'})
            $(this).parent().find('.meetIcon').css({'display':'block'})
        }
    })
    $('#password2').on('blur',function(){
        var $password = $('#password1').val()
        var $repeatpsd = $('#password2').val()
        if($password != $repeatpsd){
            $(this).parent().find('.error').css({'display':'block'})
            $(this).parent().find('.meetIcon').css({'display':'none'})
        }else{
            $(this).parent().find(this).parent().find('.error').css({'display':'none'})
            $(this).parent().find('.meetIcon').css({'display':'block'})
        }
    })
    //提交
    $('.regBtn').on('click',function(){
        var $username = $('.phone').val()
        var $password = $('#password1').val()

        var $ecode = $('.ecode').val()
        var $code = $('.codebox').html()
        console.log($ecode)
        console.log($code)
        if($ecode != $code){
            alert('验证码输入错误')
            return false;
        }
        require_common.ajax({
            type:'get',
            url:'../api/reg.php',
            data:{username:$username,password:$password},
            success:function(data){
                if(data == 'ok'){
                    alert('恭喜您,注册成功')
                }else if(data == 'fail'){
                    alert('该手机已被注册,请输入您的手机号码')
                }
            }
        })
    })
});
