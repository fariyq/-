document.getElementById("date").innerText = new Date().toLocaleDateString();
document.getElementById("time").innerText = new Date().toLocaleTimeString();

// ✅ নতুন কাস্টমার ফর্ম দেখানো
function showNewCustomerForm() {
    document.getElementById("newCustomerForm").style.display = "block";
}

function addItem() {
    let table = document.getElementById("invoiceTable").getElementsByTagName('tbody')[0];
    let row = table.insertRow();
    
    row.innerHTML = `
        <td><input type="text" placeholder="প্রোডাক্টের নাম"></td>
        <td><input type="number" class="price" oninput="updateTotal()"></td>
        <td><input type="number" class="quantity" value="1" oninput="updateTotal()"></td>
        <td class="total">0</td>
        <td><button onclick="removeItem(this)">❌</button></td>
    `;
}

function removeItem(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotal();
}

function updateTotal() {
    let prices = document.querySelectorAll(".price");
    let quantities = document.querySelectorAll(".quantity");
    let totals = document.querySelectorAll(".total");
    
    let grandTotal = 0;

    prices.forEach((price, index) => {
        let itemPrice = parseFloat(price.value) || 0;
        let itemQuantity = parseInt(quantities[index].value) || 1;
        let itemTotal = itemPrice * itemQuantity;

        totals[index].innerText = itemTotal;
        grandTotal += itemTotal;
    });

    document.getElementById("total").innerText = grandTotal + " টাকা";
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

// ✅ Invoice সংরক্ষণ করা
function saveInvoice() {
    let invoiceData = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        total: document.getElementById("total").innerText
    };

    localStorage.setItem("invoice", JSON.stringify(invoiceData));
    alert("Invoice সংরক্ষণ করা হলো!");
}

// ✅ Invoice প্রিন্ট করা
function printInvoice() {
    window.print();
}