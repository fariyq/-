// script.js - কমন ফাংশন, সব পেজে ইউজ করা যাবে

let cart = [];
let products = [];
let customers = [];
let sales = [];

// লোড প্রোডাক্ট + সেলস + কাস্টমার
async function loadData() {
  const prodSnap = await getDocs(collection(db, "products"));
  products = prodSnap.docs.map(d => ({id: d.id, ...d.data()}));

  const saleSnap = await getDocs(collection(db, "sales"));
  sales = saleSnap.docs.map(d => ({id: d.id, ...d.data()}));

  const custSnap = await getDocs(collection(db, "customers"));
  customers = custSnap.docs.map(d => ({id: d.id, ...d.data()}));

  if (document.getElementById('productSuggestions')) displaySuggestions();
}

// প্রোডাক্ট সার্চ + সাজেশন
function searchProducts() {
  const query = document.getElementById('searchProduct')?.value.toLowerCase() || '';
  const suggestions = document.getElementById('productSuggestions');
  if (!suggestions) return;
  suggestions.innerHTML = '';
  products.filter(p => p.name.toLowerCase().includes(query) && p.stock > 0).slice(0,10).forEach(p => {
    const div = document.createElement('div');
    div.style.cursor = 'pointer';
    div.style.padding = '10px';
    div.style.borderBottom = '1px solid #eee';
    div.innerHTML = `${p.name} - RM ${p.price} (স্টক: ${p.stock})`;
    div.onclick = () => addToCart(p.id);
    suggestions.appendChild(div);
  });
}

// কার্টে যোগ
function addToCart(id) {
  const prod = products.find(p => p.id === id);
  if (!prod || prod.stock <= 0) return alert("স্টক নেই!");
  let item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({...prod, qty: 1, discount: 0});
  updateCartDisplay();
  updateStock(id, prod.stock - 1);
}

// কার্ট আপডেট
function updateCartDisplay() {
  const cartDiv = document.getElementById('cart');
  if (!cartDiv) return;
  cartDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const sub = item.price * item.qty * (1 - item.discount/100);
    total += sub;
    cartDiv.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin:10px 0;">
        ${item.name} x ${item.qty} @ RM ${item.price} = RM ${sub.toFixed(2)}
        <input type="number" value="\( {item.discount}" min="0" max="100" onchange="updateDiscount( \){idx}, this.value)">
        <button onclick="removeFromCart(${idx})">রিমুভ</button>
      </div>
    `;
  });
  const disc = parseFloat(document.getElementById('discount')?.value || 0);
  const grand = total * (1 - disc/100);
  document.getElementById('grandTotal').textContent = grand.toFixed(2);
}

// ডিসকাউন্ট আপডেট (পার আইটেম বা ওভারঅল)
function updateDiscount(idx, val) {
  cart[idx].discount = parseFloat(val) || 0;
  updateCartDisplay();
}

// রিমুভ + স্টক ফেরত
function removeFromCart(idx) {
  const item = cart[idx];
  updateStock(item.id, item.stock + item.qty);
  cart.splice(idx, 1);
  updateCartDisplay();
}

// স্টক আপডেট
async function updateStock(id, newStock) {
  if (newStock < 0) newStock = 0;
  await updateDoc(doc(db, "products", id), {stock: newStock});
  if (newStock < 5) alert(`নোটিফিকেশন: \( {products.find(p=>p.id===id).name} স্টক কম ( \){newStock})`);
  loadData();
}

// বিক্রি সম্পন্ন
async function completeSale() {
  if (cart.length === 0) return alert("কার্ট খালি!");
  const customerName = document.getElementById('customerName')?.value || "ক্যাশ কাস্টমার";
  const phone = document.getElementById('customerPhone')?.value;
  const disc = parseFloat(document.getElementById('discount')?.value || 0);
  let total = parseFloat(document.getElementById('grandTotal').textContent);

  const saleData = {
    date: new Date().toISOString(),
    items: cart.map(i => ({name: i.name, qty: i.qty, price: i.price, discount: i.discount})),
    total, discount: disc, customerName, phone,
    paid: total, due: 0  // পরে বাকি হ্যান্ডেল
  };

  await addDoc(collection(db, "sales"), saleData);

  // যদি বাকি থাকে (পরে credit পেজে হ্যান্ডেল)
  if (phone) {
    // কাস্টমার চেক/যোগ
    const existing = customers.find(c => c.phone === phone);
    if (!existing) {
      await addDoc(collection(db, "customers"), {name: customerName, phone, balance: 0});
    }
  }

  generatePDF(saleData);
  cart = [];
  updateCartDisplay();
  alert("বিক্রি সেভ হয়েছে!");
  loadData();
}

// PDF জেনারেট (jsPDF + autoTable)
function generatePDF(sale) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("Amiri-Regular"); // বাংলা সাপোর্ট (যদি না থাকে, NotoSansBengali-Regular.ttf অ্যাড করো CDN থেকে)

  doc.text("MD EMRAN দোকান - ইনভয়েস", 105, 15, {align: 'center'});
  doc.text(`তারিখ: ${new Date(sale.date).toLocaleString('bn-BD')}`, 10, 25);
  doc.text(`কাস্টমার: ${sale.customerName} \( {sale.phone ? `( \){sale.phone})` : ''}`, 10, 35);

  let tableData = sale.items.map(i => [i.name, i.qty, i.price, i.discount + '%', (i.price * i.qty * (1 - i.discount/100)).toFixed(2)]);
  doc.autoTable({
    startY: 45,
    head: [['পণ্য', 'পরিমাণ', 'দাম', 'ডিসকাউন্ট', 'সাবটোটাল']],
    body: tableData,
    theme: 'grid'
  });

  let finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`টোটাল: RM ${sale.total.toFixed(2)}`, 10, finalY);
  doc.text(`ডিসকাউন্ট: ${sale.discount}%`, 10, finalY + 10);
  doc.text(`পরিশোধিত: RM ${sale.paid.toFixed(2)}`, 10, finalY + 20);
  if (sale.due > 0) doc.text(`বাকি: RM ${sale.due.toFixed(2)}`, 10, finalY + 30);

  doc.save(`invoice_${new Date().toISOString().slice(0,10)}.pdf`);

  // WhatsApp শেয়ার (টেক্সট + টোটাল)
  if (sale.phone) {
    const msg = `আপনার বিল\nদোকান: MD EMRAN\nতারিখ: ${new Date().toLocaleString('bn-BD')}\nটোটাল: RM ${sale.total.toFixed(2)}\nধন্যবাদ!`;
    window.open(`https://wa.me/\( {sale.phone}?text= \){encodeURIComponent(msg)}`, '_blank');
  }
}

// পেজ লোডে ডেটা লোড
loadData();