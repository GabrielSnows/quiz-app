const quiz = document.querySelector('#quiz');
const resultado = document.querySelector('#resultado');
const butaoEnviar = document.querySelector('#enviar');

const questoesArray = [
  {
    pergunta: 'Qual a linguagem de programação estamos estudando?',
    alternativas: {
      a: 'ruby',
      b: 'java',
      c: 'javascript',
      d: 'python'
    },
    alternativaCorreta: 'c'
  },

  {
    pergunta: 'Quantas materias estamos estudando no 3 semestre?',
    alternativas: {
      a: '4',
      b: '6',
      c: '5',
      d: '7'
    },
    alternativaCorreta: 'c'
  },

  {
    pergunta: 'Qual a tradução de potato para português?',
    alternativas: {
      a: 'abacate',
      b: 'limão',
      c: 'batata',
      d: 'abacaxi'
    },
    alternativaCorreta: 'c'
  },

  {
    pergunta: 'Que horas e nossa aula no ifb?',
    alternativas: {
      a: '13 horas',
      b: '15 horas',
      c: '14 horas',
      d: '12 horas'
    },
    alternativaCorreta: 'c'
  },

  {
    pergunta: 'Quantos semestres tem o nosso curso?',
    alternativas: {
      a: '1',
      b: '2',
      c: '3',
      d: '4'
    },
    alternativaCorreta: 'c'
  }
];

function fazerQuiz() {
  // variavel para armazenar a saida HTML
  const saida = [];

  // Iterando as questões
  questoesArray.forEach((questaoAtual, numeroQuestao) => {
    // variavel para armazenar a lista de opções de resposta
    const alternativas = [];

    // e iterando cada resposta disponivel
    for (letra in questaoAtual.alternativas) {
      // adiciona um input radio no HTML
      alternativas.push(
        `<label>
          <input type="radio" name="pergunta${numeroQuestao}" value="${letra}">
          ${letra} :
          ${questaoAtual.alternativas[letra]} 
        </label>`
      );
    }

    // Adiciona a questão e a resposta na saída
    saida.push(
      `<div class="pergunta"> ${questaoAtual.pergunta} </div>
        <div class="alternativas"> ${alternativas.join('')} </div>`
    );
  });

  // Transforma a lista de saida em string e coloca na pagina
  quiz.innerHTML = saida.join('');
}

function mostrarResultado() {
  // Reune os containers de respostas do quiz
  const containerRespostas = quiz.querySelectorAll('.alternativas');

  // Marca as respostas do usuario
  let numCorreto = 0;

  // Questões iteradas
  questoesArray.forEach((questaoAtual, numeroQuestao) => {
    // Procura a resposta selecionada
    const containerResposta = containerRespostas[numeroQuestao];
    const seletor = `input[name="pergunta${numeroQuestao}"]:checked`;
    // Se o usuario não marcar nenhuma resposta, é retornado um objeto vazio, assim não vai dar erro no .value
    const respostaUsuario = (containerResposta.querySelector(seletor) || {})
      .value;

    // Se a resposta for correta
    if (respostaUsuario === questaoAtual.alternativaCorreta) {
      // Adiciona o numero da resposta correta
      numCorreto++;

      // Cor da resposta verde
      containerRespostas[numeroQuestao].style.color = 'lightgreen';
    } else {
      // Se a resposta estiver errada ou em branco
      containerRespostas[numeroQuestao].style.color = 'red';
    }
  });

  // Mostra o total de respostas corretas
  resultado.innerHTML = `${numCorreto} acertos de ${questoesArray.length}`;
}

fazerQuiz();

// Ao clicar no butão submit a função mostrarResultado executa
butaoEnviar.addEventListener('click', mostrarResultado);
