(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const C={id:"1",marca:"Zara",nome:"Camisa Larga com Bolsos",preco:70,imagem:"product-1.jpg",feminino:!1},E={id:"2",marca:"Zara",nome:"Casaco Reto com Lã",preco:85,imagem:"product-2.jpg",feminino:!0},x={id:"3",marca:"Zara",nome:"Jaqueta com Efeito Camurça",preco:60,imagem:"product-3.jpg",feminino:!1},L={id:"4",marca:"Zara",nome:"Sobretudo em Mescla de Lã",preco:160,imagem:"product-4.jpg",feminino:!1},b={id:"5",marca:"Zara",nome:"Camisa Larga Acolchoada de Veludo Cotelê",preco:110,imagem:"product-5.jpg",feminino:!1},v={id:"6",marca:"Zara",nome:"Casaco de Lã com Botões",preco:170,imagem:"product-6.jpg",feminino:!0},I={id:"7",marca:"Zara",nome:"Casaco com Botões",preco:75,imagem:"product-7.jpg",feminino:!0},B={id:"8",marca:"Zara",nome:"Colete Comprido com Cinto",preco:88,imagem:"product-8.jpg",feminino:!0},d=[C,E,x,L,b,v,I,B];function s(e,t){localStorage.setItem(e,JSON.stringify(t))}function $(e){return JSON.parse(localStorage.getItem(e))}const n=$("carrinho")??{};function S(){document.getElementById("carrinho").classList.remove("right-[-360px]"),document.getElementById("carrinho").classList.add("right-[0px]")}function P(){document.getElementById("carrinho").classList.remove("right-[0px]"),document.getElementById("carrinho").classList.add("right-[-360px]")}function w(){Object.keys(n).length!==0&&(window.location.href="./checkout.html")}function j(){const e=document.getElementById("fechar-carrinho"),t=document.getElementById("abrir-carrinho"),i=document.getElementById("direcionar-checkout");e.addEventListener("click",P),t.addEventListener("click",S),i.addEventListener("click",w)}function p(e){n[e]++,s("carrinho",n),l(),f(e)}function k(e){n[e]--,s("carrinho",n),l(),f(e),n[e]===0&&g(e)}function f(e){document.getElementById(`quantidade-${e}`).innerText=n[e]}function g(e){delete n[e],y(),s("carrinho",n)}function h(e){const t=d.find(a=>a.id===e),i=document.getElementById("produtos-carrinho"),c=document.createElement("article"),o=["flex","bg-slate-100","rounded-lg","p-2","relative"];for(const a of o)c.classList.add(a);const r=`<img 
  src="./assets/img/${t.imagem}" 
  alt="Carrinho: ${t.nome}" 
  class="h-24 pr-4 border-5 border-slate-950"
  />
  <div class="p-2 flex flex-col justify-between">
  <p class="text-slate-900 text-sm">${t.nome}</p>
  <p class="text-slate-500 text-xs">Tamanho: M</p>
  <p class="text-green-400 text-lg">$${t.preco}</p>
  </div>
  <button id="excluir-item-${t.id}" class="absolute top-0 right-2">
    <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
  </button>
  <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
  <button id="decrement-product-${t.id}">-</button>
  <p id="quantidade-${t.id}" class="ml-2">${n[t.id]}</p>
  <button id="increment-product-${t.id}" class="ml-2">+</button>
  </div>`;c.innerHTML+=r,i.appendChild(c),document.getElementById(`decrement-product-${t.id}`).addEventListener("click",()=>k(t.id)),document.getElementById(`increment-product-${t.id}`).addEventListener("click",()=>p(t.id)),document.getElementById(`excluir-item-${t.id}`).addEventListener("click",()=>g(t.id))}function y(){const e=document.getElementById("produtos-carrinho");e.innerHTML="";for(const t in n)h(t);s("carrinho",n),l()}function T(e){if(e in n){p(e);return}n[e]=1,s("carrinho",n),h(e),l()}function l(){const e=document.getElementById("preco-total");let t=0;for(const i in n)t+=d.find(c=>c.id===i).preco*n[i],console.log(d.find(c=>c.id===i).preco);e.innerText=`Total: R$${t}`}function O(){for(const e of d){const t=`<div 
            class="border-solid shadow-xl shadow-slate-400 rounded-lg w-52 m-2 flex flex-col p-2 justify-between group hover:scale-110 duration-300 group ${e.feminino?"feminino":"masculino"}"
            id="card-produto-${e.id}"
            >
            <img 
            src="./assets/img/${e.imagem}" 
            alt="Produto 1 do Magazine Hashtag."
            class="group-hover:scale-125 duration-300 group-hover:mb-10 rounded-lg shadow-xl shadow-slate-300"
            />
            <p class='text-sm'>${e.marca}</p>
            <p class='text-sm'>${e.nome}</p>
            <p class='text-sm'>R$${e.preco}</p>
            <button 
                id="addProduct-${e.id}"
                class="bg-slate-950 hover:bg-slate-700"
                >
                <i class="fa-solid fa-cart-plus text-slate-200"></i>
            </button>
        </div>`;document.getElementById("container-produto").innerHTML+=t}for(const e of d)document.getElementById(`addProduct-${e.id}`).addEventListener("click",()=>T(e.id))}const m=document.getElementById("container-produto");function u(){const e=Array.from(m.getElementsByClassName("hidden"));for(const t of e)t.classList.remove("hidden")}function M(){u();const e=Array.from(m.getElementsByClassName("masculino"));for(const t of e)t.classList.add("hidden")}function N(){u();const e=Array.from(m.getElementsByClassName("feminino"));for(const t of e)t.classList.add("hidden")}function Z(){document.getElementById("exibir-todos").addEventListener("click",u),document.getElementById("exibir-femininos").addEventListener("click",M),document.getElementById("exibir-masculinos").addEventListener("click",N)}O();j();y();l();Z();
