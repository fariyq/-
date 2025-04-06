// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFx9Szt_sbhhtWEqHgIU5jUz3qxD0jOMo",
  authDomain: "bishwasher-khamar.firebaseapp.com",
  projectId: "bishwasher-khamar",
  storageBucket: "bishwasher-khamar.firebasestorage.app",
  messagingSenderId: "466255017082",
  appId: "1:466255017082:web:902506f7358dfd5a82b7c3",
  measurementId: "G-457DQ0ZHHG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Toggle form
document.getElementById("newGoatBtn").addEventListener("click", () => {
  const form = document.getElementById("goatForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// Save new goat
document.getElementById("goatForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("goatName").value,
    id: document.getElementById("goatId").value,
    type: document.getElementById("goatType").value,
    date: document.getElementById("purchaseDate").value,
    price: document.getElementById("purchasePrice").value,
    pregnant: document.getElementById("pregnant").value,
    food: document.getElementById("foodList").value,
    vaccine: document.getElementById("vaccineRecord").value,
    sellPrice: document.getElementById("sellPrice").value,
    profit: document.getElementById("profit").value,
    pregnancyStart: ""
  };

  await addDoc(collection(db, "goats"), data);
  alert("তথ্য সংরক্ষণ হয়েছে!");
  document.getElementById("goatForm").reset();
});

// Calculate pregnancy days
const calculatePregnancyDays = (startDate) => {
  if (!startDate) return "গর্ভাবস্থা শুরু হয়নি";
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = now - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} দিন`;
};

// Render Goat List
const goatList = document.getElementById("goatList");
const renderGoats = (snapshot) => {
  goatList.innerHTML = "";
  snapshot.forEach(async (docSnap) => {
    const g = docSnap.data();
    const div = document.createElement("div");
    div.className = "goat-card";

    const pregDays = calculatePregnancyDays(g.pregnancyStart);

    div.innerHTML = `
      <strong>${g.name}</strong> (${g.id})<br/>
      প্রকার: ${g.type}<br/>
      গর্ভাবস্থা: ${g.pregnant} (${pregDays})<br/>
      <button onclick="viewDetails('${docSnap.id}')">সম্পূর্ণ তথ্য দেখুন</button>
      <hr/>
    `;

    goatList.appendChild(div);
  });
};

// View Details
window.viewDetails = async (id) => {
  const docRef = doc(db, "goats", id);
  const docSnap = await getDoc(docRef);
  const g = docSnap.data();

  const html = `
    <div class="goat-details">
      <h3>ছাগলের সম্পূর্ণ তথ্য</h3>
      <label>নাম: <input id="d-name" value="${g.name}" /></label><br/>
      <label>আইডি: <input id="d-id" value="${g.id}" disabled/></label><br/>
      <label>প্রকার: <input id="d-type" value="${g.type}" /></label><br/>
      <label>ক্রয় তারিখ: <input type="date" id="d-date" value="${g.date}" /></label><br/>
      <label>ক্রয় মূল্য: <input type="number" id="d-price" value="${g.price}" /></label><br/>
      <label>গর্ভাবস্থা: 
        <select id="d-pregnant">
          <option ${g.pregnant === "না" ? "selected" : ""}>না</option>
          <option ${g.pregnant === "হ্যাঁ" ? "selected" : ""}>হ্যাঁ</option>
        </select>
      </label><br/>
      <label>গর্ভাবস্থা শুরুর তারিখ: <input type="date" id="d-pregDate" value="${g.pregnancyStart || ''}" /></label><br/>
      <label>খাদ্য তালিকা:<br/><textarea id="d-food">${g.food}</textarea></label><br/>
      <label>টিকা:<br/><textarea id="d-vaccine">${g.vaccine}</textarea></label><br/>
      <label>বিক্রয় মূল্য: <input type="number" id="d-sell" value="${g.sellPrice}" /></label><br/>
      <label>লাভ: <input type="number" id="d-profit" value="${g.profit}" /></label><br/>
      <button onclick="updateGoat('${id}')">তথ্য আপডেট করুন</button>
    </div>
  `;

  goatList.innerHTML = html;
};

// Update Goat
window.updateGoat = async (id) => {
  const updated = {
    name: document.getElementById("d-name").value,
    type: document.getElementById("d-type").value,
    date: document.getElementById("d-date").value,
    price: document.getElementById("d-price").value,
    pregnant: document.getElementById("d-pregnant").value,
    pregnancyStart: document.getElementById("d-pregDate").value,
    food: document.getElementById("d-food").value,
    vaccine: document.getElementById("d-vaccine").value,
    sellPrice: document.getElementById("d-sell").value,
    profit: document.getElementById("d-profit").value
  };

  await updateDoc(doc(db, "goats", id), updated);
  alert("তথ্য আপডেট হয়েছে!");
};

// Real-time updates
onSnapshot(collection(db, "goats"), renderGoats);

// Goat Search
document.getElementById("searchBtn").addEventListener("click", async () => {
  const searchId = document.getElementById("searchInput").value.trim();
  const searchResult = document.getElementById("searchResult");

  if (!searchId) {
    searchResult.innerHTML = "অনুগ্রহ করে একটি ছাগলের আইডি লিখুন।";
    return;
  }

  const snapshot = await getDocs(collection(db, "goats"));
  let found = false;

  snapshot.forEach(docSnap => {
    const g = docSnap.data();
    if (g.id === searchId) {
      const pregDays = calculatePregnancyDays(g.pregnancyStart);
      searchResult.innerHTML = `
        <div class="goat-card">
          <strong>${g.name}</strong> (${g.id})<br/>
          প্রকার: ${g.type}<br/>
          গর্ভাবস্থা: ${g.pregnant} (${pregDays})<br/>
          <button onclick="viewDetails('${docSnap.id}')">সম্পূর্ণ তথ্য দেখুন</button>
        </div>
      `;
      found = true;
    }
  });

  if (!found) {
    searchResult.innerHTML = "ছাগল পাওয়া যায়নি!";
  }
});