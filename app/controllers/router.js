
"use strict";

import express from 'express';
import productRouter from 'file:///D:/DOCSWEB/Practica3/routes/products.js';  //rutas
import adminProductRouter from 'file:///D:/DOCSWEB/Practica3/routes/admin_products.js';

const router = express.Router();

// Rutas
router.use("/products", productRouter);
router.use("/admin/products", validateAdmin, adminProductRouter);



function validateAdmin(req, res, next) {
    const authHeader = req.headers["x-auth"];

    if (!authHeader || authHeader !== "admin") {
        return res.status(403).json({ error: "Acceso no autorizado, no se cuenta con privilegios de administrador" });
    }

    next();
}

export default router;  
