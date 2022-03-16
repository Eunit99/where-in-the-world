const toggleDarkMode = () => {
	let themeSwitcherText = document.querySelector("#themeSwitcherText").innerHTML;
	const themeSwitcher = document.querySelector("#themeSwitcher");
	const theme = window.localStorage.getItem("theme");


	// Check if the theme stored in localStorage is dark, if yes, apply the dark theme to the body

	if (theme === "dark") {
		document.body.classList.add("dark");
	}

	// toggling between dark and light themes
	themeSwitcher.addEventListener("click", () => {
		document.body.classList.toggle("dark");

		const localStorageTheme = window.localStorage.getItem("theme");

		if (localStorageTheme === "dark") {
			themeSwitcherText = "Dark mode";
		} else {
			themeSwitcherText = "Light mode";
		}


		if (theme === "dark") {
			window.localStorage.setItem("theme", "light");

		} else {
			window.localStorage.setItem("theme", "dark");
		}

	});


};

toggleDarkMode();



/**
 *
 * Fetching data
 *
 */

const pageURL = window.location.origin;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const currentCountry = urlParams.get('country');


// Dynamically assign the fetchURL depending on the page
let fetchURL;

if (urlParams.has('country')) {
	fetchURL = `https://restcountries.com/v2/alpha/${currentCountry}`;
} else {

	// Default to Nigeria
	fetchURL = `https://restcountries.com/v2/alpha/nga`;
}

function handleFetch(fetchURL) {
	const fetchData = fetch(fetchURL)
		.then((res) => {
			if (!res.ok) {
				throw Error("Could not connect to the server");
			}
			return res.json();
		})
		.then((data) => {
			destructureSingleCountryData(data);
			return data;
		})
		.catch((err) => {
			handleErr(err);
			console.error(err);
		});
}
handleFetch(fetchURL);

function destructureSingleCountryData(data) {
	const { name: countryName, nativeName, alpha3Code, population, capital, topLevelDomain, currencies: { code, name: currencyName, symbol }, languages: { nativeName: languageNativeName }, region, subregion, flags: { svg: flagSVG }, borders } = data;

	showSingleCountry(countryName, flagSVG, nativeName, alpha3Code, population, capital, topLevelDomain, currencyName, region, subregion, languageNativeName, borders);

	borderCountries(borders, countryName);
}


function showSingleCountry(countryName, flagSVG, nativeName, alpha3Code, population, capital, topLevelDomain, currencyName, region, subregion, languageNativeName, borders) {
	let card = `
		<!-- Country flag  -->
					<div class="col-12 col-sm-12 col-md-6 col-lg-6">
						<img src="${flagSVG}" class="country-flag" alt="${countryName} flag">
					</div>
					<!-- /Country flag  -->

					<!-- Country info  -->
					<div class="country-info">
						<div class="col-12 col-sm-12 col-md-6 col-lg-6">
							<p class="country-name" id="countryName">${countryName}</p>

							<div class="row">
								<div class="col col-sm-12 col-md-12 col-lg-6">

									<div class="country-individual-info">
										<p>
											<b class="b"> Native name: </b> ${nativeName}
										</p>
										<p>
											<b class="b">
												Top Level Domain:
											</b>
											 ${topLevelDomain}
										</p>
									</div>

									<div class="country-individual-info">
										<p>
											<b class="b"> Population: </b> ${population}
										</p>
										<p>
											<b class="b">Currencies:</b> ${currencyName}
										</p>
									</div>

									<div class="country-individual-info">
										<p>
											<b class="b"> Region: </b> ${region}
										</p>
										<p>
											<b class="b">
												Language:
											</b> ${languageNativeName}
										</p>
									</div>

									<div class="country-individual-info">
										<p>
											<b class="b"> Sub Region: </b> ${subregion}
										</p>
										<p>
										</p>
									</div>

									<div class="country-individual-info">
										<p>
											<b class="b">Capital: </b> ${capital}
										</p>
										<p>
										</p>
									</div>

								</div>
							</div>
						</div>
					</div>
					<!-- Country info  -->
	`;

	let singleCountryCard = document.querySelector("#singleCountryCard");

	singleCountryCard.innerHTML = card;
}


const borderCountries = (borders, countryName) => {

	for (let i = 0; i < borders.length; i++) {

		const borderCountriesContainer = document.querySelector(".border-countries-container");
		let borderCountry = `
				<a href="country.html?country=${borders[i]}" class="text-decoration-none">
						<div class="border-countries" id="borderCountries">
							${borders[i]}
						</div>
					</a>
		`;

		borderCountriesContainer.innerHTML += borderCountry;
	}

};



const handleErr = (err) => {
	let resultContainer = document.querySelector(".result");
	let errorMsg = `
<div class="alert-danger p-5 m-5 w-75">
An error occurred while trying to get the result. The error is: <b>${err}</b>
</div>
		`;

	resultContainer.innerHTML = errorMsg;
};