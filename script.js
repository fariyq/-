document.addEventListener("DOMContentLoaded", function () {
    function updateDateTime() {
        const now = new Date();
        document.getElementById("currentDate").innerText = now.toLocaleDateString('bn-BD');
        document.getElementById("currentTime").innerText = now.toLocaleTimeString('bn-BD');
        setTimeout(updateDateTime, 1000);
    }

    function generateInvoiceNumber() {
        document.getElementById("invoiceNumber").value = "INV-" + Math.floor(100000 + Math.random() * 900000);
    }

    function calculateTotal() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        let grandTotal = 0;

        rows.forEach((row, index) => {
            let quantity = parseFloat(row.querySelector(".quantity").value) || 0;
            let unitPrice = parseFloat(row.querySelector(".unitPrice").value) || 0;
            let total = quantity * unitPrice;

            row.querySelector(".totalPrice").innerText = total.toFixed(2) + " টাকা";
            grandTotal += total;

            row.querySelector(".serialNumber").innerText = index + 1;
        });

        document.getElementById("grandTotal").innerText = grandTotal.toFixed(2) + " টাকা";
        calculateDue();
    }

    function calculateDue() {
        let grandTotal = parseFloat(document.getElementById("grandTotal").innerText.replace(" টাকা", "")) || 0;
        let paidAmount = parseFloat(document.getElementById("paidAmount").value) || 0;
        let dueAmount = grandTotal - paidAmount;
        let returnAmount = dueAmount < 0 ? Math.abs(dueAmount) : 0;
        dueAmount = dueAmount > 0 ? dueAmount : 0;

        document.getElementById("dueAmount").innerText = dueAmount.toFixed(2) + " টাকা";
        document.getElementById("returnAmount").innerText = returnAmount.toFixed(2) + " টাকা";
    }

    window.addItem = function () {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="serialNumber"></td>
            <td><input type="text" class="productName"></td>
            <td><input type="number" class="quantity" oninput="calculateTotal()"></td>
            <td><input type="number" class="unitPrice" oninput="calculateTotal()"></td>
            <td class="totalPrice">0.00 টাকা</td>
            <td class="no-print"><button onclick="this.closest('tr').remove(); calculateTotal();">❌</button></td>
        `;
        document.getElementById("invoiceBody").appendChild(row);
    }

    updateDateTime();
    generateInvoiceNumber();
});