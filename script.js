document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");

    function calculateTotal() {
        let rows = document.querySelectorAll("#invoiceBody tr");
        let grandTotal = 0;

        rows.forEach(row => {
            let quantity = row.querySelector(".quantity").value || 0;
            let unitPrice = row.querySelector(".unitPrice").value || 0;
            let totalPrice = parseFloat(quantity) * parseFloat(unitPrice);
            row.querySelector(".totalPrice").innerText = totalPrice + " টাকা";
            grandTotal += totalPrice;
        });

        grandTotalElement.innerText = grandTotal + " টাকা";
    }

    function addItem() {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="productName"></td>
            <td><input type="number" class="quantity" oninput="calculateTotal()"></td>
            <td><input type="number" class="unitPrice" oninput="calculateTotal()"></td>
            <td class="totalPrice">0 টাকা</td>
            <td><button onclick="removeItem(this)">❌ মুছুন</button></td>
        `;
        invoiceBody.appendChild(row);
    }

    function removeItem(button) {
        button.parentElement.parentElement.remove();
        calculateTotal();
    }

    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        let doc = new jsPDF();

        doc.text("ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার", 10, 10);
        doc.text("📧 mdemranst0@gmail.com | 📞 01952325903", 10, 20);

        let rows = [];
        document.querySelectorAll("#invoiceBody tr").forEach(row => {
            let productName = row.querySelector(".productName").value || "";
            let quantity = row.querySelector(".quantity").value || "";
            let unitPrice = row.querySelector(".unitPrice").value || "";
            let totalPrice = row.querySelector(".totalPrice").innerText || "";

            rows.push([productName, quantity, unitPrice, totalPrice]);
        });

        doc.autoTable({
            head: [["পণ্য নাম", "পরিমাণ", "একক মূল্য", "মোট"]],
            body: rows,
            startY: 30
        });

        doc.text("মোট মূল্য: " + grandTotalElement.innerText, 10, doc.autoTable.previous.finalY + 10);
        doc.save("invoice.pdf");
    }

    window.addItem = addItem;
    window.removeItem = removeItem;
    window.calculateTotal = calculateTotal;
    window.downloadPDF = downloadPDF;
});