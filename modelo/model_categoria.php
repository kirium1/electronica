<?php 
    require_once("conexion.php");
    ob_clean();
    class Categoria extends Conexion{
        private $sentenceSQL;
        public function Categoria(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function listarCategorias(){
            $sql = "SELECT * FROM categoria;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }

        public function agregarCategoria($nombre,$estado,$descripcion){
            $sql = "INSERT INTO categoria(nombre_categoria,estado_categoria,descripcion_categoria) VALUES(:nombre,:estado,:descripcion);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':nombre'=>$nombre,':estado'=>$estado,':descripcion'=>$descripcion));
            if($res === true){
                $res = $this->connexion_bd->lastInsertId();
                $res = intval($res);
            }
            $sentenceSQL->closeCursor();
            return array('respuesta'=>$res);
        }

        public function eliminarCategoria($idCategoria){
            try {
                $sql = "DELETE FROM categoria WHERE id_categoria = :idCategoria;";
                $sentenceSQL = $this->connexion_bd->prepare($sql);
                $res = $sentenceSQL->execute(array(':idCategoria'=>$idCategoria));
            }
            catch( PDOException $Exception ) {
                $res = $Exception->getMessage();
            }
            $sentenceSQL->closeCursor();
            // return $res === true ?  array('respuesta'=>intval($res)) : $res;
            return  array('respuesta'=>$res);
        }

        public function actualizarTiendaBolivia($idTiendaBolivia,$nombre,$estado,$direccion){
            $sql = "UPDATE tienda_bolivia SET nombre_tienda = :nombre, estado_tienda_bolivia = :estado, url_tienda_bolivia = :direccion WHERE id_tienda_bolivia = :idTiendaBolivia;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':nombre'=>$nombre,':estado'=>$estado,':direccion'=>$direccion,':idTiendaBolivia'=>$idTiendaBolivia));
            $sentenceSQL->closeCursor();
            return array('respuesta'=>intval($res));
        }
    }
    
    
