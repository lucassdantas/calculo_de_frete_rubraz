<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

$token = $data['token'];
$newPassword = $data['password'];

if (empty($token) || empty($newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Token e senha são obrigatórios.']);
    exit();
}

try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Verifica se o token é válido
    $sql = 'SELECT userId FROM rubraz_users WHERE resetToken = :token';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['token' => $token]);

    if ($stmt->rowCount() == 0) {
        echo json_encode(['success' => false, 'message' => 'Token inválido.']);
        exit();
    }

    // Obtém o userId
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $userId = $user['userId'];

    // Faz o hash da nova senha
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    // Atualiza a senha e remove o token
    $sql = 'UPDATE rubraz_users SET userPassword = :password, resetToken = NULL WHERE userId = :userId';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['password' => $hashedPassword, 'userId' => $userId]);

    echo json_encode(['success' => true, 'message' => 'Senha alterada com sucesso.']);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
