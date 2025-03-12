"use strict";


class ShoppingCartException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class ProductProxy{
    constructor(productUid, amount){
        this.productUid = productUid;
        this.amount = amount;
    }
}


class ShoppingCart{

    constructor(){
        this.products = [];
        this.productProxies = [];
    }

    get products(){

    }

    set products(value){
        this.products = [];


        this.products.push(Product.createFromObject(value));
    }

    get productProxies(){

    }

    set productProxies(value){
        throw new ShoppingCartException("Unable to modify proxies directly, use the corresponidng methods")
    }

    addItem(productUid, amount){
        if (amount == 0) return;
        if (amount < 0) throw new ShoppingCartException("Amount cannot be negative");

        //find -> update existing or throw error if not
        //find uuid in proxies -> update existing -> updateItem()

        //or create new

        let newItem = new ProductProxy(productUid, amount)
    }
}