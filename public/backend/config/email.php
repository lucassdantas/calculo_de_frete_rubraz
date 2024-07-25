<?php

require_once './emailCredentials.php';
function sendEmail($to, $subject, $message) {
    // Defina o remetente do e-mail
    $from = 'your-email@example.com';
    $fromName = 'Seu Nome';

    // Defina os cabeçalhos do e-mail
    $headers = "From: $fromName <$from>\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";

    // Envia o e-mail
    return mail($to, $subject, $message, $headers);
}
?>
