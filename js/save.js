// 獲取儲存按鈕元素
let saveButton = document.querySelector(".save-button");

// 當儲存按鈕被點擊時觸發的函式
saveButton.addEventListener("click", function () {
  // 顯示確認對話框
  Swal.fire({
    title: "確定要儲存成績嗎？",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    // 如果使用者確定要儲存
    if (result.isConfirmed) {
      // 獲取所有成績行
      let allGraders = document.querySelectorAll(".grader");

      // 檢查是否存在成績資料
      if (allGraders.length > 0) {
        // 定義一個空數組來保存所有成績
        let allData = [];

        // 遍歷每一行成績
        allGraders.forEach(function (grader) {
          // 獲取每一行的學期、科目名稱、學分數、成績
          let semester = grader.querySelector(".class-semester").value;
          let title = grader.querySelector(".class-title").value;
          let credit = grader.querySelector(".class-credit").value;
          let grade = grader.querySelector(".select-grade").value;

          // 創建一個新的物件來表示這筆資料
          let newData = {
            semester: semester,
            title: title,
            credit: credit,
            grade: grade,
          };

          // 將這筆資料加入到所有成績的數組中
          allData.push(newData);
        });

        // 將所有成績的數組存儲到本地存儲中
        localStorage.setItem("myGPAData", JSON.stringify(allData));

        // 提示儲存成功
        Swal.fire({
          title: "成績已成功儲存！",
          icon: "success",
          confirmButtonText: "關閉",
        });
      } else {
        // 提示沒有成績可儲存
        Swal.fire({
          title: "請輸入成績後再儲存！",
          icon: "warning",
          confirmButtonText: "關閉",
        });
      }
    }
  });
});
