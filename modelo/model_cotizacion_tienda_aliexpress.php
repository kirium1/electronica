<?php 
    require_once("conexion.php");
    ob_clean();
    class CotizacionTiendaAliexpress extends Conexion{
        private $sentenceSQL;
        public function CotizacionTiendaAliexpress(){
            parent::__construct();
        }
        public function cerrarConexion(){
            $this->sentenceSQL = null;
            $this->connexion_bd = null;
        }

        public function solicitarCotizacionesTiendaAliexpress(){
            $sql = "SELECT id_cotizacion_tienda_aliexpress, id_producto, tienda_aliexpress.id_tienda_aliexpress, tienda_aliexpress.nombre_tienda, precio_unidad,
            url_producto_tienda_aliexpress, fecha_cotizacion, pago_extra, stock_actual, cantidad_producto, precio_cotizacion, descuento_cotizacion, total_cotizacion
            FROM cotizacion_tienda_aliexpress INNER JOIN tienda_aliexpress USING (id_tienda_aliexpress);";
            $sentenceSQL = $this->connexion_bd->prepare($sql);
            $res = $sentenceSQL->execute();
            $respuesta = $sentenceSQL->fetchAll(PDO::FETCH_ASSOC);
            $sentenceSQL->closeCursor();
            return $respuesta;
        }
    }
    
    
