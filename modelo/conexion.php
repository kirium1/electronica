
<?php
    class Conexion{
        protected $connexion_bd;
        public function Conexion(){
            try {
                $usuario = "root";
                $contrasenia = "kirium";
                $this->connexion_bd = new PDO('mysql:host=localhost;charset=utf8mb4;dbname=electronica;port=3307',$usuario,$contrasenia);

                // $usuario = "uasrxz4qrh1xinnr";
                // $contrasenia = "WSM9ks7dz2mQJcZ9DUCy";
                // $this->connexion_bd = new PDO('mysql:host=bxqsxwdoasmaf0zorzvi-mysql.services.clever-cloud.com;dbname=bxqsxwdoasmaf0zorzvi;port=3306',$usuario,$contrasenia);

                // $usuario = "kiridvxr_root"; 
                // $contrasenia = "kiridvxr_kirium";
                // $this->connexion_bd = new PDO('mysql:host=premium203.web-hosting.com;charset=utf8mb4;dbname=kiridvxr_boutique;port=3306',$usuario,$contrasenia);
                
                // $usuario = "soccpaln_root"; 
                // $contrasenia = "soccpaln_pass";
                // $this->connexion_bd = new PDO('mysql:host=premium180.web-hosting.com;charset=utf8mb4;dbname=soccpaln_reserva;port=3306',$usuario,$contrasenia);
                
                $this->connexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $this->connexion_bd;
            }catch (PDOException $e) {
                echo "Errod aqui";
                print "¡Error!: " . $e->getMessage() . "<br/>";
                die();
            }
        }
    }

?>
    