document.getElementById("date").innerText = new Date().toLocaleDateString();
document.getElementById("time").innerText = new Date().toLocaleTimeString();

function addItem() {
    let table = document.getElementById("invoice-table");
    let row = table.insertRow(-1);
    row.innerHTML = `
        <td><input type="text" placeholder="পণ্যের নাম"></td>
        <td><input type="number" value="1"></td>
        <td><input type="number" value="0"></td>
        <td>0</td>
        <td><button onclick="deleteRow(this)">X</button></td>
    `;
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
}

function generateQR() {
    alert("QR কোড তৈরি হচ্ছে...");
}

function saveInvoice() {
    alert("ইনভয়েস সংরক্ষণ হচ্ছে...");
}

function printInvoice() {
    window.print();
}document.getElementById("generateInvoice").addEventListener("click", function() {
    var name = document.getElementById("customerName").value;
    var phone = document.getElementById("customerPhone").value;
    var totalPrice = document.getElementById("totalAmount").innerText;

    var invoiceData = `
    কাস্টমারের নাম: ${name}
    ফোন: ${phone}
    মোট টাকা: ${totalPrice}৳
    `;

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: invoiceData,
        width: 128,
        height: 128
    });
});let customerData = {};

function saveCustomer() {
    let name = document.getElementById("customerName").value;
    let address = document.getElementById("customerAddress").value;
    let phone = document.getElementById("customerPhone").value;

    if (name === "" || phone === "") {
        alert("দয়া করে নাম ও ফোন নম্বর লিখুন!");
        return;
    }

    customerData = { name, address, phone };
    alert("কাস্টমারের তথ্য সংরক্ষণ করা হয়েছে!");
}

function addProduct() {
    let table = document.getElementById("productList");
    let row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="পণ্যের নাম"></td>
        <td><input type="number" placeholder="পরিমাণ" oninput="updateTotal()"></td>
        <td><input type="number" placeholder="দাম (৳)" oninput="updateTotal()"></td>
        <td class="totalPrice">0</td>
        <td><button onclick="removeProduct(this)">X</button></td>
    `;
}

function updateTotal() {
    let rows = document.querySelectorAll("#productList tr");
    rows.forEach(row => {
        let qty = row.cells[1].querySelector("input").value;
        let price = row.cells[2].querySelector("input").value;
        row.cells[3].innerText = qty * price;
    });
}

function removeProduct(button) {
    button.parentElement.parentElement.remove();
}

function generateInvoice() {
    let invoiceData = `
    কাস্টমারের নাম: ${customerData.name}
    ঠিকানা: ${customerData.address}
    ফোন: ${customerData.phone}
    `;

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: invoiceData,
        width: 128,
        height: 128
    });

    alert("ইনভয়েস তৈরি করা হয়েছে!");
}