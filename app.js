// Criando uma lista de numeros aleatorios e que o numero não repita
let listaDeNumerosSorteados = [];

// Criando dinamismo na quantidade de numeros sorteados
let numeroLimite = 50;

// Declarando a variavel que irá gerar e armazenar um número aleatório, e irá contabilizar as tentativas de acertos
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1

let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 50';

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Voz que vai narrar o jogo
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    
    //Outra API de voz para narrar
    // if ('speechSynthesis' in window) {
    //     let utterance = new SpeechSynthesisUtterance(texto);
    //     utterance.lang = 'pt-BR'; 
    //     utterance.rate = 1.2; 
    //     window.speechSynthesis.speak(utterance); 
    // } else {
    //     console.log("Web Speech API não suportada neste navegador.");
    // }

}

function exibirMnesagemInicial() {
    exibirTextoNaTela('h1','Descubra o número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 50');
}

exibirMnesagemInicial();

function verificarChute() {
    // Vai pegar o valor digitado no input do HTML para comparar se é igual ao numero gerado aleatoriamente
    let chute = document.querySelector('input').value;
    
    // Gerando uma mensagem na tela caso acerte, caso o chute for maior ou menor
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertoouuu!!');
        // Gerando a condição onde o texto será ajustado para plural ou singular se a quantidade de tentativas for maior que 1
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        //Dando uma função ao botão novo jogo pelo ID e removendo o atributo disabled, quando acerta o número secreto
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
           exibirTextoNaTela('p', 'O número secreto é menor'); 
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   // Ter a quantidade de elemento na lista
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   // Veificação se atingiu o numero máximo
   if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }

    // Fazendo uma verificação se o numero sorteado já possui na lista, caso sim irá gerar um novo número
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // Adicionando o numero na lista
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

// função para limpar o campo quando o usuário erra o número
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Fazendo o botão novo jogo reiniciar o jogo zerado
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMnesagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}