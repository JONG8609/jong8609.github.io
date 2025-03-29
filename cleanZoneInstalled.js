const popupData = [
    {
        title: "대전 갑천 트리플시티 힐스테이트",
        image: "src/images/open_pictures/daejeon_gabcjeon.png",
        description: "2023년 10월 오픈",
    },
    {
        title: "인천 송도 레이크시티 힐스테이트 3차",
        image: "src/images/open_pictures/songdo_lake_3.png",
        description: "24년 3월 오픈",
    },
    {
        title: "인천 학익동 시티오씨엘 1차",
        image: "src/images/open_pictures/hakik1.png",
        description: "24년 6월 오픈",
    },
    {
        title: "인천 학익동 시티오씨엘 3차",
        image: "src/images/open_pictures/hakik3.png",
        description: "24년 11월 오픈",
    },
    {
        title: "서울 관악구 힐스테이트 관악 쎈트씨엘",
        image: "src/images/open_pictures/gwanak1.png",
        description: "25년 1월 오픈",
    }
];

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("installationList");

    popupData.forEach(data => {
        const figure = document.createElement("figure");

        if (data.image) {
            figure.innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <figcaption>
                    <strong>${data.title}</strong><br>
                    ${data.description}
                </figcaption>
            `;
        } else {
            figure.innerHTML = `
                <div class="no-image">이미지 준비 중</div>
                <figcaption>
                    <strong>${data.title}</strong><br>
                    ${data.description}
                </figcaption>
            `;
        }

        container.appendChild(figure);
    });
});
