<?php
include_once("config.php");
$conexion = obtenerConexion();

$evento = json_decode($_POST['evento']);

$sql = "UPDATE evento 
        SET nombre = '{$evento->nombre}', ciudad = '{$evento->ciudad}', genero = '{$evento->genero}', foto = '{$evento->foto}', idUser = {$evento->idUser}, idLoc = {$evento->idLoc} 
        WHERE id = {$evento->idEvento}";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Evento actualizado con éxito", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error al actualizar el evento: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
