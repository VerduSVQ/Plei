<?php
include_once("config.php");
$conexion = obtenerConexion();

$usuario = json_decode($_POST['usuario']);

$sql = "INSERT INTO usuario (usuario, clave, nombre, rangoAsistente, rangoOrganizador, activo, rol) 
        VALUES ('{$usuario->usuario}', '{$usuario->clave}', '{$usuario->nombre}', {$usuario->rangoAsistente}, {$usuario->rangoOrganizador}, {$usuario->activo}, '{$usuario->rol}')";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Se ha dado de alta el usuario", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
