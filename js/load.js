// 確保 DOM 已經完全載入後執行
document.addEventListener("DOMContentLoaded", function () {
  // 檢查本地存儲中是否包含名為 myGPAData 的數據
  if (localStorage.getItem("myGPAData")) {
    // 從本地存儲中獲取保存的成績數據
    const gradesJSON = localStorage.getItem("myGPAData");

    // 將 JSON 字符串轉換為 JavaScript 對象
    const gradesArray = JSON.parse(gradesJSON);

    // 將每個成績數據顯示在頁面上
    gradesArray.forEach((grade) => {
      // 創建一個新的表單元素
      const form = document.createElement("form");

      // 創建一個新的 grader 元素
      const grader = document.createElement("div");
      grader.classList.add("grader");

      // 添加各個元素
      grader.innerHTML = `
        <input 
        type="text" 
        class="class-semester" 
        value="${grade.semester}" 
        required 
        /><!--
        --><input 
        type="text" 
        class="class-title" 
        value="${grade.title}" 
        required 
        /><!--
        --><input 
        type="number" 
        class="class-credit" 
        value="${grade.credit}" 
        min="0" 
        max="5" 
        required 
        /><!--
        --><select name="select" class="select-grade">
          <option value="${grade.grade}" selected>${grade.grade}</option>
          <option value="A+">A+ (90-100)</option>
          <option value="A">A (85-89)</option>
          <option value="A-">A- (80-84)</option>
          <option value="B+">B+ (77-79)</option>
          <option value="B">B (73-76)</option>
          <option value="B-">B- (70-72)</option>
          <option value="C+">C+ (67-69)</option>
          <option value="C">C (63-66)</option>
          <option value="C-">C- (60-62)</option>
          <option value="D">D (50-59)</option>
          <option value="E">E (0-49)</option> </select
          ><!--
          --><button class="trash-button">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;

      // 將 grader 元素添加到表單中
      form.appendChild(grader);

      // 調用 changeColor 函式來更改 select 元素的顏色
      changeColor(grader.querySelector(".select-grade"));

      // 將表單添加到 all-inputs 區域中
      const allInputs = document.querySelector(".all-inputs");
      allInputs.appendChild(form);

      // 更新 GPA
      setGPA();

      // 防止FORM內部的BUTTON交出表單
      let allButtons = document.querySelectorAll("button");
      allButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });

      // 選擇select內的OPTION之後，要改變相對應的顏色
      let allSelects = document.querySelectorAll("select"); // 靜態NodeList
      allSelects.forEach((select) => {
        select.addEventListener("change", (e) => {
          setGPA();
          changeColor(e.target); // e.target就是<select>
        });
      });

      // 改變credit之後，GPA也要更新
      let credits = document.querySelectorAll(".class-credit");
      credits.forEach((credit) => {
        credit.addEventListener("change", () => {
          setGPA();
        });
      });

      // 所有垃圾桶
      let allTrash = document.querySelectorAll(".trash-button");
      allTrash.forEach((trash) => {
        trash.addEventListener("click", (e) => {
          e.target.parentElement.parentElement.classList.add("remove");
        });
      });
      allTrash.forEach((trash) => {
        let form = trash.parentElement.parentElement;
        form.addEventListener("transitionend", (e) => {
          e.target.remove();
          setGPA();
        });
      });
    });
  }
});
