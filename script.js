document.addEventListener("DOMContentLoaded", function() {
    
    function updateDateTime() {
        let now = new Date();
        let formattedDate = now.toLocaleDateString("bn-BD");
        let formattedTime = now.toLocaleTimeString("bn-BD");
        document.getElementById("datetime").innerText = "তারিখ: " + formattedDate + " | সময়: " + formattedTime;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    let invoiceItems = [];
    let totalPrice = 0;

    document.getElementById("newCustomerBtn").addEventListener("click", function() {
        document.getElementById("customerForm").style.display = "block";
    });

    document.getElementById("saveCustomer").addEventListener("click", function() {
        let name = document.getElementById("customerName").value;
        let phone = document.getElementById("customerPhone").value;
        let address = document.getElementById("customerAddress").value;

        if (name && phone && address) {
            alert("✅ কাস্টমার সংরক্ষিত!");
            document.getElementById("customerForm").style.display = "none";
        } else {
            alert("❌ সব তথ্য দিন!");
        }
    });

    document.getElementById("addItem").addEventListener("click", function() {
        let itemName = document.getElementById("itemName").value;
        let itemQty = parseInt(document.getElementById("itemQty").value);
        let itemPrice = parseFloat(document.getElementById("itemPrice").value);

        if (itemName && itemQty > 0 && itemPrice > 0) {
            let itemTotal = itemQty * itemPrice;
            invoiceItems.push({ name: itemName, qty: itemQty, price: itemPrice, total: itemTotal });
            updateInvoiceTable();
        } else {
            alert("❌ সঠিক তথ্য দিন!");
        }
    });

    function updateInvoiceTable() {
        let tableBody = document.getElementById("invoiceTable");
        tableBody.innerHTML = "";
        totalPrice = 0;

        invoiceItems.forEach(item => {
            let row = tableBody.insertRow();
            row.insertCell(0).innerText = item.name;
            row.insertCell(1).innerText = item.qty;
            row.insertCell(2).innerText = item.price;
            row.insertCell(3).innerText = item.total;
            totalPrice += item.total;
        });

        document.getElementById("totalPrice").innerText = totalPrice;
    }

});