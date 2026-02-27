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

window.showSection=function(id){
document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
document.getElementById(id).style.display="block";
updateDashboard();
displayProducts();
displayDues();
displayInvoices();
};

/* Payment Type Change */
document.getElementById("paymentType").addEventListener("change", function(){
document.getElementById("customerName").style.display =
this.value==="due" ? "inline-block" : "none";
});

/* PRODUCT */
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
loadProducts();

document.getElementById("productName").value="";
document.getElementById("buyPrice").value="";
document.getElementById("sellPrice").value="";
document.getElementById("stockQty").value="";
};

function displayProducts(){
let list=document.getElementById("productList");
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
loadProducts();
};

function loadProducts(){
let select=document.getElementById("saleProduct");
select.innerHTML="";
products.forEach((p,i)=>{
select.innerHTML+=`<option value="${i}">${p.name} (স্টক:${p.stock})</option>`;
});
}

/* SALE */
window.makeSale=function(){
let i=document.getElementById("saleProduct").value;
let qty=parseInt(document.getElementById("saleQty").value);
let payment=document.getElementById("paymentType").value;
let customer=document.getElementById("customerName").value;

if(!qty||products[i].stock<qty){
alert("স্টক নেই");
return;
}

if(payment==="due" && !customer){
alert("কাস্টমারের নাম দিন");
return;
}

let amount=products[i].sell*qty;
let profit=(products[i].sell-products[i].buy)*qty;

products[i].stock-=qty;
sales.push({amount,profit,qty});

if(payment==="due"){
dues.push({customer,amount});
}

let now=new Date();
lastInvoice={
invoiceNo:invoiceCounter,
date:now.toLocaleDateString(),
customer:customer||"নগদ ক্রেতা",
total:amount,
payment
};

invoices.push(lastInvoice);
invoiceCounter++;

saveData();
displayProducts();
displayDues();
displayInvoices();
updateDashboard();
loadProducts();

document.getElementById("saleQty").value="";
document.getElementById("customerName").value="";
};

/* DUES */
function displayDues(){
let ul=document.getElementById("dueList");
ul.innerHTML="";
dues.forEach((d,i)=>{
ul.innerHTML+=`
<li>${d.customer} - ৳ ${d.amount}
<button onclick="payDue(${i})">টাকা নিলাম</button></li>`;
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
};

/* DASHBOARD */
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

/* INVOICE HISTORY */
function displayInvoices(){
let list=document.getElementById("invoiceHistory");
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
printInvoice();
};

/* PRINT */
window.printInvoice=function(){
if(!lastInvoice.total){ alert("আগে বিক্রয় করুন"); return;}

let win=window.open('','PRINT');
win.document.write(`
<h2>ইমরান ইলেকট্রনিক্স</h2>
<p>ইনভয়েস: ${lastInvoice.invoiceNo}</p>
<p>তারিখ: ${lastInvoice.date}</p>
<p>কাস্টমার: ${lastInvoice.customer}</p>
<p>পেমেন্ট: ${lastInvoice.payment}</p>
<h3>মোট: ৳ ${lastInvoice.total}</h3>
`);
win.print();
win.close();
};

displayProducts();
displayDues();
displayInvoices();
updateDashboard();
loadProducts();

});