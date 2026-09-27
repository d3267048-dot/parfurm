const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const searchToggle = document.querySelector("[data-search-toggle]");
const searchPanel = document.querySelector(".search-panel");
const searchClose = document.querySelector("[data-search-close]");
const searchInput = document.querySelector("[data-search-input]");

menuToggle?.addEventListener("click", () => mainNav?.classList.toggle("open"));
searchToggle?.addEventListener("click", () => {
  searchPanel?.classList.toggle("open");
  searchInput?.focus();
});
searchClose?.addEventListener("click", () =>
  searchPanel?.classList.remove("open"),
);

document
  .querySelectorAll(".catalog-grid .product-card")
  .forEach((card, index) => {
    if (index >= 12) card.remove();
  });
const productCards = [...document.querySelectorAll(".product-card")];
const noResults = document.querySelector(".no-results");
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    let visible = 0;
    productCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });
    if (noResults) noResults.style.display = visible ? "none" : "block";
  });
});

searchInput?.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  if (!productCards.length) return;
  let visible = 0;
  productCards.forEach((card) => {
    const match =
      !query ||
      card.dataset.name.toLowerCase().includes(query) ||
      card.textContent.toLowerCase().includes(query);
    card.style.display = match ? "" : "none";
    if (match) visible += 1;
  });
  if (noResults) noResults.style.display = visible ? "none" : "block";
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = "Готово ✓";
      setTimeout(() => {
        button.innerHTML = originalText;
        form.reset();
      }, 1800);
    }
  });
});
