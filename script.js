// গর্ভবতী ছাগলের হিসাব
function calculatePregnancy() {
  const pregnancyDate = new Date(document.getElementById('pregnancy-date').value);
  const today = new Date();
  
  // গর্ভধারণের তারিখ থেকে বর্তমান তারিখ পর্যন্ত দিন গণনা
  const diffTime = today - pregnancyDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // গর্ভধারণের সময়কাল প্রদর্শন
  document.getElementById('pregnancy-duration').textContent = "গর্ভবতী ছাগলটি " + diffDays + " দিন গর্ভবতী।";
}

// ছাগলের তথ্য রেকর্ড করার ফাংশন
document.getElementById('goat-form').addEventListener('submit', function(event) {
  event.preventDefault();  // ফর্মের ডিফল্ট আচরণ রোধ করা
  
  const goatType = document.getElementById('goat-type').value;
  const goatId = document.getElementById('goat-id').value;
  const vaccinationDate = document.getElementById('vaccination-date').value;
  const foodCost = document.getElementById('food-cost').value;
  const purchasePrice = document.getElementById('purchase-price').value;
  const salePrice = document.getElementById('sale-price').value;
  
  // এখানে তোমার ডেটা সেভ বা প্রদর্শন করার কোড হবে (যেমন Firebase বা MongoDB দিয়ে)
  console.log("ছাগল ধরণ:", goatType);
  console.log("ছাগলের আইডি:", goatId);
  console.log("টিকা দেওয়ার তারিখ:", vaccinationDate);
  console.log("খাদ্য খরচ:", foodCost);
  console.log("ক্রয়মূল্য:", purchasePrice);
  console.log("বিক্রয়মূল্য:", salePrice);
  
  // ফর্ম ফাঁকা করা
  document.getElementById('goat-form').reset();
});