export default async function getShortenURL(URL) {
  const shortenLink = `https://api.shrtco.de/v2/shorten?url=${URL}`;
  const response = await fetch(shortenLink, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const shortenURL = await response.json();

  return shortenURL.result.short_link;
}
