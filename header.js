document.addEventListener("DOMContentLoaded", function () {


    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            // 창업문의 버튼 클릭 시 창업1 문의 게시판으로 이동
            document.getElementById("franchise-btn").addEventListener("click", function () {
                window.location.href = "franchise.html";
            });
        })
        .catch(error => console.error("헤더 로드 실패:", error));
});
