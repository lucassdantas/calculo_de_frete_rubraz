<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once './env.php'; //apiKey
    $origem = urlencode('Estr. Rio São Paulo, 42 - QD 1 - Campo Grande, Rio de Janeiro - RJ, 23087-005, Brasil ');
    $destino = urlencode($_POST['destino']);

    $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=$origem&destinations=$destino&key=$apiKey";

    // Inicia a sessão cURL
    $ch = curl_init();
    
    // Configura as opções do cURL
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
    // Executa a requisição cURL
    $json = curl_exec($ch);

    // Verifica se houve erro
    if ($json === false) {
        $error = curl_error($ch);
        echo json_encode(['status' => 'ERROR', 'message' => 'Erro ao acessar a API: ' . $error]);
    } else {
        // Decodifica o JSON
        $data = json_decode($json, true);

        if ($data['status'] == "OK" && $data['rows'][0]['elements'][0]['status'] == "OK") {
            $distancia = $data['rows'][0]['elements'][0]['distance']['text'];
            echo json_encode(['status' => 'OK', 'distance' => $distancia]);
        } else {
            $errorMessage = $data['error_message'] ?? 'Erro desconhecido';
            echo json_encode(['status' => 'ERROR', 'message' => 'Erro na resposta da API: ' . $errorMessage]);
        }
    }
    
    // Fecha a sessão cURL
    curl_close($ch);
}
?>
