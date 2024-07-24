<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 

if (!isset($_SESSION['userId'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}
if (isset($_SESSION['userId'])) {
    $response['loggedIn']   = true;
    $response['success']    = true;
}

echo json_encode($response);