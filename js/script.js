document.addEventListener('DOMContentLoaded', function() {
    const studentInfo = document.getElementById('student-info');
    studentInfo.textContent = 'Student ID: [200543216], Name: [Parthiv]';
    let countries = [];

    // Fetch all countries for the dropdown
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countries = data.map(country => country.name.common);
        });

    const input = document.getElementById('country-input');
    const suggestionsDropdown = document.getElementById('suggestions-dropdown');

    input.addEventListener('input', function() {
        const inputText = input.value.toLowerCase();
        suggestionsDropdown.innerHTML = '';
        if (inputText) {
            const filteredCountries = countries.filter(country => country.toLowerCase().startsWith(inputText));
            filteredCountries.forEach(country => {
                const div = document.createElement('div');
                div.textContent = country;
                div.addEventListener('click', function() {
                    input.value = country;
                    suggestionsDropdown.innerHTML = '';
                    fetchCountryInfo(country);
                });
                suggestionsDropdown.appendChild(div);
            });
            suggestionsDropdown.style.display = 'block';
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    });

    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        const countryName = input.value.trim();
        fetchCountryInfo(countryName);
    });

    function fetchCountryInfo(countryName) {
        if (countryName) {
            fetch(`https://restcountries.com/v3.1/name/${countryName}`)
                .then(response => response.json())
                .then(data => {
                    const countryInfo = document.getElementById('country-info');
                    countryInfo.innerHTML = ''; 
                    if (data[0]) {
                        countryInfo.innerHTML = `<p><strong>Name:</strong> ${data[0].name.common}</p>
                                                 <p><strong>Population:</strong> ${data[0].population}</p>
                                                 <p><strong>Region:</strong> ${data[0].region}</p>
                                                 <p><strong>Capital:</strong> ${data[0].capital}</p>`;
                    } else {
                        countryInfo.textContent = 'Country not found.';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    const countryInfo = document.getElementById('country-info');
                    countryInfo.textContent = 'An error occurred. Please try again.';
                });
        }
    }
});
