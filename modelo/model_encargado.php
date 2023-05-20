<?php 
    require_once("conexion.php");
    ob_clean();
    class Encargado extends Conexion{
        private $sentenceSQL;
        public function __construct() {
            parent::__construct();
        }

        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function getEncargado($user,$pass){
            $sql = "SELECT * FROM usuario WHERE UPPER(nombre_usuario) = UPPER(:usuario) AND pass_usuario = :myPass AND estado_usuario = 1;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":usuario"=>$user,":myPass"=>$pass));
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }

        public function listaCajeros(){
            // $sql = "SELECT * from encargado WHERE UPPER(usuario_encargado) = UPPER(:usuario) AND pass_encargado = :pass AND estado_empleado = 1;";
            $sql = "SELECT * from encargado WHERE tipo_encargado = 'cajera' AND estado_encargado = 1;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return json_encode($respuesta, JSON_PRETTY_PRINT);
        }

        public function getListaEmpleado(){
            //$sql = "SELECT * FROM encargado;";
            $sql = "SELECT * FROM encargado LEFT JOIN sucursal ON encargado.id_sucursal = sucursal.id_sucursal;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return json_encode(array('data' => $respuesta), JSON_PRETTY_PRINT);
        }

        public function agregarEncargado($nombre,$cargo,$sucursal,$usuario,$pass){
            $sql = "INSERT INTO encargado(nombre_encargado,tipo_encargado,id_sucursal,usuario_encargado,pass_encargado,estado_encargado) 
            VALUES(:nombre,:cargo,:sucursal,:usuario,:myPass,1);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":nombre"=>$nombre,":cargo"=>$cargo,":sucursal"=>$sucursal,":usuario"=>$usuario,":myPass"=>$pass));
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function agregarEncargadoSinSucursal($nombre,$cargo,$usuario,$pass){
            $sql = "INSERT INTO encargado(nombre_encargado,tipo_encargado,usuario_encargado,pass_encargado,estado_encargado) 
            VALUES(:nombre,:cargo,:usuario,:myPass,1);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":nombre"=>$nombre,":cargo"=>$cargo,":usuario"=>$usuario,":myPass"=>$pass));
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function eliminarEncargado($idEmpleado){
            $sql = "DELETE FROM encargado WHERE id_encargado = :idEmpleado;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":idEmpleado"=>$idEmpleado));
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function editarEncargado($nombre,$estado,$cargo,$sucursal,$usuario,$pass,$idEncargado){
            $sql = "UPDATE encargado SET nombre_encargado = :nombre, estado_encargado = :estado , tipo_encargado = :cargo ,
            id_sucursal = :sucursal, usuario_encargado = :usuario, pass_encargado = :myPass WHERE id_encargado = :idEncargado;"; 
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":nombre"=>$nombre,":estado"=>$estado,":cargo"=>$cargo,":sucursal"=>$sucursal,
            ":usuario"=>$usuario,":myPass"=>$pass,':idEncargado'=>$idEncargado));
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function editarEncargadoSinSucursal($nombre,$estado,$cargo,$usuario,$pass,$idEncargado){
            $sql = "UPDATE encargado SET nombre_encargado = :nombre, estado_encargado = :estado, tipo_encargado = :cargo,
            usuario_encargado = :usuario, pass_encargado = :myPass WHERE id_encargado = :idEncargado;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":nombre"=>$nombre,":estado"=>$estado,":cargo"=>$cargo,":usuario"=>$usuario,":myPass"=>$pass,
            ':idEncargado'=>$idEncargado));
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function actualizarDatosDefault($idEncargado,$usuario,$pass,$idSucursal,$papel){
            $sql = "UPDATE encargado SET usuario_encargado = :usuario, pass_encargado = :myPass, id_sucursal = :idSucursal, tipo_papel = :papel WHERE id_encargado = :idEncargado;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":usuario"=>$usuario,":myPass"=>$pass,":idSucursal"=>$idSucursal,":papel"=>$papel,":idEncargado"=>$idEncargado));
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function actualizarDatosDefaultReporte($idEncargado,$usuario,$pass,$idSucursal,$papel,$centajeVentaUnidad,$centajeVentaMayor,$centajeVentaCredito){
            $sql = "UPDATE encargado SET usuario_encargado = :usuario, pass_encargado = :myPass, id_sucursal = :idSucursal, tipo_papel = :papel, 
            formula_venta_unidad = :centajeVentaUnidad, formula_venta_mayor = :centajeVentaMayor ,formula_venta_credito = :centajeVentaCredito WHERE id_encargado = :idEncargado;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(":usuario"=>$usuario,":myPass"=>$pass,":idSucursal"=>$idSucursal,":papel"=>$papel,
            ":centajeVentaUnidad"=>$centajeVentaUnidad,":centajeVentaMayor"=>$centajeVentaMayor,":centajeVentaCredito"=>$centajeVentaCredito,":idEncargado"=>$idEncargado));
            $sentenceSQL->closeCursor();
            return $res;
        }
    }
    
    
