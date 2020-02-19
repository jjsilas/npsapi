    
'use strict';

// APIkey
const apiKey = 'vLXnnFm5eegsmvjJpVaTsEpnPV5YQE4cdZeCBv7N'; 
//End Point URL
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    
    $('#results').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <h4>Directions</h4> <p>${responseJson.data[i].directionsInfo}</p>
      
      <h5>Website<span>
      <a href='${responseJson.data[i].url}'>
      ${responseJson.data[i].url}
      </span></h5>
      </li>`
    );
  }
}

function getListOfNps(q, maxResults=10) {
  const params = {
    q: q,
    api_key: apiKey,
    limit: maxResults   
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getListOfNps(searchTerm, maxResults);
  });
}

$(watchForm);

