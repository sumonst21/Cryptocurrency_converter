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
function CryptoConvert(input) {
    var price = cur;
    var output = input.value * price;
    var co = document.getElementById('ci');
    ci.value = output.toFixed(2);
}

function FiatConvert(input) {
    var price = cur;
    var output = input.value / price;
    var co = document.getElementById('bi');
    bi.value = output;
}

// client-side validation of numeric inputs, optionally replacing separator sign(s).
$("input.number").on("keydown", function (e) {
    // allow function keys and decimal separators
    if (
        // backspace, delete, tab, escape, enter, comma and .
        $.inArray(e.keyCode, [46, 8, 9, 27, 13, 108, 110, 188, 190]) !== -1 ||
        // Ctrl/cmd+A, Ctrl/cmd+C, Ctrl/cmd+X
        ($.inArray(e.keyCode, [65, 67, 88]) !== -1 && (e.ctrlKey === true || e.metaKey === true)) ||
        // home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // optional: replace commas with dots in real-time (for en-US locals)
        if (e.keyCode === 188 || e.keyCode === 108) {
            e.preventDefault();
            $(this).val($(this).val() + ".");
        }
/*
     optional: replace dots with commas in real-time (for EU locals)
        if (e.keyCode === 190) {
            e.preventDefault();
            $(this).val($(this).val() + ",");
        }
        */
        return;
    }
    // block any non-number
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});