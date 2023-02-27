import { handleMobileMenu, closeMobileMenuOnResize } from "./navMenu.js";
import handleShortenURL from "./shorten.js";
import { displayDataFromLocalStorage } from "./localStorage.js";

AOS.init();

handleMobileMenu();

window.addEventListener("resize", closeMobileMenuOnResize);
window.addEventListener("load", displayDataFromLocalStorage);

handleShortenURL();
