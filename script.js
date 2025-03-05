document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("date-time").innerText = new Date().toLocaleString();
});

function addProduct() {
    let div = document.createElement("div");
    div.innerHTML = '<input type="text" placeholder="পণ্যের নাম" required> <input type="number" placeholder="পরিমাণ" required> <input type="number" placeholder="দাম (৳)" required>';
    document.getElementById("productList").appendChild(div);
}