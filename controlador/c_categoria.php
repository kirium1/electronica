<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_categoria.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $categoria = new Categoria();
    switch ($metodo) {
        case 'listarCategorias':
            $respuesta = $categoria->listarCategorias();
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'agregarCategoria':
            $nombre = $_POST['nombre'];
            $estado = $_POST['estado'];
            $descripcion = $_POST['descripcion'];
            $respuesta = $categoria->agregarCategoria($nombre,$estado,$descripcion);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'eliminarCategoria':
            $idCategoria = $_POST['idCategoria'];
            $respuesta = $categoria->eliminarCategoria($idCategoria);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    $categoria->cerrarConexion();
    header("Content-Type: application/json");
    echo $res;