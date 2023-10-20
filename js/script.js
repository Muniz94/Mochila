const form = document.getElementById('novoItem'); // "pega" o elemento
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; // parse transforma texto em JSON
var PgCompleta = false;
const maxItens = document.querySelector('#lista');

const html = {
  get(elemento) {
    return document.querySelector(elemento);
  }
};

let ItensPorPagina = 3;
const estado = {
  pagina: 1,
  ItensPorPagina,
  totalPaginas: 9 / ItensPorPagina
};

const controles = {
  proximo() {
    estado.pagina++;

    const ultPagina = estado.pagina > estado.totalPaginas;
    if (ultPagina) {
      estado.pagina--;
    }
  },
  anterior() {
    estado.pagina--;

    if (estado.pagina < 1) {
      estado.pagina++;
    }
  },
  IrPara(pagina) {
    if (pagina < 1) {
      pagina = 1;
    }

    estado.pagina = pagina;

    if (pagina > estado.totalPaginas) {
      estado.pagina = estado.totalPaginas;
    }
  },
  criarListeners() {
    html.get('.primeiro').addEventListener('click', () => {
      controles.IrPara(1);
      atualiza();
    });

    html.get('.ultimo').addEventListener('click', () => {
      controles.IrPara(Math.ceil(itens.length / estado.ItensPorPagina));
      atualiza();
    });

    html.get('.anterior').addEventListener('click', () => {
      controles.anterior();
      atualiza();
    });

    html.get('.prox').addEventListener('click', () => {
      if (maxItens.children.length == estado.ItensPorPagina) {
        controles.proximo();
        atualiza();
      }
    });
  }
};

const list = {
  criar() {
    let pagina = estado.pagina - 1;
    let inicio = pagina * estado.ItensPorPagina;
    let fim = inicio + estado.ItensPorPagina;

    const itensPaginados = itens.slice(inicio, fim);
    itensPaginados.forEach(elemento => {
      criaElemento(elemento);
    });
  },
  atualiza() {
    html.get('.lista').innerHTML = '';

    list.criar();
  }
};

function inicio() {
  list.atualiza();
  controles.criarListeners();
  html.get('.numeros').innerHTML = `${estado.pagina}`;
  
}

function atualiza() {
  list.atualiza();
  html.get('.numeros').innerHTML = `${estado.pagina}`;
}

inicio();

form.addEventListener('submit', evento => {
  // evento é o submit (os dados buscados do formulário)
  evento.preventDefault(); // previne o comportamento padrão do formulário (enviar os dados para a própria página)

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['qtde'];

  if (nome.value == '' || isNaN(nome.value) == false) {
    nome.value = '';
    alert('Digite um nome!');
    nome.focus();
    return;
  } else if (quantidade.value == '' || Math.sign(quantidade.value) != 1) {
    quantidade.value = '';
    alert('Digite uma quantidade!');
    quantidade.focus();
    return;
  }

  const existe = itens.find(
    elemento => elemento.nome.toUpperCase() === nome.value.toUpperCase()
  ); // verifica se o nome no array 'itens' é exatamente igual ao nome digitado

  const itemAtual = {
    nome: nome.value,
    quantidade: qtde.value
  };

  if (existe) {
    itemAtual.id = existe.id;

    if ((itens.indexOf(existe) + 1) % estado.ItensPorPagina != 0) {
      estado.pagina = Math.ceil((itens.indexOf(existe) + 1) / estado.ItensPorPagina);
    } else {
      estado.pagina = Math.trunc((itens.indexOf(existe) + 1) / estado.ItensPorPagina);
    }
    atualiza();
      
    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual; // caso o conteúdo já exista no array, troco o conteúdo no mesmo e salvo no localStorage
  } else {
      if (itens.length != estado.ItensPorPagina * estado.totalPaginas) {

        if (maxItens.children.length == estado.ItensPorPagina) {
          PgCompleta = true;
          estado.pagina++;
        }
        if (PgCompleta == true) {
          html.get('.lista').innerHTML = '';
          list.criar();
          atualiza();
        }

        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
      }
      else {
        alert("A mochila está cheia...");
      }
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

  numeroItem = document.createElement('strong');
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id; // a cada elemento(item) criado é gerado um id
  novoItem.appendChild(numeroItem); // não pode ser innerHTML

  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  let stron = document.querySelector("[data-id='" + item.id + "']");
  stron.style.cssText = 'background: #40112d;' + 'color: white;'
  stron.innerHTML =
  item.quantidade;
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement('button');
  elementoBotao.innerText = 'X';

  elementoBotao.addEventListener('click', function () {
    // não pode ser arrowFuction pois essa não tem o this e não é possível saber o elemento clicado

    if (itens.length > estado.ItensPorPagina) {
      deletaElemento(this.parentNode, id);
      if (maxItens.children.length == 0 && estado.pagina != 1) {
        estado.pagina--;
        atualiza();
      }
      atualiza();
    } else {
      deletaElemento(this.parentNode, id);
    }
  });

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex(elemento => elemento.id === id),
    1
  );

  localStorage.setItem('itens', JSON.stringify(itens));
}
