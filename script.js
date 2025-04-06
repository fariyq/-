// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// Show goat list
const goatList = document.getElementById("goatList");

const calculatePregnancyDays = (startDate) => {
  if (!startDate) return "গর্ভাবস্থা শুরু হয়নি";
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = now - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} দিন`;
};

const renderGoats = (snapshot) => {
  goatList.innerHTML = "";
  snapshot.forEach(async (docSnap) => {
    const g = docSnap.data();
    const div = document.createElement("div");
    div.className = "goat-card";

    div.innerHTML = `
      <strong>${g.name}</strong> (${g.id})<br/>
      প্রকার: ${g.type}, গর্ভাবস্থা: ${g.pregnant}<br/>
      ক্রয়: ${g.price}৳ (${g.date})<br/>
      বিক্রয়: ${g.sellPrice || "N/A"}৳, লাভ: ${g.profit || "N/A"}৳<br/>
      খাদ্য: ${g.food}<br/>
      টিকা: ${g.vaccine}<br/>
      ${g.type === "গাভিন" ? `
        <label>গর্ভাবস্থা শুরু তারিখ:
          <input type="date" id="pregnancyDate-${docSnap.id}" value="${g.pregnancyStart || ''}" />
        </label>
        <button onclick="updatePregnancyDate('${docSnap.id}')">সংরক্ষণ</button><br/>
        গর্ভাবস্থা চলছে: ${calculatePregnancyDays(g.pregnancyStart)}
      ` : ""}
      <hr/>
    `;

    goatList.appendChild(div);
  });
};

window.updatePregnancyDate = async (id) => {
  const dateInput = document.getElementById(`pregnancyDate-${id}`);
  const newDate = dateInput.value;
  if (newDate) {
    await updateDoc(doc(db, "goats", id), {
      pregnancyStart: newDate
    });
    alert("গর্ভাবস্থা শুরুর তারিখ সংরক্ষিত হয়েছে");
  }
};

onSnapshot(collection(db, "goats"), renderGoats);



// ✅ নতুন ফিচার: ছাগলের আইডি দিয়ে খোঁজা
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "ছাগলের ইউনিক আইডি লিখুন";
searchInput.id = "searchGoatId";
searchInput.style.marginTop = "20px";

const searchBtn = document.createElement("button");
searchBtn.innerText = "খুঁজুন";
searchBtn.style.marginLeft = "10px";

goatList.parentElement.insertBefore(searchInput, goatList);
goatList.parentElement.insertBefore(searchBtn, goatList);

searchBtn.addEventListener("click", async () => {
  const searchId = document.getElementById("searchGoatId").value.trim();
  if (!searchId) {
    alert("অনুগ্রহ করে একটি আইডি লিখুন");
    return;
  }

  const q = query(collection(db, "goats"), where("id", "==", searchId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    goatList.innerHTML = `<p>এই আইডি দিয়ে কোনো ছাগল পাওয়া যায়নি</p>`;
  } else {
    renderGoats(querySnapshot);
  }
});