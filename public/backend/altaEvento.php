<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$evento = json_decode($_POST['evento']);

$sql = "INSERT INTO evento (nombre, ciudad, genero, foto, idUser, idLoc) 
        VALUES ('{$evento->nombre}', '{$evento->ciudad}', '{$evento->genero}', '{$evento->foto}', {$evento->idUser}, {$evento->idLoc});";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Se ha dado de alta el evento", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
