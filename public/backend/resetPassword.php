<?php
// resetPassword.php

header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';

$token = $_GET['token'];
$newPassword = $_POST['password'];

try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Verificar token
    $sql = 'SELECT userId, expires FROM password_resets WHERE token = :token';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['token' => $token]);

    if ($stmt->rowCount() > 0) {
        $reset = $stmt->fetch(PDO::FETCH_ASSOC);
        $userId = $reset['userId'];
        $expires = $reset['expires'];

        if (new DateTime() > new DateTime($expires)) {
            echo json_encode(['success' => false, 'message' => 'Token expirado']);
            exit;
        }

        // Atualizar senha
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $sql = 'UPDATE rubraz_users SET userPassword = :password WHERE userId = :userId';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['password' => $hashedPassword, 'userId' => $userId]);

        // Remover token
        $sql = 'DELETE FROM password_resets WHERE token = :token';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['token' => $token]);

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Token inválido']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}
?>
