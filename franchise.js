// franchise.js

// 🔧 Firebase 구성
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// 🔧 Firebase 설정 정보
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "YOUR_APP_ID"
};

// 🔧 Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔄 게시글 목록 불러오기
async function loadInquiries() {
  const tbody = document.getElementById("inquiry-list");
  if (!tbody) return;

  tbody.innerHTML = "";

  const q = query(
    collection(db, "franchise_inquiries"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  let index = 1;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index++}</td>
      <td>${data.title}</td>
      <td>${data.name}</td>
      <td>${new Date(data.createdAt.toDate()).toLocaleDateString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ✅ 초기 실행
window.addEventListener("DOMContentLoaded", () => {
  loadInquiries();

  const writeBtn = document.getElementById("write-btn");
  if (writeBtn) {
    writeBtn.addEventListener("click", () => {
      console.log("✅ 글쓰기 버튼 클릭됨");
      window.location.href = "franchiseWrite.html";
    });
  } else {
    console.warn("❌ write-btn 요소를 찾을 수 없습니다.");
  }
});
