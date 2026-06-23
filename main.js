const numeroSenha = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const textoEntropia = document.querySelector('.entropia');

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?';

botoes[0].onclick = diminuir;
botoes[1].onclick = aumentar;

checkbox.forEach(cb => cb.addEventListener('change', gerarSenha));

function diminuir() {
    if (tamanhoSenha > 4) tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
}

function aumentar() {
    if (tamanhoSenha < 32) tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
}

function gerarSenha() {
    let alfabeto = '';

    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    if (alfabeto.length === 0) {
        campoSenha.value = '';
        textoEntropia.textContent = 'Selecione ao menos uma opção.';
        return;
    }

    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        const index = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[index];
    }

    campoSenha.value = senha;

    calcularForca(alfabeto.length);
}

function calcularForca(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));

    textoEntropia.textContent =
        dias > 0
            ? `${dias} dias para quebrar sua senha`
            : 'Senha muito fraca!';
}

gerarSenha();
