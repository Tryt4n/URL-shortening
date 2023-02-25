const shortenBtn = document.querySelector("[data-shorten-btn]");
const template = document.querySelector("[data-URL-template]");
const warningInfo = document.querySelector("[data-warning-information]");

export default function handleShortenURL() {
  shortenBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const linkInput = document.querySelector("[data-link-input]");
    const inputValue = linkInput.value;
    const pattern = new RegExp(linkInput.pattern);

    // Displaying warning info if URL is invalid
    if (!pattern.test(linkInput.value)) {
      linkInput.classList.add("invalid");
      warningInfo.setAttribute("aria-hidden", false);
      return;
    } else {
      linkInput.classList.remove("invalid");
      warningInfo.setAttribute("aria-hidden", true);
    }

    // Appending new shorten link object
    const templateContent = template.content.cloneNode(true);
    const beforeURL = templateContent.querySelector("[data-URL-before]");
    const afterURL = templateContent.querySelector("[data-URL-after]");
    beforeURL.textContent = inputValue;
    afterURL.textContent = "https://after.com";

    const shortenedLinksWrapper = document.querySelector("[data-shortened-links-wrapper]");
    shortenedLinksWrapper.insertBefore(templateContent, shortenedLinksWrapper.firstElementChild);
    linkInput.value = "";
    handleCopyingURL();
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
      // const shortenURL = btn.previousElementSibling.querySelector("[data-URL-after]");
      const shortenURL = btn.previousElementSibling.querySelector("[data-URL-before]");
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
