document.getElementById("date-time").innerText = new Date().toLocaleString();

function addItem() {
    let table = document.getElementById("invoice-table");
    let row = table.insertRow(-1);
    row.innerHTML = `<td><input type="text" placeholder="প্রোডাক্টের নাম"></td>
                     <td><input type="number" value="0"></td>
                     <td><input type="number" value="1"></td>
                     <td>0</td>
                     <td><button onclick="deleteRow(this)">❌</button></td>`;
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
}

function generateQR() {
    let customerName = document.getElementById("customer-name").value;
    let customerPhone = document.getElementById("customer-phone").value;
    let qrData = `কাস্টমার: ${customerName}, মোবাইল: ${customerPhone}`;
    document.getElementById("qr-code").innerText = qrData; // (এখানে QR কোড লাইব্রেরি লাগবে)
}

function printInvoice() {
    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;

    let invoiceHTML = document.getElementById("invoice").innerHTML;
    let printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`<html><head><title>Invoice</title></head><body>`);
    printWindow.document.write(`<h2>ইমরান ইলেকট্রনিক্স মোবাইল সার্ভিসিং সেন্টার</h2>`);
    printWindow.document.write(`<p>Phone: 01952325903 | Email: mdemranst0@gmail.com</p>`);
    printWindow.document.write(`<p>Date: ${new Date().toLocaleString()}</p>`);
    printWindow.document.write(`<h3>কাস্টমার: ${name}</h3>`);
    printWindow.document.write(`<h3>মোবাইল: ${phone}</h3>`);
    printWindow.document.write(invoiceHTML);
    printWindow.document.write(`</body></html>`);

    printWindow.document.close();
    printWindow.print();
}