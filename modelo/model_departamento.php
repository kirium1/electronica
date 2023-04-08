<?php 
    require_once("conexion.php");
    ob_clean();
    class Departamento extends Conexion{
        private $sentenceSQL;
        public function Departamento(){
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
    
    
