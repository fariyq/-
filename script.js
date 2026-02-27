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

window.showSection=function(id){
document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
document.getElementById(id).style.display="block";
updateDashboard();
displayProducts();
displayDues();
displayInvoices();
}

/* ================= PRODUCT ================= */

window.addProduct=function(){
let name=document.getElementById("productName").value;
let buy=parseFloat(document.getElementById("buyPrice").value);
let sell=parseFloat(document.getElementById("sellPrice").value);
let stock=parseInt(document.getElementById("stockQty").value);

if(!name||isNaN(buy)||isNaN(sell)||isNaN(stock)){
alert("সব তথ্য পূরণ করুন");
return;
}

products.push({name,buy,sell,stock});
saveData();
displayProducts();
loadProductOptions();

document.getElementById("productName").value="";
document.getElementById("buyPrice").value="";
document.getElementById("sellPrice").value="";
document.getElementById("stockQty").value="";
}

function displayProducts(){
let list=document.getElementById("productList");
if(!list) return;
list.innerHTML="";
products.forEach((p,i)=>{
list.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>${p.buy}</td>
<td>${p.sell}</td>
<td>${p.stock}</td>
<td><button onclick="deleteProduct(${i})">X</button></td>
</tr>`;
});
}

window.deleteProduct=function(i){
products.splice(i,1);
saveData();
displayProducts();
loadProductOptions();
}

function loadProductOptions(){
let select=document.getElementById("saleProduct");
if(!select) return;
select.innerHTML="";
products.forEach((p,i)=>{
select.innerHTML+=`<option value="${i}">${p.name} (স্টক:${p.stock})</option>`;
});
}

/* ================= SALES ================= */

window.makeSale=function(){

if(products.length===0){ alert("পণ্য নেই"); return;}

let i=document.getElementById("saleProduct").value;
let qty=parseInt(document.getElementById("saleQty").value);
let paymentType=document.getElementById("paymentType").value;
let customer=document.getElementById("customerName").value;

if(!qty||products[i].stock<qty){
alert("স্টক নেই");
return;
}

if(paymentType==="due" && !customer){
alert("বাকি দিলে কাস্টমারের নাম দিন");
return;
}

let amount=products[i].sell*qty;
let profit=(products[i].sell-products[i].buy)*qty;

products[i].stock-=qty;
sales.push({name:products[i].name,qty,amount,profit});

if(paymentType==="due"){
dues.push({
customer:customer,
amount:amount,
invoiceNo:invoiceCounter
});
}

let now=new Date();

lastInvoice={
invoiceNo:invoiceCounter,
date:now.toLocaleDateString(),
time:now.toLocaleTimeString(),
customer:customer||"নগদ ক্রেতা",
product:products[i].name,
qty,
price:products[i].sell,
total:amount,
payment:paymentType
};

invoices.push(lastInvoice);

invoiceCounter++;
localStorage.setItem("invoiceCounter",invoiceCounter);

saveData();
displayProducts();
displayDues();
displayInvoices();
updateDashboard();
loadProductOptions();

document.getElementById("saleQty").value="";
document.getElementById("customerName").value="";
}

/* ================= DUE SYSTEM ================= */

function displayDues(){
let ul=document.getElementById("dueList");
if(!ul) return;
ul.innerHTML="";
dues.forEach((d,i)=>{
ul.innerHTML+=`
<li>
${d.customer} | ইনভয়েস: ${d.invoiceNo} | ৳ ${d.amount}
<button onclick="payDue(${i})">টাকা নিলাম</button>
</li>`;
});
}

window.payDue=function(i){
let paid=parseFloat(prompt("কত টাকা নিলেন?"));
if(!paid||paid<=0) return;

if(paid>=dues[i].amount){
dues.splice(i,1);
}else{
dues[i].amount-=paid;
}

saveData();
displayDues();
updateDashboard();
}

/* ================= DASHBOARD ================= */

function updateDashboard(){
let totalSales=0,totalProfit=0,totalQty=0,totalDue=0;

sales.forEach(s=>{
totalSales+=s.amount;
totalProfit+=s.profit;
totalQty+=s.qty;
});

dues.forEach(d=>totalDue+=d.amount);

document.getElementById("totalSalesEl").innerText=totalSales;
document.getElementById("totalProfitEl").innerText=totalProfit;
document.getElementById("totalQtyEl").innerText=totalQty;
document.getElementById("totalDueEl").innerText=totalDue;
}

/* ================= INVOICE HISTORY ================= */

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
<td>${inv.payment}</td>
<td><button onclick="reprintInvoice(${index})">প্রিন্ট</button></td>
</tr>`;
});
}

window.reprintInvoice=function(index){
lastInvoice=invoices[index];
window.printInvoice();
}

/* ================= PRINT ================= */

window.printInvoice = function(){

  if(!lastInvoice.product){ 
    alert("আগে বিক্রয় করুন"); 
    return;
  }

  let printWindow = window.open('','PRINT');

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Invoice</title>
<style>
  body { font-family: Arial, sans-serif; padding: 20px; }
  .invoice-container {
    max-width: 800px;
    margin: auto;
    border: 2px solid #000;
    padding: 15px;
  }
  .header { text-align: center; }
  .header h2 { margin:0; font-size: 22px; }
  .header p { margin:0; font-size: 14px; }

  .info, .totals { margin-top:15px; }

  table { width:100%; border-collapse: collapse; margin-top: 15px; }
  table, th, td {
    border: 1px solid #000;
  }
  th, td {
    padding:8px;
    text-align:center;
    font-size: 14px;
  }

  .footer { text-align:center; margin-top:30px; font-size:14px; }
</style>
</head>
<body>

<div class="invoice-container">

  <div class="header">
    <h2>ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার</h2>
    <p>গদখালি বাজার বাস স্ট্যান্ড, ঝিকরগাছা, যশোর</p>
  </div>

  <div class="info">
    <p><strong>ইনভয়েস নং:</strong> ${lastInvoice.invoiceNo}</p>
    <p><strong>তারিখ:</strong> ${lastInvoice.date}</p>
    <p><strong>সময়:</strong> ${lastInvoice.time}</p>
    <p><strong>Customer:</strong> ${lastInvoice.customer}</p>
    <p><strong>Payment:</strong> ${lastInvoice.payment}</p>
  </div>

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

  <div class="totals">
    <p><strong>সর্বমোট: ৳ ${lastInvoice.total}</strong></p>
  </div>

  <div class="footer">
    <p>বিক্রেতার স্বাক্ষর: ____________________</p>
    <p>ক্রেতার স্বাক্ষর: ____________________</p>
    <p>ধন্যবাদ আবার আসবেন প্রিয়</p>
  </div>

</div>

</body>
</html>
`);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};