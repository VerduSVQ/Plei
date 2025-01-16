<?php
include_once("config.php");
$conexion = obtenerConexion();

$codReporte = $_GET['codReporte'];
$sql = "SELECT * FROM reporte WHERE codReporte = $codReporte";
$result = mysqli_query($conexion, $sql);

if ($reporte = mysqli_fetch_assoc($result)) {
    responder($reporte, false, "Reporte encontrado", $conexion);
} else {
    responder(null, true, "Reporte no encontrado", $conexion);
}

mysqli_close($conexion);
?>
