<?php
include_once("config.php");
$conexion = obtenerConexion();

$idAsistencia = $_GET['idAsistencia'];
$sql = "SELECT * FROM asistencia WHERE idAsistencia = $idAsistencia";
$result = mysqli_query($conexion, $sql);

if ($asistencia = mysqli_fetch_assoc($result)) {
    responder($asistencia, false, "Asistencia encontrada", $conexion);
} else {
    responder(null, true, "Asistencia no encontrada", $conexion);
}

mysqli_close($conexion);
?>
