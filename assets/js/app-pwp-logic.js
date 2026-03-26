
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

    if (hora < 12) return 'Bom Dia.'
    if (hora < 18) return 'Bom tarde.'
    return 'Boa noite.';
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
    const minuto = agra.getMinutes().toString().padStart(2, '0')
    const segundo =  agra.getUTCSeconds().toString().padStart(2, '0')
    
    // Return
    return `${diaSemana}, ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
};

 

