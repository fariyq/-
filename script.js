function generateInvoice() {
    let customerName = document.getElementById("customerName").value;
    let productName = document.getElementById("productName").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if (!customerName || !productName || !quantity || !price) {
        alert("সব তথ্য পূরণ করুন!");
        return;
    }

    let totalPrice = quantity * price;

    let invoiceHtml = `
        <h3>Invoice</h3>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Price (Per Item):</strong> ${price} BDT</p>
        <h3>Total Price: ${totalPrice} BDT</h3>
    `;

    document.getElementById("invoiceOutput").innerHTML = invoiceHtml;
    document.getElementById("totalPrice").innerHTML = `<h3>Total Price: ${totalPrice} BDT</h3>`;
}

function generateQRCode() {
    let paymentNumber = "01952325903"; // এখানে আপনার বিকাশ/নগদ নম্বর দিন
    let amount = document.getElementById("price").value * document.getElementById("quantity").value;

    if (!amount || amount <= 0) {
        alert("সঠিক পরিমাণ প্রবেশ করুন!");
        return;
    }

    let qrData = `https://www.bkash.com/sendmoney?mobile=${paymentNumber}&amount=${amount}`;

    let qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ""; // পূর্বের QR কোড মুছে ফেলুন
    new QRCode(qrCodeContainer, qrData);
}function printInvoice() {
    var printContent = document.getElementById("invoiceOutput").innerHTML;
    var originalContent = document.body.innerHTML;

    document.body.innerHTML = "<h2>Invoice</h2>" + printContent;
    window.print();
    document.body.innerHTML = originalContent;
}function printInvoice() {
    var invoiceContainer = document.getElementById("invoiceOutput");

    if (!invoiceContainer || invoiceContainer.innerHTML.trim() === "") {
        alert("No invoice available to print!");
        return;
    }

    var printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Invoice</title></head><body>");
    printWindow.document.write(invoiceContainer.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
}function printInvoice() {
    var printContent = document.getElementById("invoiceOutput").innerHTML;
    var originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}