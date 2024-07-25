<?php
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';
$data = json_decode(file_get_contents('php://input'), true);
$newPassword = password_hash($data['password'], PASSWORD_BCRYPT);
$resetToken = $data['token'];

try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Verifica se o token é válido
    $sql = 'SELECT userId FROM rubraz_users WHERE userResetToken = :resetToken AND userResetTokenExpires > NOW()';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['resetToken' => $resetToken]);

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Atualiza a senha do usuário
        $sql = 'UPDATE rubraz_users SET userPassword = :newPassword, userResetToken = NULL, userResetTokenExpires = NULL WHERE userId = :userId';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'newPassword' => $newPassword,
            'userId' => $user['userId']
        ]);

        echo json_encode(['success' => true, 'message' => 'Senha redefinida com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Token de redefinição de senha inválido ou expirado.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
}
