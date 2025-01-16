<?php
include_once("config.php");
$conexion = obtenerConexion();

$asistencia = json_decode($_POST['asistencia']);

$sql = "INSERT INTO asistencia (idUser, idEvento) 
        VALUES ({$asistencia->idUser}, {$asistencia->idEvento})";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Se ha registrado la asistencia", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
    