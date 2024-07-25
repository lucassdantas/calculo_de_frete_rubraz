<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './vendor/phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

function sendPasswordResetEmail($userEmail, $resetToken) {
    require_once './config/emailCredentials.php';
    $mail = new PHPMailer(true);

    // Construir a URL dinamicamente
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $path = dirname($_SERVER['REQUEST_URI']); 
    $resetLink = "{$protocol}://{$host}{$path}/resetPassword?token={$resetToken}";

    try {
        // Configurações do servidor
        $mail->isSMTP();
        $mail->Host = $smtpHost; // Substitua pelo seu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = $email; // Substitua pelo seu e-mail SMTP
        $mail->Password = $password; // Substitua pela sua senha SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Porta SMTP para TLS

        // Configurações do remetente e destinatário
        $mail->setFrom($email, 'RD Exclusive'); // Substitua pelo seu e-mail e nome
        $mail->addAddress($userEmail); // E-mail do destinatário

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = 'Redefinição de senha';
        $mail->Body    = 'Clique no link para redefinir sua senha: <a href="' . $resetLink . '">Redefinir Senha</a>';

        $mail->send();
        echo 'O e-mail de redefinição de senha foi enviado.';
    } catch (Exception $e) {
        echo "O e-mail não pôde ser enviado. Erro: {$mail->ErrorInfo}";
    }
}
