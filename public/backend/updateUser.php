<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';

// Função para limpar dados de entrada
function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Obter dados do POST
$data = json_decode(file_get_contents('php://input'), true);

$userId = clean_input($data['userId']);
$userName = clean_input($data['userName']);
$userPhone = clean_input($data['userPhone']);
$userCnpj = clean_input($data['userCnpj']);
$userEmail = clean_input($data['userEmail']);
$userPassword = clean_input($data['userPassword']);

// Verifique se a senha foi fornecida e faça o hash se necessário
$userPasswordHashed = !empty($userPassword) ? password_hash($userPassword, PASSWORD_DEFAULT) : null;

try {
    // Conectar ao banco de dados
    $database = new Database();
    $pdo = $database->getConnection();

    // Preparar a instrução SQL
    $sql = 'UPDATE users SET userName = :userName, userPhone = :userPhone, userCnpj = :userCnpj, userEmail = :userEmail' . 
           (!empty($userPasswordHashed) ? ', userPassword = :userPassword' : '') . 
           ' WHERE userId = :userId';
    $stmt = $pdo->prepare($sql);

    // Vincular parâmetros
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':userPhone', $userPhone);
    $stmt->bindParam(':userCnpj', $userCnpj);
    $stmt->bindParam(':userEmail', $userEmail);
    $stmt->bindParam(':userId', $userId);
    if (!empty($userPasswordHashed)) {
        $stmt->bindParam(':userPassword', $userPasswordHashed);
    }

    // Executar a instrução
    $stmt->execute();

    // Verifique se foi feito upload de uma nova foto
    if (isset($_FILES['userPhoto'])) {
        $file = $_FILES['userPhoto'];
        $targetDir = "../userImages/";
        $targetFile = $targetDir . basename($userId . ".jpg");

        // Mova o arquivo para o diretório de upload
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            echo json_encode(['status' => 'success', 'message' => 'Foto atualizada com sucesso.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Falha ao atualizar a foto.']);
        }
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Dados atualizados com sucesso.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Falha na conexão: ' . $e->getMessage()]);
}
