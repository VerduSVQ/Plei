<?php
include_once("config.php");
$conexion = obtenerConexion();

$idLocalizacion = $_GET['idLocalizacion'];
$sql = "SELECT * FROM localizacion WHERE idLocalizacion = $idLocalizacion";
$result = mysqli_query($conexion, $sql);

if ($localizacion = mysqli_fetch_assoc($result)) {
    responder($localizacion, false, "Localización encontrada", $conexion);
} else {
    responder(null, true, "Localización no encontrada", $conexion);
}

mysqli_close($conexion);
?>
