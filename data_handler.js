"use string";


const products = [];

function getProducts(){
    return products;
}

function getProductsById(uuid){
    return products.find();
}

function createProduct(product){
    products.push(Product.createFromObject(product));
}

function updateProduct(uuid, product){
    //products.find -> update (object.assign)
}

function deleteProduct(uuid){
    //products.find -> splice
}

function findProduct(query){
    //"Fruta": a" -> buscar en .category y en .title
    
}
