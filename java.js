let energia = 100;
let uso = 1;
let camAtual = 1;
let portaFechada = false;
let luzLigada = false;
let gameActive = true;

// Configuração das Câmeras e Posição do "Inimigo"
const cams = {
    1: { nome: "CAM 01: GALERIA GREGA", inimigo: false },
    2: { nome: "CAM 02: CORREDOR SUL", inimigo: false },
    3: { nome: "CAM 03: DEPÓSITO", inimigo: true } // A estátua começa aqui
};

// --- LÓGICA DE ENERGIA ---
function atualizarEnergia() {
    if (!gameActive) return;

    if (energia > 0) {
        // O consumo depende de quantos aparelhos estão ligados
        energia -= (uso * 0.1); 
        document.getElementById('power').innerText = Math.floor(energia);
        
        // Atualiza as barrinhas de uso no UI
        document.getElementById('usage').innerText = ">".repeat(uso);
    } else {
        gameOver("ACABOU A ENERGIA!");
    }
}

setInterval(atualizarEnergia, 1000); // Consome energia a cada segundo

// --- CONTROLES ---
function mudarCam(id) {
    camAtual = id;
    document.getElementById('cam-name').innerText = cams[id].nome;
    verificarInimigo();
}

function togglePorta() {
    portaFechada = !portaFechada;
    const btn = document.getElementById('btn-porta');
    btn.style.background = portaFechada ? "#800" : "#333";
    uso = portaFechada ? uso + 1 : uso - 1;
}

function ligarLuz() {
    luzLigada = true;
    uso++;
    document.getElementById('screen').style.filter = "brightness(1.5)";
    document.getElementById('btn-luz').style.background = "#880";
}

function desligarLuz() {
    luzLigada = false;
    uso--;
    document.getElementById('screen').style.filter = "brightness(1)";
    document.getElementById('btn-luz').style.background = "#333";
}

// Atalhos de Teclado
window.addEventListener('keydown', (e) => {
    if (e.code === "Space") togglePorta();
    if (e.key.toLowerCase() === "l") ligarLuz();
});
window.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === "l") desligarLuz();
});

// --- INTELIGÊNCIA ARTIFICIAL (O MONSTRO) ---
let posicaoInimigo = 3; // Começa na Cam 3

function moverInimigo() {
    if (!gameActive) return;

    // Chance de se mover (sorteio)
    if (Math.random() > 0.5) {
        if (posicaoInimigo > 0) {
            posicaoInimigo--; // Ele vai se aproximando da sala (0)
        }
    }

    if (posicaoInimigo === 0) {
        // Ele chegou na sua porta!
        if (!portaFechada) {
            gameOver("VOCÊ FOI PEGO!");
        } else {
            // Se a porta estiver fechada, ele volta para a Cam 3
            posicaoInimigo = 3;
        }
    }
    verificarInimigo();
}

setInterval(moverInimigo, 5000); // Tenta se mover a cada 5 segundos

function verificarInimigo() {
    const display = document.getElementById('statue-overlay');
    // Se o inimigo estiver na câmera que você está olhando
    if (posicaoInimigo === camAtual) {
        display.innerText = "🗿"; // Representação da estátua
    } else {
        display.innerText = "";
    }
}

function gameOver(mensagem) {
    gameActive = false;
    document.getElementById('screen').innerHTML = `<h1 style="color:red">${mensagem}</h1>`;
    document.getElementById('game-container').style.background = "#000";
}