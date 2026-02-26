document.addEventListener("DOMContentLoaded", function(){

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];
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

lastInvoice={
customer:document.getElementById("customerName").value||"নগদ ক্রেতা",
product:products[i].name,
qty,
price:products[i].sell,
total:amount
};

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

window.printInvoice = function(){

if(!lastInvoice.product){
alert("আগে বিক্রয় করুন");
return;
}

let invoiceWindow = window.open('', '', 'width=600,height=600');

invoiceWindow.document.write(`
<html>
<head>
<title>Invoice</title>
<style>
body{font-family:Arial;padding:20px;}
</style>
</head>
<body>
<h2>ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার</h2>
<p>গদখালি বাজার বাস স্ট্যান্ড, ঝিকরগাছা, যশোর</p>
<hr>
<p>কাস্টমার: ${lastInvoice.customer}</p>
<p>পণ্য: ${lastInvoice.product}</p>
<p>পরিমাণ: ${lastInvoice.qty}</p>
<p>একক মূল্য: ৳ ${lastInvoice.price}</p>
<h3>মোট: ৳ ${lastInvoice.total}</h3>
<hr>
<p>ধন্যবাদ আপনার ব্যবসার জন্য</p>
</body>
</html>
`);

invoiceWindow.document.close();

setTimeout(function(){
invoiceWindow.print();
invoiceWindow.close();
}, 500);

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