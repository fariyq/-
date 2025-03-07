document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let invoiceNumberElement = document.getElementById("invoiceNumber");

    // স্বয়ংক্রিয় ইনভয়েস নাম্বার সেটআপ
    function generateInvoiceNumber() {
        let today = new Date();
        let datePart = today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');
        let randomPart = Math.floor(1000 + Math.random() * 9000); // 4 ডিজিট র‍্যান্ডম সংখ্যা
        return "INV-" + datePart + "-" + randomPart;
    }
    invoiceNumberElement.value = generateInvoiceNumber();

    // মোট দাম হিসাব
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

    // নতুন আইটেম যোগ করা
    function addItem() {
        let row = document.createElement("tr");
        row.innerHTML = `
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
        });

        invoiceBody.appendChild(row);
    }

    // PDF ডাউনলোড ফাংশন
    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        let doc = new jsPDF();

        // ইনভয়েসের তারিখ
        let today = new Date();
        let invoiceDate = today.toLocaleDateString("bn-BD");

        doc.setFont("helvetica"); // বাংলা ফন্ট যুক্ত করলে এখানে সেট করতে হবে

        doc.text("ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার", 10, 10);
        doc.text("📧 mdemranst0@gmail.com | 📞 01952325903", 10, 20);
        doc.text("ইনভয়েস নাম্বার: " + invoiceNumberElement.value, 10, 30);
        doc.text("তারিখ: " + invoiceDate, 10, 40);

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
            startY: 50
        });

        doc.text("মোট মূল্য: " + grandTotalElement.innerText, 10, doc.autoTable.previous.finalY + 10);
        doc.save("invoice.pdf");
    }

    // বাটন ইভেন্ট লিসেনার যোগ করা
    document.querySelector("button[onclick='downloadPDF()']").addEventListener("click", downloadPDF);
    document.querySelector("button[onclick='addItem()']").addEventListener("click", addItem);

    // গ্লোবাল এক্সপোজার
    window.addItem = addItem;
    window.calculateTotal = calculateTotal;
});