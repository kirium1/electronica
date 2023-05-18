<?php 
    require_once("conexion.php");
    ob_clean();
    class Producto extends Conexion{
        private $sentenceSQL;
        public function Producto(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function listarProductos(){
            $sql = "SELECT * FROM producto;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }

        public function agregarProducto($nombre,$precio,$detalle,$estado){
            $sql = "INSERT INTO producto(nombre_producto,detalle_producto,precio_estandar,estado_producto) VALUES(:nombre,:detalle,:precio,:estado);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':nombre'=>$nombre,":detalle"=>$detalle,':precio'=>$precio,':estado'=>$estado));
            if($res === true){
                $res = intval($this->connexion_bd->lastInsertId());
            }
            $sentenceSQL->closeCursor();
            return array('respuesta'=>$res);
        }

        public function editarProducto($idProducto,$nombre,$precio,$detalle,$estado){
            $sql = "UPDATE producto SET nombre_producto = :nombre, detalle_producto = :detalle, precio_estandar = :precio, estado_producto = :estado WHERE id_producto = :idProducto;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':nombre'=>$nombre,":detalle"=>$detalle,':precio'=>$precio,':estado'=>$estado,':idProducto'=>$idProducto));
            $sentenceSQL->closeCursor();
            return array('respuesta'=>intval($res));
        }

        public function eliminarProducto($idProducto){
            $sql = "DELETE FROM producto WHERE id_producto = :idProducto;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idProducto'=>$idProducto));
            $sentenceSQL->closeCursor();
            return array('respuesta'=>intval($res));
        }

        public function eliminarProductosCategoriaIMG($idProducto){
            $sql = "SELECT url_imagen FROM imagen WHERE id_producto = :idProducto;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idProducto'=>$idProducto));
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $cantidad = count($respuesta);
            if($cantidad >= 1){
                for ($i=0; $i < count($respuesta) ; $i++) { 
                    $ruta = explode("/", $respuesta[$i]['url_imagen']);
                    unlink('../public/img/'.$ruta[count($ruta)-1]);
                    // unlink('../'$respuesta[$i]['url_imagen']);
                }
            }

            $sql = "CALL eliminarProductosCategoriaIMG(:idProducto);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idProducto'=>$idProducto));
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta[0];
            // return $respuesta;
        }

        public function agregarProductoCategoria($nombre,$precio,$detalle,$estado,$listaIDCategoria){
            $sql = "CALL agregarProductoCategoria(:nombre,:precio,:detalle,:estado,:listaIDCategoria);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $sentenceSQL->execute(array(':nombre'=>$nombre,':precio'=>$precio,':detalle'=>$detalle,':estado'=>$estado,':listaIDCategoria'=>$listaIDCategoria));
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            // return json_encode($respuesta[0], JSON_PRETTY_PRINT);
            return $respuesta[0];
        }

        public function agregarImagenDefecto($destino,$idProducto){
            $sql = "UPDATE producto SET img_defecto = :destino WHERE id_producto = :idProducto;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':destino'=>$destino,':idProducto'=>$idProducto));
            $sentenceSQL->closeCursor();
            return array('respuesta'=>intval($res));
        }

        // public function agregarCiudad($nombre,$estado){
        //     $sql = "INSERT INTO ciudad_bolivia(nombre_ciudad,estado_ciudad) VALUES(:nombre,:estado);";
        //     $sentenceSQL = $this->connexion_bd->prepare($sql);
        //     $res = $sentenceSQL->execute(array(':nombre'=>$nombre,':estado'=>$estado));
        //     // $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
        //     if($res === true){
        //         $res = $this->connexion_bd->lastInsertId();
        //     }
        //     $sentenceSQL->closeCursor();
        //     return $res;
        // }

    }
    
    
