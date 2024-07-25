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
    $response['user']['userId']         = $_SESSION['userId'];
    $response['user']['userName']       = $_SESSION['userName'];
    $response['user']['userEmail']      = $_SESSION['userEmail'];
    $response['user']['userPhone']      = $_SESSION['userPhone'];
    $response['user']['userCpfOrCnpj']  = $_SESSION['userCpfOrCnpj'];
    $response['user']['userHasImage']   = $_SESSION['userHasImage'];
    
    $response['loggedIn']   = true;
    $response['success']    = true;
}

echo json_encode($response);