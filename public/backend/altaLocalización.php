<?php
include_once("config.php");
$conexion = obtenerConexion();

$localizacion = json_decode($_POST['localizacion']);

$sql = "INSERT INTO localizacion (nombre, ciudad, provincia, coordenadas) 
        VALUES ('{$localizacion->nombre}', '{$localizacion->ciudad}', '{$localizacion->provincia}', POINT({$localizacion->lat}, {$localizacion->lng}))";

if (mysqli_query($conexion, $sql)) {
    responder(null, false, "Se ha dado de alta la localización", $conexion);
} else {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error: $descrerror", $conexion);
}

mysqli_close($conexion);
?>
