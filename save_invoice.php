<?php
include 'db.php';

$phone = $_POST['phone'];
$total = $_POST['total'];

$sql = "INSERT INTO invoices (phone, total) VALUES ('$phone', '$total')";
if ($conn->query($sql) === TRUE) {
    echo "Invoice সফলভাবে সংরক্ষণ করা হয়েছে!";
} else {
    echo "ত্রুটি: " . $conn->error;
}
?>
