"use strict";

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct } from "./data_handler.js";
import { ShoppingCart } from "./shopping_cart.js";

// 1. Poblar la lista de productos (4 playeras FC Barcelona)
console.log("=== Agregando playeras FC Barcelona ===");

const product1 = createProduct({
  title: "Playera FC Barcelona Visitante Blanca",
  description: "Playera del equipo principal. Color blanco Barcelona, con estampado de la Liga.",
  imageUrl: "https://jerseyco.mx/cdn/shop/files/BarcelonaVisitante24.jpg?v=1692477243",
  unit: "pieza",
  stock: 10,
  pricePerUnit: 250,
  category: "Ropa"
});

const product2 = createProduct({
  title: "Playera FC Barcelona Local Last League",
  description: "Playera del equipo principal, de la temporada donde se ganó la última liga española con Xavi.",
  imageUrl: "https://down-mx.img.susercontent.com/file/6b00e75ac38df77f0ed36b0af04e3c26",
  unit: "pieza",
  stock: 8,
  pricePerUnit: 300,
  category: "Ropa"
});

const product3 = createProduct({
  title: "Playera FC Barcelona Mix",
  description: "Playera de entrenamiento versión Champions League, con colores mezclados de la playera visitante y local.",
  imageUrl: "https://jerseyco.mx/cdn/shop/files/BarcelonaEntrenamiento24.png?v=1712535006",
  unit: "pieza",
  stock: 12,
  pricePerUnit: 200,
  category: "Ropa"
});

const product4 = createProduct({
  title: "Playera FC Barcelona Training",
  description: "Equipación del equipo para los entrenamientos, con tela increíble para el sudor y el sol.",
  imageUrl: "https://www.innovasport.com/medias/IS-CW4874-452-2.png?context=bWFzdGVyfGltYWdlc3w5NzM3MHxpbWFnZS9wbmd8aW1hZ2VzL2hkOC9oZmYvMTAxOTI4NDE1MDY4NDYucG5nfDFmOGNhY2EzYTk0ZGEzNWFjODBiYjZhY2EzMmY1NjM5NGRjOWU3ZWM1Mzg3MTI4Y2JmYzhmMmVjNTMyNDJjMDk",
  unit: "pieza",
  stock: 6,
  pricePerUnit: 350,
  category: "Ropa"
});

console.log("Productos agregados:", getProducts());

// 2. Actualizar un producto (por ejemplo, actualizar stock y precio del producto2)
console.log("\n=== Actualizando producto ===");
updateProduct(product2.uuid, { stock: 10, pricePerUnit: 320 });
console.log("Producto actualizado:", getProductById(product2.uuid));

// 3. Eliminar un producto (eliminamos la Playera Training)
console.log("\n=== Eliminando producto ===");
deleteProduct(product4.uuid);
console.log("Productos después de eliminar:", getProducts());

// 4. Pruebas de búsqueda
console.log("\n=== Pruebas de búsqueda ===");
console.log("Búsqueda por categoría (Ropa):", findProduct("Ropa:"));
console.log("Búsqueda por nombre (Playera FC Barcelona Mix):", findProduct("Playera FC Barcelona Mix"));
console.log("Búsqueda combinada (Ropa: Playera FC Barcelona Visitante):", findProduct("Ropa: Playera FC Barcelona Visitante"));

// 5. Pruebas del Carrito de Compras
console.log("\n=== Pruebas del Carrito de Compras ===");

const cart = new ShoppingCart();

// Agregar productos al carrito usando sus UUID generados
cart.addItem(product1.uuid, 2);
cart.addItem(product2.uuid, 1);
cart.addItem(product3.uuid, 3);

console.log("Carrito después de agregar productos:", cart.productProxies);

// Actualizar cantidad en el carrito (actualizamos la cantidad del producto1)
console.log("\n=== Actualizando cantidad en el carrito ===");
cart.updateItem(product1.uuid, 3);
console.log("Carrito después de actualizar cantidad:", cart.productProxies);

// Eliminar un producto del carrito (eliminamos el producto2)
console.log("\n=== Eliminando producto del carrito ===");
cart.removeItem(product2.uuid);
console.log("Carrito después de eliminar producto:", cart.productProxies);

// Calcular total (asignamos la lista completa de productos al carrito)
cart.products = getProducts();
console.log("\nTotal del carrito:", cart.calculateTotal());
