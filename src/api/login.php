<?php
    // 配置参数
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'myproject';

    // 1）连接数据库
    $conn = new mysqli($servername,$username,$password,$database);

    // 检测连接
    if($conn->connect_errno){
        die('连接失败：'.$conn->connect_error);
    }
    
    // 设置字符集
    $conn->set_charset('utf8');
    
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    $sql = "select * from user where username='$username' and password='$password'";


    // 获取查询结果
    $result = $conn->query($sql);

    $row = $result->fetch_row();

    //print_r($row[0]);

    if($row[0]){
        echo 'ok';
    }else{
        echo 'fail';
    }
    

    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();
?>