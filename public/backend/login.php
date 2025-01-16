<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$usuario = $_POST['usuario'];
$clave = $_POST['clave'];

$sql = "SELECT * FROM usuario WHERE usuario='$usuario' AND clave='$clave'; ";

$resultado = mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    $fila = mysqli_fetch_assoc($resultado);
    if($fila != null){ 
        // Prototipo responder($datos,$error,$mensaje,$conexion)
   responder($fila , false, "Login OK", $conexion);
    } else {
        responder(null, true, "Usuario o clave incorrectas", $conexion);
    }
    
}
?>