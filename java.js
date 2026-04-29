let energia = 100;
let uso = 1;
let camAtual = 1;
let portaFechada = false;
let luzLigada = false;
let gameActive = true;
let posicaoInimigo = 3; // Começa na CAM 03

const configCams = {
    1: { nome: "CAM 01: GALERIA GREGA", classe: "bg-cam1" },
    2: { nome: "CAM 02: CORREDOR SUL", classe: "bg-cam2" },
    3: { nome: "CAM 03: DEPÓSITO", classe: "bg-cam3" }
};

// --- CICLO DE JOGO ---
function atualizarGeral() {
    if (!gameActive) return;

    // Consumo de Energia
    if (energia > 0) {
        energia -= (uso * 0.15);
        document.getElementById('power').innerText = Math.max(0, Math.floor(energia));
        document.getElementById('usage').innerText = ">".repeat(uso);
    } else {
        gameOver("ACABOU A ENERGIA...");
    }
}
setInterval(atualizarGeral, 1000);

// --- MOVIMENTO DO ANJO ---
function IAInimigo() {
    if (!gameActive) return;

    // Se o anjo não estiver sendo observado, ele tem chance de mover
    if (posicaoInimigo !== camAtual) {
        if (Math.random() > 0.4) {
            posicaoInimigo--; // Se aproxima do escritório (0)
        }
    }

    if (posicaoInimigo === 0) {
        if (!portaFechada) {
            gameOver("O ANJO TE ENCONTROU.");
        } else {
            posicaoInimigo = 3; // Volta para o início se bater na porta
        }
    }
    verificarInimigo();
}
setInterval(IAInimigo, 4000); // Tenta mover a cada 4 segundos

// --- FUNÇÕES DE AÇÃO ---
function mudarCam(id) {
    if (!gameActive) return;
    camAtual = id;
    const screen = document.getElementById('screen');
    
    // Troca o fundo e o nome
    screen.className = configCams[id].classe;
    document.getElementById('cam-name').innerText = configCams[id].nome;
    
    verificarInimigo();
}

function verificarInimigo() {
    const display = document.getElementById('statue-overlay');
    // Só mostra o overlay se o anjo estiver na câmera atual
    display.style.display = (posicaoInimigo === camAtual) ? "block" : "none";
}

function togglePorta() {
    portaFechada = !portaFechada;
    uso = portaFechada ? uso + 1 : uso - 1;
    document.getElementById('btn-porta').style.background = portaFechada ? "#800" : "#333";
}

function ligarLuz() {
    luzLigada = true;
    uso++;
    document.getElementById('screen').style.filter = "brightness(1.8) contrast(1.2)";
}

function desligarLuz() {
    luzLigada = false;
    uso--;
    document.getElementById('screen').style.filter = "brightness(1)";
}

function gameOver(msg) {
    gameActive = false;
    document.getElementById('screen').innerHTML = `<h1 style="color:red; text-align:center; margin-top:150px;">${msg}</h1>`;
}

// Atalhos Teclado
window.addEventListener('keydown', (e) => {
    if (e.code === "Space") togglePorta();
    if (e.key.toLowerCase() === "l") ligarLuz();
});
window.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === "l") desligarLuz();
});