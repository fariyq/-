document.addEventListener("DOMContentLoaded", function () { 
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let paidAmountElement = document.getElementById("paidAmount");
    let dueAmountElement = document.getElementById("dueAmount");
    let returnAmountElement = document.getElementById("returnAmount");
    let paymentStatusElement = document.getElementById("paymentStatus");
    let invoiceNumberElement = document.getElementById("invoiceNumber");
    let dueDateContainer = document.getElementById("dueDateContainer");

    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('bn-BD');
        const time = now.toLocaleTimeString('bn-BD');
        document.getElementById("currentDate").innerText = date;
        document.getElementById("currentTime").innerText = time;

        setTimeout(updateDateTime, 1000);
    }

    window.updateDateTime = updateDateTime;

    function generateInvoiceNumber() {
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        invoiceNumberElement.value = "INV-" + randomNumber;
    }

    window.generateInvoiceNumber = generateInvoiceNumber;

    function calculateTotal() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        let grandTotal = 0;

        rows.forEach((row, index) => {
            let quantityInput = row.querySelector(".quantity");
            let unitPriceInput = row.querySelector(".unitPrice");
            let totalPriceElement = row.querySelector(".totalPrice");

            let quantity = parseFloat(quantityInput.value) || 0;
            let unitPrice = parseFloat(unitPriceInput.value) || 0;
            let totalPrice = quantity * unitPrice;

            totalPriceElement.innerText = totalPrice.toFixed(2) + " টাকা";
            grandTotal += totalPrice;

            row.querySelector(".serialNumber").innerText = index + 1;
        });

        grandTotalElement.innerText = grandTotal.toFixed(2) + " টাকা";
        calculateDue();
    }

    window.calculateTotal = calculateTotal;

    window.calculateDue = function () {
        let grandTotal = parseFloat(grandTotalElement.innerText.replace(" টাকা", "")) || 0;
        let paidAmount = parseFloat(paidAmountElement.value) || 0;
        let dueAmount = grandTotal - paidAmount;
        let returnAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;
        dueAmount = dueAmount > 0 ? dueAmount : 0;

        dueAmountElement.innerText = dueAmount.toFixed(2) + " টাকা";
        returnAmountElement.innerText = returnAmount.toFixed(2) + " টাকা";
        paymentStatusElement.style.display = (dueAmount === 0 && paidAmount > 0) ? "block" : "none";

        // বাকি টাকা থাকলে বাকি টাকা দেওয়ার তারিখের অপশন দেখানো হবে, না থাকলে লুকানো হবে
        if (dueAmount > 0) {
            dueDateContainer.style.display = "block";
        } else {
            dueDateContainer.style.display = "none";  // সম্পূর্ণ টাকা পরিশোধিত হলে সম্পূর্ণভাবে লুকিয়ে যাবে
            document.getElementById("dueDate").value = ""; // তারিখের ইনপুট ফাঁকা হয়ে যাবে
        }
    };

    window.addItem = function () {
        let row = document.createElement("tr");
        row.innerHTML = `<td class="serialNumber"></td>
                         <td><input type="text" class="productName"></td>
                         <td><input type="number" class="quantity" oninput="calculateTotal()"></td>
                         <td><input type="number" class="unitPrice" oninput="calculateTotal()"></td>
                         <td class="totalPrice">0.00 টাকা</td>
                         <td class="no-print"><button class="removeBtn">❌</button></td>`;

        row.querySelector(".removeBtn").addEventListener("click", function () {
            row.remove();
            calculateTotal();
        });

        invoiceBody.appendChild(row);
        calculateTotal();
    };

    window.printInvoice = function () {
        alert("প্রিন্ট করা হচ্ছে...");
        window.print();
    };

    updateDateTime();
    generateInvoiceNumber();
});