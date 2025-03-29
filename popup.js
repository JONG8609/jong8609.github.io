// 📌 쿠키 저장 함수
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ";" + expires + "; path=/";
}

// 📌 쿠키 조회 함수
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 📌 팝업 데이터
const popupData = [
    {
        title: "대전 갑천 트리플시티 힐스테이트",
        image: "src/images/open_pictures/daejeon_gabcjeon.png",
        description: "대전 갑천 트리플시티 힐스테이트 오픈",
    },
    {
        title: "인천 송도 레이크시티 힐스테이트 3차",
        image: "src/images/open_pictures/songdo_lake_3.png",
        description: "인천 송도 레이크시티 힐스테이트 3차 오픈!",
    },
    {
        title: "인천 학익동 시티오씨엘 1차",
        image: "src/images/open_pictures/hakik1.png",
        description: "인천 학익동 시티오씨엘 1차 오픈!",
    },
    {
        title: "인천 학익동 시티오씨엘 3차",
        image: "src/images/open_pictures/hakik3.png",
        description: "인천 학익동 시티오씨엘 3차 오픈!",
    },
    {
        title: "서울 관악구 힐스테이트 관악 쎈트씨엘",
        image: "src/images/open_pictures/gwanak1.png",
        description: "서울 관악구 힐스테이트 관악 쎈트씨엘 오픈!",
    },
    {
        title: "오픈 예정!",
        image: "",
        description: `
            <div style="text-align: center; font-size: 18px; line-height: 1.8;">
                <span>인천 송도 레이크시티 힐스테이트 4차</span><br>
                <span>향후 다수 입점 예정</span><br>
                <span>추가 협의 중인 단지</span><br>
                <span>2025년 분양 예정 지역</span>
            </div>
        `,
    }
];

let currentPopupIndex = 0;
let allPopupsClosed = false;

let savedLeft = null;
let savedTop = null;
let hasSavedPosition = false; // ✅ 위치 저장 여부 플래그

function createPopup(index) {
    if (index >= popupData.length || index < 0 || allPopupsClosed) return;

    const data = popupData[index];
    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");

    popupOverlay.innerHTML = `
        <div class="popup-box popup-fixed">
            <span class="popup-close">&times;</span>
            <div class="popup-header">
                <img src="src/images/logo.png" alt="WELL WASHING Logo" class="popup-logo">
            </div>
            <div class="popup-body">
                <h2>${data.title}</h2>
                ${data.image
                    ? `<img src="${data.image}" alt="${data.title}">`
                    : `<div class="popup-text-image">${data.description}</div>`}
                ${data.image ? `<div class="popup-description">${data.description}</div>` : ``}
                <div class="popup-nav">
                    <div class="popup-nav-item">
                        <button class="popup-prev" ${index === 0 ? 'disabled' : ''}>&lt;</button>
                        <span class="popup-nav-label">이전으로 가기</span>
                    </div>
                    <div class="popup-nav-item">
                        <button class="popup-next" ${index === popupData.length - 1 ? 'disabled' : ''}>&gt;</button>
                        <span class="popup-nav-label">다음으로 가기</span>
                    </div>
                </div>
            </div>
            <label class="popup-hide">
                <input type="checkbox" id="hidePopup"> 하루 동안 보지 않기
            </label>
        </div>
    `;

    document.body.appendChild(popupOverlay);
    const popupBox = popupOverlay.querySelector(".popup-box");

    // ✅ 위치 복원 또는 중앙 정렬
    if (hasSavedPosition && savedLeft && savedTop) {
        popupBox.style.left = savedLeft;
        popupBox.style.top = savedTop;
        popupBox.style.transform = "translate(0, 0)";
    } else {
        popupBox.style.left = "50%";
        popupBox.style.top = "50%";
        popupBox.style.transform = "translate(-50%, -50%)";
    }

    // 📌 닫기
    popupOverlay.querySelector(".popup-close").addEventListener("click", () => {
        popupOverlay.remove();
        const checkbox = popupOverlay.querySelector("#hidePopup");
        if (checkbox.checked) setCookie("popup_shown", true, 1);
    });

    // 📌 하루 동안 보지 않기
    popupOverlay.querySelector("#hidePopup").addEventListener("change", e => {
        if (e.target.checked) {
            setCookie("popup_shown", true, 1);
            document.querySelectorAll(".popup-overlay").forEach(p => p.remove());
            allPopupsClosed = true;
        }
    });

    // 📌 이전 / 다음 버튼
    const savePositionBeforeNavigate = () => {
        const box = document.querySelector(".popup-box");
        const left = box.style.left;
        const top = box.style.top;

        // ✅ 유효한 위치 값인지 확인
        if (left && top && left !== "50%" && top !== "50%") {
            savedLeft = left;
            savedTop = top;
            hasSavedPosition = true;
        }
    };

    popupOverlay.querySelector(".popup-prev")?.addEventListener("click", () => {
        savePositionBeforeNavigate();
        popupOverlay.remove();
        createPopup(--currentPopupIndex);
    });

    popupOverlay.querySelector(".popup-next")?.addEventListener("click", () => {
        savePositionBeforeNavigate();
        popupOverlay.remove();
        createPopup(++currentPopupIndex);
    });

    // 📌 드래그 기능 + 화면 밖 제한
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    popupBox.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - popupBox.getBoundingClientRect().left;
        offsetY = e.clientY - popupBox.getBoundingClientRect().top;
        popupBox.style.transition = "none";
        e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const maxLeft = window.innerWidth - popupBox.offsetWidth;
        const maxTop = window.innerHeight - popupBox.offsetHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        popupBox.style.left = `${newLeft}px`;
        popupBox.style.top = `${newTop}px`;
        popupBox.style.transform = "translate(0, 0)";
    });

    document.addEventListener("mouseup", function () {
        if (isDragging) {
            const left = popupBox.style.left;
            const top = popupBox.style.top;

            if (left && top && left !== "50%" && top !== "50%") {
                savedLeft = left;
                savedTop = top;
                hasSavedPosition = true;
            }

            isDragging = false;
        }
    });
}

// 📌 팝업 시작 함수
function startPopup() {
    if (getCookie("popup_shown") !== "true") {
        setTimeout(() => {
            createPopup(currentPopupIndex);
        }, 1000);
    }
}

window.addEventListener("load", startPopup);
