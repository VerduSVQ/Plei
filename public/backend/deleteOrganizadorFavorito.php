<?php
include_once("config.php");
$conexion = obtenerConexion();

$idFavorito = $_POST['idFavorito'];

$sql = "DELETE FROM organizadorFavorito WHERE idFavorito = $idFavorito";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Organizador favorito eliminado con éxito", $conexion);
} else {
    responder(null, true, "Error al eliminar organizador favorito: " . mysqli_error($conexion), $conexion);
}

mysqli_close($conexion);
?>
