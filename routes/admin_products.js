"use strict";


import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import data_handler from '../app/controllers/data_handler.js';

const router = express.Router();
// creamos un producto (post)
router.post("/", (req, res) => {
    try {
        const { title, description, imageUrl, unit, stock, pricePerUnit, category } = req.body;

        // Validmos que no falte nada
        const missingFields = [];
        if (!title) missingFields.push("title");
        if (!description) missingFields.push("description");
        if (!imageUrl) missingFields.push("imageUrl");
        if (!unit) missingFields.push("unit");
        if (stock === undefined) missingFields.push("stock");
        if (pricePerUnit === undefined) missingFields.push("pricePerUnit");
        if (!category) missingFields.push("category");

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan atributos: ${missingFields.join(", ")}` });
        }

        const newProduct = {
            uuid: uuidv4(),
            title,
            description,
            imageUrl,
            unit,
            stock,
            pricePerUnit,
            category
        };

        data_handler.createProduct(newProduct);
        res.status(201).json({ message: `Producto '${newProduct.title}' creado con éxito`, product: newProduct });

    } catch (error) {
        res.status(500).json({ error: "Error al registrar el producto", details: error.message });
    }
});

// Actualiza un productp
router.put("/:id", (req, res) => {
    try {
        const uuid = req.params.id;
        const { title, description, imageUrl, unit, stock, pricePerUnit, category } = req.body;

        const product = data_handler.getProductById(uuid);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Validar que al menos un atributo sea enviado
        if (!title && !description && !imageUrl && !unit && stock === undefined && pricePerUnit === undefined && !category) {
            return res.status(400).json({ error: "No hay atributos válidos para actualizar" });
        }

        const updatedProduct = { title, description, imageUrl, unit, stock, pricePerUnit, category };
        const result = data_handler.updateProduct(uuid, updatedProduct);

        res.status(200).json({ message: "Producto actualizado con éxito", product: result });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto", details: error.message });
    }
});

// eliminar un producto
router.delete("/:id", (req, res) => {
    try {
        const uuid = req.params.id;
        const product = data_handler.getProductById(uuid);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        data_handler.deleteProduct(uuid);
        res.status(200).json({ message: `Producto '${product.title}' eliminado con éxito` });

    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto", details: error.message });
    }
});

export default router;
