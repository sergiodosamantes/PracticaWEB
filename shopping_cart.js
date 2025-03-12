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
        return this._products;
    }

    set products(value){
        this.products = [];
        //type string -> parse JSON
        //array --> for and create


        // if a single element -> create
        this.products.push(Product.createFromObject(value));
    }

    get productProxies(){
        return this._productProxies;
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

        let newItem = new ProductProxy(productUid, amount);
        this.productProxies.push(newItem);
    }

    updateItem(productUid, amount){
        if (amount == 0) return;
        if (amount < 0) throw new ShoppingCartException("Amount cannot be negative");

        let item = this.productProxies.find(item => item.productUid == productUid);
        if (!item) throw new ShoppingCartException("Item not found");

        item.amount = amount;
    }

    removeItem(productUid){
        let index = this.productProxies.findIndex(item => item.productUid == productUid);
        if (index == -1) throw new ShoppingCartException("Item not found");

        this.productProxies.splice(index, 1);
    }

}