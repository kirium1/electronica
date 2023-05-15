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

        public function agregarTiendaBolivia($nombre,$estado,$direccion){
            $sql = "INSERT INTO tienda_bolivia(nombre_tienda,estado_tienda_bolivia,url_tienda_bolivia) VALUES(:nombre,:estado,:direccion);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':nombre'=>$nombre,':estado'=>$estado,':direccion'=>$direccion));
            if($res === true){
                $res = $this->connexion_bd->lastInsertId();
            }
            $sentenceSQL->closeCursor();
            // return $res;
            return array('respuesta'=>intval($res));
        }

        public function eliminarTiendaBolivia($idTiendaBolivia){
            $sql = "DELETE FROM tienda_bolivia WHERE id_tienda_bolivia = :idTiendaBolivia;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idTiendaBolivia'=>$idTiendaBolivia));
            $sentenceSQL->closeCursor();
            // return $res;
            return array('respuesta'=>$res);
        }
    }
    
    
