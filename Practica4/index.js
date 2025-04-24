
import { initProductsPage } from './product_utils.js';

// Inicializa la página de productos (carga los productos
document.addEventListener('DOMContentLoaded', () => {
  // Solo inicializa si estamos en la página de productos
  if (document.getElementById('productos-container')) {
    initProductsPage();
  }
});