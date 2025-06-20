import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBiBYSEHiRCm-6kMx8utfF9jy71kCdrC98",
  authDomain: "linksarelife.firebaseapp.com",
  projectId: "linksarelife",
  storageBucket: "linksarelife.appspot.com",
  messagingSenderId: "654538664176",
  appId: "1:654538664176:web:2b26a3aca9e9f9668bfa35"
};

// new push
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signed up successfully!");
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signed in!");
    loadLinks(email);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function saveLink() {
  const link = document.getElementById("link").value;
  const email = document.getElementById("email").value;
  if (!link || !email) return;

  try {
    await addDoc(collection(db, "links"), {
      user: email,
      url: link,
      timestamp: new Date()
    });
    alert("Link saved!");
    loadLinks(email);
  } catch (error) {
    alert("Error saving link: " + error.message);
  }
}

async function loadLinks(email) {
  const q = query(collection(db, "links"), where("user", "==", email));
  const querySnapshot = await getDocs(q);
  const list = document.getElementById("linkList");
  list.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().url;
    list.appendChild(li);
  });
}

document.getElementById("signupBtn").addEventListener("click", signUp);
document.getElementById("signinBtn").addEventListener("click", signIn);
document.getElementById("saveLinkBtn").addEventListener("click", saveLink);
