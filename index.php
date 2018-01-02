<!DOCTYPE html>
<?php 
$tick = file_get_contents('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=DKK');
$url = $tick;
$data = json_decode($tick, TRUE);
$cur = $data[0]["price_dkk"];
echo $cur;
$curDisplay = round($cur, 2);
?>
<html>
<body>
    <script>
    function btcConvert(input){
        var price = "<?php echo $curDisplay; ?>"; 
        var output = input.value * price;
        var co = document.getElementById('ci');
        ci.value = output;
    }

    function curConvert(input){
        var price = "<?php echo $curDisplay; ?>"; 
        var output = input.value / price;
        var co = document.getElementById('bi');
        bi.value = output;
    }

    </script>
     <h1>Coinvert!</h1>
<div id="btc"></div>
<div id="container">

<input type="text" id="bi" onchange="btcConvert(this);" onkeyup="btcConvert(this);"/> BTC <=>
<input type="text" name="ci" id="ci"onchange="curConvert(this);" onkeyup="curConvert(this);"/> DKK<br>



</div>

</body>
</html>