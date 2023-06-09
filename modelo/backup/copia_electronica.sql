-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: electronica
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(45) DEFAULT NULL,
  `estado_categoria` tinyint(1) DEFAULT '1',
  `descripcion_categoria` text,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Espressif',1,NULL),(2,'Placas de Desarrollo',1,NULL),(3,'Wifi',1,NULL),(4,'Bluetooth',1,NULL),(5,'Esp32 ',1,NULL),(6,'Sensor',1,NULL),(7,'Step-up',1,NULL),(8,'Step-down',1,NULL),(9,'Regulador de voltaje',1,NULL),(10,'Protoboard',1,'La Protoboard, llamada en ingl├®s breadboard, es una placa de pruebas en los que se pueden insertar elementos electr├│nicos y cables con los que se arman circuitos sin la necesidad de soldar ninguno de los componentes. Las Protoboards tienen orificios conectados entre si por medio de peque├▒as laminas met├ílicas. Usualmente, estas placas siguen un arreglo en el que los orificios de una misma fila est├ín conectados entre si y los orificios en filas diferentes no. Los orificios de las placas normalmente est├ín tienen una separaci├│n de 2.54 mil├¡metros (0.1 pulgadas).\nUna Protoboard es un instrumento que permite probar el dise├▒o de un circuito sin la necesidad de soldar o desoldar componentes. Las conexiones en una Protoboard se hacen con solo insertar los componentes lo que permite armar y modificar circuitos con mayor velocidad.\nNormalmente estas placas son usadas para realizar pruebas experimentales. Si la prueba resulta satisfactoria el circuito se construye de una forma m├ís permanente para evitar el riesgo de que alg├║n componente pueda desconectarse. En caso de que la prueba no sea satisfactoria, puede modificarse el circuito f├ícilmente.\n\nLas Protoboards presentan algunas ventajas y desventajas. Entre sus principales ventajas esta que pueden utilizarse tantas veces como se requiera y que son de f├ícil manejo. Por otra parte, entre sus desventajas esta el inconveniente de que en ocasiones puede haber falsos contactos, los cables empleados pueden tener mala conductividad o estar rotos, lo que hace que las conexiones no sean tan seguras como las de las pistas de un circuito impreso. Otra caracter├¡stica que hay que tomar en cuenta es que las Protoboards no est├ín dise├▒adas para trabajar con componentes de gran potencia.\nLa corriente con la que puede operar una Protoboard var├¡a entre 3 y 5 A, y esto depende del fabricante. Suelen operar a bajas frecuencias, entre 10 ÔÇô 20 MHz.'),(16,'Arduino',1,'Arduino es una plataforma de creaci├│n de electr├│nica de c├│digo abierto, la cual est├í basada en hardware y software libre, flexible y f├ícil de utilizar para los creadores y desarrolladores. Esta plataforma permite crear diferentes tipos de microordenadores de una sola placa a los que la comunidad de creadores puede darles diferentes tipos de uso.\n\nPara poder entender este concepto, primero vas a tener que entender los conceptos de hardware libre y el software libre. El hardware libre son los dispositivos cuyas especificaciones y diagramas son de acceso p├║blico, de manera que cualquiera puede replicarlos. Esto quiere decir que Arduino ofrece las bases para que cualquier otra persona o empresa pueda crear sus propias placas, pudiendo ser diferentes entre ellas pero igualmente funcionales al partir de la misma base.\n\nEl proyecto naci├│ en 2003, cuando varios estudiantes del Instituto de Dise├▒o Interactivo de Ivrea, Italia, con el fin de facilitar el acceso y uso de la electr├│nico y programaci├│n. Lo hicieron para que los estudiantes de electr├│nica tuviesen una alternativa m├ís econ├│mica a las populares BASIC Stamp, unas placas que por aquel entonces val├¡an m├ís de cien d├│lares, y que no todos se pod├¡an permitir.\n\nEl resultado fue Arduino, una placa con todos los elementos necesarios para conectar perif├®ricos a las entradas y salidas de un microcontrolador, y que puede ser programada tanto en Windows como macOS y GNU/Linux. Un proyecto que promueve la filosof├¡a \'learning by doing\', que viene a querer decir que la mejor manera de aprender es cacharreando.');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_producto`
--

DROP TABLE IF EXISTS `categoria_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_producto` (
  `id_categoria` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_categoria`,`id_producto`),
  KEY `fk_categoria_has_producto_producto1_idx` (`id_producto`),
  KEY `fk_categoria_has_producto_categoria_idx` (`id_categoria`),
  CONSTRAINT `fk_categoria_has_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `fk_categoria_has_producto_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_producto`
--

LOCK TABLES `categoria_producto` WRITE;
/*!40000 ALTER TABLE `categoria_producto` DISABLE KEYS */;
INSERT INTO `categoria_producto` VALUES (7,23),(9,23),(2,24),(9,25),(7,33),(1,34),(2,34),(3,34),(4,34),(5,34),(1,36),(2,36),(3,36),(10,37);
/*!40000 ALTER TABLE `categoria_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad_bolivia`
--

DROP TABLE IF EXISTS `ciudad_bolivia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad_bolivia` (
  `id_ciudad_bolivia` int NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` varchar(45) NOT NULL,
  `estado_ciudad` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_ciudad_bolivia`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad_bolivia`
