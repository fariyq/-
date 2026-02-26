function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.style.display = "none");
  document.getElementById(sectionId).style.display = "block";

  if (sectionId === "sales") loadProductOptions();
  if (sectionId === "duesSection") displayDues();

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

function displaySales() {
  salesHistory.innerHTML = "";
  sales.forEach(s => {
    salesHistory.innerHTML += `
      <li>${s.name} - ${s.qty} পিস | বিক্রয়: ৳ ${s.amount} | লাভ: ৳ ${s.profit}</li>`;
  });
}

function displayDues() {
  dueList.innerHTML = "";
  dues.forEach((d, i) => {
    dueList.innerHTML += `
      <li>
        ${d.name} - ৳ ${d.amount}
        <button onclick="payDue(${i})">টাকা নিলাম</button>
      </li>`;
  });
}

function payDue(i) {
  const paid = parseFloat(prompt("কত টাকা পরিশোধ করলো?"));
  if (!paid) return;

  if (paid >= dues[i].amount) {
    dues.splice(i, 1);
  } else {
    dues[i].amount -= paid;
  }

  saveAll();
  displayDues();
  updateDashboard();
}

function updateDashboard() {
  let totalSales = 0, totalProfit = 0, totalQty = 0, totalDue = 0;

  sales.forEach(s => {
    totalSales += s.amount;
    totalProfit += s.profit;
    totalQty += s.qty;
  });

  dues.forEach(d => totalDue += d.amount);

  totalSalesEl.innerText = totalSales;
  totalProfitEl.innerText = totalProfit;
  totalQtyEl.innerText = totalQty;
  totalDueEl.innerText = totalDue;
}

paymentType?.addEventListener("change", function () {
  customerName.style.display = this.value === "due" ? "inline-block" : "none";
});

displayProducts();
displaySales();
displayDues();
loadProductOptions();
updateDashboard();