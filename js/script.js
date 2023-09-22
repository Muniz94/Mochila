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
