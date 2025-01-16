<?php
include_once("config.php");
$conexion = obtenerConexion();

$organizadorFavorito = json_decode($_POST['organizadorFavorito']);

$sql = "INSERT INTO organizadorFavorito (idUsuario, idOrganizador) 
        VALUES ({$organizadorFavorito->idUsuario}, {$organizadorFavorito->idOrganizador})";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Se ha añadido el organizador a favoritos", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
