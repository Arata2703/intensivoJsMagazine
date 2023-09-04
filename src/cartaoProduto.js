import { addToShoppingCart } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderCatalog() {
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = 
        `<div 
            class="border-solid shadow-xl shadow-slate-400 rounded-lg w-52 m-2 flex flex-col p-2 justify-between group hover:scale-110 duration-300 group ${produtoCatalogo.feminino ? 'feminino' : 'masculino'}"
            id="card-produto-${produtoCatalogo.id}"
            >
            <img 
            src="./assets/img/${produtoCatalogo.imagem}" 
            alt="Produto 1 do Magazine Hashtag."
            class="group-hover:scale-125 duration-300 group-hover:mb-10 rounded-lg shadow-xl shadow-slate-300"
            />
            <p class='text-sm'>${produtoCatalogo.marca}</p>
            <p class='text-sm'>${produtoCatalogo.nome}</p>
            <p class='text-sm'>R$${produtoCatalogo.preco}</p>
            <button 
                id="addProduct-${produtoCatalogo.id}"
                class="bg-slate-950 hover:bg-slate-700"
                >
                <i class="fa-solid fa-cart-plus text-slate-200"></i>
            </button>
        </div>`;

        document.getElementById('container-produto').innerHTML += cartaoProduto
    }
    
    for (const produtoCatalogo of catalogo) {
        document.getElementById(`addProduct-${produtoCatalogo.id}`).addEventListener('click', () => addToShoppingCart(produtoCatalogo.id));
    }
}