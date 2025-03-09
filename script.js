document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let paidAmountElement = document.getElementById("paidAmount");
    let dueAmountElement = document.getElementById("dueAmount");
    let returnAmountElement = document.getElementById("returnAmount");
    let paymentStatusElement = document.getElementById("paymentStatus");
    let invoiceNumberElement = document.getElementById("invoiceNumber");
    let currentDateElement = document.getElementById("currentDate");
    let currentTimeElement = document.getElementById("currentTime");

    // 🔹 **তারিখ ও সময় আপডেট করার ফাংশন**
    function updateDateTime() {
        let now = new Date();
        let date = now.toLocaleDateString("bn-BD"); // বাংলা ফরম্যাটে তারিখ
        let time = now.toLocaleTimeString("bn-BD"); // বাংলা ফরম্যাটে সময়

        currentDateElement.innerText = date;
        currentTimeElement.innerText = time;
    }
    setInterval(updateDateTime, 1000); // **প্রতি সেকেন্ডে সময় আপডেট হবে**
    updateDateTime(); // **পেজ লোডের সাথে সাথে একবার চালাবে**

    // 🔹 **ইনভয়েস নাম্বার জেনারেট করার ফাংশন**
    function generateInvoiceNumber() {
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        invoiceNumberElement.value = "INV-" + randomNumber;
    }

    // 🔹 **মোট টাকার হিসাব করা**
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

    // 🔹 **বাকি টাকা এবং ফেরত টাকা গণনা করা**
    window.calculateDue = function () {
        let grandTotal = parseFloat(grandTotalElement.innerText.replace(" টাকা", "")) || 0;
        let paidAmount = parseFloat(paidAmountElement.value) || 0;
        let dueAmount = grandTotal - paidAmount;
        let returnAmount = 0;

        if (dueAmount < 0) {
            returnAmount = Math.abs(dueAmount);
            dueAmount = 0;
        }

        dueAmountElement.innerText = dueAmount.toFixed(2) + " টাকা";
        returnAmountElement.innerText = returnAmount.toFixed(2) + " টাকা";

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

    // 🔹 **নতুন আইটেম যোগ করা**
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

    // 🔹 **ইনভয়েস প্রিন্ট করা**
    window.printInvoice = function() {
        window.print();
    };

    // 🔹 **পেইড অ্যামাউন্ট ইনপুট দিলে সাথে সাথে হিসাব আপডেট হবে**
    paidAmountElement.addEventListener("input", calculateDue);

    // 🔹 **পেজ লোড হলে ইনভয়েস নাম্বার তৈরি করবে**
    generateInvoiceNumber();
});