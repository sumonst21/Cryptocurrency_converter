var cur;
var ourData;
var ourRequest = new XMLHttpRequest();
var dpdCrypto = document.getElementById('Crypto');
var dpdFiat = document.getElementById('Fiat');
function changeCurrency() {
    var fiat = dpdFiat.options[dpdFiat.selectedIndex].value;
    var crypto = dpdCrypto.options[dpdCrypto.selectedIndex].value;
    if (fiat && crypto != null) {
        ourRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/' + crypto + '/?convert=' + fiat);
        ourRequest.onload = function () {
            ourData = JSON.parse(ourRequest.responseText);
            cur = ourData[0]["price_" + fiat.toLowerCase()];
            CryptoConvert(document.getElementById('bi'));
            FiatConvert(document.getElementById('ci'));
        }
    } else {
        ourRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/bitcoin/');
        ourRequest.onload = function () {
            ourData = JSON.parse(ourRequest.responseText);
            cur = ourData[0]["price_dkk"];
            CryptoConvert(document.getElementById('bi'));
            FiatConvert(document.getElementById('ci'));
        }
    }
    ourRequest.send();
}
function CryptoConvert(input) {
    var price = cur;
    var output = input.value * price;
    var co = document.getElementById('ci');
    ci.value = output;
}

function FiatConvert(input) {
    var price = cur;
    var output = input.value / price;
    var co = document.getElementById('bi');
    bi.value = output;
}