<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
//獲取回調函數名
$jsoncallback = htmlspecialchars($_REQUEST ['KeyWord']);
//json資料
$file = file_get_contents('https://uhotel.liontravel.com/Search/KeyWord?keyWord='.$jsoncallback);
//輸出jsonp格式的資料
echo $file;
?>
