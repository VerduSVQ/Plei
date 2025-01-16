<?php
include_once("config.php");
$conexion = obtenerConexion();

$idFavorito = $_GET['idFavorito'];

$sql = "SELECT * FROM organizadorFavorito WHERE idFavorito = $idFavorito";
$result = mysqli_query($conexion, $sql);

if ($organizadorFavorito = mysqli_fetch_assoc($result)) {
    responder($organizadorFavorito, false, "Organizador favorito encontrado", $conexion);
} else {
    responder(null, true, "Organizador favorito no encontrado", $conexion);
}

mysqli_close($conexion);
?>
