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

    $sql = 'select * from goodslist';

    $result = $conn->query($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>