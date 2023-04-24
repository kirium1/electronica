<?php 
    require_once("conexion.php");
    ob_clean();
    class Tienda extends Conexion{
        private $sentenceSQL;
        public function Tienda(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function listarTiendasBolivia(){
            $sql = "SELECT * FROM tienda_bolivia;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }

        public function agregarCiudad($nombre,$estado){
            $sql = "INSERT INTO ciudad_bolivia(nombre_ciudad,estado_ciudad) VALUES(:nombre,:estado);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':nombre'=>$nombre,':estado'=>$estado));
            // $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            if($res === true){
                $res = $this->connexion_bd->lastInsertId();
            }
            $sentenceSQL->closeCursor();
            return $res;
        }

    }
    
    
