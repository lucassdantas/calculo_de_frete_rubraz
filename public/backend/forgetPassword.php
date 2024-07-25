<?php
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';
include_once './email.php';

$data = json_decode(file_get_contents('php://input'), true);
$userEmail = $data['email'];
try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Verifica se o e-mail do usuário existe
    $sql = 'SELECT userId FROM rubraz_users WHERE userEmail = :email';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $userEmail]);

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        // Gera um token de redefinição de senha
        $resetToken = bin2hex(random_bytes(16));
        $resetTokenExpires = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Salva o token e a data de expiração no banco de dados
        $sql = 'UPDATE rubraz_users SET userResetToken = :resetToken, userResetTokenExpires = :resetTokenExpires WHERE userId = :userId';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'resetToken' => $resetToken,
            'resetTokenExpires' => $resetTokenExpires,
            'userId' => $user['userId']
        ]);

        // Envia o e-mail de redefinição de senha
        sendPasswordResetEmail($userEmail, $resetToken);

        echo json_encode(['success' => true, 'message' => 'O e-mail de redefinição de senha foi enviado.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'E-mail não encontrado.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()]);
}
