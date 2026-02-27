let products = JSON.parse(localStorage.getItem("products")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];
let invoiceNo = parseInt(localStorage.getItem("invoiceNo")) || 1001;

function saveData(){
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("invoices", JSON.stringify(invoices));
  localStorage.setItem("dues", JSON.stringify(dues));
  localStorage.setItem("invoiceNo", invoiceNo);
}

function showSection(id){
  document.querySelectorAll("section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";
}

document.getElementById("paymentType").addEventListener("change",function(){
  document.getElementById("customerName").style.display =
  this.value==="due"?"inline-block":"none";
});

function addProduct(){
  let name=pName.value;
  let buy=+pBuy.value;
  let sell=+pSell.value;
  let stock=+pStock.value;
  if(!name) return alert("নাম দিন");
  products.push({name,buy,sell,stock});
  saveData();
  location.reload();
}

function makeSale(){
  let index=saleProduct.selectedIndex;
  let qty=+saleQty.value;
  let payment=paymentType.value;
  let customer=customerName.value||"";
  if(products[index].stock<qty) return alert("স্টক কম");
  let total=products[index].sell*qty;
  products[index].stock-=qty;
  invoices.push({
    no:invoiceNo++,
    date:new Date().toLocaleString(),
    customer,
    total,
    payment
  });
  if(payment==="due"){
    dues.push({customer,total});
  }
  saveData();
  generateInvoice(products[index].name,qty,total,payment,customer);
  location.reload();
}

function generateInvoice(name,qty,total,payment,customer){
  let html=`
  <div class="invoice-box">
  <div class="invoice-header">
  <h2>ইমরান ইলেকট্রনিক্স অ্যান্ড মোবাইল সার্ভিসিং সেন্টার</h2>
  <p>গদখালি বাজার বাস স্ট্যান্ড, ঝিকরগাছা, যশোর</p>
  <p>মোবাইল: ০১৯৫২৩২৫৯০৩</p>
  </div>
  <p>Invoice No: ${invoiceNo-1}</p>
  <p>Date: ${new Date().toLocaleString()}</p>
  <p>Customer: ${customer||"N/A"}</p>
  <table>
  <tr><th>পণ্য</th><th>পরিমাণ</th><th>মোট</th></tr>
  <tr><td>${name}</td><td>${qty}</td><td>৳ ${total}</td></tr>
  </table>
  <h3>মোট: ৳ ${total}</h3>
  <p>Payment: ${payment}</p>
  <div class="signature">
  <div>Customer Signature</div>
  <div>Seller: MD Emran</div>
  </div>
  </div>`;
  printArea.innerHTML=html;
  window.print();
}

window.onload=function(){
  products.forEach((p,i)=>{
    productTable.innerHTML+=`
    <tr>
    <td>${p.name}</td>
    <td>${p.buy}</td>
    <td>${p.sell}</td>
    <td>${p.stock}</td>
    <td><button onclick="deleteProduct(${i})">X</button></td>
    </tr>`;
    saleProduct.innerHTML+=`<option>${p.name}</option>`;
  });
  invoices.forEach((inv,i)=>{
    invoiceHistory.innerHTML+=`
    <tr>
    <td>${inv.no}</td>
    <td>${inv.date}</td>
    <td>${inv.customer}</td>
    <td>${inv.total}</td>
    <td>${inv.payment}</td>
    </tr>`;
  });
  dues.forEach((d,i)=>{
    dueList.innerHTML+=`<li>${d.customer} - ৳ ${d.total}</li>`;
  });
}
function deleteProduct(i){
  products.splice(i,1);
  saveData();
  location.reload();
}