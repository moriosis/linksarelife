import { ResetPassword } from "./ResetPassword.js";

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {

    apiKey: "AIzaSyBiBYSEHiRCm-6kMx8utfF9jv71kCdrc98",
    authDomain: "linksarelife.firebaseapp.com",
    databaseURL: "https://linksarelife-default-rtdb.firebaseio.com",
    projectId: "linksarelife",
    storageBucket: "linksarelife.firebasestorage.app",
    messagingSenderId: "654538664176",
    appId: "1:654538664176:web:2b26a3aca9e9f9668bfa35"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.signUp = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signed up successfully!");
  } catch (error) {
    alert("Error: " + error.message);
  }
};

window.signIn = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signed in!");
    loadLinks(email);
  } catch (error) {
    alert("Error: " + error.message);
  }
};

window.saveLink = async function () {
  const link = document.getElementById("link").value;
  const email = document.getElementById("email").value;
  try {
    await addDoc(collection(db, "links"), {
      link,
      user: email,
      timestamp: new Date()
    });
    loadLinks(email);
  } catch (error) {
    alert("Error saving link: " + error.message);
  }
};

async function loadLinks(email) {
  const q = query(collection(db, "links"), where("user", "==", email));
  const snapshot = await getDocs(q);
  const list = document.getElementById("linkList");
  list.innerHTML = "";
  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().link;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const resetLink = document.getElementById("resetLink");
  if (resetLink) {
    resetLink.addEventListener("click", (e) => {
      e.preventDefault();
//ResetPassword();
alert("Reset clicked!");
    });
  }
});
