<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_tienda_aliexpress.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $tiendaAliexpress = new TiendaAliexpress();
    switch ($metodo) {
        case 'listarTiendasAliexpress':
            $respuesta = $tiendaAliexpress->listarTiendasAliexpress();
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    $tiendaAliexpress->cerrarConexion();
    header("Content-Type: application/json");
    // echo json_encode($res);
    echo $res;