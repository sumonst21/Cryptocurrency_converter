var cur;
var ourData;
var ourRequest = new XMLHttpRequest();
var dpdCrypto = document.getElementById('Crypto'); //dropdown
var dpdFiat = document.getElementById('Fiat'); //dropdown
// retrives data from the API. The dropdowns determines which data.
function changeCurrency() {
    var fiat = dpdFiat.options[dpdFiat.selectedIndex].value;
    var crypto = dpdCrypto.options[dpdCrypto.selectedIndex].value;
    if (fiat && crypto != null) {
        ourRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/?convert=' + fiat + '&limit=100');
        ourRequest.onload = function () {
            ourData = JSON.parse(ourRequest.responseText);
            for (var i = 0; i < ourData.length; i++) {
                if (ourData[i].name.toLowerCase() === crypto.toLowerCase()) {
                    cur = ourData[i]["price_" + fiat.toLowerCase()];
                    CryptoConvert(document.getElementById('bi'));
                } else {
                    // Reached the server, but it returned an error
                }
            }
        }
    } else {
        ourRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/bitcoin/');
        ourRequest.onload = function () {
            ourData = JSON.parse(ourRequest.responseText);
            cur = ourData[0]["price_dkk"];
            CryptoConvert(document.getElementById('bi'));
        }
    }
    ourRequest.send();
}
changeCurrency(); //runs on start to retrieve data for the currencies 
//multiplies the input with the chosen currency from the dropdown
function CryptoConvert(input) {
    var price = cur;
    var output = input.value * price;
    var co = document.getElementById('ci');
    ci.value = output.toFixed(2);
}
//divides the input with the chosen currency from the dropdown
function FiatConvert(input) {
    var price = cur;
    var output = input.value / price;
    var co = document.getElementById('bi');
    bi.value = output;
}
// populate crypto dropdown with API data.
var dropdown = document.getElementById('Crypto');
dropdown.length = 0;
var defaultOption = document.createElement('option');
defaultOption.text = 'Bitcoin';
dropdown.selectedIndex = 0;
var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=100';
var request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function () {
    var data = JSON.parse(request.responseText);
    var option;
    for (var i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].name;
        dropdown.add(option);
    }
}
request.onerror = function () {
    console.error('An error occurred fetching the JSON from ' + url);
};
request.send();
