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
$userId = clean_input($_POST['userId'] ?? '');
$userName = clean_input($_POST['userName'] ?? '');
$userPhone = clean_input($_POST['userPhone'] ?? '');
$userCpfOrCnpj = clean_input($_POST['userCpfOrCnpj'] ?? '');
$userEmail = clean_input($_POST['userEmail'] ?? '');
$userPassword = clean_input($_POST['userPassword'] ?? '');
// Verifique se a senha foi fornecida e faça o hash se necessário
$userPasswordHashed = !empty($userPassword) ? password_hash($userPassword, PASSWORD_DEFAULT) : null;

try {
    // Conectar ao banco de dados
    $database = new Database();
    $pdo = $database->getConnection();

    // Preparar a instrução SQL
    $sql = 'UPDATE rubraz_users SET userName = :userName, userPhone = :userPhone, userCpfOrCnpj = :userCpfOrCnpj, userEmail = :userEmail' . 
           (!empty($userPasswordHashed) ? ', userPassword = :userPassword' : '') . 
           ' WHERE userId = :userId';
    $stmt = $pdo->prepare($sql);

    // Vincular parâmetros
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':userPhone', $userPhone);
    $stmt->bindParam(':userCpfOrCnpj', $userCpfOrCnpj);
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
