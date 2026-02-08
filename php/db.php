<?php

$mysql_host = 'localhost';
$mysql_user = 'root';
$mysql_pass = '';
$mysql_db = 'vsail_intern';

$mongo_host = 'mongodb://localhost:27017';

$redis_host = '127.0.0.1';
$redis_port = 6379;


$conn = mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);

if (!$conn) {
    die(json_encode(['status' => 'error', 'message' => 'MySQL Connection Failed']));
}


$redis = new Redis();
try {
    $redis->connect($redis_host, $redis_port);
} catch (Exception $e) {
    die(json_encode(['status' => 'error', 'message' => 'Redis Connection Failed: ' . $e->getMessage()]));
}


try {
    $mongoManager = new MongoDB\Driver\Manager($mongo_host);
} catch (Exception $e) {
    die(json_encode(['status' => 'error', 'message' => 'MongoDB Connection Failed: ' . $e->getMessage()]));
}
?>
