// 1. Importaciones necesarias de Firebase
import { db } from './firebaseConfig'; 
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";

export function initMakerSpace() {
  // 2. Selectores
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".menu-toggle");
  const queueBoard = document.getElementById("queueBoard");
  const addQueueCardButton = document.getElementById("addQueueCard");
  const colorInput = document.getElementById("cardColor");
  const ownerInput = document.getElementById("ownerName");
  const printInput = document.getElementById("printName");
  
  // Referencia a la colección en Firestore
  const colRef = collection(db, "colaImpresiones");

  // --- LÓGICA DEL MENÚ ---
  const responsiveMenu = () => {
    const isActive = nav.classList.toggle("active");
    if (toggle) toggle.setAttribute("aria-expanded", String(isActive));
  };

  if (toggle) {
    toggle.addEventListener("click", responsiveMenu);
  }

  // --- ESCUCHAR FIRESTORE EN TIEMPO REAL ---
  // Esta parte reemplaza a "ensureEmptyState" manual, ya que se actualiza solo
  const q = query(colRef, orderBy("createdAt", "asc"));
  
  onSnapshot(q, (snapshot) => {
    if (!queueBoard) return;
    
    queueBoard.innerHTML = ''; // Limpiamos para mostrar los datos actuales de la DB
    
    if (snapshot.empty) {
      const message = document.createElement("p");
      message.className = "queue-empty";
      message.textContent = "Sin impresiones agregadas a la cola.";
      queueBoard.appendChild(message);
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = createQueueCard(data.owner, data.print, data.color, docSnap.id);
      queueBoard.appendChild(card);
    });
  });

  // --- FUNCIÓN PARA CREAR EL ELEMENTO HTML ---
  function createQueueCard(ownerName, printName, cardColor, id) {
    const card = document.createElement("article");
    card.className = "queue-card";
    card.style.setProperty("--card-accent", cardColor);
    card.innerHTML = `
      <button class="queue-card__delete" data-id="${id}" type="button">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="queue-card__badge">En cola</div>
      <h3>${ownerName}</h3>
      <p>${printName}</p>
    `;
    return card;
  }

  // --- EVENTO PARA AÑADIR A FIRESTORE ---
  if (addQueueCardButton) {
    addQueueCardButton.addEventListener("click", async () => {
      const owner = ownerInput.value.trim();
      const print = printInput.value.trim();

      if (!owner || !print) {
        alert("Por favor, ingresa el nombre y la impresión.");
        return;
      }

      try {
        await addDoc(colRef, {
          owner: owner,
          print: print,
          color: colorInput.value,
          createdAt: serverTimestamp() // Esto garantiza el orden correcto
        });
        
        // Limpiar campos
        ownerInput.value = "";
        printInput.value = "";
      } catch (error) {
        console.error("Error al añadir a Firestore:", error);
      }
    });
  }

  // --- EVENTO PARA ELIMINAR DE FIRESTORE ---
  queueBoard?.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest(".queue-card__delete");
    if (deleteBtn) {
      const id = deleteBtn.getAttribute("data-id");
      try {
        await deleteDoc(doc(db, "colaImpresiones", id));
      } catch (error) {
        console.error("Error al eliminar documento:", error);
      }
    }
  });
}