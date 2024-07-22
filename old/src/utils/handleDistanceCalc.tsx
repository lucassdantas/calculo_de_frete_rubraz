export function handleDistanceCalc (e:any) {
    e.preventDefault();

    var form = e.target;
    var formData = new FormData(form);

    fetch('calcular_distancia.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var resultado = document.getElementById('resultado');
        if(data.status === 'OK') {
            resultado.textContent = 'A distância entre a origem e o destino é: ' + data.distancia;
        } else {
            resultado.textContent = 'Desculpe, não foi possível calcular a distância. Tente novamente.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
};
