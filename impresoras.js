function initMakerSpace() {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".menu-toggle");

  if (!nav || !toggle) {
    return;
  }

  const responsiveMenu = () => {
    const isActive = nav.classList.toggle("active");
    toggle.setAttribute("aria-expanded", String(isActive));
  };

  toggle.addEventListener("click", responsiveMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && nav.classList.contains("active")) {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelectorAll("#nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

initMakerSpace();
