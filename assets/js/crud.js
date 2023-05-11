document.querySelector("#salvar").addEventListener("click", cadastrar)

let catalogo = []

//Carregar os registros salvos na memória do navegador
window.addEventListener("load", () => {
    //Transforma os registros salvos em String para JSON
    catalogo = JSON.parse(localStorage.getItem("catalogo"))  || []
    loadPage()
})

function loadPage(){
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
    document.querySelector("#catalogo").innerHTML = ""
    catalogo.forEach(obj => 
        document.querySelector("#catalogo").innerHTML += criarCardProduto(obj))
}

function filtrar(lista){
    document.querySelector("#catalogo").innerHTML = ""
    lista.forEach(obj => 
        document.querySelector("#catalogo").innerHTML += criarCardProduto(obj)
    )
}

function cadastrar(){
    // Acessando os campos do modal do html e pegando seus valores
    const imgProduto = document.querySelector("#imgProduto").value
    const dsImgProduto = document.querySelector("#dsImgProduto").value
    const vlProduto = document.querySelector("#vlProduto").value
    const nmProduto = document.querySelector("#nmProduto").value
    const dsProduto = document.querySelector("#dsProduto").value
    const qtdEstoque = document.querySelector("#qtdEstoque").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#modalProduto"))

    // Criando uma variável para armazenar toda a lista de variáveis do modal
    const produto = {
        id: Date.now(),
        imgProduto,
        dsImgProduto,
        vlProduto,
        nmProduto,
        dsProduto,
        qtdEstoque,
        adicionadoAoCarrinho: false
    }

    //Validando os campos
    if(!isValid(produto.imgProduto, document.querySelector("#imgProduto"))) return
    if(!isValid(produto.dsImgProduto, document.querySelector("#dsImgProduto"))) return
    if(!isValid(produto.nmProduto, document.querySelector("#nmProduto"))) return
    if(!isValid(produto.dsProduto, document.querySelector("#dsProduto"))) return
    if(!isValid(produto.vlProduto, document.querySelector("#vlProduto"))) return
    if(!isValid(produto.qtdEstoque, document.querySelector("#qtdEstoque"))) return

    catalogo.push(produto)

    loadPage()

    modal.hide()
}

function isValid(valor, campo){
    if(valor.length == 0){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }else{
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }
}

// Removendo o card pela hierarquia
function apagar(id){
    catalogo = catalogo.filter(obj => obj.id !== id)
    loadPage()
}

function adicionarAoCarrinho(id){
    let seleçãoCompraEncontrado = catalogo.find(obj => obj.id == id)
    seleçãoCompraEncontrado.adicionadoAoCarrinho = true
    loadPage()
}

// Função responsável por criar os produtos
function criarCardProduto(produto){
    let disabled = produto.adicionadoAoCarrinho ? "disabled" : ""

    const card = 
    `
    <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card text-center bg-light">
            <a href="" class="position-absolute right-0 p-2 text-danger">
                <i class="bi bi-suit-heart"></i>
            </a>
            <img class="card-img-top" src=${produto.imgProduto} alt=${produto.dsImgProduto}>
            
            <div class="card-header" id>
                R$ ${produto.vlProduto}
            </div>

            <div class="card-body">
                <h5 class="card-title">${produto.nmProduto}</h5>
                <p class="card-text">
                    ${produto.dsProduto}
                </p>
            </div>

            <div class="card-footer">
                <form class="d-block">
                    <button class="btn btn-success ${disabled}" onClick="adicionarAoCarrinho(${produto.id})">
                        Adicionar ao carrinho
                    </button>
                    <a href="#" onClick="apagar(${produto.id})" class="btn btn-danger" title="Apagar produto">
                        <i class="bi bi-trash3"></i>
                    </a>
                </form>
                <small class="text-danger">${produto.qtdEstoque} em estoque</small>
            </div> <!-- card-footer -->
        </div> <!-- card -->
    </div> <!-- col -->
    `
    return card
}