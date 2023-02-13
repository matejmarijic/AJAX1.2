<?php
$vezuNaBazu= new mysqli("localhost","root","","uvodphp");
$sql="select naziv from drzava";

$sqlExec = $vezuNaBazu->prepare($sql);
$sqlExec -> execute();
$rezultat = $sqlExec -> get_result();
$rezultat = $rezultat -> fetch_all(MYSQLI_ASSOC);
$jsonRez=json_encode($rezultat);
header("Content-Type:applicatin/json; charset:UTF-8");
echo $jsonRez;