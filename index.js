// ✅ 팝업 사용 여부 설정
const USE_POPUP = true;

// 🚀 fetch()로 header/footer 로드
async function loadComponent(id, url) {
  try {
    const response = await fetch(url, { cache: "no-cache" }); // 캐시 방지
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`🚨 ${url} 로딩 중 오류 발생:`, error);
  }
}

// 🚀 팝업 스크립트 동적 로드
function loadPopupScript() {
  const script = document.createElement("script");
  script.src = "popup.js";
  script.defer = true;
  document.body.appendChild(script);
}

// 🚀 헤더 & 푸터 로드 → 팝업 조건 실행
Promise.all([
  loadComponent("header", "header.html"),
  loadComponent("footer", "footer.html")
])
  .then(() => {
    console.log("🚀 헤더 & 푸터 로딩 완료!");
    document.body.style.visibility = "visible";

    if (USE_POPUP) {
      console.log("✅ 팝업 실행 조건 충족 → popup.js 로드");
      loadPopupScript();
    } else {
      console.log("❌ 팝업 실행 조건 미충족 → popup.js 미로드");
    }
  })
  .catch(error => {
    console.error("🚨 헤더/푸터 로딩 중 오류 발생!", error);
  });
