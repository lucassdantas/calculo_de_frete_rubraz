<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './vendor/phpmailer/phpmailer/src/Exception.php';
require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
require './vendor/phpmailer/phpmailer/src/SMTP.php';

function sendEmail($username, $cpfCnpj, $phone, $userEmail) {
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

        // Define o charset para UTF-8
        $mail->CharSet = 'UTF-8';
        
        // Remetente
        $mail->setFrom($email, 'Rubraz Lajes');

        // Destinatário principal
        $mail->addAddress('comercial@rubrazlajes.com');

        // Destinatário em cópia oculta
        $mail->addBCC('lucas.dantas@rdexclusive.com.br');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = 'Nova Conta Criada';
        $mail->Body    = "<p>Olá, Rubraz!</p>
                          <p>Uma nova conta foi criada no seu sistema de cálculo!</p>
                          <p><strong>Detalhes da Conta:</strong></p>
                          <p><strong>Nome:</strong> $username</p>
                          <p><strong>CPF/CNPJ:</strong> $cpfCnpj</p>
                          <p><strong>Telefone:</strong> $phone</p>
                          <p><strong>Email:</strong> $userEmail</p>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    }
}
?>
