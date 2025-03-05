let invoiceNumber = 1001;
let totalAmount = 0;

function showCustomerForm() {
    document.getElementById("customer-form").style.display = "block";
}

function saveCustomer() {
    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    let address = document.getElementById("customer-address").value;
    
    if (!name || !phone || !address) {
        alert("সব তথ্য দিন!");
        return;
    }

    alert(`কাস্টমার সংরক্ষণ করা হয়েছে:\nনাম: ${name}\nফোন: ${phone}\nঠিকানা: ${address}`);
}

function addItem() {
    let name = document.getElementById("item-name").value;
    let quantity = document.getElementById("item-quantity").value;
    let price = document.getElementById("item-price").value;
    
    if (!name || !quantity || !price) {
        alert("সব তথ্য দিন!");
        return;
    }
    
    let total = quantity * price;
    totalAmount += total;

    let row = `<tr>
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>${total}</td>
    </tr>`;

    document.getElementById("invoice-body").innerHTML += row;
    document.getElementById("total-amount").innerText = totalAmount;
}