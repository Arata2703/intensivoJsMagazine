import { deleteLocalStorage, drawProductInSimpleCart, getLocalStorage, saveLocalStorage } from "./src/utilidades";

function drawCkeckoutProducts() {
    const idShoppingCartManyProducts = getLocalStorage('carrinho') ?? {};
    for(const idProduct in idShoppingCartManyProducts) {
        drawProductInSimpleCart(idProduct, 'container-produtos-checkout', idShoppingCartManyProducts[idProduct]);
    }
}

function finalizarCompra(evento) {
    evento.preventDefault();
    const idShoppingCartManyProducts = getLocalStorage('carrinho') ?? {};
    if (Object.keys(idShoppingCartManyProducts).length === 0) {
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idShoppingCartManyProducts,
    };
    const historicoDePedidos = getLocalStorage("historico") ?? [];
    const historicoDePedidosAtualizados = [pedidoFeito, ...historicoDePedidos];
    
    saveLocalStorage('historico', historicoDePedidosAtualizados);
    deleteLocalStorage('carrinho');

    window.location.href = './pedidos.html';
}

drawCkeckoutProducts();

document.addEventListener("submit", (evt) => finalizarCompra(evt)); //Esta associando a qualquer evento submit, a ação de finalizarCompra()