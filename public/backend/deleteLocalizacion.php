<?php
include_once("config.php");
$conexion = obtenerConexion();

$idLocalizacion = $_POST['idLocalizacion'];

$sql = "DELETE FROM localizacion WHERE idLocalizacion = $idLocalizacion";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Localización eliminada con éxito", $conexion);
} else {
    responder(null, true, "Error al eliminar localización: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
