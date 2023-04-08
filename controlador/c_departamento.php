<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_departamento.php");
    date_default_timezone_set('America/La_Paz');
    $res = array('respuesta'=>'No hay metodo');
    $_POST = json_decode(file_get_contents('php://input'), true);
    $metodo = $_POST['metodo'];
    $departamento = new Departamento();
    switch ($metodo) {
        case 'listaDeDepartamentos':
            $respuesta = $departamento->listaDeDepartamentos();
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        case 'agregarCiudad':
            $nombre = $_POST['nombre'];
            $estado = $_POST['estado'];
            $respuesta = $departamento->agregarCiudad($nombre,$estado);
            $respuesta = array('respuesta'=>intval($respuesta));
            $res = json_encode($respuesta, JSON_PRETTY_PRINT);
            break;
        default:
            # code...
            break;
    }
    
    header("Content-Type: application/json");
    // echo json_encode($res);
    echo $res;