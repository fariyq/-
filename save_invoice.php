<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $customerName = $_POST['customerName'];
    $customerPhone = $_POST['customerPhone'];
    $customerAddress = $_POST['customerAddress'];
    $products = json_encode($_POST['products']);
    $totalAmount = $_POST['totalAmount'];

    $sql = "INSERT INTO invoices (customer_name, customer_phone, customer_address, products, total_amount) 
            VALUES ('$customerName', '$customerPhone', '$customerAddress', '$products', '$totalAmount')";
    
    if ($conn->query($sql) === TRUE) {
        echo "✅ ইনভয়েস সফলভাবে সংরক্ষণ হয়েছে!";
    } else {
        echo "❌ ত্রুটি: " . $conn->error;
    }
}
?>