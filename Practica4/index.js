// index.js
import { initProductsPage } from './product_utils.js';

// Inicializa la página de productos (carga los productos y muestra la página 1)
document.addEventListener('DOMContentLoaded', () => {
  // Solo inicializa si estamos en la página de productos
  if (document.getElementById('productos-container')) {
    initProductsPage();
  }
});