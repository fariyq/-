function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
  if (sectionId === "sales") loadProductOptions();
  updateDashboard();
}

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];
let dues = JSON.parse(localStorage.getItem("dues")) || [];

function saveAll() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("sales", JSON.stringify(sales));
  localStorage.setItem("dues", JSON.stringify(dues));
}

function addProduct() {
  const name = productName.value;
  const buy = parseFloat(buyPrice.value);
  const sell = parseFloat(sellPrice.value);
  const stock = parseInt(stockQty.value);

  if (!name || !buy || !sell || !stock) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  products.push({ name, buy, sell, stock });
  saveAll();
  displayProducts();
  loadProductOptions();
  updateDashboard();

  productName.value = "";
  buyPrice.value = "";
  sellPrice.value = "";
  stockQty.value = "";
}

function displayProducts() {
  productList.innerHTML = "";
  products.forEach((p, i) => {
    productList.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.buy}</td>
        <td>${p.sell}</td>
        <td>${p.stock}</td>
        <td><button onclick="deleteProduct(${i})">ডিলিট</button></td>
      </tr>`;
  });
}

function deleteProduct(i) {
  products.splice(i, 1);
  saveAll();
  displayProducts();
  loadProductOptions();
  updateDashboard();
}

function loadProductOptions() {
  saleProduct.innerHTML = "";
  products.forEach((p, i) => {
    saleProduct.innerHTML += `<option value="${i}">
      ${p.name} (স্টক: ${p.stock})
    </option>`;
  });
}

function makeSale() {
  const i = saleProduct.value;
  const qty = parseInt(saleQty.value);
  if (!qty || products[i].stock < qty) {
    alert("স্টক পর্যাপ্ত নেই");
    return;
  }

  const amount = products[i].sell * qty;
  const profit = (products[i].sell - products[i].buy) * qty;

  products[i].stock -= qty;
  sales.push({ name: products[i].name, qty, amount, profit });

  if (paymentType.value === "due") {
    if (!customerName.value) {
      alert("কাস্টমারের নাম দিন");
      return;
    }
    dues.push({ name: customerName.value, amount });
  }

  saveAll();
  displayProducts();
  displaySales();
  loadProductOptions();
  updateDashboard();

  saleQty.value = "";
  customerName.value = "";
}
let lastInvoice = {};

function makeSale() {
  const i = saleProduct.value;
  const qty = parseInt(saleQty.value);

  if (!qty || products[i].stock < qty) {
    alert("স্টক পর্যাপ্ত নেই");
    return;
  }

  const amount = products[i].sell * qty;
  const profit = (products[i].sell - products[i].buy) * qty;

  products[i].stock -= qty;
  sales.push({ name: products[i].name, qty, amount, profit });

  lastInvoice = {
    customer: customerName.value || "নগদ ক্রেতা",
    product: products[i].name,
    qty: qty,
    price: products[i].sell,
    total: amount
  };

  if (paymentType.value === "due") {
    if (!customerName.value) {
      alert("কাস্টমারের নাম দিন");
      return;
    }
    dues.push({ name: customerName.value, amount });
  }

  saveAll();
  displayProducts();
  displaySales();
  loadProductOptions();
  updateDashboard();

  saleQty.value = "";
  customerName.value = "";
}

function printInvoice() {
  if (!lastInvoice.product) {
    alert("আগে একটি বিক্রয় করুন");
    return;
  }

  invCustomer.innerText = lastInvoice.customer;
  invProduct.innerText = lastInvoice.product;
  invQty.innerText = lastInvoice.qty;
  invPrice.innerText = lastInvoice.price;
  invTotal.innerText = lastInvoice.total;

  const printContent = invoiceArea.innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  location.reload();
}
function displaySales() {
  salesHistory.innerHTML = "";
  sales.forEach(s => {
    salesHistory.innerHTML += `
      <li>${s.name} - ${s.qty} পিস | বিক্রয়: ৳ ${s.amount} | লাভ: ৳ ${s.profit}</li>`;
  });
}

function updateDashboard() {
  let totalSales = 0, totalProfit = 0, totalQty = 0, totalDue = 0;

  sales.forEach(s => {
    totalSales += s.amount;
    totalProfit += s.profit;
    totalQty += s.qty;
  });

  dues.forEach(d => totalDue += d.amount);

  totalSalesEl = document.getElementById("totalSales");
  totalProfitEl = document.getElementById("totalProfit");
  totalQtyEl = document.getElementById("totalQty");
  totalDueEl = document.getElementById("totalDue");

  if (totalSalesEl) totalSalesEl.innerText = totalSales;
  if (totalProfitEl) totalProfitEl.innerText = totalProfit;
  if (totalQtyEl) totalQtyEl.innerText = totalQty;
  if (totalDueEl) totalDueEl.innerText = totalDue;
}

paymentType?.addEventListener("change", function () {
  customerName.style.display = this.value === "due" ? "inline-block" : "none";
});

displayProducts();
displaySales();
loadProductOptions();
updateDashboard();