let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];
let lastInvoice = {};

function saveData(){
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("sales", JSON.stringify(sales));
localStorage.setItem("dues", JSON.stringify(dues));
}

function showSection(id){
document.querySelectorAll("section").forEach(sec=>sec.style.display="none");
document.getElementById(id).style.display="block";
updateDashboard();
loadProductOptions();
displayDues();
}

function addProduct(){
let name=productName.value;
let buy=parseFloat(buyPrice.value);
let sell=parseFloat(sellPrice.value);
let stock=parseInt(stockQty.value);

if(!name||!buy||!sell||!stock){ alert("সব পূরণ করুন"); return;}

products.push({name,buy,sell,stock});
saveData();
displayProducts();
loadProductOptions();

productName.value="";
buyPrice.value="";
sellPrice.value="";
stockQty.value="";
}

function displayProducts(){
productList.innerHTML="";
products.forEach((p,i)=>{
productList.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>${p.buy}</td>
<td>${p.sell}</td>
<td>${p.stock}</td>
<td><button onclick="deleteProduct(${i})">X</button></td>
</tr>`;
});
}

function deleteProduct(i){
products.splice(i,1);
saveData();
displayProducts();
loadProductOptions();
}

function loadProductOptions(){
saleProduct.innerHTML="";
products.forEach((p,i)=>{
saleProduct.innerHTML+=`<option value="${i}">${p.name} (স্টক:${p.stock})</option>`;
});
}

function makeSale(){
let i=saleProduct.value;
let qty=parseInt(saleQty.value);
if(!qty||products[i].stock<qty){ alert("স্টক নেই"); return;}

let amount=products[i].sell*qty;
let profit=(products[i].sell-products[i].buy)*qty;

products[i].stock-=qty;
sales.push({name:products[i].name,qty,amount,profit});

lastInvoice={
customer:customerName.value||"নগদ ক্রেতা",
product:products[i].name,
qty,
price:products[i].sell,
total:amount
};

if(paymentType.value==="due"){
if(!customerName.value){ alert("নাম দিন"); return;}
dues.push({name:customerName.value,amount});
}

saveData();
displayProducts();
displaySales();
updateDashboard();

saleQty.value="";
customerName.value="";
}

function displaySales(){
salesHistory.innerHTML="";
sales.forEach(s=>{
salesHistory.innerHTML+=`<li>${s.name} - ${s.qty} পিস | ৳ ${s.amount}</li>`;
});
}

function displayDues(){
dueList.innerHTML="";
dues.forEach((d,i)=>{
dueList.innerHTML+=`<li>${d.name} - ৳ ${d.amount}
<button onclick="payDue(${i})">টাকা নিলাম</button></li>`;
});
}

function payDue(i){
let paid=parseFloat(prompt("কত টাকা?"));
if(!paid)return;
if(paid>=dues[i].amount){ dues.splice(i,1);}
else{ dues[i].amount-=paid;}
saveData();
displayDues();
updateDashboard();
}

function updateDashboard(){
let totalSales=0,totalProfit=0,totalQty=0,totalDue=0;
sales.forEach(s=>{ totalSales+=s.amount; totalProfit+=s.profit; totalQty+=s.qty;});
dues.forEach(d=>totalDue+=d.amount);

totalSalesEl.innerText=totalSales;
totalProfitEl.innerText=totalProfit;
totalQtyEl.innerText=totalQty;
totalDueEl.innerText=totalDue;
}

function printInvoice(){
if(!lastInvoice.product){ alert("আগে বিক্রয় করুন"); return;}

invCustomer.innerText=lastInvoice.customer;
invProduct.innerText=lastInvoice.product;
invQty.innerText=lastInvoice.qty;
invPrice.innerText=lastInvoice.price;
invTotal.innerText=lastInvoice.total;

let printContent=document.getElementById("invoiceArea").innerHTML;
let original=document.body.innerHTML;
document.body.innerHTML=printContent;
window.print();
document.body.innerHTML=original;
location.reload();
}

paymentType.addEventListener("change",function(){
customerName.style.display=this.value==="due"?"inline-block":"none";
});

displayProducts();
displaySales();
displayDues();
updateDashboard();
loadProductOptions();