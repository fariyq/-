document.addEventListener("DOMContentLoaded", function () { 
    const validUserId = "01952325903"; // ইউজার আইডি
    const validPassword = "2025"; // পাসওয়ার্ড

    function login() {
        const userId = document.getElementById("userId").value;
        const password = document.getElementById("password").value;
        const loginMessage = document.getElementById("loginMessage");

        if (userId === validUserId && password === validPassword) {
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("invoiceSection").style.display = "block";
            alert("লগইন সফল হয়েছে!");
        } else {
            loginMessage.textContent = "ভুল ইউজার আইডি অথবা পাসওয়ার্ড!";
        }
    }

    window.login = login;

    function updateDateTime() {
        const now = new Date();
        document.getElementById("currentDate").innerText = now.toLocaleDateString('bn-BD');
        document.getElementById("currentTime").innerText = now.toLocaleTimeString('bn-BD');
        setTimeout(updateDateTime, 1000);
    }

    window.addItem = function () {
        const invoiceBody = document.getElementById("invoiceBody");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td></td>
            <td><input type="text"></td>
            <td><input type="number" oninput="calculateTotal()"></td>
            <td><input type="number" oninput="calculateTotal()"></td>
            <td class="totalPrice">0 টাকা</td>
            <td><button onclick="this.closest('tr').remove(); calculateTotal();">❌</button></td>
        `;

        invoiceBody.appendChild(row);
    }

    window.calculateTotal = function () {
        const rows = document.querySelectorAll("#invoiceBody tr");
        let total = 0;

        rows.forEach((row, index) => {
            const quantity = parseFloat(row.children[2].querySelector("input").value) || 0;
            const unitPrice = parseFloat(row.children[3].querySelector("input").value) || 0;
            const rowTotal = quantity * unitPrice;
            row.children[4].innerText = rowTotal + " টাকা";
            total += rowTotal;
        });

        document.getElementById("grandTotal").innerText = total + " টাকা";
    }

    window.printInvoice = function () {
        window.print();
    }

    updateDateTime();
});