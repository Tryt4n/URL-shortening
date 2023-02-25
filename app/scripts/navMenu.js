const hamburgerBtn = document.querySelector("[data-hamburger-btn]");
const mobileMenu = document.querySelector("[data-navigation]");

export function handleMobileMenu() {
  if (window.innerWidth < 768) {
    mobileMenu.setAttribute("aria-expanded", false);
  } else {
    mobileMenu.removeAttribute("aria-expanded");
  }

  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("visible");
    openMobileMenu();
    closeMobileMenu();
  });
}

function openMobileMenu() {
  if (mobileMenu.classList.contains("visible")) {
    hamburgerBtn.innerHTML = "&#128473";
    mobileMenu.setAttribute("aria-expanded", true);
  }
}

function closeMobileMenu() {
  if (!mobileMenu.classList.contains("visible")) {
    hamburgerBtn.innerHTML = "&#9776;";
    mobileMenu.setAttribute("aria-expanded", false);
  }
}

export function closeMobileMenuOnResize() {
  mobileMenu.classList.remove("visible");
  hamburgerBtn.innerHTML = "&#9776;";
  if (window.innerWidth >= 768) {
    mobileMenu.removeAttribute("aria-expanded");
  } else {
    mobileMenu.setAttribute("aria-expanded", false);
  }
}
