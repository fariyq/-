function generateInvoice() {
    let customer = document.getElementById("customerName").value;
    let product = document.getElementById("productName").value;
    let quantity = document.getElementById("quantity").value;

    if (!customer || !product || !quantity) {
        alert("Please fill out all fields!");
        return;
    }

    let invoiceText = `<p><strong>Customer:</strong> ${customer}</p>
                       <p><strong>Product:</strong> ${product}</p>
                       <p><strong>Quantity:</strong> ${quantity}</p>`;

    document.getElementById("invoiceOutput").innerHTML = invoiceText;
}
function generateInvoice() {
    let customer = document.getElementById("customerName").value;
    let product = document.getElementById("productName").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if (!customer || !product || !quantity || !price) {
        alert("Please fill out all fields.");
        return;
    }

    let totalPrice = quantity * price;

    let invoiceText = `
        <p><strong>Customer:</strong> ${customer}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Price (Per Item):</strong> ${price} BDT</p>
    `;

    document.getElementById("invoiceOutput").innerHTML = invoiceText;
    document.getElementById("totalPrice").innerText = totalPrice;
}