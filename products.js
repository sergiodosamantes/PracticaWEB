"use strict";

import { generateUUID } from "./utils.js";

class ProductException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    toString() {
        return `ProductException: ${this.errorMessage}`;
    }
}

class Product {
    // Eliminamos el parámetro uuid, se genera internamente.
    constructor(title, description, imageUrl, unit, stock, pricePerUnit, category) {
        // Genera el UUID automáticamente:
        this._uuid = generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(value) {
        // No se permite modificar el UUID desde fuera.
        throw new ProductException("UUID is read-only");
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new ProductException("Product title cannot be empty");
        }
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new ProductException("Product description cannot be empty");
        }
        this._description = value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(value) {
        if (typeof value !== "string" || !value.startsWith("http")) {
            throw new ProductException("Invalid image URL");
        }
        this._imageUrl = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new ProductException("Unit cannot be empty");
        }
        this._unit = value;
    }

    get stock() {
        return this._stock;
    }

    set stock(value) {
        if (!Number.isInteger(value) || value < 0) {
            throw new ProductException("Stock must be a non-negative integer");
        }
        this._stock = value;
    }

    get pricePerUnit() {
        return this._pricePerUnit;
    }

    set pricePerUnit(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new ProductException("Price per unit must be a positive number");
        }
        this._pricePerUnit = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new ProductException("Category cannot be empty");
        }
        this._category = value;
    }

    static createFromJson(jsonValue) {
        try {
            let obj = JSON.parse(jsonValue);
            return Product.createFromObject(obj);
        } catch (error) {
            throw new ProductException("Invalid JSON format");
        }
    }

    static createFromObject(obj) {
        Product.cleanObject(obj);
        return new Product(
            obj.title,
            obj.description,
            obj.imageUrl,
            obj.unit,
            obj.stock,
            obj.pricePerUnit,
            obj.category
        );
    }

    static cleanObject(obj) {
        const allowedKeys = ["title", "description", "imageUrl", "unit", "stock", "pricePerUnit", "category"];
        Object.keys(obj).forEach(key => {
            if (!allowedKeys.includes(key)) {
                delete obj[key];
            }
        });
    }
}

export { Product, ProductException };
