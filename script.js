document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let paidAmountElement = document.getElementById("paidAmount");
    let dueAmountElement = document.getElementById("dueAmount");
    let returnAmountElement = document.getElementById("returnAmount");
    let paymentStatusElement = document.getElementById("paymentStatus");
    let invoiceNumberElement = document.getElementById("invoiceNumber");
    let invoiceTitleElement = document.querySelector("h2");
    let originalTitle = invoiceTitleElement.innerText; // আসল টাইটেল সেভ করে রাখা

    // তারিখ ও সময় দেখানোর জন্য ফাংশন
    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('bn-BD');
        const time = now.toLocaleTimeString('bn-BD');
        document.getElementById("currentDate").innerText = date;
        document.getElementById("currentTime").innerText = time;

        setTimeout(updateDateTime, 1000);
    }

    window.updateDateTime = updateDateTime;

    // ইনভয়েস নাম্বার জেনারেট করা
    function generateInvoiceNumber() {
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        invoiceNumberElement.value = "INV-" + randomNumber;
    }

    window.generateInvoiceNumber = generateInvoiceNumber;

    // মোট হিসাব করা
    function calculateTotal() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        let grandTotal = 0;

        rows.forEach((row, index) => {
            let quantity = parseFloat(row.querySelector(".quantity").value) || 0;
            let unitPrice = parseFloat(row.querySelector(".unitPrice").value) || 0;
            let totalPrice = quantity * unitPrice;

            row.querySelector(".totalPrice").innerText = totalPrice.toFixed(2) + " টাকা";
            grandTotal += totalPrice;

            // ক্রমিক নাম্বার ঠিক করা
            row.querySelector(".serialNumber").innerText = index + 1;
        });

        grandTotalElement.innerText = grandTotal.toFixed(2) + " টাকা";
        calculateDue();
    }

    window.calculateDue = function () {
        let grandTotal = parseFloat(grandTotalElement.innerText.replace(" টাকা", "")) || 0;
        let paidAmount = parseFloat(paidAmountElement.value) || 0;
        let dueAmount = grandTotal - paidAmount;
        let returnAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;
        dueAmount = dueAmount > 0 ? dueAmount : 0;

        dueAmountElement.innerText = dueAmount.toFixed(2) + " টাকা";
        returnAmountElement.innerText = returnAmount.toFixed(2) + " টাকা";
        paymentStatusElement.style.display = dueAmount === 0 && paidAmount > 0 ? "block" : "none";
    };

    window.addItem = function () {
        let row = document.createElement("tr");
        row.innerHTML = `<td class="serialNumber"></td>
                         <td><input type="text" class="productName"></td>
                         <td><input type="number" class="quantity" oninput="calculateTotal()"></td>
                         <td><input type="number" class="unitPrice" oninput="calculateTotal()"></td>
                         <td class="totalPrice">0 টাকা</td>
                         <td class="no-print"><button class="removeBtn">❌</button></td>`;

        row.querySelector(".removeBtn").addEventListener("click", function () {
            row.remove();
            calculateTotal();
        });

        invoiceBody.appendChild(row);
        calculateTotal();
    };

    window.printInvoice = function () {
        // প্রিন্ট করার সময় শুধু নীচের লাইন প্রিন্ট হবে
        alert("প্রিন্ট করা হচ্ছে... ধন্যবাদ, আবার আসবেন।");
        window.print();
    };

    updateDateTime();
    generateInvoiceNumber();
});