document.addEventListener("DOMContentLoaded", function () { 
    // তারিখ ও সময় আপডেট করা
    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('bn-BD');
        const time = now.toLocaleTimeString('bn-BD');
        document.getElementById("currentDate").innerText = date;
        document.getElementById("currentTime").innerText = time;

        setTimeout(updateDateTime, 1000);
    }

    updateDateTime();
    
    // ইনভয়েস নম্বর তৈরি
    function generateInvoiceNumber() {
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        document.getElementById("invoiceNumber").value = "INV-" + randomNumber;
    }

    // আইটেম যোগ করার ফাংশন
    function addItem() {
        let tableBody = document.getElementById("invoiceBody");
        let row = document.createElement("tr");

        row.innerHTML = `
            <td class="serialNumber">1</td>
            <td><input type="text" class="itemName" placeholder="পণ্য নাম"></td>
            <td><input type="number" class="quantity" placeholder="পরিমাণ" oninput="calculateTotal()"></td>
            <td><input type="number" class="unitPrice" placeholder="একক মূল্য" oninput="calculateTotal()"></td>
            <td class="totalPrice">0.00 টাকা</td>
            <td><button onclick="deleteItem(this)">❌</button></td>
        `;
        tableBody.appendChild(row);
    }

    // আইটেম মুছে ফেলার ফাংশন
    function deleteItem(button) {
        button.closest("tr").remove();
        calculateTotal();
    }

    // মোট হিসাব করার ফাংশন
    function calculateTotal() {
        let rows = document.querySelector