<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recebe o corpo da solicitação JSON e converte em um array associativo
    $input = json_decode(file_get_contents('php://input'), true);

    // Verifica se o campo 'completeAddress' foi enviado
    if (isset($input['completeAddress']) && !empty($input['completeAddress'])) {
        require_once './env.php'; // Carregar a chave da API

        // Certifique-se de que o endereço está devidamente codificado
        $origem = urlencode('Estr. Rio São Paulo, 42 - QD 1 - Campo Grande, Rio de Janeiro - RJ, 23087-005, Brasil');
        $destino = urlencode($input['completeAddress']);

        // Verifica se o endereço foi codificado corretamente
        if (!$origem || !$destino) {
            echo json_encode(['status' => 'ERROR', 'message' => 'Erro na codificação do endereço.']);
            exit;
        }

        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=$origem&destinations=$destino&key=$apiKey";

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $json = curl_exec($ch);

        if ($json === false) {
            $error = curl_error($ch);
            echo json_encode(['status' => 'ERROR', 'message' => 'Erro ao acessar a API: ' . $error]);
        } else {
            $data = json_decode($json, true);

            if ($data['status'] == "OK" && $data['rows'][0]['elements'][0]['status'] == "OK") {
                $distancia = $data['rows'][0]['elements'][0]['distance'];
                echo json_encode(['status' => 'OK', 'distance' => $distancia['text'], 'distanceValue' => $distancia['value']]);
            } else {
                $errorMessage = $data['error_message'] ?? 'Erro desconhecido';
                echo json_encode(['status' => 'ERROR', 'message' => 'Erro na resposta da API: ' . $errorMessage]);
            }
        }

        curl_close($ch);
    } else {
        echo json_encode(['status' => 'ERROR', 'message' => 'Endereço incompleto não foi enviado.']);
    }
} else {
    echo json_encode(['status' => 'ERROR', 'message' => 'Método de solicitação inválido.']);
}
?>
