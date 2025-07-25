const countryInput = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchQuery = countryInput.value.trim().toLowerCase();
  window.location.href = `country.html?search=${encodeURIComponent(
    searchQuery
  )}`;
});
