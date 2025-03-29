document.addEventListener("DOMContentLoaded", function () {
    const inquiryList = document.getElementById("inquiry-list");
    const writeBtn = document.getElementById("write-btn");

    const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
    const itemsPerPage = 10;
    let currentPage = 1;

    // 문의 내역 불러오기 (페이지네이션1 적용)
    function loadInquiries(page) {
        inquiryList.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = inquiries.slice(start, end);

        paginatedItems.forEach((inquiry, index) => {
            const listItem = document.createElement("tr");
            listItem.innerHTML = `
                <td>${inquiries.length - (start + index)}</td>
                <td><span class="lock-icon">🔒</span> ${inquiry.title} <span class="new-label">NEW</span></td>
                <td>${inquiry.name[0]}****</td>
                <td>${inquiry.date}</td>
            `;
            inquiryList.appendChild(listItem);
        });

        document.getElementById("current-page").innerText = currentPage;
    }

    // 글쓰기 버튼 클릭 시 문의 작성 페이지로 이동
    writeBtn.addEventListener("click", function () {
        window.location.href = "write_franchise.html";
    });

    // 페이지네이션 이벤트
    document.getElementById("prev-page").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            loadInquiries(currentPage);
        }
    });

    document.getElementById("next-page").addEventListener("click", function () {
        if (currentPage * itemsPerPage < inquiries.length) {
            currentPage++;
            loadInquiries(currentPage);
        }
    });

    loadInquiries(currentPage);
});
