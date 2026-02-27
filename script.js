let products = JSON.parse(localStorage.getItem("products")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];

function saveData(){
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("dues", JSON.stringify(dues));
}

function addProduct(){
let name = document.getElementById("productName").value;
let price = parseFloat(document.getElementById("productPrice").value);
let stock = parseInt(document.getElementById("productStock").value);

if(!name || isNaN(price) || isNaN(stock)){
alert("সব তথ্য পূরণ করুন");
return;
}

products.push({name, price, stock});
saveData();
displayProducts();
loadProducts();

document.getElementById("productName").value="";
document.getElementById("productPrice").value="";
document.getElementById("productStock").value="";
}

function displayProducts(){
let list = document.getElementById("productList");
list.innerHTML="";
products.forEach(p=>{
list.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>৳ ${p.price}</td>
<td>${p.stock}</td>
</tr>`;
});
}

function loadProducts(){
let select = document.getElementById("saleProduct");
select.innerHTML="";
products.forEach((p,i)=>{
select.innerHTML+=`<option value="${i}">${p.name} (স্টক:${p.stock})</option>`;
});
}

function makeSale(){
let i = document.getElementById("saleProduct").value;
let qty = parseInt(document.getElementById("saleQty").value);
let payment = document.getElementById("paymentType").value;
let customer = document.getElementById("customerName").value;

if(!qty || products[i].stock < qty){
alert("স্টক নেই");
return;
}

products[i].stock -= qty;

if(payment==="due"){
if(!customer){
alert("কাস্টমারের নাম দিন");
return;
}
dues.push({customer, amount: products[i].price * qty});
}

saveData();
displayProducts();
loadProducts();
displayDues();

document.getElementById("saleQty").value="";
document.getElementById("customerName").value="";
}

function displayDues(){
let ul = document.getElementById("dueList");
ul.innerHTML="";
dues.forEach(d=>{
ul.innerHTML+=`<li>${d.customer} - ৳ ${d.amount}</li>`;
});
}

document.getElementById("paymentType").addEventListener("change", function(){
document.getElementById("customerName").style.display =
this.value==="due" ? "inline-block" : "none";
});

displayProducts();
loadProducts();
displayDues();