document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");

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
    }

    function addItem() {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="productName"></td>
            <td><input type="number" class="quantity"></td>
            <td><input type="number" class="unitPrice"></td>
            <td class="totalPrice">0 টাকা</td>
            <td><button class="removeBtn">❌ মুছুন</button></td>
        `;

        row.querySelector(".quantity").addEventListener("input", calculateTotal);
        row.querySelector(".unitPrice").addEventListener("input", calculateTotal);
        row.querySelector(".removeBtn").addEventListener("click", function () {
            row.remove();
            calculateTotal();
        });

        invoiceBody.appendChild(row);
    }

    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        let doc = new jsPDF();
        
        // বাংলা ফন্ট সেটআপ (কাস্টম ফন্ট যুক্ত করতে হবে)
        doc.setFont("helvetica"); // এখানে বাংলা ফন্ট লোড করা লাগবে

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

    document.querySelector("button[onclick='downloadPDF()']").addEventListener("click", downloadPDF);
    document.querySelector("button[onclick='addItem()']").addEventListener("click", addItem);

    // গ্লোবাল এক্সপোজার
    window.addItem = addItem;
    window.calculateTotal = calculateTotal;
});