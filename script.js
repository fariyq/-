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

        grandTotalElement.innerText = grandTotal.toFixed(2) + "