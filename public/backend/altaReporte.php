<?php
include_once("config.php");
$conexion = obtenerConexion();

$reporte = json_decode($_POST['reporte']);

$sql = "INSERT INTO reporte (mensaje, codigoReportado, activo) 
        VALUES ('{$reporte->mensaje}', {$reporte->codigoReportado}, {$reporte->activo})";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Se ha dado de alta el reporte", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
