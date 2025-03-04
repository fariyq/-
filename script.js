document.getElementById("date").innerText = new Date().toLocaleDateString();
document.getElementById("time").innerText = new Date().toLocaleTimeString();

document.getElementById("price").addEventListener("input", updateTotal);
document.getElementById("quantity").addEventListener("input", updateTotal);

function updateTotal() {
    let price = parseFloat(document.getElementById("price").value) || 0;
    let quantity = parseInt(document.getElementById("quantity").value) || 1;
    document.getElementById("total").innerText = (price * quantity) + " টাকা";
}

// ✅ QR Code জেনারেট করা
function generateQR() {
    let total = document.getElementById("total").innerText;
    let phone = "01952325903"; // বিকাশ নম্বর

    let qrData = `https://bkash.com/pay?amount=${total}&phone=${phone}`;
    let qrCodeContainer = document.getElementById("qrCode");
    
    qrCodeContainer.innerHTML = "";
    
    let img = document.createElement("img");
    img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=150x150`;
    qrCodeContainer.appendChild(img);
}

// ✅ Invoice সংরক্ষণ করা (LocalStorage ব্যবহার)
function saveInvoice() {
    let invoiceData = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        total: document.getElementById("total").innerText
    };

    localStorage.setItem("invoice", JSON.stringify(invoiceData));
    alert("Invoice সংরক্ষণ করা হলো!");
}

// ✅ Invoice প্রিন্ট করা
function printInvoice() {
    window.print();
}