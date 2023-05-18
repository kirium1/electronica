<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_tienda_bolivia.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $tiendaBolivia = new TiendaBolivia();
    switch ($metodo) {
        case 'listarTiendasBolivia':
            $respuesta = $tiendaBolivia->listarTiendasBolivia();
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'agregarTiendaBolivia':
            $nombre = $_POST['nombre'];
            $estado = $_POST['estado'];
            $direccion = $_POST['direccion'];
            $respuesta = $tiendaBolivia->agregarTiendaBolivia($nombre,$estado,$direccion);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'eliminarTiendaBolivia':
            $idTiendaBolivia = $_POST['idTiendaBolivia'];
            $respuesta = $tiendaBolivia->eliminarTiendaBolivia($idTiendaBolivia);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'actualizarTiendaBolivia':
            $idTiendaBolivia = $_POST['idTiendaBolivia'];
            $nombre = $_POST['nombre'];
            $estado = $_POST['estado'];
            $direccion = $_POST['direccion'];
            $respuesta = $tiendaBolivia->actualizarTiendaBolivia($idTiendaBolivia,$nombre,$estado,$direccion);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    $tiendaBolivia->cerrarConexion();
    // header("Content-Type: application/json");
    // echo json_encode($res);
    echo $res;