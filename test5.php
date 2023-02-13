<?php
$vezuNaBazu= new mysqli("localhost","root","","uvodphp");

$sql="select id, naziv, email, zanimanje, drzava from korisnik where id = ?";

$sqlExec = $vezuNaBazu->prepare($sql);
$sqlExec -> bind_param("s",$_GET['id']);
$sqlExec -> execute();
$sqlExec -> store_result() ;
$sqlExec -> bind_result($id,$naziv,$email,$zanimanje, $drzava );
$sqlExec -> fetch();
$sqlExec -> close();

echo "<table>";
echo "<tr>";
echo "<th>ID</th>";
echo "<th>Naziv</th>";
echo "<th>Email</th>";
echo "<th>Zanimanje</th>";
echo "<th>Država</th>";
echo "</tr>";
echo "<tr>";
echo "<td>".$id."</td>";
echo "<td>".$naziv."</td>";
echo "<td>".$email."</td>";
echo "<td>".$zanimanje."</td>";
echo "<td>".$drzava."</td>";
echo "</tr>";
echo "</table>";
?>