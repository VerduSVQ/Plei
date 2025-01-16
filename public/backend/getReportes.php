<?php
include_once("config.php");
$conexion = obtenerConexion();

$sql = "SELECT * FROM reporte";
$result = mysqli_query($conexion, $sql);
$reportes = [];

while ($fila = mysqli_fetch_assoc($result)) {
    $reportes[] = $fila;
}

responder($reportes, false, "Listado de reportes", $conexion);

mysqli_close($conexion);
?>
