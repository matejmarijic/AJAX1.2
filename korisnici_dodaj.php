<?php
$vezuNaBazu= new mysqli("localhost","root","","uvodphp");

$json = file_get_contents('php://input') ; //dohvat JSON sadržaja iz POST zahtjeva od klijenta
$podaci = json_decode($json);
try{
    $datum= date("Y-m-d",strtotime($podaci->datum));
    $sql = "insert into korisnik (naziv, email, zanimanje, drzava, datum_izmjene )  
        values ('$podaci->naziv', '$podaci->email','$podaci->zanimanje'
                ,'$podaci->drzava','$datum')"; //uoči da je datum jedini posebno izdvojen- jer ga formatiramo
    $sqlExec = $vezuNaBazu->prepare($sql);
    $sqlExec -> execute();
}catch(Exception $e){
    $e->getMessage();
}
/*
naziv:  nazivI.value,
email:   mailI.value,
drzava: drzavaI.value,
zanimanje:  zanimanjeI.value,
datum:  datumI.value
*/