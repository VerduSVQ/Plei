<?php
include_once("config.php");
$conexion = obtenerConexion();

$reporte = json_decode($_POST['reporte']);

$sql = "UPDATE reporte 
        SET mensaje = '{$reporte->mensaje}', codigoReportado = {$reporte->codigoReportado}, activo = {$reporte->activo} 
        WHERE codReporte = {$reporte->codReporte}";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Reporte actualizado con éxito", $conexion);
} else {
    responder(null, true, "Error al actualizar reporte: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
