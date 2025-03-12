"use strict";

class ProductException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    toString() {
        return `ProductException: ${this.errorMessage}`;
    }
}

class Product {
    constructor(uuid, title, description, imageUrl, unit, stock, pricePerUnit, category) {
        this.uuid = generateUUID;
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
        if (!value || typeof value !== "string") {
            throw new ProductException("Invalid UUID");
        }
        this._uuid = value;
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
        let obj = JSON.parse(jsonValue); 
        return Product.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newProduct = {}
        Object.assign(newProduct,obj);
        Product.cleanObject(newProduct);

        let product = new Product(newProduct.title, newProduct.description, newProduct.imageUrl, newProduct.unit, newProduct.stock, newProduct.pricePerUnit, newProduct.category);
        if (newProduct.uuid) {
            product.uuid = newProduct.uuid;
        }
        return product
    }

    static cleanObject(obj) {
        const allowedKeys = ["uuid", "title", "description", "imageUrl", "unit", "stock", "pricePerUnit", "category"];
        for (let propo in obj){
            if(!productProperties.includes(propo)){
                delete obj[propo];
            }
        }
    }

}
