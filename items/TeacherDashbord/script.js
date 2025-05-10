function underworking() {
  alert("الحساب قيد التطوير");
}

function showthedelevoper() {
  alert("المطور: صلاح الدين المحمد");
}

// لتخزين الصفوف والطلاب
const classesData = {};

document.getElementById("addClassBtn").onclick = function () {
  toggleAddForm();
};

function toggleAddForm() {
  const form = document.getElementById("classForm");
  form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
}

function addSection() {
  const grade = document.getElementById("gradeInput").value.trim();
  const section = document.getElementById("sectionInput").value.trim();

  if (grade === "" || section === "") {
    alert("يرجى تعبئة الصف والشعبة");
    return;
  }

  const classKey = `${grade}-${section}`;
  if (!classesData[classKey]) {
    classesData[classKey] = []; // إنشاء مصفوفة طلاب
  }

  const classBox = document.createElement("div");
  classBox.className = "class-box";
  classBox.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px; border:1px solid #ccc; margin-top:10px; border-radius:8px; background-color:#f0f0f0;";

  const text = document.createElement("span");
  text.textContent = `الصف: ${grade}  -  الشعبة: ${section}`;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.gap = "10px";

  const openBtn = document.createElement("button");
  openBtn.id="openBtn";
  openBtn.textContent = "فتح";
  openBtn.onclick = function () {
    document.querySelector(".body").style.display = "none";

    const classView = document.createElement("div");
    classView.id = "classView";

    const header = document.createElement("div");
    header.className = "header";
    header.style.display = "flex";
    header.style.gap = "10px";

    const backBtn = document.createElement("button");
    backBtn.textContent = "🔙 رجوع";
    backBtn.onclick = function () {
      classView.remove();
      document.querySelector(".body").style.display = "block";
    };

    const addStudentBtn = document.createElement("button");
    addStudentBtn.textContent = "➕ إضافة طالب";
    addStudentBtn.onclick = function () {
      const studentName = prompt("أدخل اسم الطالب كامل:");
      const fatherName = prompt("أدخل اسم الأب:");

      if (!studentName || !fatherName) {
        alert("يرجى إدخال اسم الطالب واسم الأب.");
        return;
      }

      const student = { 
        name: studentName, 
        father: fatherName,
        marks: {} // ← لحتى نخزن علامات المواد لاحقًا
      };      
      classesData[classKey].push(student);

      renderStudentList(classKey, studentList);
    };

    const gradesBtn = document.createElement("button");
    gradesBtn.textContent = "📊 العلامات";
    gradesBtn.onclick = function () {
      const oldMarksView = document.getElementById("marksView");
      if (oldMarksView) oldMarksView.remove();
    
      const marksView = document.createElement("div");
      marksView.id = "marksView";
      marksView.style.marginTop = "20px";
    
      const title = document.createElement("h3");
      title.textContent = "تسجيل العلامات";
      title.style.textAlign = "center";
      marksView.appendChild(title);
    
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginTop = "10px";
      table.style.textAlign = "center";
    
      const subjects = ["عربي", "رياضيات", "علوم", "إنجليزي", "اجتماعيات", "ديانة"];
    
      const thead = document.createElement("thead");
      const headerTr = document.createElement("tr");
    
      const nameTh = document.createElement("th");
      nameTh.textContent = "اسم الطالب";
      nameTh.style.border = "1px solid #ccc";
      nameTh.style.padding = "8px";
      headerTr.appendChild(nameTh);
    
      subjects.forEach(subject => {
        const th = document.createElement("th");
        th.textContent = subject;
        th.style.border = "1px solid #ccc";
        th.style.padding = "8px";
        headerTr.appendChild(th);
      });
    
      thead.appendChild(headerTr);
      table.appendChild(thead);
    
      const tbody = document.createElement("tbody");
    
      classesData[classKey].forEach((student, index) => {
        const row = document.createElement("tr");
        const nameTd = document.createElement("td");
        nameTd.textContent = `${student.name}`;
        nameTd.style.border = "1px solid #ccc";
        nameTd.style.padding = "8px";
        row.appendChild(nameTd);
    
        subjects.forEach(subject => {
          const td = document.createElement("td");
          td.style.border = "1px solid #ccc";
          td.style.padding = "8px";
    
          const input = document.createElement("input");
          input.type = "number";
          input.min = 0;
          input.max = 100;
          input.value = student.marks[subject] || "";
          input.style.width = "60px";
          input.style.textAlign = "center";
          input.style.border = "1px solid #aaa";
          input.style.borderRadius = "5px";
          input.style.padding = "4px";
    
          // إزالة الأسهم
          input.style.MozAppearance = "textfield";
          input.style.WebkitAppearance = "none";
          input.style.appearance = "none";
    
          input.oninput = () => {
            student.marks[subject] = parseFloat(input.value) || 0;
          };
    
          td.appendChild(input);
          row.appendChild(td);
        });
    
        tbody.appendChild(row);
      });
    
      table.appendChild(tbody);
      marksView.appendChild(table);
    
      // أزرار الحفظ والرجوع
      const footerButtons = document.createElement("div");
      footerButtons.style.marginTop = "20px";
      footerButtons.style.display = "flex";
      footerButtons.style.justifyContent = "center";
      footerButtons.style.gap = "20px";
    
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "💾 حفظ العلامات";
      saveBtn.onclick = () => {
        alert("تم حفظ العلامات بنجاح ✅");
        marksView.remove();
      };
    
      const backBtn2 = document.createElement("button");
      backBtn2.textContent = "🔙 رجوع";
      backBtn2.onclick = () => {
        marksView.remove();
      };
    
      footerButtons.appendChild(saveBtn);
      footerButtons.appendChild(backBtn2);
      marksView.appendChild(footerButtons);
    
      classView.appendChild(marksView);
    };
    
    const homeworkBtn = document.createElement("button");
    homeworkBtn.textContent = "📝 الواجبات";
    homeworkBtn.onclick = function () {
      // إذا كانت النافذة موجودة، لا تنشئها من جديد
      if (document.getElementById("homeworkModal")) {
        document.getElementById("homeworkModal").style.display = "flex";
        return;
      }
    
      const modal = document.createElement("div");
      modal.id = "homeworkModal";
      modal.style.cssText = `
        display: flex; justify-content: center; align-items: center;
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 999;
      `;
    
      const modalContent = document.createElement("div");
      modalContent.style.cssText = `
        background: #ccc; padding: 20px; border-radius: 10px;
        width: 90%; max-width: 500px; text-align: right; direction: rtl;
      `;
    
      const title = document.createElement("h3");
      title.textContent = "إرسال واجب";
      title.id="title";
    
      const homeworkInput = document.createElement("textarea");
      homeworkInput.placeholder = "أدخل نص الواجب...";
      homeworkInput.style.cssText = `
        width: 95%; height: 100px; margin-bottom: 10px; padding: 10px;
        border-radius: 8px;
      `;
    
      const noteInput = document.createElement("textarea");
      noteInput.placeholder = "ملاحظة (اختياري)";
      noteInput.style.cssText = `
        width: 95%; height: 60px; margin-bottom: 10px; padding: 10px;
        border-radius: 8px;
      `;
    
      const btnContainer = document.createElement("div");
      btnContainer.style.cssText = "display: flex; justify-content: space-between;";
    
      const sendBtn = document.createElement("button");
      sendBtn.textContent = "📤 إرسال";
      sendBtn.id="sendBtn";
      sendBtn.onclick = function () {
        const hw = homeworkInput.value.trim();
        const note = noteInput.value.trim();
        if (hw === "") {
          alert("الرجاء كتابة الواجب.");
          return;
        }
    
        alert("✅ تم إرسال الواجب:\n" + hw + (note ? `\n📌 ملاحظة: ${note}` : ""));
        modal.remove();
      };
    
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "❌ إلغاء";
      cancelBtn.id="cancelBtn";
      cancelBtn.onclick = function () {
        modal.remove();
      };
    
      btnContainer.appendChild(sendBtn);
      btnContainer.appendChild(cancelBtn);
    
      modalContent.appendChild(title);
      modalContent.appendChild(homeworkInput);
      modalContent.appendChild(noteInput);
      modalContent.appendChild(btnContainer);
    
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    };
    
        

    header.appendChild(backBtn);
    header.appendChild(addStudentBtn);
    header.appendChild(gradesBtn);
    header.appendChild(homeworkBtn);

    const hr = document.createElement("hr");
    const studentList = document.createElement("div");
    studentList.id = "studentList";

    classView.appendChild(header);
    classView.appendChild(hr);
    classView.appendChild(studentList);

    document.body.appendChild(classView);

    // عرض الطلاب الموجودين سابقًا
    renderStudentList(classKey, studentList);
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "تعديل";
  editBtn.onclick = function () {
    const newGrade = prompt("أدخل اسم الصف الجديد:", grade);
    const newSection = prompt("أدخل اسم الشعبة الجديدة:", section);
    if (newGrade && newSection) {
      const newKey = `${newGrade}-${newSection}`;
      if (classesData[newKey]) {
        alert("صف بهذا الاسم موجود مسبقًا.");
        return;
      }
      classesData[newKey] = classesData[classKey];
      delete classesData[classKey];
      text.textContent = `الصف: ${newGrade} - الشعبة: ${newSection}`;
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.id="deletBtn";
  deleteBtn.textContent = "حذف";
  deleteBtn.onclick = function () {
    const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف هذا الصف؟");
    if (confirmDelete) {
      delete classesData[classKey];
      classBox.remove();
    }
  };

  buttonsContainer.appendChild(openBtn);
  buttonsContainer.appendChild(editBtn);
  buttonsContainer.appendChild(deleteBtn);

  classBox.appendChild(text);
  classBox.appendChild(buttonsContainer);
  document.getElementById("classList").appendChild(classBox);

  document.getElementById("gradeInput").value = "";
  document.getElementById("sectionInput").value = "";
  document.getElementById("classForm").style.display = "none";
}

function renderStudentList(classKey, container) {
  container.innerHTML = "";
  classesData[classKey].forEach((student, index) => {
    const studentBox = document.createElement("div");
    studentBox.className = "student-box";
    studentBox.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px; border:1px solid #ccc; margin-top:10px; border-radius:8px; background-color:#e6f0ff;";

    const studentInfo = document.createElement("span");
    studentInfo.textContent = `الطالب: ${student.name} ابن ${student.father}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "10px";

    const editBtn = document.createElement("button");
    editBtn.textContent = "تعديل";
    editBtn.onclick = function () {
      const newName = prompt("أدخل اسم الطالب الجديد:", student.name);
      const newFather = prompt("أدخل اسم الأب الجديد:", student.father);
      if (newName && newFather) {
        classesData[classKey][index] = { name: newName, father: newFather };
        renderStudentList(classKey, container);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.id="deletBtn";
    deleteBtn.textContent = "حذف";
    deleteBtn.onclick = function () {
      if (confirm("هل تريد حذف هذا الطالب؟")) {
        classesData[classKey].splice(index, 1);
        renderStudentList(classKey, container);
      }
    };

    const pointsBtn = document.createElement("button");
    pointsBtn.id="pointsBtn";
    pointsBtn.textContent = "نقاط";
    pointsBtn.onclick = function () {
      // إذا كانت النافذة موجودة، لا تنشئها من جديد
      if (document.getElementById("pointsModal")) {
        document.getElementById("pointsModal").remove();
      }
    
      const modal = document.createElement("div");
      modal.id = "pointsModal";
      modal.style.cssText = `
        display: flex; justify-content: center; align-items: center;
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 999;
      `;
    
      const modalContent = document.createElement("div");
      modalContent.style.cssText = `
        background: white; padding: 20px; border-radius: 10px;
        width: 90%; max-width: 400px; text-align: right; direction: rtl;
      `;
    
      const title = document.createElement("h3");
      title.textContent = `نقاط الطالب: ${student.name}`;
      title.id="title";
    
      const modeContainer = document.createElement("div");
      modeContainer.style.cssText = "display: flex; gap: 10px; margin-bottom: 10px;";
    
      const giveBtn = document.createElement("button");
      giveBtn.textContent = "➕ إعطاء";
      giveBtn.style.cssText = "flex:1; padding:10px;";
      giveBtn.dataset.mode = "give";
    
      const takeBtn = document.createElement("button");
      takeBtn.textContent = "➖ سحب";
      takeBtn.style.cssText = "flex:1; padding:10px;";
      takeBtn.dataset.mode = "take";
    
      modeContainer.appendChild(giveBtn);
      modeContainer.appendChild(takeBtn);
    
      let currentMode = "give";
    
      giveBtn.onclick = function () {
        currentMode = "give";
        giveBtn.style.background = "#cce5ff";
        giveBtn.style.color="black";
        giveBtn.style.border="1px solid black";
        takeBtn.style.background = "";
      };
    
      takeBtn.onclick = function () {
        currentMode = "take";
        takeBtn.style.background = "#ffc9c9";
        takeBtn.style.color="black";
        takeBtn.style.border="1px solid black";
        giveBtn.style.background = "";
      };
    
      // تفعيل خيار إعطاء كنمط افتراضي
      giveBtn.click();
    
      const pointInput = document.createElement("input");
      pointInput.type = "number";
      pointInput.placeholder = "الكمية";
      pointInput.style.cssText = `
        width: 95%; margin-bottom: 10px; padding: 10px;
        border-radius: 8px;
      `;
    
      const noteInput = document.createElement("textarea");
      noteInput.placeholder = "ملاحظة...";
      noteInput.style.cssText = `
        width: 95%; height: 60px; margin-bottom: 10px; padding: 10px;
        border-radius: 8px;
      `;
    
      const actionBtn = document.createElement("button");
      actionBtn.textContent = "✅ تنفيذ";
      actionBtn.id="actionBtn";
      actionBtn.style.cssText = "width: 100%; padding: 10px;";
      actionBtn.onclick = function () {
        const qty = parseInt(pointInput.value);
        const note = noteInput.value.trim();
    
        if (isNaN(qty) || qty <= 0) {
          alert("أدخل كمية صالحة من النقاط");
          return;
        }
    
        const actionText = currentMode === "give" ? "تم إعطاء" : "تم سحب";
        alert(`${actionText} ${qty} نقطة من ${student.name}\n📌 ملاحظة: ${note || "بدون"}`);
        modal.remove();
      };
    
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "❌ إلغاء";
      cancelBtn.id="cancelBtn";
      cancelBtn.style.cssText = "width: 100%; padding: 10px; margin-top: 10px;";
      cancelBtn.onclick = function () {
        modal.remove();
      };
    
      modalContent.appendChild(title);
      modalContent.appendChild(modeContainer);
      modalContent.appendChild(pointInput);
      modalContent.appendChild(noteInput);
      modalContent.appendChild(actionBtn);
      modalContent.appendChild(cancelBtn);
    
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    };

    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);
    buttonsContainer.appendChild(pointsBtn);

    studentBox.appendChild(studentInfo);
    studentBox.appendChild(buttonsContainer);

    container.appendChild(studentBox);
  });
}
