
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

const queueBoard = document.getElementById("queueBoard");
const addQueueCardButton = document.getElementById("addQueueCard");
const colorInput = document.getElementById("cardColor");
const ownerInput = document.getElementById("ownerName");
const printInput = document.getElementById("printName");

function removeEmptyState() {
  const emptyState = queueBoard.querySelector(".queue-empty");
  if (emptyState) {
    emptyState.remove();
  }
}

function ensureEmptyState() {
  const queueCards = queueBoard.querySelectorAll(".queue-card:not(.is-sample)");
  const emptyState = queueBoard.querySelector(".queue-empty");

  if (queueCards.length === 0 && !emptyState) {
    const message = document.createElement("p");
    message.className = "queue-empty";
    message.textContent = "Sin impresiones agregadas a la cola.";
    queueBoard.appendChild(message);
  }
}

function createQueueCard() {
  const ownerName = ownerInput.value.trim() || "Sin propietario";
  const printName = printInput.value.trim() || "Impresion sin nombre";
  const cardColor = colorInput.value;

  const card = document.createElement("article");
  card.className = "queue-card";
  card.style.setProperty("--card-accent", cardColor);

  const deleteButton = document.createElement("button");
  deleteButton.className = "queue-card__delete";
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Eliminar recuadro de ${ownerName}`);
  deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  const badge = document.createElement("div");
  badge.className = "queue-card__badge";
  badge.textContent = "En cola";

  const owner = document.createElement("h3");
  owner.textContent = ownerName;

  const print = document.createElement("p");
  print.textContent = printName;

  card.append(deleteButton, badge, owner, print);
  return card;
}

if (queueBoard && addQueueCardButton && colorInput && ownerInput && printInput) {
  ensureEmptyState();

  addQueueCardButton.addEventListener("click", async () => {
    removeEmptyState();
    const card = createQueueCard();
    queueBoard.prepend(card);
    ownerInput.value = "";
    printInput.value = "";
    ownerInput.focus();
  });

  queueBoard.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".queue-card__delete");
    if (!deleteButton) {
      return;
    }

    const card = deleteButton.closest(".queue-card");
    if (!card) {
      return;
    }

    card.remove();
    ensureEmptyState();
  });


}





