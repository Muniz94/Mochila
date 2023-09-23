const form = document.getElementById('novoItem'); // "pega" o elemento
const lista = document.getElementById('lista');

form.addEventListener('submit', evento => {
  // evento é o submit (os dados buscados do formulário)
  evento.preventDefault(); // previne o comportamento padrão do formulário (enviar os dados para a própria página)

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['qtde'];

  criaElemento(nome.value, quantidade.value);

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

  localStorage.setItem('nome', nome);
  localStorage.setItem('Quantidade', qtde); 
}
