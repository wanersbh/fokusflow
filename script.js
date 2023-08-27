const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const startPauseBtn = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
})

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
})

longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');
})

function removerClassActiveBtn() {
    const activeBtn = document.querySelector('.active');
    activeBtn.classList.remove('active');
}

function alterarContexto(contexto) {

    removerClassActiveBtn();

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            focoBtn.classList.add('active');
            tempoDecorridoEmSegundos = 1500;
            break;
        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            curtoBtn.classList.add('active');
            tempoDecorridoEmSegundos = 300;
            break;
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            longoBtn.classList.add('active');
            tempoDecorridoEmSegundos = 900;
            break;
        default:
            break;
    }

    mostrarTempo();
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        audioTempoFinalizado.play();
        alert('Tempo finalizado!');
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        zerar();
        alterarBtnStartPause('pause');
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    alterarBtnStartPause('play');
}

function alterarBtnStartPause(acao){

    const imgBtn = document.querySelector('.app__card-primary-button img');
    const spanBtn = document.querySelector('.app__card-primary-button span');

    if(acao === 'play'){
        imgBtn.setAttribute('src', '/imagens/pause.png');
        spanBtn.textContent = 'Pause';
        return;
    }
    
    imgBtn.setAttribute('src', '/imagens/play_arrow.png');
    spanBtn.textContent = 'Play';
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();

