const apiKey = 'ml9qq3qhozjc5zbpbgdq0ii6';
var searchURL = `https://openapi.etsy.com/v2/listings/active?api_key=ml9qq3qhozjc5zbpbgdq0ii6`;
var shopSearchURL = `https://openapi.etsy.com/v2/shops/RednArt/listings/active?api_key=ml9qq3qhozjc5zbpbgdq0ii6`



function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    console.log(queryItems.join('&'));
    return queryItems.join('&');
}

function getListings(state, limit=10) {
    const params = {
        api_key: apiKey,
        stateCode: state,
        limit,
    }
    let queryString = formatQueryParams(params);
    searchURL += queryString;
    fetch(searchURL) 
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(responseJson => 
            displayResults(responseJson)
        );
}

function onSubmit() {
    $('#submit').on('click', event => {
        event.preventDefault();
        let state = $('.state-name').val();
        let limit = $('.number').val();
        getNationalParks(state, limit);
    })
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#target').empty();
    let i = 0;
    for (let i = 0; i < responseJson.data.length; i++) {
    $('#target').append(`
    <li>
        <p>${responseJson.data[i].fullName}</p>
        <p>${responseJson.data[i].addresses[0].line1}</p>
        <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}, ${responseJson.data[i].addresses[0].postalCode}</p>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
    </li>
    `)};    
    $('#results').removeClass('hidden');
};

function handler() {
    onSubmit();
}

handler();