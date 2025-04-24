// main.js
import { getCart, addItemToCart, saveCart } from './session_cart.js';
import { loadCartProducts, loadProducts } from './ajax_handler.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Initialize cart first
  initCart();

  // 2) Bind click handlers for cart icon
  const cartLink = document.getElementById('cart-link');
  if (cartLink) {
    cartLink.addEventListener('click', e => {
      e.preventDefault();
      const cart = getCart();
      
      // If cart is empty, show message
      if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }
      
      // Redirect to cart page (simplified - remove AJAX for now)
      window.location.href = 'shopping_cart.html';
    });
  }

  // 3) Bind the "Comprar" buttons on product cards
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  console.log('Found buttons:', addToCartButtons.length); // For debugging
  
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      // Get data from the button
      const uuid = btn.dataset.uuid;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      
      // Populate modal
      document.getElementById('product-uuid').value = uuid;
      document.getElementById('productAmountAddModal').value = 1;
      
      // Show modal
      $('#addToCartModal').modal('show');
    });
  });

  // 4) Confirm button in modal
  const confirmBtn = document.getElementById('confirm-add-to-cart');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const uuid = document.getElementById('product-uuid').value;
      const amount = parseInt(document.getElementById('productAmountAddModal').value, 10) || 1;
      
      if (amount <= 0) {
        alert('Por favor ingresa una cantidad válida');
        return;
      }
      
      // Find product data from original button
      const btn = document.querySelector(`.add-to-cart-btn[data-uuid="${uuid}"]`);
      if (!btn) {
        return alert('Producto no encontrado');
      }
      
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      
      // Add to cart
      addItemToCart({ uuid, name, price, amount });
      
      $('#addToCartModal').modal('hide');
      alert('Producto agregado al carrito!');
    });
  }
});

// Add this function to make sure it's available
function initCart() {
  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify([]));
  }
}