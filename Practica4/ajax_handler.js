// js/ajax_handler.js
import { initCart, addItemToCart } from '../Practica4/session_cart.js';
export async function loadProducts(url) {
    let response = await fetch(url);
    if (response.status !== 200) return [];
    return await response.json();
  }
  
  export function loadCartProducts(url, productList, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        onSuccess(xhr.responseText);
      } else {
        onError(xhr.status + ": " + xhr.statusText);
      }
    };
    xhr.send(JSON.stringify(productList));
  }
  



// Inicializar carrito al cargar la página
initCart();
