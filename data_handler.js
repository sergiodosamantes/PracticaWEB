"use strict";

import { Product } from "./products.js";

const products = [];

/**
 * Retorna el arreglo completo de productos.
 */
function getProducts() {
    return products;
}

/**
 * Retorna el producto cuyo uuid coincide.
 * @param {string} uuid - Identificador único del producto.
 * @returns {Product|undefined} El producto encontrado o undefined si no existe.
 */
function getProductById(uuid) {
    return products.find(product => product.uuid === uuid);
}

/**
 * Crea un nuevo producto a partir de un objeto y lo agrega a la lista.
 * Se utiliza Product.createFromObject para validar y construir la instancia.
 * @param {Object} product - Objeto con los datos del producto.
 * @returns {Product} La instancia creada del producto.
 */
function createProduct(product) {
    const newProduct = Product.createFromObject(product);
    products.push(newProduct);
    return newProduct;
}

/**
 * Actualiza un producto existente identificado por su uuid.
 * Se limpia el objeto actualizado y se usan Object.assign para actualizar la instancia.
 * @param {string} uuid - Identificador único del producto a actualizar.
 * @param {Object} updatedProduct - Objeto con los campos a actualizar.
 * @returns {Product} La instancia actualizada del producto.
 * @throws {Error} Si el producto no es encontrado.
 */
function updateProduct(uuid, updatedProduct) {
    const index = products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
        throw new Error("Product not found");
    }
    // Limpiar el objeto de propiedades que no pertenecen a Product.
    Product.cleanObject(updatedProduct);
    // Actualizamos las propiedades del producto existente.
    Object.assign(products[index], updatedProduct);
    return products[index];
}

/**
 * Elimina un producto de la lista según su uuid.
 * @param {string} uuid - Identificador único del producto a eliminar.
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
 * El formato del query puede ser:
 *   - "<category>: <title>" para filtrar por ambos.
 *   - "<category>:" para filtrar por categoría únicamente.
 *   - "<title>" para filtrar por nombre únicamente.
 * La búsqueda es sensible a subcadenas, ignorando mayúsculas y minúsculas.
 * @param {string} query - Cadena de búsqueda.
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
        // Si no hay ":" se asume que el query es el título.
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
