<?php
$vezuNaBazu= new mysqli("localhost","root","","uvodphp");
$sql="delete from korisnik where id = ?";

$sqlExec = $vezuNaBazu->prepare($sql);
$sqlExec -> bind_param("s",$_POST['id']);
$sqlExec -> execute();