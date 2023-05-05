<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_cotizacion_tienda_bolivia.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $cotizacionTiendaBolivia = new CotizacionTiendaBolivia();
    switch ($metodo) {
        case 'solicitarCotizacionesTiendaBolivia':
            $idProducto = $_POST['idProducto'];
            $respuesta = $cotizacionTiendaBolivia->solicitarCotizacionesTiendaBolivia($idProducto);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'agregarCotizacionTiendaBolivia':
            $idTiendaBolivia = $_POST['idTiendaBolivia'];
            $idProducto = $_POST['idProducto'];
            $urlCotizacionBolivia = $_POST['urlCotizacionBolivia'];
            $fecha = date("Y-m-d H:i:s");
            $precioUnitarioBolivia = $_POST['precioUnitarioBolivia'];
            $pagoExtraBolivia = $_POST['pagoExtraBolivia'];
            $stockBolivia = $_POST['stockBolivia'];
            $cantidadBolivia = $_POST['cantidadBolivia'];
            $cotizacionBolivia = $_POST['cotizacionBolivia'];
            $descuentoBolivia = $_POST['descuentoBolivia'];
            $totalBolivia = $_POST['totalBolivia'];
            $respuesta = $cotizacionTiendaBolivia->agregarCotizacionTiendaBolivia($idTiendaBolivia,$idProducto,$urlCotizacionBolivia,$fecha,$precioUnitarioBolivia,
            $pagoExtraBolivia,$stockBolivia,$cantidadBolivia,$cotizacionBolivia,$descuentoBolivia,$totalBolivia);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'eliminarCotizacionBolivia':
            $idCotizacionBolivia = $_POST['idCotizacionBolivia'];
            $respuesta = $cotizacionTiendaBolivia->eliminarCotizacionBolivia($idCotizacionBolivia);
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    $cotizacionTiendaBolivia->cerrarConexion();
    // header("Content-Type: application/json");
    // echo json_encode($res);
    echo $res;