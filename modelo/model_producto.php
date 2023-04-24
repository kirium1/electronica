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
            if($res === true){
                $res = $idProducto;
            }
            $sentenceSQL->closeCursor();
            return array('respuesta'=>$res);
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
    
    
