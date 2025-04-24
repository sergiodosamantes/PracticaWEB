// session_cart.js
// 1. Inicializar el carrito si no existe
export function initCart() {
  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify([]));
  }
}

// 2. Leer carrito
export function getCart() {
  initCart();
  return JSON.parse(sessionStorage.getItem('cart'));
}

// 3. Guardar carrito
export function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// 4. Añadir ítem (o sumar cantidad si ya existe)
export function addItemToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.uuid === item.uuid);
  if (existing) {
    existing.amount += item.amount;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

// 5. Eliminar ítem
export function removeItemFromCart(uuid) {
  const cart = getCart();
  const updatedCart = cart.filter(i => i.uuid !== uuid);
  saveCart(updatedCart);
}