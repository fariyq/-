window.onload = function() {
    document.getElementById("invoice-date").innerText = new Date().toLocaleString('bn-BD', { hour: 'numeric', minute: 'numeric', hour12: true });
};

function addItem() {
    let table = document.getElementById("invoice-table").getElementsByTagName('tbody')[0];
    let row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="পণ্যের নাম"></td>
        <td><input type="number" value="1"></td>
        <td><input type="number" value="0"></td>
        <td class="total">0</td>
        <td><button onclick="deleteRow(this)">❌</button></td>
    `;
    updateTotal();
}

function deleteRow(btn) {
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotal();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll("#invoice-table tbody tr").forEach(row => {
        let qty = row.cells[1].querySelector("input").value;
        let price = row.cells[2].querySelector("input").value;
        let subtotal = qty * price;
        row.cells[3].innerText = subtotal;
        total += subtotal;
    });
    document.getElementById("total-price").innerText = total;
}

function generateInvoice() {
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.text("ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার", 10, 10);
    doc.text("📧 mdemranst0@gmail.com | 📞 01952325903", 10, 20);
    doc.text("তারিখ: " + new Date().toLocaleString('bn-BD', { hour12: true }), 10, 30);

    let y = 40;
    document.querySelectorAll("#invoice-table tbody tr").forEach(row => {
        let name = row.cells[0].querySelector("input").value;
        let qty = row.cells[1].querySelector("input").value;
        let price = row.cells[2].querySelector("input").value;
        let subtotal = row.cells[3].innerText;
        doc.text(`${name} - ${qty} x ${price} = ${subtotal} টাকা`, 10, y);
        y += 10;
    });

    doc.text("মোট: " + document.getElementById("total-price").innerText + " টাকা", 10, y + 10);
    
    let qrCodeDiv = document.getElementById("qrcode");
    qrCodeDiv.innerHTML = "";
    new QRCode(qrCodeDiv, {
        text: "bKash: 01952325903, Nagad: 01952325903, Rocket: 01952325903",
        width: 100,
        height: 100
    });

    let qrCanvas = qrCodeDiv.querySelector("canvas");
    let qrDataURL = qrCanvas.toDataURL("image/png");
    doc.addImage(qrDataURL, "PNG", 10, y + 20, 40, 40);

    doc.save("invoice.pdf");
}document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quantity, .unit-price").forEach(function (input) {
        input.addEventListener("input", calculateTotal);
    });
});

function calculateTotal() {
    let rows = document.querySelectorAll(".invoice-row");
    let grandTotal = 0;

    rows.forEach(function (row) {
        let quantity = parseFloat(row.querySelector(".quantity").value) || 0;
        let unitPrice = parseFloat(row.querySelector(".unit-price").value) || 0;
        let totalPrice = quantity * unitPrice;
        
        row.querySelector(".total-price").textContent = totalPrice.toFixed(2); // দুই ঘরDecimal
        
        grandTotal += totalPrice;
    });

    document.getElementById("grand-total").textContent = grandTotal.toFixed(2);
}