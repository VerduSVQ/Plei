<?php
include_once("config.php");
$conexion = obtenerConexion();

$codReporte = $_POST['codReporte'];

$sql = "DELETE FROM reporte WHERE codReporte = $codReporte";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Reporte eliminado con éxito", $conexion);
} else {
    responder(null, true, "Error al eliminar reporte: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
