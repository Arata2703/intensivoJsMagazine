import { renderCatalog } from "./src/cartaoProduto";
import { filterInitialize } from "./src/filtrosCatalogo";
import { updateCartPrice, initializeShoppingCart, renderCartProducts } from "./src/menuCarrinho";

renderCatalog();

initializeShoppingCart();

renderCartProducts();

updateCartPrice();

filterInitialize();