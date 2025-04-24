"use strict";
import { getCart, saveCart } from './session_cart.js';


function priceSummaryToHtml(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.amount * item.price, 0);

    return `
        <div class="price-summary">
            <p>Total Items: ${totalItems}</p>
            <p>Total Price: $${totalPrice.toFixed(2)}</p>
        </div>
    `;
}

function shoppingCartToHtml(cart) {
    return cart.map((item, index) => `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.amount}" disabled data-index="${index}" />
                <button onclick="enableAmount(event)">✎</button>
                <button class="confirm-btn" style="display:none;" onclick="confirmAmount(event)">✓</button>
                <button class="cancel-btn" style="display:none;" onclick="cancelAmount(event)">✗</button>
            </td>
            <td>$${(item.amount * item.price).toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(event)">
                  🗑️ Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

function preloadAddToCartModal(_uuid){
    document.getElementById("product-uuid").value = _uuid;
    document.getElementById("productAmountAddModal").value = 1;
}

function addProductToCart() {
    const uuid = document.getElementById("product-uuid").value;
    const amount = parseInt(document.getElementById("productAmountAddModal").value);

    loadProducts(productsUrl).then(products => {
        const product = products.find(p => p._uuid === uuid);
        if (!product) return alert("Producto no encontrado");

        const cart = getCart();
        const existing = cart.find(item => item.uuid === uuid);
        if (existing) {
            existing.amount += amount;  // Sumar cantidad en vez de reemplazar
        } else {
            cart.push({
                uuid: product._uuid,
                name: product._title,
                price: parseFloat(product._price || "99.99"),
                image: product._imageUrl,
                amount: amount
            });
        }
        saveCart(cart);
        $('#addToCartModal').modal('hide');
        alert("Producto agregado al carrito!");
    });
}

function preloadShoppingCart() {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}

function enableAmount(event) {
    const row = event.target.closest("tr");
    const input = row.querySelector("input[type='number']");
    const confirmBtn = row.querySelector(".confirm-btn");
    const cancelBtn = row.querySelector(".cancel-btn");

    input.disabled = false;
    input.dataset.original = input.value;
    confirmBtn.style.display = "inline";
    cancelBtn.style.display = "inline";
    event.target.style.display = "none";
}

function confirmAmount(event) {
    const row = event.target.closest("tr");
    const input = row.querySelector("input[type='number']");
    const index = input.dataset.index;
    const newAmount = parseInt(input.value);

    if (!isNaN(newAmount) && newAmount > 0) {
        const cart = getCart();
        cart[index].amount = newAmount;
        saveCart(cart);
        location.reload(); // Actualiza la vista del carrito
    } else {
        alert("Cantidad no válida");
    }
}

function cancelAmount(event) {
    const row = event.target.closest("tr");
    const input = row.querySelector("input[type='number']");
    const confirmBtn = row.querySelector(".confirm-btn");
    const cancelBtn = row.querySelector(".cancel-btn");
    const editBtn = row.querySelector("button:not(.confirm-btn):not(.cancel-btn)");

    input.value = input.dataset.original;
    input.disabled = true;
    confirmBtn.style.display = "none";
    cancelBtn.style.display = "none";
    editBtn.style.display = "inline";
}

function deleteItem(event) {
  
    const row = event.target.closest('tr');
    const input = row.querySelector('input[type="number"]');
    const index = parseInt(input.dataset.index, 10);
  
   
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  

    location.reload();
}

const cart = getCart();
saveCart(cart);


export {
    preloadShoppingCart,
    shoppingCartToHtml,
    priceSummaryToHtml,
    enableAmount,
    confirmAmount,
    cancelAmount,
    deleteItem,
    addProductToCart,
    preloadAddToCartModal
};