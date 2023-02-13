<?php
$vezuNaBazu= new mysqli("localhost","root","","uvodphp");
$sql="select id, naziv, email, zanimanje, 
            drzava, datum_izmjene datum
             from korisnik";

$sqlExec = $vezuNaBazu->prepare($sql);
$sqlExec -> execute();
$rezultat = $sqlExec -> get_result();
// $rezultat = $rezultat -> fetch_all(MYSQLI_NUM); //za posljedicu, json_encode vraća polje umjesto JSON objekta
$rezultat = $rezultat -> fetch_all(MYSQLI_ASSOC);

$jsonRez=json_encode($rezultat);
header("Content-Type:applicatin/json; charset:UTF-8");
echo $jsonRez;