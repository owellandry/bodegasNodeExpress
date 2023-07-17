/*eslint-disable*/
import {DatosProductos} from '../controller/productosDTO.js'
import "reflect-metadata";
import express from 'express';
import { plainToClass } from "class-transformer";

const middlewareProductos = express();
middlewareProductos.use((req, res, next) => {
try {
let data = plainToClass(DatosProductos, req.body, {
    excludeExtraneousValues: true,
});
req.body = JSON.parse(JSON.stringify(data));
next();
} catch (error) {
res.status(error.status).send(error);
}
});

export default middlewareProductos;

