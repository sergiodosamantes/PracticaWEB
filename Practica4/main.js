
import { getCart, addItemToCart, saveCart } from './session_cart.js';
import { loadCartProducts, loadProducts } from './ajax_handler.js';

document.addEventListener('DOMContentLoaded', () => {
  // inicia el carroo
  initCart();

  // inicia los click y te indica si el carrito esta vacio
  const cartLink = document.getElementById('cart-link');
  if (cartLink) {
    cartLink.addEventListener('click', e => {
      e.preventDefault();
      const cart = getCart();
      
  
      if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }
      
   
      window.location.href = 'shopping_cart.html';
    });
  }


  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  console.log('Found buttons:', addToCartButtons.length); 
  
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      
      const uuid = btn.dataset.uuid;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      
      document.getElementById('product-uuid').value = uuid;
      document.getElementById('productAmountAddModal').value = 1;
      
    
      $('#addToCartModal').modal('show');
    });
  });

  // botton de confirmar en el modal
  const confirmBtn = document.getElementById('confirm-add-to-cart');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const uuid = document.getElementById('product-uuid').value;
      const amount = parseInt(document.getElementById('productAmountAddModal').value, 10) || 1;
      
      if (amount <= 0) {
        alert('Por favor ingresa una cantidad válida');
        return;
      }
      
   
      const btn = document.querySelector(`.add-to-cart-btn[data-uuid="${uuid}"]`);
      if (!btn) {
        return alert('Producto no encontrado');
      }
      
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      
//añadir al carrito
      addItemToCart({ uuid, name, price, amount });
      
      $('#addToCartModal').modal('hide');
      alert('Producto agregado al carrito!');
    });
  }
});

function initCart() {
  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify([]));
  }
}