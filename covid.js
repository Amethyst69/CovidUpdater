/*::::::::::::::::::: load constants ::::::::::::::::::::::::*/
const countryField = document.getElementById("country-field");
const searchButton = document.getElementById("search-btn");
const errorOutput = document.getElementById("error-output");
const dataFields = document.getElementsByClassName("value-info");
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/


function fetch_data(country) {
	errorOutput.innerHTML = null;
	
	if (country.length == 0) {
		errorOutput.innerHTML = "Please, specify the country";
	}
	
	country = escape(country.trim().toLowerCase());
	let url = "https://disease.sh/v3/covid-19/";
	if (country == "world" || country == "all") {
		url += "all";
	} else {
		url += `countries/${country}`;
	}

	fetch(url)
		.then(response => response.text())
		.then((data) => {
			var res = JSON.parse(data);
			if (res.message) {
				errorOutput.innerHTML = "Sorry, we couldn't find this country.";
			} else {
				let fields = [
					res.country ?? "World",
					res.cases,
					res.todayCases,
					res.casesPerOneMillion,
					res.recovered,
					res.deaths,
					res.todayDeaths,
					res.active,
					res.critical
				]
				
				let flag = res.countryInfo?.flag;

				let i = 0;
				for (let v of dataFields) {
					if (i == 0 && flag) {
						let ftag = ` <img src="${flag}" width=25>`;
						v.innerHTML = fields[i] + ftag;
						i++;
					} else {
						v.innerHTML = fields[i];
						i++;
					}
				}
			}
		});
}

function main() {
	fetch_data("world");
	
	searchButton.addEventListener('click', function() {
		let country = countryField.value;
		fetch_data(country);
	});
	
	countryField.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			searchButton.click();
		}
	});
}
