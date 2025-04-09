// franchiseWrite.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// 🔧 Firebase 설정
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔘 폼 제출 처리
document.getElementById("inquiry-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const title = e.target.title.value.trim();
  const content = e.target.content.value.trim();

  if (!name || !title || !content) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  try {
    await addDoc(collection(db, "franchise_inquiries"), {
      name,
      title,
      content,
      createdAt: serverTimestamp(),
    });

    alert("문의가 등록되었습니다.");
    window.location.href = "franchise.html";
  } catch (err) {
    console.error("저장 오류:", err);
    alert("저장에 실패했습니다. 다시 시도해주세요.");
  }
});
