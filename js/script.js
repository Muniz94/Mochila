const form = document.getElementById('novoItem'); // "pega" o elemento

form.addEventListener('submit', evento => {
  // evento é o submit (os dados buscados do formulário)
  evento.preventDefault(); // previne o comportamento padrão do formulário (enviar os dados para a própria página)

  criaElemento(
    evento.target.elements['nome'].value,
    evento.target.elements['qtde'].value
  );
});

function criaElemento(nome, qtde) {
  console.log(nome);
  console.log(qtde);
}

//<li class="item"><strong>3</strong>Camisa</li>
const novoItem = document.createElement('li');
novoItem.classList.add('item');

const numeroItem = document.createElement('strong');
numeroItem.innerHTML = qtde;

novoItem.appendChild(numeroItem); // não pode ser innerHTML
novoItem.innerHTML += nome;
