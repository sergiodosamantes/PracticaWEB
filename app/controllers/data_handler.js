
"use strict";

import fs from 'fs';
import { Product } from './product.js';
import { ShoppingCart } from './shopping_cart.js';

let shoppingCart = new ShoppingCart();


let content = fs.readFileSync("D:/DOCSWEB/Practica3/data/products.json", "utf-8");
let products = JSON.parse(content).map(obj => Product.createFromObject(obj));
console.log("Productos cargados:", products);  // log para ver si mis productos se han cargado y no hay fallas


function getCart() {
    return shoppingCart.products;  
}

function saveCart(cart) {
    shoppingCart.products = cart;  // lo guard a en el carrito
}

function getProducts(query) {
    if (!query) return products;
    return findProduct(query);
}

function getProductById(uuid) {
    console.log("Buscando producto con UUID:", uuid); // log para ver   que producto esta buscando
    return products.find(product => product.uuid === uuid);
}


function createProduct(product) {
    if (!validateProduct(product)) {
        throw new Error("Invalid product data");
    }
    const newProduct = Product.createFromObject(product);
    products.push(newProduct);
    saveProducts();
    return newProduct;
}

function updateProduct(uuid, updatedProduct) {
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new Error("Product not found");
    }
    Product.cleanObject(updatedProduct);
    Object.assign(products[index], updatedProduct);
    saveProducts();
    return products[index];
}

function deleteProduct(uuid) {
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new Error("Product not found");
    }
    products.splice(index, 1);
    saveProducts();
}

function findProduct(query) {
    return products.filter(product => {
        return Object.keys(query).every(key =>
            String(product[key]).toLowerCase().includes(String(query[key]).toLowerCase())
        );
    });
}

function saveProducts() {
    fs.writeFileSync("D:/DOCSWEB/Practica3/data/products.json", JSON.stringify(products, null, 2), "utf-8");
}

function validateProduct(product) {
    const requiredFields = ["title", "description", "imageUrl", "unit", "stock", "pricePerUnit", "category"];
    return requiredFields.every(field => product[field] !== undefined);
}

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCart,
    saveCart,
};

  