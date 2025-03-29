const mediaData = [
    {
        title: "이코노미뷰 + 조선일보",
        images: [
            "src/images/media/economy_view01.png",
            "src/images/media/economy_view02.png"
        ],
        description: "스팀 전용 셀프 세차장 ‘크린존’으로 청결하고 편리한 세차를 견인한다"
    },
    {
        title: "스포츠 조선",
        images: ["src/images/media/sport_chosun.png"],
        description: "'크린존 스팀셀프세차장' 아파트에서 안전한 세차"
    },
    {
        title: "예정",
        images: [],
        description: "보도자료 예정 항목"
    }
];

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("mediaList");

    mediaData.forEach(data => {
        if (!data.images || data.images.length === 0) return; // 이미지 없으면 스킵

        const section = document.createElement("div");
        section.className = "media-entry";

        const imgRow = document.createElement("div");
        imgRow.className = "media-images";

        data.images.forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = data.title;
            imgRow.appendChild(img);
        });

        const caption = document.createElement("div");
        caption.className = "media-caption";
        caption.innerHTML = `<strong>${data.title}</strong><br>${data.description}`;

        section.appendChild(imgRow);
        section.appendChild(caption);
        container.appendChild(section);
    });
});
