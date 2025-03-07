let invoiceItems = [];

function addItem() {
    invoiceItems.push({ name: "", quantity: 1, price: 0 });
    renderTable();
}

function removeItem(index) {
    invoiceItems.splice(index, 1);
    renderTable();
}

function updateItem(index, field, value) {
    if (field === "name") {
        invoiceItems[index][field] = value;
    } else {
        invoiceItems[index][field] = parseFloat(value) || 0;
    }
    calculateTotal();
}

function renderTable() {
    let tableBody = document.getElementById("invoiceBody");
    tableBody.innerHTML = "";
    invoiceItems.forEach((item, index) => {
        let total = item.quantity * item.price;
        tableBody.innerHTML += `
            <tr>
                <td><input type="text" value="${item.name}" oninput="updateItem(${index}, 'name', this.value)" autofocus></td>
                <td><input type="number" value="${item.quantity}" min="1" oninput="updateItem(${index}, 'quantity', this.value)"></td>
                <td><input type="number" value="${item.price}" min="0" oninput="updateItem(${index}, 'price', this.value)"></td>
                <td>${total} টাকা</td>
                <td><button onclick="removeItem(${index})">মুছুন</button></td>
            </tr>
        `;
    });
    calculateTotal();
}

function calculateTotal() {
    let grandTotal = invoiceItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    document.getElementById("grandTotal").innerText = grandTotal;
}

// PDF ডাউনলোড ফাংশন
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let customerName = document.getElementById("customerName").value || "অজ্ঞাত কাস্টমার";

    doc.text("কাস্টমারের নাম: " + customerName, 20, 20);
    let y = 30;

    invoiceItems.forEach((item, index) => {
        let total = item.quantity * item.price;
        doc.text(`${index + 1}. ${item.name} - ${item.quantity} x ${item.price} = ${total} টাকা`, 20, y);
        y += 10;
    });

    doc.text("মোট: " + document.getElementById("grandTotal").innerText + " টাকা", 20, y + 10);
    doc.save("invoice.pdf");
}

document.addEventListener("DOMContentLoaded", renderTable);