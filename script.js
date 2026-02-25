function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    section.style.display = "none";
  });

  document.getElementById(sectionId).style.display = "block";
}

let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
  const name = document.getElementById("productName").value;
  const buy = document.getElementById("buyPrice").value;
  const sell = document.getElementById("sellPrice").value;
  const stock = document.getElementById("stockQty").value;

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
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("buyPrice").value = "";
  document.getElementById("sellPrice").value = "";
  document.getElementById("stockQty").value = "";
}

displayProducts();