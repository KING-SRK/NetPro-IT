/* ========================= */
/* PAGE LOAD */
/* ========================= */

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header-placeholder", "/html/header.html");
  loadComponent("footer-placeholder", "/html/footer.html");

  initInputFocus();
});

/* ========================= */
/* LOAD COMPONENT FUNCTION */
/* ========================= */

function loadComponent(elementId, filePath) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load component: " + filePath);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;

      // ✅ header specific
      if (elementId === "header-placeholder") {
        initMenuToggle();
      }

      // ✅ IMPORTANT: run active nav after ANY component load
      setActiveNav();
    })
    .catch((error) => {
      console.error("Error loading component:", error);
    });
}

/* ========================= */
/* HAMBURGER MENU */
/* ========================= */

function initMenuToggle() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
      icon.classList.replace("ri-menu-line", "ri-close-line");
    } else {
      icon.classList.replace("ri-close-line", "ri-menu-line");
    }
  });
}

/* ========================= */
/* ACTIVE NAV LINK */
/* ========================= */

function setActiveNav() {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (currentPath === linkPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ========================= */
/* INPUT CLICK FOCUS */
/* ========================= */

function initInputFocus() {
  document.querySelectorAll(".input-group").forEach((group) => {
    group.addEventListener("click", () => {
      const input = group.querySelector("input");
      if (input) input.focus();
    });
  });
}
