

//  Importaciones 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4-AmQb8yN7-vUAkoALhQq0rgfIiKRr90",
  authDomain: "makerspaceapp-22322.firebaseapp.com",
  projectId: "makerspaceapp-22322",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

function responsiveMenu() {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".menu-toggle");
  const isActive = nav.classList.toggle("active");

  if (toggle) {
    toggle.setAttribute("aria-expanded", String(isActive));
  }
}
document.querySelector(".menu-toggle").addEventListener("click", responsiveMenu);

window.addEventListener("resize", () => {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".menu-toggle");

  if (window.innerWidth > 768 && nav.classList.contains("active")) {
    nav.classList.remove("active");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }
});

document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const nav = document.getElementById("nav");
      const toggle = document.querySelector(".menu-toggle");

      nav.classList.remove("active");

      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

