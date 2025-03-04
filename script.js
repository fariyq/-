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
}