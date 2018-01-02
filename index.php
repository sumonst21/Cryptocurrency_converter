<!DOCTYPE html>
<html>
<body>

 <h1>Coinvert!</h1>
<div id="btc"></div>
<div id="container">

<input type="text" id="bi" onchange="CryptoConvert(this);" onkeyup="CryptoConvert(this);"/> 
<input type="text" name="ci" id="ci"onchange="FiatConvert(this);" onkeyup="FiatConvert(this);"/> <br>

<br>
<form action="#" method="post">
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
$selected_val = $_POST['Fiat'];  // Storing Selected Value In Variable
echo "You have selected :" .$selected_val;  // Displaying Selected Value
}
if($_POST['Fiat'] === 'EUR'){
$tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR'); 
$url = $tick;
$data = json_decode($tick, TRUE);
$cur = $data[0]["price_eur"]; //price_fiat
$curDisplay = round($cur, 2);
}
else if($_POST['Fiat'] === 'DKK'){
    $tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=DKK'); 
    $url = $tick;
    $data = json_decode($tick, TRUE);
    $cur = $data[0]["price_dkk"]; //price_fiat
    $curDisplay = round($cur, 2);
    }
    else if($_POST['Fiat'] === 'NOK'){
        $tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=NOK'); 
        $url = $tick;
        $data = json_decode($tick, TRUE);
        $cur = $data[0]["price_nok"]; //price_fiat
        $curDisplay = round($cur, 2);
        }
        else if($_POST['Fiat'] === 'SEK'){
            $tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=SEK'); 
            $url = $tick;
            $data = json_decode($tick, TRUE);
            $cur = $data[0]["price_sek"]; //price_fiat
            $curDisplay = round($cur, 2);
            }
else{
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