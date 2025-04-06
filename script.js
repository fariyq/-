// Global array to store goats data
let goatsData = [];

// Function to handle form submission
document.getElementById('goat-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const goatType = document.getElementById('goat-type').value;
  const goatId = document.getElementById('goat-id').value;
  const vaccinationDate = document.getElementById('vaccination-date').value;
  const foodCost = document.getElementById('food-cost').value;
  const purchasePrice = document.getElementById('purchase-price').value;
  const salePrice = document.getElementById('sale-price').value;

  const newGoat = {
    goatType,
    goatId,
    vaccinationDate,
    foodCost,
    purchasePrice,
    salePrice,
    profitLoss: salePrice - purchasePrice
  };

  goatsData.push(newGoat);
  displayGoatsData();
});

// Function to display goats data
function displayGoatsData() {
  const goatListContainer = document.getElementById('goat-list');
  goatListContainer.innerHTML = '';

  goatsData.forEach(goat => {
    const goatDiv = document.createElement('div');
    goatDiv.innerHTML = `
      <p><strong>ছাগলের ধরন:</strong> ${goat.goatType}</p>
      <p><strong>আইডি:</strong> ${goat.goatId}</p>
      <p><strong>টিকা তারিখ:</strong> ${goat.vaccinationDate}</p>
      <p><strong>খাদ্য খরচ:</strong> ${goat.foodCost}</p>
      <p><strong>ক্রয়মূল্য:</strong> ${goat.purchasePrice}</p>
      <p><strong>বিক্রয়মূল্য:</strong> ${goat.salePrice}</p>
      <p><strong>লাভ/ক্ষতি:</strong> ${goat.profitLoss}</p>
      <hr />
    `;
    goatListContainer.appendChild(goatDiv);
  });
}

// Function to calculate pregnancy duration
function calculatePregnancy() {
  const pregnancyDate = document.getElementById('pregnancy-date').value;
  if (!pregnancyDate) {
    alert("গর্ভধারণের তারিখ প্রদান করুন");
    return;
  }

  const pregnancyDuration = Math.floor((new Date() - new Date(pregnancyDate)) / (1000 * 60 * 60 * 24));
  document.getElementById('pregnancy-duration').innerText = `গর্ভবতী ছাগল ${pregnancyDuration} দিন গর্ভবতী।`;
}