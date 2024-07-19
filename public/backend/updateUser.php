<?php
// Defina o cabeçalho para permitir solicitações de qualquer origem
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Conecte-se ao banco de dados (ajuste os parâmetros conforme necessário)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Receba os dados do formulário
$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$userCnpj = $_POST['userCnpj'];
$userEmail = $_POST['userEmail'];
$userPassword = $_POST['userPassword'];
$userId = $_POST['userId']; // Certifique-se de enviar o userId do frontend

// Atualize os dados do usuário no banco de dados
$sql = "UPDATE users SET userName=?, userPhone=?, userCnpj=?, userEmail=?, userPassword=? WHERE userId=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $userName, $userPhone, $userCnpj, $userEmail, $userPassword, $userId);
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

// Feche a conexão
$stmt->close();
$conn->close();
