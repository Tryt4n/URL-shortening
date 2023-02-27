import getShortenURL from "./api.js";
import saveShortenedLinksToLocalStorage from "./localStorage.js";

const shortenBtn = document.querySelector("[data-shorten-btn]");
const template = document.querySelector("[data-URL-template]");
const warningInfo = document.querySelector("[data-warning-information]");

const warningsInformation = {
  invalid: "Please add a valid URL",
  empty: "Input can't be empty",
  alreadyExist: "URL link already shorten",
};

export default function handleShortenURL() {
  shortenBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const linkInput = document.querySelector("[data-link-input]");
    let inputValue = linkInput.value;
    const pattern = new RegExp(linkInput.pattern);
    const templateContent = template.content.cloneNode(true);
    const beforeURL = templateContent.querySelector("[data-URL-before]");
    const afterURL = templateContent.querySelector("[data-URL-after]");
    const shortenedLinksWrapper = document.querySelector("[data-shortened-links-wrapper]");

    // Displaying warning info if URL is invalid
    if (inputValue === "") {
      linkInput.classList.add("invalid");
      warningInfo.setAttribute("aria-hidden", false);
      warningInfo.textContent = warningsInformation.empty;
      return;
    } else if (!pattern.test(inputValue)) {
      linkInput.classList.add("invalid");
      warningInfo.setAttribute("aria-hidden", false);
      warningInfo.textContent = warningsInformation.invalid;
      return;
    } else {
      linkInput.classList.remove("invalid");
      warningInfo.setAttribute("aria-hidden", true);
    }

    const existingLinks = document.querySelectorAll("[data-URL-before]");
    for (let i = 0; i < existingLinks.length; i++) {
      if (existingLinks[i].textContent === inputValue) {
        linkInput.classList.add("invalid");
        warningInfo.setAttribute("aria-hidden", false);
        warningInfo.textContent = warningsInformation.alreadyExist;
        return;
      }
    }

    // Appending new shorten link object
    beforeURL.textContent = inputValue;
    afterURL.textContent = await getShortenURL(inputValue);
    shortenedLinksWrapper.insertBefore(templateContent, shortenedLinksWrapper.firstElementChild);
    linkInput.value = "";
    handleCopyingURL();
    saveShortenedLinksToLocalStorage();
  });
}

function handleCopyingURL() {
  const copyBtns = document.querySelectorAll("[data-shorten-copy-btn]");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      copyBtns.forEach((btn) => {
        btn.classList.remove("btn--accent");
        btn.textContent = "Copy";
      });
      const shortenURL = btn.previousElementSibling.querySelector("[data-URL-after]");
      btn.classList.add("btn--accent");
      btn.textContent = "Copied!";
      // Handle copying URL
      const range = document.createRange();
      range.selectNodeContents(shortenURL);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    });
  });
}
