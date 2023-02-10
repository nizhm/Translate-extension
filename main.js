const articleEl = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (articleEl) {
  const text = articleEl.textContent;
  const wordReg = /[^\s]+/g;
  const words = text.matchAll(wordReg);
  // matchAll returns an iterator, convert to array to get word count
  const wordNum = [...words].length;
  const readingTime = Math.round(wordNum / 200);
  const timeInfoEl = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  timeInfoEl.classList.add("color-secondary-text", "type--caption");
  timeInfoEl.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = articleEl.querySelector("h1");
  // Support for article docs with date
  const date = articleEl.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", timeInfoEl);
  alert(`⏱️ ${readingTime} min read`)
}
