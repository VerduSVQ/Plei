<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$idEvento = $_POST['idEvento'];

$sql = "DELETE FROM evento WHERE id=$idEvento; ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(true, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha borrado el evento con exito", $conexion);
}
?>
