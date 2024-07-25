<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';
include_once './config/email.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];

// Valida o e-mail
if (empty($email)) {
    echo json_encode(['success' => false, 'message' => 'O e-mail é obrigatório.']);
    exit();
}

try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Verifica se o e-mail existe
    $sql = 'SELECT userId FROM rubraz_users WHERE userEmail = :email';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() == 0) {
        echo json_encode(['success' => false, 'message' => 'Nenhum usuário encontrado com esse e-mail.']);
        exit();
    }

    // Gera um token de recuperação único
    $resetToken = bin2hex(random_bytes(16));

    // Salva o token no banco de dados
    $sql = 'UPDATE rubraz_users SET resetToken = :token WHERE userEmail = :email';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['token' => $resetToken, 'email' => $email]);

    // Configura o link de recuperação de senha
    $resetLink = "http://yourdomain.com/resetPassword.php?token=$resetToken";

    // Cria a mensagem do e-mail
    $subject = "Recuperação de Senha";
    $message = "
        <html>
        <head>
            <title>Recuperação de Senha</title>
        </head>
        <body>
            <p>Você solicitou a recuperação de senha.</p>
            <p>Clique no link abaixo para definir uma nova senha:</p>
            <p><a href='$resetLink'>$resetLink</a></p>
        </body>
        </html>
    ";

    // Envia o e-mail
    if (sendEmail($email, $subject, $message)) {
        echo json_encode(['success' => true, 'message' => 'E-mail de recuperação enviado com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Houve um erro ao enviar o e-mail.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
