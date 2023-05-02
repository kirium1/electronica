<?php 
    require_once("conexion.php");
    ob_clean();
    class TiendaAliexpress extends Conexion{
        private $sentenceSQL;
        public function TiendaAliexpress(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function listarTiendasAliexpress(){
            $sql = "SELECT * FROM tienda_aliexpress;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }
    }
    
    
