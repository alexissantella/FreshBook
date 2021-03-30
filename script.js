'use strict';

// put your own value below!
const searchURL = 'https://www.googleapis.com/books/v1/volumes?';
const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function displayResults(responseJson) {
  var responseJson = JSON.parse(responseJson).items;
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].volumeInfo.infoLink}">${responseJson[i].volumeInfo.title}</a></h3>
      <img src="${responseJson[i].volumeInfo.imageLinks.smallThumbnail}">
      <p>${responseJson[i].volumeInfo.description ? responseJson[i].volumeInfo.description : ''}</p>
      </li>`
    );}
  //display the results section  
  $('#results').removeClass('hidden');
}


function displayDrinkResults(drinkResponseJson) {
  if ($('#input-drink').val('Yes')){
    var drinkResponseArray = JSON.parse(drinkResponseJson).drinks;
        $('#drink-result').empty();
        // iterate through the items array
        for (let i = 0; i < drinkResponseArray.length; i++){
          $('#drink-result').append(
            `<h3>${drinkResponseArray[i].strDrink}</h3>
            <img src="${drinkResponseArray[i].strDrinkThumb}">
            <div class="ingredientList">
            <p>${drinkResponseArray[i].strMeasure1 ? drinkResponseArray[i].strMeasure1 : ''} ${drinkResponseArray[i].strIngredient1 ? drinkResponseArray[i].strIngredient1 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure2 ? drinkResponseArray[i].strMeasure2 : ''} ${drinkResponseArray[i].strIngredient2 ? drinkResponseArray[i].strIngredient2 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure3 ? drinkResponseArray[i].strMeasure3 : ''} ${drinkResponseArray[i].strIngredient3 ? drinkResponseArray[i].strIngredient3 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure4 ? drinkResponseArray[i].strMeasure4 : ''} ${drinkResponseArray[i].strIngredient4 ? drinkResponseArray[i].strIngredient4 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure5 ? drinkResponseArray[i].strMeasure5 : ''} ${drinkResponseArray[i].strIngredient5 ? drinkResponseArray[i].strIngredient5 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure6 ? drinkResponseArray[i].strMeasure6 : ''} ${drinkResponseArray[i].strIngredient6 ? drinkResponseArray[i].strIngredient6 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure7 ? drinkResponseArray[i].strMeasure7 : ''} ${drinkResponseArray[i].strIngredient7 ? drinkResponseArray[i].strIngredient7 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure8 ? drinkResponseArray[i].strMeasure8 : ''} ${drinkResponseArray[i].strIngredient8 ? drinkResponseArray[i].strIngredient8 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure9 ? drinkResponseArray[i].strMeasure9 : ''} ${drinkResponseArray[i].strIngredient9 ? drinkResponseArray[i].strIngredient9 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure10 ? drinkResponseArray[i].strMeasure10 : ''} ${drinkResponseArray[i].strIngredient10 ? drinkResponseArray[i].strIngredient10 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure11 ? drinkResponseArray[i].strMeasure11 : ''} ${drinkResponseArray[i].strIngredient11 ? drinkResponseArray[i].strIngredient11 : ''}</p>
            <p>${drinkResponseArray[i].strMeasure12 ? drinkResponseArray[i].strMeasure12 : ''} ${drinkResponseArray[i].strIngredient12 ? drinkResponseArray[i].strIngredient12 : ''}</p>
            </div>
            <p>${drinkResponseArray[i].strInstructions}</p>`
          );}
        //display the results section  
        $('#results').removeClass('hidden');
    }
  else {
    console.log('no drink');
  }
  }

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getBooks(query) {
  const params = {
    q: query + '+subject' , // this is the extra key for google api
    maxResults: '5',
    //key: apiKey,
  };

  const queryString = formatQueryParams(params);
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
        const url = drinkURL;
        console.log(url);
  
        fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(drinkResponseJson => displayDrinkResults(JSON.stringify(drinkResponseJson)))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });   
  }

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const bookTitle = $('#input-bookTitle').val();
    const inputDrink = $('#input-drink').val();
    getBooks(bookTitle);
    getDrink(inputDrink);
  });
}

$(watchForm);