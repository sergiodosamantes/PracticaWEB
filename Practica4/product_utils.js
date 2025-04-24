// js/product_utils.js 
"use strict";

import { loadProducts } from "./ajax_handler.js";
import { productsUrl } from "../app/controllers/utils.js";
import { getCart, addItemToCart, saveCart } from "./session_cart.js";

// Contenedor donde se inyectarán los productos
const productContainer = document.querySelector("#productos-container");

/**
 * Genera el HTML para una sola tarjeta de producto
 */
export function productToHTML(product) {
  return `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <span class="d-none">${product._uuid}</span>
      <div class="card h-100">
        <img src="${product._imageUrl}" class="card-img-top" alt="${product._title}" style="max-height: 250px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${product._title}</h5>
          <p class="card-text">${product._description}</p>
          <button class="btn btn-primary btn-block add-to-cart-btn"
            data-uuid="${product._uuid}"
            data-name="${product._title}"
            data-price="${parseFloat(product._price).toFixed(2)}">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza una lista de productos
 */
export function productListToHTML(productList) {
  productContainer.innerHTML = `
    <div class="row">
      ${productList.map(productToHTML).join("\n")}
    </div>
  `;
}

/**
 * Carga productos desde el endpoint y renderiza la primera página
 */
let allProducts = [];
const pageSize = 4;
let currentPage = 1;

export function renderPage(page) {
  currentPage = page;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const subset = allProducts.slice(start, end);
  
  productContainer.innerHTML = '';
  subset.forEach(product => {
    const productHTML = productToHTML(product);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = productHTML;
    productContainer.appendChild(tempDiv.firstElementChild);
  });
  
  bindAddButtons();
  renderPagination();
}

export function renderPagination() {
  const totalPages = Math.ceil(allProducts.length / pageSize);
  const container = document.getElementById("pagination");
  
  if (!container) return;
  
  container.innerHTML = '';
  
  // Botón Anterior
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `
    <a class="page-link" href="#" aria-label="Anterior">
      <span aria-hidden="true">&laquo;</span>
      <span class="sr-only">Anterior</span>
    </a>
  `;
  container.appendChild(prevLi);
  
  if (currentPage > 1) {
    prevLi.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(currentPage - 1);
    });
  }
  
  // Botones de páginas
  for (let p = 1; p <= totalPages; p++) {
    const li = document.createElement('li');
    li.className = `page-item ${p === currentPage ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${p}</a>`;
    
    li.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(p);
    });
    
    container.appendChild(li);
  }
  
  // Botón Siguiente
  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `
    <a class="page-link" href="#" aria-label="Siguiente">
      <span aria-hidden="true">&raquo;</span>
      <span class="sr-only">Siguiente</span>
    </a>
  `;
  container.appendChild(nextLi);
  
  if (currentPage < totalPages) {
    nextLi.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(currentPage + 1);
    });
  }
}

/**
 * Enlaza los botones "Agregar al carrito" de la vista para abrir el modal
 */
export function bindAddButtons() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('product-uuid').value = btn.dataset.uuid;
      document.getElementById('productAmountAddModal').value = 1;
      $('#addToCartModal').modal('show');
    });
  });
}

// Inicialización: carga los productos y renderiza la primera página
export function initProductsPage() {
  loadProducts(productsUrl)
    .then(products => {
      allProducts = products;
      renderPage(1);
    })
    .catch(err => console.error('Error cargando productos:', err));
}