const param = new URLSearchParams(window.location.search);
const searchQuery = param.get("search");
const countryContainer = document.querySelector(".country-container");
const pageTitle = document.querySelector("title");

pageTitle.textContent = searchQuery.toUpperCase();

console.log(searchQuery);

async function fetchCountryData() {
  try {
    const response = await fetch("data/countries.json");
    if (!response.ok) {
      throw new Error("Response Error!!");
    }
    const data = await response.json();
    renderCountryData(data);
  } catch (error) {
    console.error(`Fetch Error: ${error}`);
  }
}
fetchCountryData();

function renderCountryData(data) {
  if (!data[searchQuery]) {
    const notFound = document.createElement("p");
    notFound.classList.add("not-found");
    notFound.textContent = "Couldn't find the country you searched for!";
    countryContainer.append(notFound);
    return;
  }

  const coverImg = document.createElement("img");
  coverImg.src = data[searchQuery].cover_img;
  coverImg.classList.add("cover_img");

  const countryHeading = document.createElement("h1");
  countryHeading.classList.add("country-heading");
  countryHeading.textContent = `${data[searchQuery].name} ${data[searchQuery].flag}`;

  const countryGreeting = document.createElement("h2");
  countryGreeting.classList.add("country-greeting");
  countryGreeting.textContent = `Greeting: ${data[searchQuery].greeting}`;

  const counrtyAbout = document.createElement("p");
  counrtyAbout.classList.add("country-about");
  counrtyAbout.textContent = `${data[searchQuery].about}`;

  //---------------------------

  const foods = document.createElement("ul");
  foods.classList.add("food-list");
  const foodsHeading = document.createElement("h2");
  const foodsDiscp = document.createElement("p");
  foodsHeading.textContent = "Foods";
  foodsDiscp.textContent = `Here are some of the popular food items in ${data[searchQuery].name}:`;
  foods.append(foodsHeading);
  foods.append(foodsDiscp);

  for (let food of data[searchQuery].food) {
    const foodItem = document.createElement("li");
    foodItem.textContent = food;
    foods.append(foodItem);
  }

  // --------------------------

  const festivals = document.createElement("ul");
  festivals.classList.add("festival-list");
  const festivalsHeading = document.createElement("h2");
  const festivalsDiscp = document.createElement("p");
  festivalsHeading.textContent = "Festivals";
  festivalsDiscp.textContent = `Here are some of the popular festivals in ${data[searchQuery].name}:`;
  festivals.append(festivalsHeading);
  festivals.append(festivalsDiscp);

  for (let festival of data[searchQuery].festivals) {
    const festivalItem = document.createElement("li");
    festivalItem.textContent = festival;
    festivals.append(festivalItem);
  }

  //-----------------------------

  const funfact = document.createElement("div");
  const funfactHeading = document.createElement("h2");
  const funfactItem = document.createElement("p");
  funfactHeading.textContent = "Fun Fact";
  funfactItem.textContent = `${data[searchQuery].funFact}`;
  funfact.append(funfactHeading);
  funfact.append(funfactItem);

  countryContainer.append(coverImg);
  countryContainer.append(countryHeading);
  countryContainer.append(countryGreeting);
  countryContainer.append(counrtyAbout);
  countryContainer.append(foods);
  countryContainer.append(festivals);
  countryContainer.append(funfact);
}
