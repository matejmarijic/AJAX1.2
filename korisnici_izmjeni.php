<?php
// PHP skripta za update korisnika
$vezuNaBazu= new mysqli("localhost","root","","uvodphp");

$json = file_get_contents('php://input') ; //dohvat JSON sadržaja iz POST zahtjeva od klijenta
$podaci = json_decode($json);
//varijabla $podaci ne sadrži polje, nego PHP Objekt, zato se ne može pristupiti podatku preko indexa
//dakle ne može: $podaci['naziv']
//nego ovako $podaci -> naziv  , riječ je o PHP objektima pa s  njima nastavljamo u ponedjeljak
try{
    $datum= date("Y-m-d",strtotime($podaci->datum));//kreiramo datumski objekt u phpu  iz tekstulane vrijendosti
    $sql = "update korisnik 
        set naziv = '$podaci->naziv',
             email = '$podaci->email',
            zanimanje = '$podaci->zanimanje',
            drzava = '$podaci->drzava',
            datum_izmjene = '$datum' 
        where id = $podaci->id " ;
    $sqlExec = $vezuNaBazu->prepare($sql);
    $sqlExec -> execute( );
}catch(Exception $e){
    $e->getMessage();
}