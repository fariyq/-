function generateInvoice() {
    let customer = document.getElementById("customerName").value;
    let product = document.getElementById("productName").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    let total = quantity * price;

    document.getElementById("invoiceCustomer").innerText = customer;
    document.getElementById("invoiceProduct").innerText = product;
    document.getElementById("invoiceQuantity").innerText = quantity;
    document.getElementById("invoiceTotal").innerText = total;

    document.getElementById("invoiceResult").classList.remove("d-none");
}
