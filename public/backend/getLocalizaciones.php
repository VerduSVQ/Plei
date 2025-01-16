<?php
include_once("config.php");
$conexion = obtenerConexion();

$sql = "SELECT * FROM localizacion";
$result = mysqli_query($conexion, $sql);
$localizaciones = [];

while ($fila = mysqli_fetch_assoc($result)) {
    $localizaciones[] = $fila;
}

responder($localizaciones, false, "Listado de localizaciones", $conexion);

mysqli_close($conexion);
?>
