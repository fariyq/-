document.getElementById('newGoatBtn').addEventListener('click', () => {
  document.getElementById('goatForm').style.display = 'block';
});

document.getElementById('goatForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('goatName').value,
    id: document.getElementById('goatId').value,
    type: document.getElementById('goatType').value,
    purchaseDate: document.getElementById('purchaseDate').value,
    purchasePrice: document.getElementById('purchasePrice').value,
    pregnant: document.getElementById('pregnant').value,
    foodList: document.getElementById('foodList').value,
    vaccineRecord: document.getElementById('vaccineRecord').value,
    sellPrice: document.getElementById('sellPrice').value,
    profit: document.getElementById('profit').value,
  };

  console.log('ছাগলের তথ্য:', data);
  alert("ছাগলের তথ্য সফলভাবে সংগ্রহ করা হয়েছে!");

  // Future: Firebase বা অন্য ডেটাবেজে সংরক্ষণ করা হবে

  document.getElementById('goatForm').reset();
  document.getElementById('goatForm').style.display = 'none';
});