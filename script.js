// script.js

let goats = [];
let foodVaccinationRecords = [];
let saleRecords = [];

// ছাগল যোগ করা
function addGoat() {
  const goatId = document.getElementById('goatId').value;
  const goatAge = document.getElementById('goatAge').value;
  const goatType = document.getElementById('goatType').value;
  const purchasePrice = document.getElementById('purchasePrice').value;

  if (!goatId || !goatAge || !goatType || !purchasePrice) {
    alert('সব তথ্য পূর্ণ করুন!');
    return;
  }

  const newGoat = {
    goatId,
    goatAge,
    goatType,
    purchasePrice,
  };

  goats.push(newGoat);
  displayGoats();
  document.getElementById('goatForm').reset();
}

// ছাগলের রেকর্ড দেখানো
function displayGoats() {
  let goatDetails = `<h3>ছাগল রেকর্ড:</h3><ul>`;
  goats.forEach(goat => {
    goatDetails += `
      <li><strong>আইডি:</strong> ${goat.goatId} | <strong>বয়স:</strong> ${goat.goatAge} | <strong>প্রকার:</strong> ${goat.goatType} | <strong>ক্রয়মূল্য:</strong> ৳${goat.purchasePrice}</li>
    `;
  });
  goatDetails += `</ul>`;
  document.getElementById('goatRecord').innerHTML = goatDetails;
}

// খাদ্য এবং টিকা যোগ করা
function addFoodVaccination() {
  const goatIdFood = document.getElementById('goatIdFood').value;
  const food = document.getElementById('food').value;
  const vaccination = document.getElementById('vaccination').value;

  if (!goatIdFood || !food || !vaccination) {
    alert('সব তথ্য পূর্ণ করুন!');
    return;
  }

  const newFoodVaccinationRecord = {
    goatIdFood,
    food,
    vaccination,
  };

  foodVaccinationRecords.push(newFoodVaccinationRecord);
  displayFoodVaccination();
  document.getElementById('foodVaccinationForm').reset();
}

// খাদ্য এবং টিকার রেকর্ড দেখানো
function displayFoodVaccination() {
  let foodVaccinationDetails = `<h3>খাদ্য এবং টিকা রেকর্ড:</h3><ul>`;
  foodVaccinationRecords.forEach(record => {
    foodVaccinationDetails += `
      <li><strong>ছাগলের আইডি:</strong> ${record.goatIdFood} | <strong>খাদ্য:</strong> ${record.food} | <strong>টিকা:</strong> ${record.vaccination}</li>
    `;
  });
  foodVaccinationDetails += `</ul>`;
  document.getElementById('foodVaccinationRecord').innerHTML = foodVaccinationDetails;
}

// বিক্রি ফর্মে তথ্য যোগ করা
function addSale() {
  const goatIdSale = document.getElementById('goatIdSale').value;
  const salePrice = document.getElementById('salePrice').value;

  if (!goatIdSale || !salePrice) {
    alert('সব তথ্য পূর্ণ করুন!');
    return;
  }

  const saleRecord = {
    goatIdSale,
    salePrice,
  };

  saleRecords.push(saleRecord);
  displaySales();
  document.getElementById('saleForm').reset();
}

// বিক্রি রেকর্ড দেখানো
function displaySales() {
  let saleDetails = `<h3>বিক্রির রেকর্ড:</h3><ul>`;
  saleRecords.forEach(record => {
    saleDetails += `
      <li><strong>ছাগলের আইডি:</strong> ${record.goatIdSale} | <strong>বিক্রির মূল্য:</strong> ৳${record.salePrice}</li>
    `;
  });
  saleDetails += `</ul>`;
  document.getElementById('saleRecord').innerHTML = saleDetails;
}