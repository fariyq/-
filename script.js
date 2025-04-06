// Firebase SDK Import (ES Module ব্যবহার করলে index.html-এই থাকে, তাই এখানে আর লাগবে না)

// Firestore ফাংশনগুলো ইমপোর্ট করো
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFx9Szt_sbhhtWEqHgIU5jUz3qxD0jOMo",
  authDomain: "bishwasher-khamar.firebaseapp.com",
  projectId: "bishwasher-khamar",
  storageBucket: "bishwasher-khamar.appspot.com",
  messagingSenderId: "466255017082",
  appId: "1:466255017082:web:902506f7358dfd5a82b7c3",
  measurementId: "G-457DQ0ZHHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ফর্ম ও বাটনের রেফারেন্স
const form = document.getElementById("goatForm");
const newGoatBtn = document.getElementById("newGoatBtn");

// ফর্ম দেখানোর জন্য
newGoatBtn.addEventListener("click", () => {
  form.style.display = "block";
});

// ফর্ম সাবমিট হলে ডেটা পাঠাও
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ইনপুট থেকে ডেটা নেওয়া
  const data = {
    name: document.getElementById("goatName").value,
    id: document.getElementById("goatId").value,
    type: document.getElementById("goatType").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    purchasePrice: document.getElementById("purchasePrice").value,
    pregnant: document.getElementById("pregnant").value,
    foodList: document.getElementById("foodList").value,
    vaccineRecord: document.getElementById("vaccineRecord").value,
    sellPrice: document.getElementById("sellPrice").value || null,
    profit: document.getElementById("profit").value || null,
    createdAt: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "goats"), data);
    alert("ছাগলের তথ্য সংরক্ষণ করা হয়েছে!");
    form.reset();
    form.style.display = "none";
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("ডেটা সংরক্ষণে সমস্যা হয়েছে!");
  }
});