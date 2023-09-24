const form = document.getElementById('novoItem'); // "pega" o elemento
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; // parse transforma texto em JSON

itens.forEach(elemento => {
  criaElemento(elemento);
});

form.addEventListener('submit', evento => {
  // evento é o submit (os dados buscados do formulário)
  evento.preventDefault(); // previne o comportamento padrão do formulário (enviar os dados para a própria página)

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['qtde'];

  const existe = itens.find(elemento => elemento.nome === nome.value); // verifica se o nome no array 'itens' é exatamente igual ao nome digitado

  const itemAtual = {
    nome: nome.value,
    quantidade: qtde.value
  };

  criaElemento(itemAtual);

  itens.push(itemAtual);

  localStorage.setItem('itens', JSON.stringify(itens)); // stringify transforma JSON em texto

  nome.value = '';
  quantidade.value = '';
});

function criaElemento(item) {
  //<li class="item"><strong>3</strong>Camisa</li>
  const novoItem = document.createElement('li');
  novoItem.classList.add('item');

  const numeroItem = document.createElement('strong');
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id; // a cada elemento(item) criado é gerado um id
  novoItem.appendChild(numeroItem); // não pode ser innerHTML
  novoItem.innerHTML += item.nome;

  lista.appendChild(novoItem);
}
