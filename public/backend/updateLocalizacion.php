<?php
include_once("config.php");
$conexion = obtenerConexion();

$localizacion = json_decode($_POST['localizacion']);

$sql = "UPDATE localizacion 
        SET nombre = '{$localizacion->nombre}', direccion = '{$localizacion->direccion}', ciudad = '{$localizacion->ciudad}', codigoPostal = '{$localizacion->codigoPostal}' 
        WHERE idLocalizacion = {$localizacion->idLocalizacion}";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Localización actualizada con éxito", $conexion);
} else {
    responder(null, true, "Error al actualizar localización: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
