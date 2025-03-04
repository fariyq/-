function generateInvoice() {
    let customer = document.getElementById("customerName").value;
    let product = document.getElementById("productName").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if (!customer || !product || !quantity || !price) {
        alert("সব তথ্য পূরণ করুন!");
        return;
    }

    let total = quantity * price;

    // নতুন ডাটা যোগ করার পরিবর্তে আগের ইনভয়েস রিফ্রেশ করা
    document.getElementById("invoiceOutput").innerHTML = `
        <h3>Invoice:</h3>
        <p><strong>Customer:</strong> ${customer}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Price (Per Item):</strong> ${price} BDT</p>
    `;

    document.getElementById("totalPrice").innerHTML = `
        <h3>Total Price: ${total} BDT</h3>
    `;
}function generateQRCode() {
    let paymentNumber = "01952325903"; // এখানে আপনার বিকাশ/নগদ/রকেট নম্বর দিন
    let amount = document.getElementById("price").value * document.getElementById("quantity").value;
    let qrData = `https://www.bkash.com/sendmoney?mobile=${paymentNumber}&amount=${amount}`;

    let qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ""; // পুরাতন QR কোড মুছে ফেলুন
    new QRCode(qrCodeContainer, qrData);
}