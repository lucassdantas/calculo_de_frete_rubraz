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
    $sql = 'UPDATE rubraz_users SET userName = :userName, userPhone = :userPhone, userCpfOrCnpj = :userCpfOrCnpj' . 
           (!empty($userPasswordHashed) ? ', userPassword = :userPassword' : '') . 
           ' WHERE userId = :userId';
    $stmt = $pdo->prepare($sql);

    // Vincular parâmetros
    $stmt->bindParam(':userName', $userName);
    $stmt->bindParam(':userPhone', $userPhone);
    $stmt->bindParam(':userCpfOrCnpj', $userCpfOrCnpj);
    $stmt->bindParam(':userId', $userId);
    if (!empty($userPasswordHashed)) {
        $stmt->bindParam(':userPassword', $userPasswordHashed);
    }

    // Executar a instrução
    $stmt->execute();

    // Atualizar variáveis de sessão
    $_SESSION['userId'] = $userId;
    $_SESSION['userName'] = $userName;
    $_SESSION['userPhone'] = $userPhone;
    $_SESSION['userCpfOrCnpj'] = $userCpfOrCnpj;
    $_SESSION['userEmail'] = $userEmail;

    echo json_encode([
      'status' => 'success',
      'message' => 'Dados atualizados com sucesso.',
      'user' => [
        'userId' => $_SESSION['userId'],
        'userName' => $_SESSION['userName'],
        'userPhone' => $_SESSION['userPhone'],
        'userCpfOrCnpj' => $_SESSION['userCpfOrCnpj'],
        'userEmail' => $_SESSION['userEmail']
      ]
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Falha na conexão: ' . $e->getMessage()]);
}
?>
