function generateInvoice() {
    let customer = document.getElementById("customerName").value;
    let product = document.getElementById("productName").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if (!customer || !product || !quantity || !price) {
        alert("সব তথ্য পূরণ করুন!");
        return;
    }

    let total = quantity * price;

    // নতুন ডাটা যোগ করার পরিবর্তে আগের ইনভয়েস রিফ্রেশ করা
    document.getElementById("invoiceOutput").innerHTML = `
        <h3>Invoice:</h3>
        <p><strong>Customer:</strong> ${customer}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Price (Per Item):</strong> ${price} BDT</p>
    `;

    document.getElementById("totalPrice").innerHTML = `
        <h3>Total Price: ${total} BDT</h3>
    `;
}