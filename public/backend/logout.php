<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php';
try {
    // Destrói todas as variáveis de sessão
    $_SESSION = array();

    // Se você deseja destruir o cookie de sessão, também deve definir o tempo de expiração do cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finalmente, destrói a sessão
    session_destroy();

    echo json_encode(['success' => true, 'message' => 'Deslogado com sucesso.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao deslogar: ' . $e->getMessage()]);
}
