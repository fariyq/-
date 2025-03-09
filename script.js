document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let invoiceNumberElement = document.getElementById("invoiceNumber");
    let currentDateElement = document.getElementById("currentDate");
    let currentTimeElement = document.getElementById("currentTime");
    let paidAmountElement = document.getElementById("paidAmount"); 
    let dueAmountElement = document.getElementById("dueAmount"); 
    let paymentStatusElement = document.getElementById("paymentStatus"); 

    function generateInvoiceNumber() {
        let randomPart = Math.floor(100000 + Math.random() * 900000); 
        return "INV-" + randomPart;
    }
    invoiceNumberElement.innerText = generateInvoiceNumber();

    function updateDateTime() {
        let now = new Date();
        let dateStr = now.toLocaleDateString("bn-BD");
        let timeStr = now.toLocaleTimeString("bn-BD");

        currentDateElement.innerText = dateStr;
        currentTimeElement.innerText = timeStr;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    function calculateTotal() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        let grandTotal = 0;

        rows.forEach(row => {
            let quantity = parseFloat(row.querySelector(".quantity").value) || 0;
            let unitPrice = parseFloat(row.querySelector(".unitPrice").value) || 0;
            let totalPrice = quantity * unitPrice;
            row.querySelector(".totalPrice").innerText = totalPrice.toFixed(2) + " টাকা";
            grandTotal += totalPrice;
        });

        grandTotalElement.innerText = grandTotal.toFixed(2) + " টাকা";
        calculateDue();
    }

    window.calculateDue = function () {
        let grandTotal = parseFloat(grandTotalElement.innerText) || 0;
        let paidAmount = parseFloat(paidAmountElement.value) || 0;
        let dueAmount = grandTotal - paidAmount;

        if (dueAmount < 0) {
            dueAmount = 0;
        }

        dueAmountElement.innerText = dueAmount.toFixed(2) + " টাকা";

        if (dueAmount === 0 && paidAmount > 0) {
            paymentStatusElement.style.display = "block";
        } else {
            paymentStatusElement.style.display = "none";
        }
    };

    function updateSerialNumbers() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        rows.forEach((row, index) => {
            row.querySelector(".serialNumber").innerText = index + 1;
        });
    }

    window.addItem = function() {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="serialNumber"></td>
            <td><input type="text" class="productName" placeholder="পণ্য নাম"></td>
            <td><input type="number" class="quantity" placeholder="পরিমাণ"></td>
            <td><input type="number" class="unitPrice" placeholder="একক মূল্য"></td>
            <td class="totalPrice">0 টাকা</td>
            <td><button class="removeBtn">❌</button></td>
        `;

        row.querySelector(".quantity").addEventListener("input", calculateTotal);
        row.querySelector(".unitPrice").addEventListener("input", calculateTotal);
        row.querySelector(".removeBtn").addEventListener("click", function () {
            row.remove();
            calculateTotal();
            updateSerialNumbers();
        });

        invoiceBody.appendChild(row);
        updateSerialNumbers();
    };

    window.printInvoice = function() {
        window.print();
    };
});