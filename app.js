/* eslint-disable */
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { servidor } from './server/db.js';
import appBodegas from './routers/bodegas.js';
import appProductos from './routers/productos.js';
import appInventarios from './routers/inventarios.js';
import appTraslado from './routers/traslados.js';
/* eslint-enable */
dotenv.config();
const appExpress = express();

appExpress.use(express.json());

appExpress.use('/bodega', appBodegas);
appExpress.use('/total', appProductos);
appExpress.use('/inventario', appInventarios);
appExpress.use('/traslado', appTraslado);

appExpress.listen(servidor.port, () => {
  // eslint-disable-next-line
  console.log(`Servidor escuchando en http://${servidor.addresses}:${servidor.port}/`);
});

export default appExpress;
