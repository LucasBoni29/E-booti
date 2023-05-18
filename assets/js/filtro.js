document.querySelector("#carrinho").addEventListener("click", () =>{
    let produtosCarrinho = catalogo.filter(obj => obj.adicionadoAoCarrinho)
    filtrar(produtosCarrinho)
})