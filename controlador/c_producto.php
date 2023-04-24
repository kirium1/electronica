<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_producto.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $producto = new Producto();
    switch ($metodo) {
        case 'listarProductos':
            $respuesta = $producto->listarProductos();
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'agregarProducto':
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $detalle = $_POST['detalle'];
            $estado = $_POST['estado'];
            $respuesta = $producto->agregarProducto($nombre,$precio,$detalle,$estado);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'editarProducto':
            $idProducto = $_POST['idProducto'];
            $nombre = $_POST['nombreEditar'];
            $precio = $_POST['precioEditar'];
            $detalle = $_POST['detalleEditar'];
            $estado = $_POST['estadoEditar'];
            $respuesta = $producto->editarProducto($idProducto,$nombre,$precio,$detalle,$estado);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    $producto->cerrarConexion();
    // header("Content-Type: application/json");
    // echo json_encode($res);
    echo $res;