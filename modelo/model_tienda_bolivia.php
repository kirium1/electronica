<?php 
    require_once("conexion.php");
    ob_clean();
    class TiendaBolivia extends Conexion{
        private $sentenceSQL;
        public function TiendaBolivia(){
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
    }
    
    
