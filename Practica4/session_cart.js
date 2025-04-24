
// Inicializar el carrito si no existe
export function initCart() {
  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify([]));
  }
}

//  Leer carrito
export function getCart() {
  initCart();
  return JSON.parse(sessionStorage.getItem('cart'));
}

// Guardar carrito
export function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Añadir ítem (o sumar cantidad si ya existe)
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

// Eliminar ítem
export function removeItemFromCart(uuid) {
  const cart = getCart();
  const updatedCart = cart.filter(i => i.uuid !== uuid);
  saveCart(updatedCart);
}