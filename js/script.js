const form = document.getElementById('novoItem'); // "pega" o elemento
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; // parse transforma texto em JSON

/*itens.forEach(elemento => {
  criaElemento(elemento);
});*/

const html = {
  get (elemento) {
    return document.querySelector(elemento);
  }
}

let ItensPorPagina = 5;
const estado = {
  pagina: 1,
  ItensPorPagina,
  totalPaginas: 50 / ItensPorPagina,
}

const controles = {
  proximo() {
    estado.pagina++;

    const ultPagina = estado.pagina > estado.totalPaginas
    if (ultPagina) {
      estado.pagina--;
    }
  },
  anterior() {
    estado.pagina--;

    if (estado.pagina < 1){
      estado.pagina++;
    }
  },
  IrPara(pagina) {
    if (pagina < 1){
      pagina = 1;
    }

    estado.pagina = pagina;

    if (pagina > estado.totalPaginas) {
      estado.pagina = estado.totalPaginas;
    }
  },
  criarListeners() {
    html.get('.primeiro').addEventListener('click', () => {
      controles.IrPara(1)
      list.atualiza();
    })

    html.get('.ultimo').addEventListener('click', () => {
      controles.IrPara(estado.totalPaginas);
      list.atualiza();
    })

    html.get('.anterior').addEventListener('click', () => {
      controles.anterior();
      list.atualiza();
    })

    html.get('.prox').addEventListener('click', () => {
      controles.proximo();
      list.atualiza();
    })
  }
}

  const list = { 
    criar() {
      let pagina = estado.pagina - 1;
      let inicio = pagina * estado.ItensPorPagina;
      let fim = inicio + estado.ItensPorPagina;

      const itensPaginados = itens.slice(inicio, fim);
      itensPaginados.forEach(elemento => {
        criaElemento(elemento);
      });
      //criaElemento(JSON.stringify(itens));
    },
    atualiza() {
    html.get('.lista').innerHTML = "";

    list.criar();
  }
}

function inicio() {
  list.atualiza();
  controles.criarListeners();
}

function atualiza() {
  console.log(estado.pagina);
}

inicio();

form.addEventListener('submit', evento => {
  // evento é o submit (os dados buscados do formulário)
  evento.preventDefault(); // previne o comportamento padrão do formulário (enviar os dados para a própria página)

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['qtde'];

  if (nome.value == "" || isNaN(nome.value) == false){
    nome.value = "";
    alert("Digite um nome!");
    nome.focus();
    return;
  } else 
  if (quantidade.value == ""){
    quantidade.value = "";
    alert("Digite uma quantidade!");
    quantidade.focus();
    return;
  }

  const existe = itens.find(elemento => elemento.nome.toUpperCase() === nome.value.toUpperCase()); // verifica se o nome no array 'itens' é exatamente igual ao nome digitado
  
  const itemAtual = {
    nome: nome.value,
    quantidade: qtde.value
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual; // caso o conteúdo já exista no array, troco o conteúdo no mesmo e salvo no localStorage
  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem('itens', JSON.stringify(itens)); // stringify transforma JSON em texto

  nome.value = '';
  quantidade.value = '';

  nome.focus();
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
