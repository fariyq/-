// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
    profit: document.getElementById("profit").value
  };

  await addDoc(collection(db, "goats"), data);
  alert("তথ্য সংরক্ষণ হয়েছে!");
  document.getElementById("goatForm").reset();
});

// Show goat list
const goatList = document.getElementById("goatList");

const renderGoats = (snapshot) => {
  goatList.innerHTML = "";
  snapshot.forEach(doc => {
    const g = doc.data();
    const div = document.createElement("div");
    div.className = "goat-card";
    div.innerHTML = `
      <strong>${g.name}</strong> (${g.id})<br/>
      প্রকার: ${g.type}, গর্ভাবস্থা: ${g.pregnant}<br/>
      ক্রয়: ${g.price}৳ (${g.date})<br/>
      বিক্রয়: ${g.sellPrice || "N/A"}৳, লাভ: ${g.profit || "N/A"}৳<br/>
      খাদ্য: ${g.food}<br/>
      টিকা: ${g.vaccine}<br/><hr/>
    `;
    goatList.appendChild(div);
  });
};

onSnapshot(collection(db, "goats"), renderGoats);