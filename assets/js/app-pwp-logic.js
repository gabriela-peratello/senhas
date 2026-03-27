
/* Seleciona os elementos do DOM usando o método querySelector, que retorna o primeiro elemento 
que corresponde ao seletor CSS especificado */

const sliderElement = document.querySelector('.app-pwd__slider'); // Elemento do controle deslizante
const buttonElement = document.querySelector('.app-pwd__button'); // Botão de gerar senha
const clearButton = document.querySelector('.app-pwd__button--clear'); //Botão para limpar o histórico de senhas
const sizePassword = document.querySelector('.app-pwd__size'); // Elemento que mostra o tamanho da senha
const passaword = document.querySelector('.app-pwd__output'); // Elemento que exibe a senha gerada
const containerPassword = document.querySelector('.app-pwd__result'); // Container da senha gerada
const welcomeElement = document.querySelector('.app-pwd__welcome'); // Elemento de saudação
const datetimeElement = document.querySelector('.app-pwd__datetime');// Elemento de data e hora

// Objeto que contém os conjuntos de caracteres possíveis para a geração de senha. Cada propriedade representa um tipo diferente de caractere
const charsets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercasw: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%&*"
};


// Variáveis para armazenar a senha atual e o histórico de senhas
let novaSenha = '';  //Armazena a senha atual gerada
let historicoSenha = []; // Arry para armazenar as últimas senhas geradas

// Função que retorna uma saudação baseada na hora atual do dia, usando o método getHours() do objeto date para obter a hora atual
const getSaudacao = () => {

    const hora = new Date().getHours();

    if (hora < 12) return '- Bom Dia'
    if (hora < 18) return '- Bom tarde'
    return '- Boa noite';
};

// Função que formata data e hora atual em um formato legível, usa de vários métodos do obj Date para obter os componentes da data
const formatarDataHora = () =>{

    // Cria um obj com a data e hora atual
    const agra = new Date();

    // Array com os nomes dos dias da semana
    const diasSemana = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];

    // Obtém o dia da semana
    const diaSemana = diasSemana[agra.getDay()];

    // Dados da data
    const dia = agra.getDate().toString().padStart(2, '0');
    const mes = (agra.getMonth()+1).toString().padStart(2, '0');
    const ano = agra.getFullYear();

    // Hora como número
    const hora = agra.getHours().toString().padStart(2, '0');
    const minuto = agra.getMinutes().toString().padStart(2, '0');
    const segundo =  agra.getUTCSeconds().toString().padStart(2, '0');
    
    // Return
    return `${diaSemana}, ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
};

// Função que atualiza o cabeçalho com  a saudação e a data/hora - cada uma responsável por um pedaço do header
const atualizarHeader = () => {
    welcomeElement.textContent = `${getSaudacao()}!`;
    datetimeElement.textContent = formatarDataHora();
};

// Atualizar o header a cada segundo
setInterval(atualizarHeader, 1000)

// Iniciar o header
atualizarHeader();


// Exibe inicialmente o valor do slider
sizePassword.textContent = sliderElement.value;

// Atualiza o valor exibido do tamanho da senha conforme o slider é movimentado
sliderElement.addEventListener('input', (e) => {
    sizePassword.textContent = e.target.value;
});

// Função principal para gerar a senha
const generatePassword = () => {

    let selectCharset = ''; //String que armazena todos os caracteres possiveis para a senha

    // Obter os checkbox selecionados
    const uppercaseCheked = document.querySelector('.uppercase-check').checked;
    const lowercaseCheked = document.querySelector('.lowercase-check').checked;
    const cnumbersCheked = document.querySelector('.numbers-check').checked;
    const specialCheked = document.querySelector('.special-check').checked;

    // Construir charset basedo nas opções selecionadas
    if (uppercaseCheked) selectCharset += charsets.uppercase
    if (lowercaseCheked) selectCharset += charsets.lowercasw
    if (cnumbersCheked) selectCharset += charsets.numbers
    if (specialCheked) selectCharset += charsets.special

    // Se nenhuma opção estiver selecionada, seleciona todas
    if (!selectCharset) {
        selectCharset = Object.values(charsets).join('');
        console.log(selectCharset)

        document.querySelector('.uppercase-check').checked = true;
        document.querySelector('.lowercase-check').checked = true;
        document.querySelector('.numbers-check').checked = true;
        document.querySelector('.special-check').checked = true; 
    }

    let pass = '';

    // Looop que itera pelo número de caracteres definido nos slider. Usa o operador de incremento (++) para aumentar o contador
    for (let i = 0; i < sliderElement.value; ++i) {
        pass += selectCharset.charAt(Math.floor(Math.random() * selectCharset.length ));
    }

    //  Remove a classe 'hide' para exibir o container senha
    containerPassword.classList.remove('hide');

    // Insere a senha gerada no elemento html
    passaword.textContent = pass

    // Armazena a senha atual na variável global para uso posterior (ex: copiar)
    novaSenha = pass;

    // Gerenciamento do histórico de senhas: unshift adiciona a nova senha no inicio do array
    if (historicoSenha.length > 3){
        historicoSenha.pop();
    }

    // Atualizar a lista de historico na interface
    const historico = document.querySelector('.app=pwd__history');
    if (historico){
        historico.computedStyleMap.display = 'block';


        historico.querySelector('.app-pwd__history-list').innerHTML = historicoSenha
        .map(senha => ` <li class="app-pwd__history-item"> ${senha}</li>`)
        .join('')
    }


};


// Função para copiar a  senha gerada para área de trabalho
const copyPassword = () => {
    alert('Senha copiada com sucesso!'); //Exibir um alerta de sucesso
    navigator.clipboard.writeText(novaSenha); //Copia a senha usando API Clipboard
};

// Adicionar os event listeners para os eventos de clique
buttonElement.addEventListener('click', generatePassword); //Gera nova senha
containerPassword.addEventListener('click', copyPassword); //Copia a senha

// Função para limpar os dados para os eventos de clique
const clearData = () => {
    // Limpa o histórico de senhas
    historicoSenha = [];
    novaSenha = '';

    // Esconder os containers
    containerPassword.classList.add('hide');
    const historico = document.querySelector('.app-pwd__history');
    if (historico) {
        historico.computedStyleMap.display = 'none'
    }

    // Reseta as checkbox para o estado inicial (marcado)
    document,querySelector('.uppercase-check').checked = true;
    document,querySelector('.lowercase-check').checked = true;
    document,querySelector('.numbers-check').checked = true;
    document,querySelector('.special-check').checked = true;

};

// Adiciona o event listener para o botão de limpar
clearButton.addEventListener('click', clearData);

