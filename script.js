document.addEventListener("DOMContentLoaded", function () {
    let invoiceBody = document.getElementById("invoiceBody");
    let grandTotalElement = document.getElementById("grandTotal");
    let invoiceNumberElement = document.getElementById("invoiceNumber");
    let currentDateElement = document.getElementById("currentDate");
    let currentTimeElement = document.getElementById("currentTime");

    // **শুধু ক্রমিক নম্বর তৈরি করা (তারিখ ছাড়া)**
    function generateInvoiceNumber() {
        let randomPart = Math.floor(100000 + Math.random() * 900000); 
        return "HAL-" + randomPart;
    }
    invoiceNumberElement.value = generateInvoiceNumber();

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
    window.addItem = function() {
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

    // প্রিন্ট ফাংশন
    window.printInvoice = function() {
        window.print();
    };
});
