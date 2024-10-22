// Selecting DOM elements
const countryInput = document.querySelector("#countryInput");
const fetchButton = document.querySelector("#fetchCountryButton");
const countryOutput = document.querySelector("#countryOutput");

fetchButton.addEventListener("click", () => {
  const countryName = countryInput.value.trim().toUpperCase(); // Trim whitespace

  if (!countryName) {
    countryOutput.innerHTML = "Please enter a country name.";
  } else {
    fetchCountryInfo(countryName);
  }
});

async function fetchCountryInfo(name) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Handle potential multiple country matches
    if (data.length > 1) {
      countryOutput.innerHTML =
        "Multiple countries found. Please be more specific.";
    } else {
      const country = data[0];
      // Display relevant country information
      countryOutput.innerHTML = `
        <h2 class="country-name">${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Region: ${country.region}</p>
        <p>Population: ${country.population}</p>
        <div class = "flag-container">
         <img class = "flag-image" src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        </div>  
       `;
    }
  } catch (error) {
    countryOutput.innerHTML = `Error: ${error.message}`;
  }

}
