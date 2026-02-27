document.addEventListener("DOMContentLoaded", function(){

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let invoiceCounter = parseInt(localStorage.getItem("invoiceCounter")) || 1;
let lastInvoice = {};

function saveData(){
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("sales", JSON.stringify(sales));
localStorage.setItem("dues", JSON.stringify(dues));
localStorage.setItem("invoices", JSON.stringify(invoices));
localStorage.setItem("invoiceCounter", invoiceCounter);
}

window.showSection = function(id){
document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
let sec=document.getElementById(id);
if(sec) sec.style.display="block";
updateDashboard();
displayProducts();
displayDues();
displayInvoices();
}

// PRODUCT
window.addProduct = function(){
let name=document.getElementById("productName").value.trim();
let buy=parseFloat(document.getElementById("buyPrice").value);
let sell=parseFloat(document.getElementById("sellPrice").value);
let stock=parseInt(document.getElementById("stockQty").value);

if(!name || isNaN(buy) || isNaN(sell) || isNaN(stock)){
alert("সব তথ্য সঠিকভাবে পূরণ করুন");
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

// Sales
window.makeSale=function(){
if(products.length===0){ alert("পণ্য নেই"); return;}

let i=document.getElementById("saleProduct").value;
let qty=parseInt(document.getElementById("saleQty").value);
let paymentType=document.getElementById("paymentType").value;
let customer=document.getElementById("customerName").value.trim();

if(isNaN(qty) || products[i].stock < qty){
alert("স্টক পর্যাপ্ত নেই");
return;
}

if(paymentType==="due" && !customer){
alert("বাকি দিলে কাস্টমারের নাম দিন");
return;
}

let amount=products[i].sell*qty;
let profit=(products[i].sell-products[i].buy)*qty;

products[i].stock -= qty;
sales.push({name:products[i].name,qty,amount,profit});

if(paymentType==="due"){
dues.push({customer:customer,amount:amount,invoiceNo:invoiceCounter});
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

saveData();
displayProducts();
displayDues();
displayInvoices();
updateDashboard();
loadProductOptions();

document.getElementById("saleQty").value="";
document.getElementById("customerName").value="";
}

// Dues
function displayDues(){
let list=document.getElementById("dueList");
if(!list) return;
list.innerHTML="";
dues.forEach((d,i)=>{
list.innerHTML+=`
<li>${d.customer} | Invoice:${d.invoiceNo} | ৳ ${d.amount}
<button onclick="payDue(${i})">টাকা নিলাম</button></li>
`;
});
}

window.payDue=function(i){
let paid=parseFloat(prompt("কত টাকা নিলেন?"));
if(isNaN(paid) || paid <= 0) return;

if(paid >= dues[i].amount){
dues.splice(i,1);
}else{
dues[i].amount -= paid;
}

saveData();
displayDues();
updateDashboard();
}

// Dashboard
function updateDashboard(){
let totalSales=0,totalProfit=0,totalQty=0,totalDue=0;
sales.forEach(s=>{ totalSales+=s.amount; totalProfit+=s.profit; totalQty+=s.qty; });
dues.forEach(d=> totalDue+=d.amount);

document.getElementById("totalSalesEl").innerText = totalSales;
document.getElementById("totalProfitEl").innerText = totalProfit;
document.getElementById("totalQtyEl").innerText = totalQty;
document.getElementById("totalDueEl").innerText = totalDue;
}

// Invoice History
function displayInvoices(){
let list=document.getElementById("invoiceHistory");
if(!list) return;
list.innerHTML="";
invoices.forEach((inv,index)=>{
list.innerHTML+=`
<tr>
<td>${inv.invoiceNo}</td><td>${inv.date}</td>
<td>${inv.customer}</td><td>৳ ${inv.total}</td>
<td>${inv.payment}</td>
<td><button onclick="reprintInvoice(${index})">প্রিন্ট</button></td>
</tr>`;
});
}

window.reprintInvoice=function(index){
lastInvoice=invoices[index];
window.printInvoice();
}

// Print
window.printInvoice=function(){
if(!lastInvoice.product){ alert("আগে বিক্রয় করুন"); return;}

let win=window.open('','');
win.document.write(`
<html><head><title>Invoice</title></head>
<body style="font-family:Arial;padding:20px;">
<h2 style="text-align:center;">ইমরান ইলেকট্রনিক্স POS</h2>
<hr>
<p>Invoice: ${lastInvoice.invoiceNo}</p>
<p>তারিখ: ${lastInvoice.date}</p>
<p>সময়: ${lastInvoice.time}</p>
<p>Customer: ${lastInvoice.customer}</p>
<p>Payment: ${lastInvoice.payment}</p>
<hr>
<p>Product: ${lastInvoice.product}</p>
<p>Qty: ${lastInvoice.qty}</p>
<p>Unit Price: ৳ ${lastInvoice.price}</p>
<h3>Total: ৳ ${lastInvoice.total}</h3>
</body></html>
`);
win.document.close();
setTimeout(()=>{win.print();},500);
}

// Init
displayProducts();
displayDues();
displayInvoices();
updateDashboard();
loadProductOptions();

});