<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Headers: Content-Type');

$response = array('loggedIn' => false);

if (isset($_SESSION['user_id'])) {
    $response['loggedIn'] = true;
}

echo json_encode($response);
?>
