document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let invoiceNumberElement = document.getElementById("invoiceNumber");
    let currentDateElement = document.getElementById("currentDate");
    let currentTimeElement = document.getElementById("currentTime");
    let paidAmountElement = document.getElementById("paidAmount");
    let dueAmountElement = document.getElementById("dueAmount");
    let changeAmountElement = document.getElementById("changeAmount");
    let paymentStatusElement = document.getElementById("paymentStatus");
    let customerPhoneElement = document.getElementById("customerPhone");

    // **ইনভয়েস নম্বর তৈরি করা (ছোট করে দেখাবে)**
    function generateInvoiceNumber() {
        let randomPart = Math.floor(1000 + Math.random() * 9000);
        return "INV-" + randomPart;
    }
    invoiceNumberElement.innerText = generateInvoiceNumber();

    // **তারিখ ও সময় অটো আপডেট করা**
    function updateDateTime() {
        let now = new Date();
        let dateStr = now.toLocaleDateString("bn-BD");
        let timeStr = now.toLocaleTimeString("bn-BD");

        currentDateElement.innerText = dateStr;
        currentTimeElement.innerText = timeStr;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // মোট দাম হিসাব করা
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

    // **জমা টাকা ও অবশিষ্ট টাকা হিসাব করা (ডান পাশে দেখাবে)**
    window.calculateDue = function () {
        let grandTotal = parseFloat(grandTotalElement.innerText) || 0;
        let paidAmount = parseFloat(paidAmountElement.value) || 0;
        let dueAmount = grandTotal - paidAmount;
        let changeAmount = 0;

        if (dueAmount < 0) {
            changeAmount = Math.abs(dueAmount);
            dueAmount = 0;
        }

        dueAmountElement.innerText = dueAmount.toFixed(2) + " টাকা";
        changeAmountElement.innerText = changeAmount > 0 ? changeAmount.toFixed(2) + " টাকা ফেরত দিন" : "";

        if (dueAmount === 0 && paidAmount > 0) {
            paymentStatusElement.style.display = "block";
        } else {
            paymentStatusElement.style.display = "none";
        }
    };

    // ক্রমিক নম্বর আপডেট ফাংশন
    function updateSerialNumbers() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        rows.forEach((row, index) => {
            row.querySelector(".serialNumber").innerText = index + 1;
        });
    }

    // নতুন আইটেম যোগ করা
    window.addItem = function() {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="serialNumber"></td>
            <td><input type="text" class="productName" placeholder="পণ্য নাম"></td>
            <td><input type="number" class="quantity" placeholder="পরিমাণ"></td>
            <td><input type="number" class="unitPrice" placeholder="একক মূল্য"></td>
            <td class="totalPrice">0 টাকা</td>
            <td><button class="removeBtn">❌ মুছুন</button></td>
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

    // **কাস্টমারের নাম ও ফোন নম্বর একসাথে দেখাবে**
    window.updateCustomerInfo = function () {
        let customerName = document.getElementById("customerName").value;
        let customerPhone = customerPhoneElement.value;
        let displayText = customerName;

        if (customerPhone) {
            displayText += " (" + customerPhone + ")";
        }

        document.getElementById("customerDisplay").innerText = displayText;
    };

    // প্রিন্ট ফাংশন
    window.printInvoice = function() {
        window.print();
    };
});