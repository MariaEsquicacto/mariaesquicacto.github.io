function showContent(color) {
    let contentText = '';
    switch(color) {
        case 'vermelho':
            contentText = 'Esta cor representa as ondas de frequência mais baixa dentro do espectro visível. Tendo 700nm de comprimento';
            break;
        case 'laranja':
            contentText = 'É uma cor de frequência um pouco mais alta que o vermelho. Tendo 600nm de comprimento';
            break;
        case 'amarelo':
            contentText = 'Frequência um pouco mais alta que o laranja. Tendo 580nm de comprimento';
            break;
        case 'verde':
            contentText = 'Esta cor está no meio do espectro visível. Tendo 550nm de comprimento';
            break;
        case 'azul claro':
            contentText = 'Esta cor tem uma frequência mais alta que o verde. Tendo 475nm de comprimento';
            break;
        case 'azul':
            contentText = 'Frequência alta, acima do verde e abaixo do violeta. Tendo 450nm de comprimento';
            break;
        case 'violeta':
            contentText = 'Esta é a cor de frequência mais alta no espectro visível. Tendo 400nm de comprimento';
            break;
        default:
            contentText = 'Escolha uma cor para ver mais detalhes.';
    }
    document.getElementById('modalText').innerText = contentText;
    document.getElementById('modal').style.display = 'block';
}


function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// conteudo do espectro


const botao_radio = document.querySelector("#butonradio");
const radio_modal = document.querySelector("#conteudoradio-modal");
 
botao_radio.addEventListener('click', () =>{
    radio_modal.classList.toggle("esconder")
});


const botao_micro = document.querySelector("#butonmicro");
const micro_modal = document.querySelector("#conteudomicro-modal");
 
botao_micro.addEventListener('click', () =>{
    micro_modal.classList.toggle("esconder")
});

const botao_infra = document.querySelector("#butoninfravermelho");
const infra_modal = document.querySelector("#conteudoinfravermelho-modal");
 
botao_infra.addEventListener('click', () =>{
    infra_modal.classList.toggle("esconder")
});

const botao_luz = document.querySelector("#butonluz");
const luz_modal = document.querySelector("#conteudoluz-modal");
 
botao_luz.addEventListener('click', () =>{
    luz_modal.classList.toggle("esconder")
});

const botao_ultra = document.querySelector("#butonultravioleta");
const ultra_modal = document.querySelector("#conteudoultravioleta-modal");
 
botao_ultra.addEventListener('click', () =>{
    ultra_modal.classList.toggle("esconder")
});

const botao_raiox = document.querySelector("#butonraiox");
const raiox_modal = document.querySelector("#conteudoraiox-modal");
 
botao_raiox.addEventListener('click', () =>{
    raiox_modal.classList.toggle("esconder")
});

const botao_raiog = document.querySelector("#butonraiog");
const raiog_modal = document.querySelector("#conteudoraiog-modal");
 
botao_raiog.addEventListener('click', () =>{
    raiog_modal.classList.toggle("esconder")
});


function mostrarContent(color) {
    let contentretangulo = '';
    switch(color) {
        case 'pourple':
            contentretangulo = 'Penetram mais profundamente na pele, sendo associadas ao envelhecimento da pele, como rugas e manchas (efeito fotoenvelhecimento). São menos energéticas do que UVB, mas ainda podem contribuir para o risco de câncer de pele com exposição prolongada.';
            break;
        case 'roxo':
            contentretangulo = 'São mais energéticas e causam queimaduras solares, sendo associadas ao dano direto ao DNA das células da pele, aumentando o risco de câncer de pele. É penetrada superficialmente na pele. Sua intensidade varia conforme a estação, horário do dia e altitude, sendo mais intensas em áreas tropicais e ao meio-dia.';
            break;
        case 'azul':
            contentretangulo = 'São as mais energéticas e potencialmente mais perigosas. Felizmente, são quase totalmente bloqueadas pela camada de ozônio na atmosfera terrestre e não chegam à superfície. São usadas em dispositivos artificiais, como lâmpadas germicidas, para esterilização e desinfecção (pois matam bactérias e vírus).';
            break;
        default:
            contentretangulo = 'Escolha uma cor para ver mais detalhes.';
    }
    document.getElementById('modalTextRetangulo').innerText = contentretangulo;
    document.getElementById('modalretangulo').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalretangulo').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modalretangulo');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

