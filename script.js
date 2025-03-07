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
    invoiceItems[index][field] = field === "name" ? value : parseFloat(value) || 0;
    renderTable();
}

function renderTable() {
    let tableBody = document.getElementById("invoiceBody");
    tableBody.innerHTML = "";
    let grandTotal = 0;

    invoiceItems.forEach((item, index) => {
        let total = item.quantity * item.price;
        grandTotal += total;

        tableBody.innerHTML += `
            <tr>
                <td><input type="text" value="${item.name}" oninput="updateItem(${index}, 'name', this.value)"></td>
                <td><input type="number" value="${item.quantity}" min="1" oninput="updateItem(${index}, 'quantity', this.value); updateTotal();"></td>
                <td><input type="number" value="${item.price}" min="0" oninput="updateItem(${index}, 'price', this.value); updateTotal();"></td>
                <td>${total} টাকা</td>
                <td><button class="remove-btn" onclick="removeItem(${index})">মুছুন</button></td>
            </tr>
        `;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}

function updateTotal() {
    let total = invoiceItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    document.getElementById("grandTotal").innerText = total;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    
    doc.text("ইনভয়েস", 20, 20);
    let y = 30;

    invoiceItems.forEach((item, index) => {
        let total = item.quantity * item.price;
        doc.text(`${index + 1}. ${item.name} - ${item.quantity} x ${item.price} = ${total} টাকা`, 20, y);
        y += 10;
    });

    doc.text("মোট: " + document.getElementById("grandTotal").innerText + " টাকা", 20, y + 10);
    doc.save("invoice.pdf");
}