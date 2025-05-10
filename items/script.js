 // قائمة الخلفيات
 const backgrounds = [
   "url('items/pictuers/picture.png')",
    "url('items/pictuers/second.png')",
    "url('items/pictuers/picture.png')",
    "url('items/pictuers/fanil.png')"
];

let currentBgIndex = 0;
let clickCount = 0; // عداد لتتبع عدد مرات الضغط


// دالة لتغيير الخلفية
document.querySelector (".btn-start").onclick = function() {

    // تغيير الخلفية إلى الصورة التالية في القائمة
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[currentBgIndex];
    document.body.style.backgroundSize = "cover";
    // تغيير النص
    const textElement = document.querySelector(".FirstText");
    if (currentBgIndex === 1) {
        textElement.innerHTML = "التطبيق يتيح الكثير من الميزات";
    } else if (currentBgIndex === 2) {
        textElement.innerHTML = "سهولة التواصل و مراجعة الدروس و الواجبات";
    } else if (currentBgIndex === 3) {
        textElement.innerHTML = "هل انت مستعد لنبدء رحلتنا في الدراسة";
    } else {
        textElement.innerHTML = "مرحبا بكم في برنامج مدرستي";
    }

    clickCount++;

    if (clickCount === 4) {
        window.location.href = "items/login.html";
    }
};