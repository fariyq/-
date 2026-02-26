document.addEventListener("DOMContentLoaded", function(){

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let invoiceCounter = localStorage.getItem("invoiceCounter") || 1;
let lastInvoice = {};

function saveData(){
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("sales", JSON.stringify(sales));
localStorage.setItem("dues", JSON.stringify(dues));
localStorage.setItem("invoices", JSON.stringify(invoices));
}

window.showSection = function(id){
document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
document.getElementById(id).style.display="block";
updateDashboard();
displayDues();
displayInvoices();
}

window.makeSale=function(){
let i=document.getElementById("saleProduct").value;
let qty=parseInt(document.getElementById("saleQty").value);

if(!qty||products[i].stock<qty){ alert("স্টক নেই"); return;}

let amount=products[i].sell*qty;
let profit=(products[i].sell-products[i].buy)*qty;

products[i].stock-=qty;
sales.push({name:products[i].name,qty,amount,profit});

let now = new Date();

lastInvoice={
invoiceNo: invoiceCounter,
date: now.toLocaleDateString(),
time: now.toLocaleTimeString(),
customer: document.getElementById("customerName").value || "নগদ ক্রেতা",
product: products[i].name,
qty,
price: products[i].sell,
total: amount
};

invoices.push(lastInvoice);

invoiceCounter++;
localStorage.setItem("invoiceCounter", invoiceCounter);

saveData();
displayInvoices();
displayProducts();
updateDashboard();

document.getElementById("saleQty").value="";
document.getElementById("customerName").value="";
}

function displayInvoices(){
let list=document.getElementById("invoiceHistory");
if(!list) return;
list.innerHTML="";
invoices.forEach((inv,index)=>{
list.innerHTML+=`
<tr>
<td>${inv.invoiceNo}</td>
<td>${inv.date}</td>
<td>${inv.customer}</td>
<td>৳ ${inv.total}</td>
<td><button onclick="reprintInvoice(${index})">প্রিন্ট</button></td>
</tr>`;
});
}

window.reprintInvoice=function(index){
lastInvoice=invoices[index];
window.printInvoice();
}

window.printInvoice=function(){

if(!lastInvoice.product){ alert("আগে বিক্রয় করুন"); return;}

let printWindow=window.open('','');

printWindow.document.write(`
<html>
<head>
<title>Invoice</title>
<style>
body{font-family:Arial;padding:40px;}
.container{max-width:700px;margin:auto;border:1px solid #000;padding:20px;}
.header{text-align:center;}
table{width:100%;border-collapse:collapse;margin-top:15px;}
table, th, td{border:1px solid black;}
th, td{padding:8px;text-align:center;}
.total{text-align:right;font-size:18px;margin-top:15px;}
.sign{margin-top:40px;display:flex;justify-content:space-between;}
.footer{text-align:center;margin-top:30px;}
</style>
</head>
<body>
<div class="container">
<div class="header">
<h2>ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার</h2>
<p>গদখালি বাজার বাস স্ট্যান্ড, ঝিকরগাছা, যশোর</p>
</div>
<hr>
<p><strong>ইনভয়েস নং:</strong> ${lastInvoice.invoiceNo}</p>
<p><strong>তারিখ:</strong> ${lastInvoice.date}</p>
<p><strong>সময়:</strong> ${lastInvoice.time}</p>
<p><strong>কাস্টমার:</strong> ${lastInvoice.customer}</p>

<table>
<tr>
<th>পণ্য</th>
<th>পরিমাণ</th>
<th>একক মূল্য</th>
<th>মোট</th>
</tr>
<tr>
<td>${lastInvoice.product}</td>
<td>${lastInvoice.qty}</td>
<td>৳ ${lastInvoice.price}</td>
<td>৳ ${lastInvoice.total}</td>
</tr>
</table>

<div class="total">
<strong>সর্বমোট: ৳ ${lastInvoice.total}</strong>
</div>

<div class="sign">
<div>বিক্রেতার স্বাক্ষর<br>__________________</div>
<div>ক্রেতার স্বাক্ষর<br>__________________</div>
</div>

<div class="footer">
<p>ধন্যবাদ আবার আসবেন প্রিয়</p>
</div>
</div>
</body>
</html>
`);

printWindow.document.close();
setTimeout(()=>{printWindow.print();},500);
}

displayInvoices();

});