function showInterface(targetClass) {
    // إخفاء كل الواجهات الأخرى
    document.querySelectorAll('.lessons-interface, .settings-interface, .store-interface')
        .forEach(el => el.classList.remove('interface-active'));

    // إخفاء واجهة الحساب أيضًا
    document.querySelector(".account-interface").style.display = "none";

    // تفعيل الواجهة المطلوبة فقط
    document.querySelector(`.${targetClass}`).classList.add('interface-active');
}

// أزرار التبديل
document.getElementById("lessonsBtn").addEventListener("click", () => {
    showInterface("lessons-interface");
});

document.getElementById("settingsBtn").addEventListener("click", () => {
    showInterface("settings-interface");
});

document.getElementById("storeBtn").addEventListener("click", () => {
    showInterface("store-interface");
});

// زر الحساب
document.getElementById("accountBtn").addEventListener("click", function () {
    // إغلاق كل الواجهات الأخرى
    document.querySelectorAll('.lessons-interface, .settings-interface, .store-interface')
        .forEach(el => el.classList.remove('interface-active'));

    // عرض واجهة الحساب
    document.querySelector(".account-interface").style.display = "block";

    // حساب العلامات
    const marks = document.querySelectorAll(".account-interface .mark");
    let total = 0;

    marks.forEach(mark => {
        total += parseInt(mark.textContent);
    });

    const average = Math.round(total / marks.length);
    const status = average >= 60 ? "ناجح" : "راسب";

    document.getElementById("total").textContent = total;
    document.getElementById("average").textContent = average;
    document.getElementById("status").textContent = status;
});

document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function () {
        const priceText = this.closest(".store-item").querySelector(".item-price").textContent;
        const itemPrice = parseInt(priceText.replace(/[^\d]/g, '')); // يحذف كل ما ليس رقماً

        const pointsSpan = document.getElementById("studentPoints");
        let currentPoints = parseInt(pointsSpan.textContent);

        if (currentPoints >= itemPrice) {
            const confirmPurchase = confirm("هل أنت متأكد من رغبتك في شراء هذا المنتج؟");

            if (confirmPurchase) {
                currentPoints -= itemPrice;
                pointsSpan.textContent = currentPoints;
                alert("تم الشراء بنجاح!");
            }
        } else {
            alert("لا تملك نقاط كافية لإتمام الشراء.");
        }
    });
});

