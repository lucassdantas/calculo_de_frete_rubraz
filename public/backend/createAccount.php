<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';

$data = $_POST;

// Obtém os dados do formulário
$username = trim($data['username']);
$password = trim($data['password']);
$email = trim($data['email']);
$cpfCnpj = trim($data['cpfCnpj']);
$phone = trim($data['phone']);

// Valida se todos os campos foram preenchidos
if (empty($username) || empty($password) || empty($email) || empty($cpfCnpj) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios.']);
    exit();
}

try {
    $database = new Database();
    $pdo = $database->getConnection();

    // Verifica se o email já está registrado
    $sql = 'SELECT userEmail FROM rubraz_users WHERE userEmail = :email';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'O email já está em uso.']);
        exit();
    }

    // Insere o novo usuário no banco de dados
    $sql = 'INSERT INTO rubraz_users (userName, userEmail, userPhone, userCpfOrCnpj, userPassword, userHasImage, userDateOfCreation) 
            VALUES (:username, :email, :phone, :cpfCnpj, :password, :hasImage, NOW())';
    $stmt = $pdo->prepare($sql);

    // Hash da senha
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt->execute([
        'username' => $username,
        'email' => $email,
        'phone' => $phone,
        'cpfCnpj' => $cpfCnpj,
        'password' => $hashedPassword,
        'hasImage' => 0,  // Supondo que o usuário não tenha uma foto por padrão
    ]);

    $userId = $pdo->lastInsertId();

    // Se houver uma foto, salva no servidor
    if (!empty($_FILES['photo']['tmp_name'])) {
        $photo = $_FILES['photo'];
        $photoPath = "../public/userImages/" . $userId . ".jpg";
        move_uploaded_file($photo['tmp_name'], $photoPath);
        
        // Atualiza a tabela para indicar que o usuário tem uma foto
        $sql = 'UPDATE rubraz_users SET userHasImage = 1 WHERE userId = :userId';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['userId' => $userId]);
    }

    echo json_encode(['success' => true, 'message' => 'Conta criada com sucesso!']);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao criar a conta: ' . $e->getMessage()]);
}
