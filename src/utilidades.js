const produto1 = {
    id: "1",
    marca: "Zara",
    nome: "Camisa Larga com Bolsos",
    preco: 70,
    imagem: "product-1.jpg",
    feminino: false
}

const produto2 = {
    id: "2",
    marca: "Zara",
    nome: "Casaco Reto com Lã",
    preco: 85,
    imagem: "product-2.jpg",
    feminino: true
}

const produto3 = {
    id: "3",
    marca: "Zara",
    nome: "Jaqueta com Efeito Camurça",
    preco: 60,
    imagem: "product-3.jpg",
    feminino: false
}

const produto4 = {
    id: "4",
    marca: "Zara",
    nome: "Sobretudo em Mescla de Lã",
    preco: 160,
    imagem: "product-4.jpg",
    feminino: false
}

const produto5 = {
    id: "5",
    marca: "Zara",
    nome: "Camisa Larga Acolchoada de Veludo Cotelê",
    preco: 110,
    imagem: "product-5.jpg",
    feminino: false
}

const produto6 = {
    id: "6",
    marca: "Zara",
    nome: "Casaco de Lã com Botões",
    preco: 170,
    imagem: "product-6.jpg",
    feminino: true
}

const produto7 = {
    id: "7",
    marca: "Zara",
    nome: "Casaco com Botões",
    preco: 75,
    imagem: "product-7.jpg",
    feminino: true
}

const produto8 = {
    id: "8",
    marca: "Zara",
    nome: "Colete Comprido com Cinto",
    preco: 88,
    imagem: "product-8.jpg",
    feminino: true
}

export const catalogo = [produto1, produto2, produto3, produto4, produto5, produto6, produto7,  produto8];

export function saveLocalStorage(key, data) { //Essa função tem como objetivo manter armazenado algum conteúdo no banco de dados do navegador, assim ao fecha-lo a informação não se perde. No caso, estamos utilizando para manter o conteúdo do carrinho de compras
    localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) { //Essa função tem como objetivo ler o conteúdo armazenado no banco de dados do navegador, assim ao fecha-lo a informação não se perde. No caso, estamos utilizando para manter o conteúdo do carrinho de compras
    return JSON.parse(localStorage.getItem(key));
}

export function deleteLocalStorage(key) {
    localStorage.removeItem(key);
}

export function drawProductInSimpleCart(idProduct, idContainerHtml, quantidadeProduto) {
    const product = catalogo.find(p => p.id === idProduct);
    
    const productCardContainer = document.getElementById(idContainerHtml);
    
    const elementoArticle = document.createElement('article'); //Cria uma tag HTML (não é texto, é HTML) <article></article>
    const articleClasses = ['flex', 'bg-slate-100', 'rounded-lg', 'p-2', 'relative', 'mb-2', 'w-96'];
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
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
        <p id="quantidade-${product.id}" class="ml-2">${quantidadeProduto}</p>
    </div>`
    
    //productCardContainer.innerHTML += productCard; //A gente está adicionando um texto, e pedindo para o navegador interpretar ele como HTML. Contudo, é como se ele apagasse o tudo que tem antes, inclusive a funcionalidade do botão, e reinserisse tudo (por isso apenas o último botão funciona)
    elementoArticle.innerHTML += productCard; //Nesse caso, como o elementoArticle é uma tag HTML, estamos adicionando individualmente esse article (que representa um card de produto) no HTML, o que faz com que as propriedades dos articles anteriores se mantenham
    productCardContainer.appendChild(elementoArticle); //Estamos adicionando essa tag na section geral do carrinho de compras
    
    //Nesse ponto não é necessária uma variável que armazena os itens adicionados no carrinho, por que a linha 43 insere os productCard diretamente na seção que contém  os produtos do carrinho 
  }