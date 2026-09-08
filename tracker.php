<?php
$log = "HP Target: " . $_SERVER['HTTP_USER_AGENT'] . "\n";
file_put_contents('hasil.txt', $log, FILE_APPEND);
header('Content-Type: image/jpeg');
readfile('foto.jpg');
?>
