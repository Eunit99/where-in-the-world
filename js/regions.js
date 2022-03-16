const restCountriesURL ="https://restcountries.com/v2/regionalbloc/";
const region = document.getElementById("filterCountry").value;
const regionDataSource = `${restCountriesURL}${region}`;


function handleFetch(regionDataSource) {
	const fetchData = fetch(regionDataSource)
		.then((res) => {
			if (!res.ok) {
				throw new Error("Could not fetch");
			}
			return res.json();
		})
		.then((data) => {
			manipulateDataForRegion(data);
			// console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
}


const manipulateDataForRegion = (data) => {
	let ourData = data;
	for (let i = 0; i < ourData.length; i++) {
		var regionData = ourData[i];


		const { name, alpha3Code, population, region, capital, flags: { svg: flagSVG } } = regionData;
		let cardArea = document.querySelector(".cardArea");

		let regionCardInfo = `
		<!-- Country cards -->
							<div class="col-12 col-sm-12 col-md-6 col-lg-3">
							<a href="country.html?country=${alpha3Code}">
								<div class="card">
									<div class="card-img" id="cardImg">
										<img src="${flagSVG}" alt="${name} flag">
									</div>

									<div class="card-details" id="cardDetails">
										<p class="country-name mb-5 text-bold" id="countryName">${name} </p>

										<p>
											<span class="population text-bold">Population:</span>
											<span class="population-value" id="populationValue"> ${population}</span>
										</p>

										<p>
											<span class="region text-bold">Region:</span>
											<span class="region-value" id="regionValue">${region} </span>

										</p>
										<p>
											<span class="capital text-bold">Capital:</span>
											<span class="capital-value" id="capitalValue"> ${capital} </span>
										</p>
									</div>
								</div>
								</a>
							</div>

							<!-- Country cards -->

	`;
		cardArea.innerHTML += regionCardInfo;

	}
};









handleFetch(regionDataSource);