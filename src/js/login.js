
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
    $('.loginBtn').on('click',function(){
        var $username = $('#txtUsername').val()
        var $password = $('#txtPassword').val()
        require_common.ajax({
            type:'get',
            url:'../api/login.php',
            data:{username:$username,password:$password},
            success:function(data){
                if(data == 'ok'){
                    alert('登录成功!')
                }else if(data == 'fail'){
                    alert('您输入的帐号或密码有误')
                }
            }
        })
    })
})