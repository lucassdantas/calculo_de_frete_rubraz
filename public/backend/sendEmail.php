<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './vendor/phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

function sendEmail($username, $cpfCnpj, $phone, $email) {
    require_once './config/emailCredentials.php';
    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor
        $mail->isSMTP();
        $mail->Host       = $smtpHost;
        $mail->SMTPAuth   = true;
        $mail->Username   = $email;
        $mail->Password   = $password; // Defina a senha correta aqui
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remetente
        $mail->setFrom($email, 'Rubraz Lajes');

        // Destinatário
        $mail->addAddress('lucas.dantas@rdexclusive.com.br', 'Lucas Dantas');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = 'Nova Conta Criada';
        $mail->Body    = "<p>Olá, Rubraz!</p>
                          <p>Uma nova conta foi criada no seu sistema de cálculo!</p>
                          <p><strong>Detalhes da Conta:</strong></p>
                          <p><strong>Nome:</strong> $username</p>
                          <p><strong>CPF/CNPJ:</strong> $cpfCnpj</p>
                          <p><strong>Telefone:</strong> $phone</p>
                          <p><strong>Email:</strong> $email</p>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    }
}
?>
