<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';

// Recebe os dados JSON
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Prepara a consulta SQL para buscar o usuário pelo email
    $sql = 'SELECT userId, userName, userEmail, userPhone, userCpfOrCnpj, userPassword, userHasImage, userDateOfCreation 
            FROM rubraz_users 
            WHERE userEmail = :email';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);

    $response = array('success' => false);

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica se a senha fornecida corresponde ao hash armazenado
        if (password_verify($password, $user['userPassword'])) {
            $_SESSION['userId'] = $user['userId'];
            $_SESSION['userName'] = $user['userName'];
            $_SESSION['userEmail'] = $user['userEmail'];
            $_SESSION['userPhone'] = $user['userPhone'];
            $_SESSION['userCpfOrCnpj'] = $user['userCpfOrCnpj'];
            $_SESSION['userHasImage'] = $user['userHasImage'];
            
            $response['user'] = $user;
            $response['success'] = true;
        } else {
            $response['message'] = 'Senha incorreta.';
        }
    } else {
        $response['message'] = 'Usuário não encontrado.';
    }

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Falha na conexão: ' . $e->getMessage()]);
}
