import { catalogo, getLocalStorage, saveLocalStorage } from "./utilidades";

const idShoppingCartManyProducts = getLocalStorage('carrinho') ?? {};

function openShoppingCart() {
    document.getElementById('carrinho').classList.remove('right-[-360px]');
    document.getElementById('carrinho').classList.add('right-[0px]');
}

function closeShoppingCart() { //No padrão, configuramos a posição do carrinho para ser -360px para a direita, assim ele, porém fora da página
    document.getElementById('carrinho').classList.remove('right-[0px]');
    document.getElementById('carrinho').classList.add('right-[-360px]');

}

function directToCheckout() {
  if(Object.keys(idShoppingCartManyProducts).length === 0) {
    return;
  }
  window.location.href = "./checkout.html";
}

export function initializeShoppingCart() {
    const buttonCloseShoppingCart = document.getElementById('fechar-carrinho');
    const buttonOpenShoppingCart = document.getElementById('abrir-carrinho');
    const buttonDirectToCheckout = document.getElementById('direcionar-checkout');

    buttonCloseShoppingCart.addEventListener("click", closeShoppingCart);
    buttonOpenShoppingCart.addEventListener("click", openShoppingCart);
    buttonDirectToCheckout.addEventListener("click", directToCheckout);

}

function manyProductsIncrement(idProduct) {
  idShoppingCartManyProducts[idProduct]++;
  saveLocalStorage('carrinho', idShoppingCartManyProducts);
  updateCartPrice();
  updateQuantity(idProduct);
}

function manyProductsDecrement(idProduct) {
  idShoppingCartManyProducts[idProduct]--;
  saveLocalStorage('carrinho', idShoppingCartManyProducts);
  updateCartPrice();
  updateQuantity(idProduct);
  if (idShoppingCartManyProducts[idProduct] === 0) {
    removeProductFromCart(idProduct);
  }
}

function updateQuantity(idProduct) {
  document.getElementById(`quantidade-${idProduct}`).innerText = idShoppingCartManyProducts[idProduct];
}

function removeProductFromCart(idProduct) {
  delete idShoppingCartManyProducts[idProduct]; //Apaga todo o conteúdo da posição idProduct
  renderCartProducts();
  saveLocalStorage('carrinho', idShoppingCartManyProducts);
}

function drawProductInCart(idProduct) {
  const product = catalogo.find(p => p.id === idProduct);
  
  const productCardContainer = document.getElementById('produtos-carrinho');
  
  const elementoArticle = document.createElement('article'); //Cria uma tag HTML (não é texto, é HTML) <article></article>
  const articleClasses = ['flex', 'bg-slate-100', 'rounded-lg', 'p-2', 'relative'];
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }
  const productCard = `<img 
  src="./assets/img/${product.imagem}" 
  alt="Carrinho: ${product.nome}" 
  class="h-24 pr-4 border-5 border-slate-950"
  />
  <div class="p-2 flex flex-col justify-between">
  <p class="text-slate-900 text-sm">${product.nome}</p>
  <p class="text-slate-500 text-xs">Tamanho: M</p>
  <p class="text-green-400 text-lg">$${product.preco}</p>
  </div>
  <button id="excluir-item-${product.id}" class="absolute top-0 right-2">
    <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
  </button>
  <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
  <button id="decrement-product-${product.id}">-</button>
  <p id="quantidade-${product.id}" class="ml-2">${idShoppingCartManyProducts[product.id]}</p>
  <button id="increment-product-${product.id}" class="ml-2">+</button>
  </div>`
  
  //productCardContainer.innerHTML += productCard; //A gente está adicionando um texto, e pedindo para o navegador interpretar ele como HTML. Contudo, é como se ele apagasse o tudo que tem antes, inclusive a funcionalidade do botão, e reinserisse tudo (por isso apenas o último botão funciona)
  elementoArticle.innerHTML += productCard; //Nesse caso, como o elementoArticle é uma tag HTML, estamos adicionando individualmente esse article (que representa um card de produto) no HTML, o que faz com que as propriedades dos articles anteriores se mantenham
  productCardContainer.appendChild(elementoArticle); //Estamos adicionando essa tag na section geral do carrinho de compras
  
  document.getElementById(`decrement-product-${product.id}`).addEventListener('click', () => manyProductsDecrement(product.id));
  document.getElementById(`increment-product-${product.id}`).addEventListener('click', () => manyProductsIncrement(product.id));
  document.getElementById(`excluir-item-${product.id}`).addEventListener('click', () => removeProductFromCart(product.id));
  
  //Nesse ponto não é necessária uma variável que armazena os itens adicionados no carrinho, por que a linha 43 insere os productCard diretamente na seção que contém  os produtos do carrinho 
}

export function renderCartProducts() {
  const productCardContainer = document.getElementById('produtos-carrinho');
  productCardContainer.innerHTML = '';
  
  for (const idProduto in idShoppingCartManyProducts) {
    drawProductInCart(idProduto);
  }
  saveLocalStorage('carrinho', idShoppingCartManyProducts);
  updateCartPrice();
}

export function addToShoppingCart(idProduct) {
  if (idProduct in idShoppingCartManyProducts) {
    manyProductsIncrement(idProduct);
    return
  }
  idShoppingCartManyProducts[idProduct] = 1;
  saveLocalStorage('carrinho', idShoppingCartManyProducts);
  drawProductInCart(idProduct);
  updateCartPrice();
}

export function updateCartPrice() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProductInCart in idShoppingCartManyProducts) {
    precoTotalCarrinho += catalogo.find(p => p.id === idProductInCart).preco * idShoppingCartManyProducts[idProductInCart];
    console.log(catalogo.find(p => p.id === idProductInCart).preco);
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho}`;
}