import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

export function ResetPassword() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = `
    <h2>Reset Your Password</h2>
    <input type="email" id="resetEmail" placeholder="Enter your email" />
    <button id="resetBtn">Send Reset Email</button>
    <p id="resetMessage"></p>
  `;

  document.getElementById("resetBtn").addEventListener("click", () => {
    const email = document.getElementById("resetEmail").value;
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        document.getElementById("resetMessage").textContent = "Check your email for reset instructions.";
      })
      .catch((error) => {
        document.getElementById("resetMessage").textContent = error.message;
      });
  });
}
