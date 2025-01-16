<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$idUsuario = $_GET['idUsuario'];

$sql = "SELECT * FROM evento WHERE idUser=$idUsuario; ";

$resultado = mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila; // Insertar la fila en el array
    }
    
    responder($datos, false, "Datos recu.perados", $conexion);}
?>