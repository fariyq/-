function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    section.style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";

  if (sectionId === "sales") {
    loadProductOptions();
  }
}

let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function saveSales() {
  localStorage.setItem("sales", JSON.stringify(sales));
}

function addProduct() {
  const name = document.getElementById("productName").value;
  const buy = parseFloat(document.getElementById("buyPrice").value);
  const sell = parseFloat(document.getElementById("sellPrice").value);
  const stock = parseInt(document.getElementById("stockQty").value);

  if (!name || !buy || !sell || !stock) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  products.push({
    name,
    buy,
    sell,
    stock
  });

  saveProducts();
  displayProducts();
  clearForm();
  loadProductOptions(); // 👈 এখানে অটো আপডেট হবে
}

function displayProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product, index) => {
    list.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.buy}</td>
        <td>${product.sell}</td>
        <td>${product.stock}</td>
        <td><button onclick="deleteProduct(${index})">ডিলিট</button></td>
      </tr>
    `;
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  displayProducts();
  loadProductOptions();
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("buyPrice").value = "";
  document.getElementById("sellPrice").value = "";
  document.getElementById("stockQty").value = "";
}

function loadProductOptions() {
  const select = document.getElementById("saleProduct");
  if (!select) return;

  select.innerHTML = "";

  products.forEach((product, index) => {
    select.innerHTML += `
      <option value="${index}">
        ${product.name} - (স্টক: ${product.stock})
      </option>
    `;
  });

  if (products.length === 0) {
    select.innerHTML = `<option value="">কোন পণ্য নেই</option>`;
  }
}

function makeSale() {
  const productIndex = document.getElementById("saleProduct").value;
  const qty = parseInt(document.getElementById("saleQty").value);

  if (!qty || qty <= 0) {
    alert("সঠিক পরিমাণ দিন");
    return;
  }

  if (products[productIndex].stock < qty) {
    alert("স্টক পর্যাপ্ত নেই");
    return;
  }

  products[productIndex].stock -= qty;

  const profit =
    (products[productIndex].sell - products[productIndex].buy) * qty;

  sales.push({
    name: products[productIndex].name,
    qty,
    profit
  });

  saveProducts();
  saveSales();
  displayProducts();
  displaySales();
  loadProductOptions();

  document.getElementById("saleQty").value = "";
}

function displaySales() {
  const list = document.getElementById("salesHistory");
  if (!list) return;

  list.innerHTML = "";

  sales.forEach(sale => {
    list.innerHTML += `
      <li>${sale.name} - ${sale.qty} পিস | লাভ: ৳ ${sale.profit}</li>
    `;
  });
}

displayProducts();
displaySales();
loadProductOptions();