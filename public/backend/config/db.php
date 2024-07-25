<?php

require_once './databaseCredentials.php';
class Database {
    private $host =$devCredentials['dbHost'];
    private $db_name =$devCredentials['dbName'];
    private $db_username =$devCredentials['dbUser'];
    private $db_password =$devCredentials['dbPassword'];
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->db_username, $this->db_password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
