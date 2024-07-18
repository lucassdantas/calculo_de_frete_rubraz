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

$userName = clean_input($data['userName']);
$userBirthday = clean_input($data['userBirthday']);
$userPhone = clean_input($data['userPhone']);
$userEmail = clean_input($data['userEmail']);
$userCnpj = clean_input($data['userCnpj']);
$userCpf = clean_input($data['userCpf']);
$userPassword = clean_input($data['userPassword']);
$userCreatedAt = date('Y-m-d H:i:s');

// Hash da senha
$userPasswordHashed = password_hash($userPassword, PASSWORD_DEFAULT);

try {
    // Conectar ao banco de dados
    $database = new Database();
    $pdo = $database->getConnection();

    // Preparar a instrução SQL
    $sql = 'INSERT INTO rubraz_users (userName, userBirthday, userPhone, userEmail, userCnpj, userCpf, userPassword, userCreatedAt) 
            VALUES (:userName, :userBirthday, :userPhone, :userEmail, :userCnpj, :userCpf, :userPassword, :userCreatedAt)';
    $stmt = $pdo->prepare($sql);

    // Vincular parâmetros
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':userBirthday', $userBirthday);
    $stmt->bindParam(':userPhone', $userPhone);
    $stmt->bindParam(':userEmail', $userEmail);
    $stmt->bindParam(':userCnpj', $userCnpj);
    $stmt->bindParam(':userCpf', $userCpf);
    $stmt->bindParam(':userPassword', $userPasswordHashed);
    $stmt->bindParam(':userCreatedAt', $userCreatedAt);

    // Executar a instrução
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Conta criada com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao criar a conta.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
