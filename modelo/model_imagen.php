<?php 
    require_once("conexion.php");
    ob_clean();
    class Imagen extends Conexion{
        private $sentenceSQL;
        public function Imagen(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function listaDeDepartamentos(){
            $sql = "SELECT * FROM ciudad_bolivia;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }

        public function agregarImagenDB($tempPath,$destinationPath,$idProducto){
            $sql = "INSERT INTO imagen(nombre_imagen, url_imagen, id_producto) VALUES(:tempPath,:destinationPath,:idProducto);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':tempPath'=>$tempPath,':destinationPath'=>$destinationPath,':idProducto'=>$idProducto));
            if($res === true){
                $res = intval($this->connexion_bd->lastInsertId());
            }
            $sentenceSQL->closeCursor();
            return array('respuesta'=>$res);
        }
    }
    
    
