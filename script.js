document.getElementById("date").innerText = new Date().toLocaleDateString();
document.getElementById("time").innerText = new Date().toLocaleTimeString();

document.getElementById("price").addEventListener("input", updateTotal);
document.getElementById("quantity").addEventListener("input", updateTotal);

function updateTotal() {
    let price = parseFloat(document.getElementById("price").value) || 0;
    let quantity = parseInt(document.getElementById("quantity").value) || 1;
    document.getElementById("total").innerText = (price * quantity) + " টাকা";
}

function generateQR() {
    let invoiceData = `Shop: ইমরান ইলেকট্রনিক্স\nPhone: 01952325903\nTotal: ${document.getElementById("total").innerText}`;
    alert("QR Code Generated: " + invoiceData);
}

function fetchCustomer() {
    let phone = document.getElementById("searchPhone").value;
    alert("সার্চ করা হচ্ছে: " + phone);
}

function saveInvoice() {
    alert("Invoice সংরক্ষণ করা হলো!");
}

function printInvoice() {
    window.print();
} 
