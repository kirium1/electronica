<?php
    ob_clean();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once("../modelo/model_producto.php");
    // $ruta = 'archivos/';
    $ruta = './img/';
    $producto = new Producto();
    $arrayRespuesta = $_POST;
    $nombre = '';
    $precio = 0.0;
    $detalle = '';
    $estado = '';
    $aux = '';
    foreach($arrayRespuesta as $key => $elemento){
        switch ($key) {  
            case 'nombre': 
                $nombre = $elemento;
                break;
            case 'precio': 
                $precio = $elemento;
                break;
            case 'detalle': 
                $detalle = $elemento;
                break;
            case 'estado': 
                $estado = $elemento;
                break;
            case 'categoria': 
                $aux = $elemento;
                $categorias = explode(',',$aux);
                break;
            default:
                # code...
                break;
        }
    }

    $respuesta = $producto->agregarProductoCategoria($nombre,$precio,$detalle,$estado,$aux);
    // $res = json_encode($respuesta, JSON_PRETTY_PRINT);
    // header('Content-Type: application/json');
    // echo $res;
    $res = array('respuesta'=>1);
    if($respuesta['salida'] == 'Exito'){
        $fileCount = count($_FILES['files']['name']);
        if($fileCount >= 1){
            require_once("../modelo/model_imagen.php");
            $imagen = new Imagen();
            for ($i = 0; $i < $fileCount; $i++) {
                $file = $_FILES['files'];
                // Verificar si se subió el archivo correctamente
                if ($file['error'][$i] === UPLOAD_ERR_OK) {
                    $uuid = uniqid();
                    $tempPath = $file['tmp_name'][$i];
                    $fileName = $uuid.$file['name'][$i];
                    
                    // Mueve el archivo a la ubicación deseada
                    $destinationPath = $ruta . $fileName;
                    // move_uploaded_file($tempPath, $destinationPath);
                    move_uploaded_file($tempPath, '../public/img/'.$fileName);
                    $res = $imagen->agregarImagenDB($file['name'][$i],$destinationPath,$respuesta['ultimoID']);
                    if($i == 0){
                        $res = $producto->agregarImagenDefecto($destinationPath,$respuesta['ultimoID']);
                    }
                    // Manejar el archivo subido según tus necesidades
                    // ...
                }
            }
        }
    }
    $res = json_encode($res, JSON_PRETTY_PRINT);
    // header('Content-Type: application/json');
    echo $res;
    

// $file = $_FILES['image'];

// // Verificar si se subió el archivo correctamente
// if ($file['error'] === UPLOAD_ERR_OK) {
//   $tempPath = $file['tmp_name'];
//   $fileName = $file['name'];

//   // Mueve el archivo a la ubicación deseada
//   $destinationPath = 'archivos/' . $fileName;
//   move_uploaded_file($tempPath, $destinationPath);

//   // Devuelve una respuesta JSON con información sobre el archivo subido
//   $response = [
//     'success' => true,
//     'message' => 'Archivo subido correctamente',
//     'fileName' => $fileName,
//     'filePath' => $destinationPath,
//   ];
// } else {
//   // Error al subir el archivo
//   $response = [
//     'success' => false,
//     'message' => 'Error al subir el archivo',
//   ];
// }
// // header('Content-Type: application/json');
// echo json_encode($response);


// $fileCount = count($_FILES['files']['name']);
// echo $fileCount;

// for ($i = 0; $i < $fileCount; $i++) {
//   $file = $_FILES['files'];
//   var_dump($file['error'][$i]);
//   // Verificar si se subió el archivo correctamente
//   if ($file['error'][$i] === UPLOAD_ERR_OK) {
//     $tempPath = $file['tmp_name'][$i];
//     $fileName = $file['name'][$i];
    
//     // Mueve el archivo a la ubicación deseada
//     $destinationPath = 'archivos/' . $fileName;
//     move_uploaded_file($tempPath, $destinationPath);

//     // Manejar el archivo subido según tus necesidades
//     // ...
//   }
// }
