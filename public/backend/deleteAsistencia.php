<?php
include_once("config.php");
$conexion = obtenerConexion();

$idAsistencia = $_POST['idAsistencia'];

$sql = "DELETE FROM asistencia WHERE idAsistencia = $idAsistencia";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Asistencia eliminada con éxito", $conexion);
} else {
    responder(null, true, "Error al eliminar asistencia: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
