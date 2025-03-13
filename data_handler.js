"use strict";

import { Product } from "./products.js";

let products = [];

function getProducts() {
    return products;
}

/**
 * Retorna el producto cuyo uuid coincide.
 * @param {string} uuid 
 * @returns {Product|undefined} 
 */
function getProductById(uuid) {
    return products.find(product => product.uuid === uuid);
}

/**
 * Crea un nuevo producto a partir de un objeto y lo agrega a la lista.
 * Se utiliza Product.createFromObject para validar y construir la instancia.
 * @param {Object} product 
 * @returns {Product} */
function createProduct(product) {
    const newProduct = Product.createFromObject(product);
    products.push(newProduct);
    return newProduct;
}

/**
 * Actualiza un producto existente por su uuid.
 * Se limpia el objeto actualizado 
 * @param {string} uuid - Identificador único del producto a actualizar.
 * @param {Object} updatedProduct -
 * @returns {Product} 
 * @throws {Error} Si el producto no es encontrado.
 */
function updateProduct(uuid, updatedProduct) {
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new Error("Product not found");
    }
    Product.cleanObject(updatedProduct);
    Object.assign(products[index], updatedProduct);
    return products[index];
}

/**
 * Elimina un producto de la lista según su uuid.
 * @param {string} uuid 
 * @throws {Error} Si el producto no es encontrado.
 */
function deleteProduct(uuid) {
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new Error("Product not found");
    }
    products.splice(index, 1);
}

/**
 * Busca productos basándose en el query recibido.
 * @param {string} query 
 * @returns {Array<Product>} Arreglo con los productos que cumplen los filtros.
 */
function findProduct(query) {
    if (!query || typeof query !== "string") {
        return [];
    }
    let category = null;
    let title = null;
    const parts = query.split(':');
    if (parts.length >= 2) {
        category = parts[0].trim();
        title = parts[1].trim();
        if (category === "") category = null;
        if (title === "") title = null;
    } else {
        title = query.trim();
        if (title === "") title = null;
    }

    return products.filter(product => {
        let categoryMatch = true;
        let titleMatch = true;
        if (category) {
            categoryMatch = product.category.toLowerCase().includes(category.toLowerCase());
        }
        if (title) {
            titleMatch = product.title.toLowerCase().includes(title.toLowerCase());
        }
        return categoryMatch && titleMatch;
    });
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct };
