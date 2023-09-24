const form = document.getElementById('novoItem'); // "pega" o elemento
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; // parse transforma texto em JSON

itens.forEach(elemento => {
  console.log(elemento.nome, elemento.quantidade);
});

form.addEventListener('submit', evento => {
  // evento é o submit (os dados buscados do formulário)
  evento.preventDefault(); // previne o comportamento padrão do formulário (enviar os dados para a própria página)

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['qtde'];

  const itemAtual = {
    nome: nome,
    quantidade: qtde
  };

  criaElemento(nome.value, quantidade.value);

  itens.push(itemAtual);

  localStorage.setItem('itens', JSON.stringify(itens)); // stringify transforma JSON em texto

  nome.value = '';
  quantidade.value = '';
});

function criaElemento(nome, qtde) {
  //<li class="item"><strong>3</strong>Camisa</li>
  const novoItem = document.createElement('li');
  novoItem.classList.add('item');

  const numeroItem = document.createElement('strong');
  numeroItem.innerHTML = qtde;

  novoItem.appendChild(numeroItem); // não pode ser innerHTML
  novoItem.innerHTML += nome;

  lista.appendChild(novoItem);
}
 