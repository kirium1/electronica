<?php
    session_start();
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    // header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    // header("Content-Type: text/html; charset=utf-8");
    // $salida = '{"respuesta":false}';
    $_POST = json_decode(file_get_contents('php://input'), true);
    $salida = array('respuesta' => false );
    if(isset($_POST['username']) && isset($_POST['password'])){
        $user = $_POST['username'];
        $pass = $_POST['password'];
        if(strlen($user) <=8 &&  strlen($pass) <=5){
            $salida = '{"respuesta":false}';
        }else{
            require_once('../modelo/model_encargado.php');
            $encargado = new Encargado();
            $res = $encargado->getEncargado($user,$pass);
            // $res = json_decode($aux);
            if(count($res) == 1){
                $_SESSION['usuario'] = $res[0]['nombre_usuario'];
                $_SESSION['pass'] = $res[0]['pass_usuario'];
                $salida = array('respuesta' => true );
            }else{
                $salida  = array('respuesta' => false );
            }
        }
    }else{
        $salida = array('respuesta' => false );
    }
    header("Content-Type: application/json");
    echo json_encode($salida);