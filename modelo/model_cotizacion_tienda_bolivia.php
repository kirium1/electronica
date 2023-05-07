<?php 
    require_once("conexion.php");
    ob_clean();
    class CotizacionTiendaBolivia extends Conexion{
        private $sentenceSQL;
        public function CotizacionTiendaBolivia(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function solicitarCotizacionesTiendaBolivia($idProducto){
            $sql = "SELECT id_cotizacion_tienda_bolivia, id_producto, tienda_bolivia.id_tienda_bolivia, tienda_bolivia.nombre_tienda, precio_unidad, existe_producto_tienda,
            url_producto_tienda_bolivia, fecha_cotizacion, pago_extra, stock_actual, cantidad_producto, precio_cotizacion, descuento_cotizacion, total_cotizacion
            FROM cotizacion_tienda_bolivia INNER JOIN tienda_bolivia USING (id_tienda_bolivia) WHERE id_producto = :idProducto;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idProducto'=>$idProducto));
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }

        public function agregarCotizacionTiendaBolivia($idTiendaBolivia,$idProducto,$urlCotizacionBolivia,$fecha,$precioUnitarioBolivia,
        $pagoExtraBolivia,$stockBolivia,$cantidadBolivia,$cotizacionBolivia,$descuentoBolivia,$totalBolivia){
            $sql = "INSERT INTO cotizacion_tienda_bolivia(id_producto,id_tienda_bolivia,precio_unidad,url_producto_tienda_bolivia,fecha_cotizacion,
            pago_extra,stock_actual,cantidad_producto,precio_cotizacion,descuento_cotizacion,total_cotizacion) VALUES(:idProducto,:idTiendaBolivia,
            :precioUnitarioBolivia,:urlCotizacionBolivia,:fecha,:pagoExtraBolivia,:stockBolivia,:cantidadBolivia,:cotizacionBolivia,:descuentoBolivia,:totalBolivia);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idProducto'=>$idProducto,':idTiendaBolivia'=>$idTiendaBolivia,':precioUnitarioBolivia'=>$precioUnitarioBolivia,':urlCotizacionBolivia'=>$urlCotizacionBolivia,
            ':fecha'=>$fecha,':pagoExtraBolivia'=>$pagoExtraBolivia,':stockBolivia'=>$stockBolivia,':cantidadBolivia'=>$cantidadBolivia,
            ':cotizacionBolivia'=>$cotizacionBolivia,':descuentoBolivia'=>$descuentoBolivia,':totalBolivia'=>$totalBolivia));
            if($res === true){
                $res = intval($this->connexion_bd->lastInsertId());
            }
            $sentenceSQL->closeCursor();
            return $res;
        }

        public function eliminarCotizacionBolivia($idCotizacionBolivia){
            $sql = "DELETE FROM cotizacion_tienda_bolivia WHERE id_cotizacion_tienda_bolivia = :idCotizacionBolivia;";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute(array(':idCotizacionBolivia'=>$idCotizacionBolivia));
            $sentenceSQL->closeCursor();
            return array('respuesta'=>intval($res));
            // return intval($res);
        }
    }
    
    
