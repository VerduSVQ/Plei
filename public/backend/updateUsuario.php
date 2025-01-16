<?php
include_once("config.php");
$conexion = obtenerConexion();

$usuario = json_decode($_POST['usuario']);

$sql = "UPDATE usuario 
        SET usuario = '{$usuario->usuario}', clave = '{$usuario->clave}', nombre = '{$usuario->nombre}', rangoAsistente = {$usuario->rangoAsistente}, rangoOrganizador = {$usuario->rangoOrganizador}, activo = {$usuario->activo}, rol = '{$usuario->rol}'
        WHERE id = {$usuario->id}";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Usuario actualizado con éxito", $conexion);
} else {
    responder(null, true, "Error al actualizar usuario: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
