let numeroAleatorio, pontuacao, tentativas, nivelEscolhido;
let tentativasRestantes;

function boasvindas() {
    console.log("......BEM VINDO......");
    console.log("Jogo de adivinhação");
    console.log("Nesse jogo, você precisa acertar o número conforme o nível de dificuldade, com tentativas limitadas.");
    console.log("Sua pontuação começa em 100, e você perde 10 pontos a cada erro. Boa sorte!");
}

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selecionarNivel() {
    const nivel = document.getElementById("nivel").value;

    switch (nivel) {
        case '1':
            return { min: 0, max: 50, tentativas: 15 };
        case '2':
            return { min: 0, max: 150, tentativas: 5 };
        case '3':
            return { min: 0, max: 250, tentativas: 3 };
        default:
            alert("Nível inválido! Escolha um nível válido.");
            return null;
    }
}

function iniciarJogo() {
    const nivel = selecionarNivel();
    if (!nivel) return;

    nivelEscolhido = nivel;
    numeroAleatorio = gerarNumeroAleatorio(nivel.min, nivel.max);
    tentativasRestantes = nivel.tentativas;
    pontuacao = 100;

    document.getElementById("input-area").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("resultado").innerText = "";
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

function enviarPalpite() {
    const palpite = parseInt(document.getElementById("palpite").value);

    if (isNaN(palpite)) {
        document.getElementById("resultado").innerText = "Por favor, insira um número válido!";
        return;
    }

    tentativasRestantes--;

    if (palpite === numeroAleatorio) {
        document.getElementById("resultado").innerText = `Parabéns! Você acertou o número em ${nivelEscolhido.tentativas - tentativasRestantes} tentativas.`;
        mostrarPontuacao();
        fimDeJogo(true);
    } else {
        pontuacao -= 10;
        if (tentativasRestantes === 0) {
            document.getElementById("resultado").innerText = `Suas tentativas acabaram! O número era: ${numeroAleatorio}.`;
            mostrarPontuacao();
            fimDeJogo(false);
        } else {
            document.getElementById("resultado").innerText = palpite > numeroAleatorio ? `ERRADO - O número é menor! Restam ${tentativasRestantes} tentativas` : `ERRADO - O número é maior!  Restam ${tentativasRestantes} tentativas`;
            mostrarPontuacao();
        }
    }
}

function mostrarPontuacao() {
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

function fimDeJogo(acertou) {
    document.getElementById("jogar-novamente").style.display = "block";
    document.getElementById("input-area").style.display = "none";
    if (acertou) {
        alert("Parabéns! Você venceu!");
    } else {
        alert(`Fim de jogo, suas tentativas acabaram! O número era: ${numeroAleatorio}. Tente novamente.`);
    }
}

function reiniciarJogo() {
    document.getElementById("palpite").value = "";
    document.getElementById("jogar-novamente").style.display = "none";
    document.getElementById("game").style.display = "block";
}
