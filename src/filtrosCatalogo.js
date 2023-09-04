const catalogoProdutos = document.getElementById("container-produto");

function showAll() {
    const hiddenProducts = Array.from(catalogoProdutos.getElementsByClassName('hidden'));
    for (const product of hiddenProducts) {
        product.classList.remove('hidden');
    }
}

function hideMale() {
    showAll();
    const maleProducts = Array.from(catalogoProdutos.getElementsByClassName('masculino'));
    
    for (const product of maleProducts) {
        product.classList.add('hidden');
    }
}

function hideFemale() {
    showAll();
    const femaleProducts = Array.from(catalogoProdutos.getElementsByClassName('feminino'));
    
    for (const product of femaleProducts) {
        product.classList.add('hidden');
    }
}

export function filterInitialize() {
    document.getElementById('exibir-todos').addEventListener('click', showAll);
    document.getElementById('exibir-femininos').addEventListener('click', hideMale);
    document.getElementById('exibir-masculinos').addEventListener('click', hideFemale);
}