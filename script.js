document.addEventListener("DOMContentLoaded", function(){

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];
let invoiceCounter = localStorage.getItem("invoiceCounter") || 1;
let lastInvoice = {};

function saveData(){
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("sales", JSON.stringify(sales));
localStorage.setItem("dues", JSON.stringify(dues));
}

window.showSection = function(id){
document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
document.getElementById(id).style.display="block";
updateDashboard();
displayDues();
}

window.addProduct = function(){
let name=document.getElementById("productName").value;
let buy=parseFloat(document.getElementById("buyPrice").value);
let sell=parseFloat(document.getElementById("sellPrice").value);
let stock=parseInt(document.getElementById("stockQty").value);

if(!name||!buy||!sell||!stock){ alert("সব পূরণ করুন"); return;}

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
select.innerHTML="";
products.forEach((p,i)=>{
select.innerHTML+=`<option value="${i}">${p.name} (স্টক:${p.stock})</option>`;
});
}

window.makeSale=function(){
let i=document.getElementById("saleProduct").value;
let qty=parseInt(document.getElementById("saleQty").value);

if(!qty||products[i].stock<qty){ alert("স্টক নেই"); return;}

let amount=products[i].sell*qty;
let profit=(products[i].sell-products[i].buy)*qty;

products[i].stock-=qty;
sales.push({name:products[i].name,qty,amount,profit});

if(document.getElementById("paymentType").value==="due"){
let cname=document.getElementById("customerName").value;
if(!cname){ alert("নাম দিন"); return;}
dues.push({name:cname,amount});
}

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

invoiceCounter++;
localStorage.setItem("invoiceCounter", invoiceCounter);

saveData();
displayProducts();
displaySales();
updateDashboard();
loadProductOptions();

document.getElementById("saleQty").value="";
document.getElementById("customerName").value="";
}

function displaySales(){
let ul=document.getElementById("salesHistory");
ul.innerHTML="";
sales.forEach(s=>{
ul.innerHTML+=`<li>${s.name} - ${s.qty} পিস | ৳ ${s.amount}</li>`;
});
}

function displayDues(){
let ul=document.getElementById("dueList");
ul.innerHTML="";
dues.forEach((d,i)=>{
ul.innerHTML+=`<li>${d.name} - ৳ ${d.amount}
<button onclick="payDue(${i})">টাকা নিলাম</button></li>`;
});
}

window.payDue=function(i){
let paid=parseFloat(prompt("কত টাকা?"));
if(!paid)return;
if(paid>=dues[i].amount) dues.splice(i,1);
else dues[i].amount-=paid;
saveData();
displayDues();
updateDashboard();
}

function updateDashboard(){
let totalSales=0,totalProfit=0,totalQty=0,totalDue=0;
sales.forEach(s=>{totalSales+=s.amount; totalProfit+=s.profit; totalQty+=s.qty;});
dues.forEach(d=>totalDue+=d.amount);

document.getElementById("totalSalesEl").innerText=totalSales;
document.getElementById("totalProfitEl").innerText=totalProfit;
document.getElementById("totalQtyEl").innerText=totalQty;
document.getElementById("totalDueEl").innerText=totalDue;
}

window.printInvoice=function(){

if(!lastInvoice.product){ alert("আগে বিক্রয় করুন"); return;}

let printWindow=window.open('','');

printWindow.document.write(`
<html>
<head>
<title>Invoice</title>

<style>
body{
font-family: Arial;
padding:40px;
}
.container{
max-width:700px;
margin:auto;
border:1px solid #000;
padding:20px;
}
.header{
text-align:center;
}
.header h2{
margin:0;
}
.info{
margin-top:15px;
}
table{
width:100%;
border-collapse: collapse;
margin-top:15px;
}
table, th, td{
border:1px solid black;
}
th, td{
padding:8px;
text-align:center;
}
.total{
text-align:right;
font-size:18px;
margin-top:15px;
}
.sign{
margin-top:40px;
display:flex;
justify-content:space-between;
}
.footer{
text-align:center;
margin-top:30px;
}
</style>

</head>

<body>

<div class="container">

<div class="header">
<h2>ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার</h2>
<p>গদখালি বাজার বাস স্ট্যান্ড, ঝিকরগাছা, যশোর</p>
</div>

<hr>

<div class="info">
<p><strong>ইনভয়েস নং:</strong> ${lastInvoice.invoiceNo}</p>
<p><strong>তারিখ:</strong> ${lastInvoice.date}</p>
<p><strong>সময়:</strong> ${lastInvoice.time}</p>
<p><strong>কাস্টমার:</strong> ${lastInvoice.customer}</p>
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

document.getElementById("paymentType").addEventListener("change",function(){
document.getElementById("customerName").style.display=
this.value==="due"?"inline-block":"none";
});

displayProducts();
displaySales();
displayDues();
updateDashboard();
loadProductOptions();

});