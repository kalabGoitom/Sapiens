const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

/* ── HAMBURGER / MOBILE MENU ─────────────────────────── */
function initMobileMenu() {
  const ham = document.getElementById("hamburger");
  const mob = document.getElementById("mobileMenu");

  function closeMenu() {
    ham.classList.remove("open");
    mob.classList.remove("open");
    document.body.style.overflow = "";
  }

  ham.addEventListener("click", () => {
    const isOpen = mob.classList.toggle("open");
    ham.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

initMobileMenu();
