<?php
include 'db.php';

$id = $_GET['id'];
$result = $conn->query("SELECT * FROM invoices WHERE id='$id'");

if ($result->num_rows > 0) {
    $invoice = $result->fetch_assoc();
    echo "<h2>ইনভয়েস</h2>";
    echo "<p>Phone: " . $invoice['phone'] . "</p>";
    echo "<p>Total: " . $invoice['total'] . " টাকা</p>";
} else {
    echo "Invoice পাওয়া যায়নি!";
}
?> 
