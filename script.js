window.onload = function() {
    document.getElementById('invoiceNumber').innerText = "INV-" + new Date().toISOString().slice(0, 10).replace(/-/g, '') + "-" + Math.floor(Math.random() * 1000);
    document.getElementById('invoiceDate').innerText = new Date().toLocaleString();
};

function addProduct() {
    let productList = document.getElementById("productList");
    let row = productList.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Product Name"></td>
        <td><input type="number" placeholder="Price" oninput="calculateTotal()"></td>
        <td><input type="number" placeholder="Qty" oninput="calculateTotal()"></td>
        <td class="totalCell">0</td>
    `;
}

function calculateTotal() {
    let rows = document.querySelectorAll("#productList tr");
    let total = 0;
    rows.forEach(row => {
        let price = row.cells[1].querySelector("input").value;
        let qty = row.cells[2].querySelector("input").value;
        let totalCell = row.cells[3];
        let rowTotal = price * qty;
        totalCell.innerText = rowTotal;
        total += rowTotal;
    });
    document.getElementById("totalAmount").innerText = total + " ৳";
}

function generatePDF() {
    let invoiceElement = document.querySelector(".invoice-container");
    let opt = {
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };
    html2pdf().from(invoiceElement).set(opt).save();
