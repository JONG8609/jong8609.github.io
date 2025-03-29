document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("franchise-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const title = document.getElementById("title").value;
        const message = document.getElementById("message").value;
        const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 포맷1

        if (!name || !title || !message) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
        inquiries.push({ name, title, message, date });
        localStorage.setItem("inquiries", JSON.stringify(inquiries));

        alert("문의가 등록되었습니다.");
        window.location.href = "franchise.html";
    });
});
