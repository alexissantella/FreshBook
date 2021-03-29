'use strict';


// put your own value below!
const apiKey = 'AIzaSyBuBneeg7b4x4pcGnE8isWx4CfylyJCVbw'; 
const searchURL = 'https://www.googleapis.com/books?';
const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

function displayResults(responseJson) {
  var responseJson = JSON.parse(responseJson).data;
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].selfLink}">${responseJson[i].title}</a></h3>
      <p>${responseJson[i].description}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function displayDrinkResults(drinkResponseJson) {
    var drinkResponseJson = JSON.parse(drinkResponseJson).data;
    $('#drink-result').empty();
    // iterate through the items array
    for (let i = 0; i < drinkResponseJson.length; i++){
      $('#drink-result').append(
        `<li><h3><a href="${drinkResponseJson[i].drinks.strDrink}">${drinkResponseJson[i].strDrinkThumb}</a></h3>
        <p>${drinkResponseJson[i].description}</p>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getBooks(query) {
  const params = {
    q: query,
    maxResults: '5',
    //key: apiKey,

  };

  const queryString = formatQueryParams(params)
  const url = searchURL + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getDrink() {
    if ($('#input-drink').val('Yes')){
        const url = drinkURL;
        console.log(url);
  
        fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(drinkResponseJson => displayResults(JSON.stringify(drinkResponseJson)))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
    }  
    else { 
        $('#drink').css('display') == 'none'   
    }
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const bookTitle = $('#input-bookTitle').val();
    const inputDrink = $('#input-drink').val();
    getBooks(bookTitle);
    getDrink(inputDrink)
  });
}

$(watchForm);
