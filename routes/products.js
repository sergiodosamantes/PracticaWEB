
"use strict";

import express from 'express';
import data_handler from '../app/controllers/data_handler.js'; 

const router = express.Router();

router.route("/")
.get((req, res) => {
    try {
        let products = data_handler.getProducts();
        let query = req.query.filter;

        if (query) {
            
            products = products.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        }

        res.status(200).json(products);
    } catch (e) {
        res.status(500).send("Error al obtener productos");
    }
});

router.route("/cart")
.post((req, res) => {
    try {
        let cartItems = req.body;
        if (!Array.isArray(cartItems)) {
            return res.status(400).json({ error: "El cuerpo de la solicitud debe ser un arreglo" });
        }

        let products = [];
        let notFoundIds = [];

        for (let item of cartItems) {
            const { productUuid, amount } = item;
            if (!productUuid || !amount) {
                return res.status(400).json({ error: "Cada item debe tener 'productUuid' y 'amount'" });
            }

            let product = data_handler.getProductById(productUuid);  
            if (product) {
                products.push({ product, amount });
            } else {
                notFoundIds.push(productUuid);  
            }
        }

        if (notFoundIds.length > 0) {
            return res.status(404).json({ error: "Productos no encontrados", ids: notFoundIds });
        }

        let cart = data_handler.getCart();

        for (let item of products) {
            const existingProductIndex = cart.findIndex(cartItem => cartItem.product._uuid === item.product._uuid);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].amount += item.amount;
            } else {
                cart.push(item);
            }
        }

        data_handler.saveCart(cart);

        res.status(200).json(products);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error al agregar productos al carrito");
    }
});


router.route("/:uuid")
   .get((req, res) => {
     try {
       let uuid = req.params.uuid;  
       let product = data_handler.getProductById(uuid);

       if (!product) {
         return res.status(404).json({ error: "Producto no encontrado" });
       }

       res.status(200).json(product);
     } catch (e) {
       res.status(500).send("Error al obtener el producto");
     }
   });




export default router; 
