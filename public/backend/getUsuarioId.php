<?php
include_once("config.php");
$conexion = obtenerConexion();

$idUsuario = $_GET['idUsuario'];
$sql = "SELECT * FROM usuario WHERE id = $idUsuario";
$result = mysqli_query($conexion, $sql);

if ($usuario = mysqli_fetch_assoc($result)) {
    responder($usuario, false, "Usuario encontrado", $conexion);
} else {
    responder(null, true, "Usuario no encontrado", $conexion);
}

mysqli_close($conexion);
?>
