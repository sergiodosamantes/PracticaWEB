"use strict";

import express from 'express';
import router from './app/controllers/router.js';  
import path from 'path';  

const app = express();
const port = 3000;

// Usar process.cwd() paraq lograr ver el directorio
const fixedDirname = process.cwd();

console.log('Directorio de trabajo:', fixedDirname);

app.use(express.json());
app.use(router);

app.set('views', path.join(fixedDirname, 'views'));

app.use(express.static(path.join(fixedDirname, 'views')));

app.set('view engine', 'ejs');

// Rutas
app.get('/', (req, res) => {
    const homePath = path.resolve(fixedDirname, 'views', 'home.html');
    console.log('Ruta a home.html:', homePath);
    res.sendFile(homePath); 
  });

app.get('/home', (req, res) => {
  const homePath = path.resolve(fixedDirname, 'views', 'home.html');
  console.log('Ruta a home.html:', homePath);
  res.sendFile(homePath);  
});

app.get('/shopping_cart', (req, res) => {
  const shoppingCartPath = path.resolve(fixedDirname, 'views', 'shopping_cart.html');
  console.log('Ruta a shopping_cart.html:', shoppingCartPath);
  res.sendFile(shoppingCartPath); 
});

app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
