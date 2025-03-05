<?php
include 'db.php';

$invoiceId = $_GET['id'];
$sql = "SELECT * FROM invoices WHERE id = $invoiceId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $invoice = $result->fetch_assoc();
    echo "<h2>ইনভয়েস #".$invoice['id']."</h2>";
    echo "<p>নাম: ".$invoice['customer_name']."</p>";
    echo "<p>ফোন: ".$invoice['customer_phone']."</p>";
    echo "<p>মোট: ".$invoice['total_amount']." ৳</p>";
} else {
    echo "❌ ইনভয়েস পাওয়া যায়নি!";
}
?>