<?php
$conn = new mysqli("localhost", "root", "", "invoice_db");
if ($conn->connect_error) {
    die("ডাটাবেজ সংযোগ ব্যর্থ: " . $conn->connect_error);
}
?>