--

LOCK TABLES `ciudad_bolivia` WRITE;
/*!40000 ALTER TABLE `ciudad_bolivia` DISABLE KEYS */;
INSERT INTO `ciudad_bolivia` VALUES (1,'La Paz',1),(2,'Oruro',1),(3,'Potosi',1),(4,'Cochabamba',1),(5,'Chuquisaca',1),(6,'Tarija',1),(7,'Pando',1),(8,'Beni',1),(9,'santa',1),(10,'preuab',0),(11,'sadasd asd',1),(12,'asdasf',1),(13,'tyrty rtyrtu',0),(14,'dddddd',0),(15,'Borrar',0),(16,'isable',1),(17,'panozo',1);
/*!40000 ALTER TABLE `ciudad_bolivia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad_bolivia_tienda_bolvia`
--

DROP TABLE IF EXISTS `ciudad_bolivia_tienda_bolvia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad_bolivia_tienda_bolvia` (
  `id_ciudad_bolivia` int NOT NULL,
  `id_tienda_bolivia` int NOT NULL,
  PRIMARY KEY (`id_ciudad_bolivia`,`id_tienda_bolivia`),
  KEY `fk_ciudad_bolivia_has_tienda_bolvia_tienda_bolvia1_idx` (`id_tienda_bolivia`),
  KEY `fk_ciudad_bolivia_has_tienda_bolvia_ciudad_bolivia1_idx` (`id_ciudad_bolivia`),
  CONSTRAINT `fk_ciudad_bolivia_has_tienda_bolvia_ciudad_bolivia1` FOREIGN KEY (`id_ciudad_bolivia`) REFERENCES `ciudad_bolivia` (`id_ciudad_bolivia`),
  CONSTRAINT `fk_ciudad_bolivia_has_tienda_bolvia_tienda_bolvia1` FOREIGN KEY (`id_tienda_bolivia`) REFERENCES `tienda_bolivia` (`id_tienda_bolivia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad_bolivia_tienda_bolvia`
--

LOCK TABLES `ciudad_bolivia_tienda_bolvia` WRITE;
/*!40000 ALTER TABLE `ciudad_bolivia_tienda_bolvia` DISABLE KEYS */;
/*!40000 ALTER TABLE `ciudad_bolivia_tienda_bolvia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizacion_tienda_aliexpress`
--

DROP TABLE IF EXISTS `cotizacion_tienda_aliexpress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizacion_tienda_aliexpress` (
  `id_cotizacion_tienda_aliexpress` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_tienda_aliexpress` int NOT NULL,
  `precio_unidad` float DEFAULT NULL,
  `url_producto_tienda_aliexpress` varchar(512) DEFAULT NULL,
  `fecha_cotizacion` datetime DEFAULT NULL,
  `pago_extra` float DEFAULT '0',
  `stock_actual` int DEFAULT '10000',
  `cantidad_producto` int DEFAULT NULL,
  `precio_cotizacion` float DEFAULT NULL,
  `descuento_cotizacion` float DEFAULT NULL,
  `total_cotizacion` float DEFAULT NULL,
  PRIMARY KEY (`id_cotizacion_tienda_aliexpress`),
  KEY `fk_producto_has_tienda_aliexpress_tienda_aliexpress1_idx` (`id_tienda_aliexpress`),
  KEY `fk_producto_has_tienda_aliexpress_producto1_idx` (`id_producto`),
  CONSTRAINT `fk_producto_has_tienda_aliexpress_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_producto_has_tienda_aliexpress_tienda_aliexpress1` FOREIGN KEY (`id_tienda_aliexpress`) REFERENCES `tienda_aliexpress` (`id_tienda_aliexpress`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizacion_tienda_aliexpress`
--

LOCK TABLES `cotizacion_tienda_aliexpress` WRITE;
/*!40000 ALTER TABLE `cotizacion_tienda_aliexpress` DISABLE KEYS */;
INSERT INTO `cotizacion_tienda_aliexpress` VALUES (1,10,3,32.41,'https://es.aliexpress.com/item/1005001621697965.html?spm=a2g0o.productlist.main.25.157125779nLQ3u&algo_pvid=53e8b7af-ef9b-4745-a4fa-bf5d5bc2e18e&algo_exp_id=53e8b7af-ef9b-4745-a4fa-bf5d5bc2e18e-12&pdp_npi=3%40dis%21BOB%2148.28%2140.07%21%21%21%21%21%40211bf31716830695409776068d07e4%2112000024948767464%21sea%21BO%211844935047&curPageLogUid=H61dnl0xcZIY','2023-01-01 00:00:00',4.23,4001,5,23.5,0.47,27.26);
/*!40000 ALTER TABLE `cotizacion_tienda_aliexpress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizacion_tienda_bolivia`
--

DROP TABLE IF EXISTS `cotizacion_tienda_bolivia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizacion_tienda_bolivia` (
  `id_cotizacion_tienda_bolivia` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_tienda_bolivia` int NOT NULL,
  `precio_unidad` float DEFAULT NULL,
  `url_producto_tienda_bolivia` varchar(145) DEFAULT NULL,
  `fecha_cotizacion` datetime DEFAULT NULL,
  `pago_extra` float DEFAULT '0',
  `stock_actual` int DEFAULT NULL,
  `cantidad_producto` int DEFAULT NULL,
  `precio_cotizacion` float DEFAULT NULL,
  `descuento_cotizacion` float DEFAULT NULL,
  `total_cotizacion` float DEFAULT NULL,
  `existe_producto_tienda` tinyint(1) DEFAULT (1),
  PRIMARY KEY (`id_cotizacion_tienda_bolivia`),
  KEY `id_producto` (`id_producto`),
  KEY `id_tienda_bolivia` (`id_tienda_bolivia`),
  CONSTRAINT `cotizacion_tienda_bolivia_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `cotizacion_tienda_bolivia_ibfk_2` FOREIGN KEY (`id_tienda_bolivia`) REFERENCES `tienda_bolivia` (`id_tienda_bolivia`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizacion_tienda_bolivia`
--

LOCK TABLES `cotizacion_tienda_bolivia` WRITE;
/*!40000 ALTER TABLE `cotizacion_tienda_bolivia` DISABLE KEYS */;
INSERT INTO `cotizacion_tienda_bolivia` VALUES (6,8,4,75,'https://epyelectronica.com/tienda/placas/espressif/esp32-wifi-bluetooth-38-pines/','2023-05-06 01:05:38',0,1000,1,1,0,75,1),(10,8,3,75,'https://tienda.sawers.com.bo/esp32-de-38-pines-wifi---bluetooth','2023-05-07 02:20:13',0,0,1,75,0,75,1),(11,8,2,75,'https://ventas-cochabamba.ardunel.com.bo/robotica/15-esp32-wifi-bluetooth-esp-wroom-32-nodemcu.html','2023-05-07 02:24:38',0,6,1,75,0,75,1),(12,10,2,120,'https://ventas-cochabamba.ardunel.com.bo/robotica/26-esp32-cam-wifi-bluetooth-ov2640-micro-usb.html','2023-05-07 02:30:39',0,0,1,120,0,120,1),(13,10,3,120,'','2023-05-08 16:04:11',0,0,1,120,0,120,0),(14,10,4,120,'','2023-05-08 16:11:07',0,0,1,120,0,120,0),(15,12,2,12,'https://ventas-sucre.ardunel.com.bo/robotica/239-modulo-step-up-booster-mt-3608-2a-2v-24v-dc-dc-elevador-tension-regulable.html','2023-05-08 16:59:41',0,3,1,12,0,12,1),(17,12,4,12,'https://epyelectronica.com/tienda/alimentacion/fuentes-de-alimentacion/modulo-mt3608-dc-dc-step-up/','2023-05-08 17:04:41',0,0,1,12,0,12,1),(19,12,3,12,'https://tienda.sawers.com.bo/mt3608-modulo-elevador-potencia-voltaje-boost?keyword=Mt360','2023-05-08 17:09:42',0,0,1,12,0,12,1);
/*!40000 ALTER TABLE `cotizacion_tienda_bolivia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `id_imagen` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `nombre_imagen` varchar(1024) DEFAULT NULL,
  `url_imagen` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`id_imagen`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
INSERT INTO `imagen` VALUES (3,23,'S13a8d434d8ac4d869afe7b165b693751M.jpg','archivos/646550d4c6327S13a8d434d8ac4d869afe7b165b693751M.jpg'),(4,24,'H43dbcdcb5e8b4bce93ddfbb0c136bf7ah.jpg','./img/64656c87309a2H43dbcdcb5e8b4bce93ddfbb0c136bf7ah.jpg'),(5,25,'S93bdfc017bc547f58c662731f182e79f0.jpg','./img/64656eea99a09S93bdfc017bc547f58c662731f182e79f0.jpg'),(6,33,'HTB1sC1iRFXXXXXtXXXXq6xXFXXXh.jpg','./img/64659c0bc0482HTB1sC1iRFXXXXXtXXXXq6xXFXXXh.jpg'),(7,34,'S024264004cf44e52ae49a0ac921f08d4y.jpg','./img/64659f640cc74S024264004cf44e52ae49a0ac921f08d4y.jpg'),(8,36,'H671b3c441a0743689210af2022bf6948f.jpg','./img/6465b4db2eb7dH671b3c441a0743689210af2022bf6948f.jpg'),(9,37,'S8be7abb249254c8c9d6db2b2519b1494u.jpg','./img/6465b72e0bc82S8be7abb249254c8c9d6db2b2519b1494u.jpg');
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(545) DEFAULT NULL,
  `marca_producto` varchar(45) DEFAULT NULL,
  `detalle_producto` varchar(645) DEFAULT NULL,
  `precio_estandar` float DEFAULT NULL,
  `url_producto` varchar(255) DEFAULT NULL,
  `estado_producto` tinyint DEFAULT '1',
  `img_defecto` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (6,'Arduino uno',NULL,'Entrada c',35,NULL,1,''),(7,'Arduino uno wifi',NULL,'Entrada USB',54,NULL,1,'https://m.media-amazon.com/images/I/61eyPE6adjL.jpg'),(8,'ESP32S CP2102',NULL,'38 pines entrada microUSB pines sin soldar, sin cable',70,NULL,1,'https://m.media-amazon.com/images/I/61eyPE6adjL.jpg'),(9,'Arduino Nano',NULL,'Enrada usp 328P',30,NULL,1,'https://m.media-amazon.com/images/I/61eyPE6adjL.jpg'),(10,'Esp32 Camara ',NULL,'Sin antena incluido el modulo serial CH340',120,NULL,1,''),(11,'Esp32 Camara',NULL,'Sin antena, sin modulo CH340 ',90,NULL,1,'https://m.media-amazon.com/images/I/61eyPE6adjL.jpg'),(12,'MT3608 Sin micro usb ',NULL,'',18,NULL,1,'https://m.media-amazon.com/images/I/61eyPE6adjL.jpg'),(23,'MT3608 con micro usb ',NULL,'Nuevo',15,NULL,1,'./img/646550d4c6327S13a8d434d8ac4d869afe7b165b693751M.jpg'),(24,'Cables dupont protoboard 20 cm M - M',NULL,'Kit completo de 40 unidades',20,NULL,1,'./img/64656c87309a2H43dbcdcb5e8b4bce93ddfbb0c136bf7ah.jpg'),(25,'Cables dupont protoboard 20 cm M - F',NULL,'Kit completo de 40 unidades',20,NULL,1,'./img/64656eea99a09S93bdfc017bc547f58c662731f182e79f0.jpg'),(33,'Cables dupont protoboard 20 cm F - F',NULL,'Kit completo 40 unidades',15,NULL,1,'./img/64659c0bc0482HTB1sC1iRFXXXXXtXXXXq6xXFXXXh.jpg'),(34,'Wemos D1 ESP32 entrada micro USB',NULL,'Convertidor serial CH340G ',70,NULL,1,'./img/64659f640cc74S024264004cf44e52ae49a0ac921f08d4y.jpg'),(36,'ESP8266 + memoria extra 32M Flash, usb-serial CH340G',NULL,'NodeMCU-M├│dulo WIFI V3 Lua',45,NULL,1,'./img/6465b4db2eb7dH671b3c441a0743689210af2022bf6948f.jpg'),(37,'Protoboard 83 puntos blanco',NULL,'Nuevo',25,NULL,1,'./img/6465b72e0bc82S8be7abb249254c8c9d6db2b2519b1494u.jpg');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_tienda_bolvia`
--

DROP TABLE IF EXISTS `producto_tienda_bolvia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_tienda_bolvia` (
  `id_producto_tienda_bolivia` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_tienda_bolivia` int NOT NULL,
  `precio_unidad` float DEFAULT NULL,
  `url_producto_tienda_bolivia` varchar(145) DEFAULT NULL,
  `stock_producto_tienda` int DEFAULT NULL,
  PRIMARY KEY (`id_producto_tienda_bolivia`),
  KEY `fk_producto_has_tienda_bolvia_tienda_bolvia1_idx` (`id_tienda_bolivia`),
  KEY `fk_producto_has_tienda_bolvia_producto1_idx` (`id_producto`),
  CONSTRAINT `fk_producto_has_tienda_bolvia_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_producto_has_tienda_bolvia_tienda_bolvia1` FOREIGN KEY (`id_tienda_bolivia`) REFERENCES `tienda_bolivia` (`id_tienda_bolivia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_tienda_bolvia`
--

LOCK TABLES `producto_tienda_bolvia` WRITE;
/*!40000 ALTER TABLE `producto_tienda_bolvia` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_tienda_bolvia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tienda_aliexpress`
--

DROP TABLE IF EXISTS `tienda_aliexpress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tienda_aliexpress` (
  `id_tienda_aliexpress` int NOT NULL AUTO_INCREMENT,
  `nombre_tienda` varchar(45) NOT NULL,
  `ranking_tienda` float DEFAULT NULL,
  `descripcion_tienda` varchar(2024) DEFAULT NULL,
  `url_tienda_aliexpress` varchar(145) DEFAULT NULL,
  `estado_tienda_aliexpress` tinyint DEFAULT '1',
  PRIMARY KEY (`id_tienda_aliexpress`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tienda_aliexpress`
--

LOCK TABLES `tienda_aliexpress` WRITE;
/*!40000 ALTER TABLE `tienda_aliexpress` DISABLE KEYS */;
INSERT INTO `tienda_aliexpress` VALUES (1,'Si Tai&SH Hengtai Store',97.3,'Venta de electronica','https://www.aliexpress.com/store/1168019?spm=a2g0s.8937474.0.0.557f2e0eWmDyzF',1),(2,'TZT-FIVE-STARS Store',98.1,'Venta de electronica','https://www.aliexpress.com/store/910410007?spm=a2g0s.8937474.0.0.557f2e0es4k4dZ',1),(3,'Estardyn Official Store',98.1,'Venta de electronica','https://es.aliexpress.com/store/910789017?spm=a2g0o.detail.0.0.2db3pfbjpfbjnM',1);
/*!40000 ALTER TABLE `tienda_aliexpress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tienda_bolivia`
--

DROP TABLE IF EXISTS `tienda_bolivia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tienda_bolivia` (
  `id_tienda_bolivia` int NOT NULL AUTO_INCREMENT,
  `nombre_tienda` varchar(45) NOT NULL,
  `ciudad_tienda` varchar(245) DEFAULT NULL,
  `url_tienda_bolivia` varchar(245) DEFAULT NULL,
  `estado_tienda_bolivia` tinyint DEFAULT '1',
  `departamentos` varchar(254) DEFAULT '{}',
  PRIMARY KEY (`id_tienda_bolivia`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tienda_bolivia`
--

LOCK TABLES `tienda_bolivia` WRITE;
/*!40000 ALTER TABLE `tienda_bolivia` DISABLE KEYS */;
INSERT INTO `tienda_bolivia` VALUES (2,'Ardunel',NULL,'https://ventas-cochabamba.ardunel.com.bo/index.php',1,'{Cochabamba,La Paz,Santa Cruz,Alto,Potosi}'),(3,'Sawers',NULL,'https://tienda.sawers.com.bo/',1,'{Cochabamba,La Paz,Santa Cruz,Tarija,Chuquisaca,Potosi,Alto}'),(4,'epyelectronica',NULL,'https://epyelectronica.com/',1,'{}'),(5,'tecBolivia',NULL,'http://tecbolivia.com/index.php/',1,'{}'),(6,'ecrobotics',NULL,'https://ecrobotics.com.bo/',1,'{}'),(7,'sselectronicacbba',NULL,'https://sselectronicacbba.com/',1,'{}'),(13,'facebook',NULL,'https://www.facebook.com/marketplace/',1,'{}'),(14,'i2c',NULL,'http://i2celectronica.com/',1,'{}'),(15,'marboltec',NULL,'https://marboltec.com/',1,'{}');
/*!40000 ALTER TABLE `tienda_bolivia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_ususario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(145) NOT NULL,
  `pass_usuario` varchar(45) DEFAULT NULL,
  `estado_usuario` tinyint DEFAULT '1',
  PRIMARY KEY (`id_ususario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'omarCasasolasMerida@gmail.com','8046987',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 17:48:16
