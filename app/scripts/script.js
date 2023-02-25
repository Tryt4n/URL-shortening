import { handleMobileMenu, closeMobileMenuOnResize } from "./navMenu.js";
import handleShortenURL from "./shorten.js";

AOS.init();

handleMobileMenu();

window.addEventListener("resize", closeMobileMenuOnResize);

handleShortenURL();
