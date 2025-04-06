// ছাগল তথ্য সংরক্ষণ করার জন্য একটি অ্যারে
let goats = [];

// ফর্ম সাবমিট হ্যান্ডলিং
document.getElementById("goat-form").addEventListener("submit", function (event) {
    event.preventDefault(); // পেজ রিফ্রেশ হওয়া থেকে রোধ করুন

    // ফর্মের তথ্য নিয়ে আসা
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const price = document.getElementById("price").value;
    const pregnant = document.getElementById("pregnant").checked;

    // ছাগল তথ্য সংরক্ষণ
    const goat = {
        id: Date.now(),
        name,
        type,
        date,
        price,
        pregnant
    };
    
    goats.push(goat);

    // ছাগলের তালিকা আপডেট করা
    updateGoatList();

    // ফর্ম রিসেট করা
    document.getElementById("goat-form").reset();
});

// ছাগলের তালিকা প্রদর্শন করার ফাংশন
function updateGoatList() {
    const goatList = document.getElementById("goat-list");
    goatList.innerHTML = '';

    goats.forEach(goat => {
        const li = document.createElement("li");
        li.textContent = `ছাগল নাম: ${goat.name}, প্রকার: ${goat.type}, ক্রয় মূল্য: ${goat.price} টাকা, গর্ভাবস্থা: ${goat.pregnant ? 'গর্ভবতী' : 'গর্ভবতী নয়'}`;
        goatList.appendChild(li);
    });
}