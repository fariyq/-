// ✅ কাস্টমার ডাটা লোকাল স্টোরেজে সংরক্ষণ করা
function saveCustomer() {
    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;

    if (name && phone) {
        let customers = JSON.parse(localStorage.getItem("customers")) || {};
        customers[phone] = name;
        localStorage.setItem("customers", JSON.stringify(customers));

        alert("কাস্টমারের তথ্য সংরক্ষণ করা হয়েছে!");
    } else {
        alert("অনুগ্রহ করে নাম এবং মোবাইল নম্বর প্রদান করুন।");
    }
}

// ✅ মোবাইল নম্বর দিয়ে সার্চ করে কাস্টমার তথ্য দেখানো
function searchCustomer() {
    let phone = document.getElementById("search-phone").value;
    let customers = JSON.parse(localStorage.getItem("customers")) || {};

    if (customers[phone]) {
        document.getElementById("customer-name").value = customers[phone];
        document.getElementById("customer-phone").value = phone;
    } else {
        alert("এই নম্বরে কোনো কাস্টমার পাওয়া যায়নি!");
    }
}

// ✅ ইনভয়েস প্রিন্ট করার ফাংশন
function printInvoice() {
    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    
    let invoiceContent = `
        <h2>ইমরান ইলেকট্রনিক্স মোবাইল সার্ভিসিং সেন্টার</h2>
        <p>Phone: 01952325903 | Email: mdemranst0@gmail.com</p>
        <p>Date: ${new Date().toLocaleString()}</p>
        <h3>কাস্টমার: ${name}</h3>
        <h3>মোবাইল: ${phone}</h3>
        ${document.getElementById("invoice").innerHTML}
    `;

    let printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`<html><head><title>Invoice</title></head><body>${invoiceContent}</body></html>`);
    printWindow.document.close();
    printWindow.print();
}