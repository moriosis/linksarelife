
Conversation opened. 1 unread message. 

Skip to content
Using Gmail with screen readers
1 of 23,917
New app.js
Inbox
Dan Morio <dan.morio@gmail.com>
	
2:10 AM (2 minutes ago)
	
to me

const auth = firebase.auth();
const db = firebase.firestore();

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    alert("Signed up successfully!");
  } catch (error) {
    alert("Error: " + error.message);
  }
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
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
    await db.collection("links").add({
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
  const list = document.getElementById("linkList");
  list.innerHTML = "";

  const snapshot = await db.collection("links").where("user", "==", email).get();
  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().url;
    list.appendChild(li);
  });
}
	
Displaying linksarelife_firebase_template_safe.txt.
