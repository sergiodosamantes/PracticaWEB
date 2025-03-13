"use strict";

class ShoppingCartException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    toString() {
        return `ShoppingCartException: ${this.errorMessage}`;
    }
}

class ProductProxy {
    constructor(productUuid, amount) {
        if (!productUuid || typeof productUuid !== "string") {
            throw new ShoppingCartException("Invalid product UUID");
        }
        if (!Number.isInteger(amount) || amount <= 0) {
            throw new ShoppingCartException("Amount must be a positive integer");
        }
        this.productUuid = productUuid;
        this.amount = amount;
    }
}

class ShoppingCart {
    constructor() {
        this._products = [];  // Copia de los productos reales.
        this._productProxies = []; 
    }

    get products() {
        return this._products;
    }
    
    set products(value) {
        this._products = value;
    }

    get productProxies() {
        return this._productProxies;
    }

    set productProxies(value) {
        throw new ShoppingCartException("Unable to modify proxies directly, use the corresponding methods.");
    }

    addItem(productUuid, amount) {
        if (!productUuid || typeof productUuid !== "string") {
            throw new ShoppingCartException("Invalid product UUID");
        }
        if (!Number.isInteger(amount) || amount <= 0) {
            throw new ShoppingCartException("Amount must be a positive integer");
        }

        let proxy = this._productProxies.find(item => item.productUuid === productUuid);
        if (proxy) {
            proxy.amount += amount;
        } else {
            this._productProxies.push(new ProductProxy(productUuid, amount));
        }
    }

    updateItem(productUuid, newAmount) {
        if (!productUuid || typeof productUuid !== "string") {
            throw new ShoppingCartException("Invalid product UUID");
        }
        if (!Number.isInteger(newAmount)) {
            throw new ShoppingCartException("Amount must be an integer");
        }

        let proxy = this._productProxies.find(item => item.productUuid === productUuid);
        if (!proxy) {
            throw new ShoppingCartException("Item not found");
        }

        if (newAmount === 0) {
            this.removeItem(productUuid);
        } else if (newAmount < 0) {
            throw new ShoppingCartException("Amount cannot be negative");
        } else {
            proxy.amount = newAmount;
        }
    }

    removeItem(productUuid) {
        let index = this._productProxies.findIndex(item => item.productUuid === productUuid);
        if (index === -1) {
            throw new ShoppingCartException("Item not found");
        }
        this._productProxies.splice(index, 1);
    }

    calculateTotal() {
        let total = 0;
        for (let proxy of this._productProxies) {
            let product = this._products.find(prod => prod.uuid === proxy.productUuid);
            if (product) {
                total += product.pricePerUnit * proxy.amount;
            }
        }
        return total;
    }
}

export { ShoppingCart, ShoppingCartException, ProductProxy };
