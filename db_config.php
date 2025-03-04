<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "invoice_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("ডাটাবেজ সংযোগ ব্যর্থ: " . $conn->connect_error);
}
?>
