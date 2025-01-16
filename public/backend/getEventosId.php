<?php
include_once("config.php");
$conexion = obtenerConexion();

$idEvento = $_GET['idEvento'];
$sql = "SELECT * FROM evento WHERE id = $idEvento";
$result = mysqli_query($conexion, $sql);

if ($evento = mysqli_fetch_assoc($result)) {
    responder($evento, false, "Evento encontrado", $conexion);
} else {
    responder(null, true, "Evento no encontrado", $conexion);
}

mysqli_close($conexion);
?>
