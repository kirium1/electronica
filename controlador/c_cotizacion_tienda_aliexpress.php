<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_cotizacion_tienda_aliexpress.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $cotizacionTiendaAliexpress = new CotizacionTiendaAliexpress();
    switch ($metodo) {
        case 'solicitarCotizacionesTiendaAliexpress':
            $respuesta = $cotizacionTiendaAliexpress->solicitarCotizacionesTiendaAliexpress();
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    $cotizacionTiendaAliexpress->cerrarConexion();
    header("Content-Type: application/json");
    // echo json_encode($res);
    echo $res;