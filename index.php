<!DOCTYPE html>
<html>
<body>
<h1>Coinvert!</h1>
<div id="btc"></div>
<div id="container">

<input type="text" id="bi" onchange="CryptoConvert(this);" onkeyup="CryptoConvert(this);"/> 
<input type="text" name="ci" id="ci"onchange="FiatConvert(this);" onkeyup="FiatConvert(this);"/> 
<form action="#" method="post">
<select name="Crypto">
<option value="Bitcoin">Bitcoin</option>
<option value="Ethereum">Ethereum</option>
<option value="Dash">Dash</option>
<option value="Iota">Iota</option>
<option value="Ripple">Ripple</option>
</select>
<select name="Fiat">
<option value="USD">USD</option>
<option value="EUR">EUR</option>
<option value="SEK">SEK</option>
<option value="NOK">NOK</option>
<option value="DKK">DKK</option>
</select>
<input type="submit" name="submit" value="Get Selected Values" />
</form>

<?php
if(isset($_POST['submit'])){
$selected_crypto = $_POST['Crypto'];  // Storing Selected Crypto Value In Variable
echo " " .$selected_crypto;  // Displaying Selected Crypto Value
$selected_fiat = $_POST['Fiat'];  // Storing Selected Fiat Value In Variable
echo " " .$selected_fiat;  // Displaying Selected Fiat Value
}
if($_POST['Fiat'] && $_POST['Crypto'] != null){
$tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/' . $_POST['Crypto'] .'/?convert=' . $_POST['Fiat']); 
$url = $tick;
$data = json_decode($tick, TRUE);
$cur = $data[0]["price_" . strtolower($_POST['Fiat'])]; //price_fiat
$curDisplay = round($cur, 2);
}
else{ //default is bitcoin to usd
    $tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin/'); 
    $url = $tick;
    $data = json_decode($tick, TRUE);
    $cur = $data[0]["price_usd"]; //price_fiat
    $curDisplay = round($cur, 2);
}
?>
    <script>
    function CryptoConvert(input){
        var price = "<?php echo $curDisplay; ?>"; 
        var output = input.value * price;
        var co = document.getElementById('ci');
        ci.value = output;
    }
    function FiatConvert(input){
        var price = "<?php echo $curDisplay; ?>"; 
        var output = input.value / price;
        var co = document.getElementById('bi');
        bi.value = output;
    }
    </script>
</div>

</body>
</html>