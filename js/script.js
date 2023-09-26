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

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[existe.id] = itemAtual; // caso o conteúdo já exista no array, troco o conteúdo no mesmo e salvo no localStorage
  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

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

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function() { // não pode ser arrowFuction pois essa não tem o this e não é possível saber o elemento clicado
    deletaElemento(this.parentNode, id); //Se colocar só o this é removido o botão e não a tag em si
  })

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

  localStorage.setItem('itens', JSON.stringify(itens));
}