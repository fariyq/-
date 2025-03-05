<?php
$host = "localhost";
$user = "root"; 
$password = ""; 
$database = "invoice_db";

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("ডাটাবেস কানেকশন ব্যর্থ: " . $conn->connect_error);
}
?>