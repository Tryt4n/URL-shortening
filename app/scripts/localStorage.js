export default function saveShortenedLinksToLocalStorage() {
  const shortenedLinks = document.querySelectorAll("[data-shortened-link-item]");
  const shortenedLinksData = [];

  shortenedLinks.forEach((link) => {
    const beforeURL = link.querySelector("[data-URL-before]").textContent;
    const afterURL = link.querySelector("[data-URL-after]").textContent;
    shortenedLinksData.push({ beforeURL, afterURL });
  });

  localStorage.setItem("shortenedLinksData", JSON.stringify(shortenedLinksData));
}

const shortenedLinksWrapper = document.querySelector("[data-shortened-links-wrapper]");
const shortenedLinksData = JSON.parse(localStorage.getItem("shortenedLinksData"));
const template = document.querySelector("[data-URL-template]");

export function displayDataFromLocalStorage() {
  if (shortenedLinksData) {
    shortenedLinksData.forEach((data) => {
      const templateContent = template.content.cloneNode(true);
      const beforeURL = templateContent.querySelector("[data-URL-before]");
      const afterURL = templateContent.querySelector("[data-URL-after]");

      beforeURL.textContent = data.beforeURL;
      afterURL.textContent = data.afterURL;
      shortenedLinksWrapper.appendChild(templateContent);
    });
  }
}
