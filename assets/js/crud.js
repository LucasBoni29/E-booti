document.querySelector("#salvar").addEventListener("click" , cadastrar)

// TODO Testar a abertura do modal e passar os valores corretamente para as variáveis

function cadastrar(){
    // Acessando os campos do modal do html e pegando seus valores
    const imgProduto = document.querySelector("#imgProduto").value
    const vlProduto = document.querySelector("#vlProduto").value
    const nmProduto = document.querySelector("#nmProduto").value
    const dsProduto = document.querySelector("#dsProduto").value
    const qtdEstoque = document.querySelector("#qtdEstoque").value

    // Criando uma variável para armazenar toda a lista de variáveis do modal
    const produto = {
        imgProduto,
        vlProduto,
        nmProduto,
        dsProduto,
        qtdEstoque
    }

    // Adicionando tags dentro do html passando a lista de valores para a função responsável por criar o produto
    document.querySelector("#catalogo").innerHTML += criarCardProduto(produto) 
}

// Função responsável por criar os produtos
function criarCardProduto(produto){
    const card = 
    `
    <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card text-center bg-light">
            <a href="" class="position-absolute right-0 p-2 text-danger">
                <i class="bi bi-suit-heart"></i>
            </a>
            <img class="card-img-top" src="../assets/img/produtos/amdRyzen.jpg" alt="Processado AMD Ryzen">

            <div class="card-header" id>
                ${produto.valor}
            </div>

            <div class="card-body">
                <h5 class="card-title">${produto.titulo}</h5>
                <p class="card-text">
                    ${produto.descricao}
                </p>
            </div>

            <div class="card-footer">
                <form class="d-block">
                    <button class="btn btn-success">
                        Adicionar ao carrinho
                    </button>
                </form>
                <small class="text-danger">${produto.estoque}</small>
            </div> <!-- card-footer -->
        </div> <!-- card -->
    </div> <!-- col -->
    `
    
}