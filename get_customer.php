<?php
include 'db.php';

$phone = $_GET['phone'];
$result = $conn->query("SELECT * FROM invoices WHERE phone='$phone'");

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo "কোনো তথ্য পাওয়া যায়নি!";
}
?> 
