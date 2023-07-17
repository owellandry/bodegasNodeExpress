/*eslint-disable*/
import {DatosInventario} from '../controller/inventarioDTO.js'
import "reflect-metadata";
import express from 'express';
import { plainToClass } from "class-transformer";

const middlewareInventario = express();
middlewareInventario.use((req, res, next) => {
try {
let data = plainToClass(DatosInventario, req.body, {
    excludeExtraneousValues: true,
});
req.body = JSON.parse(JSON.stringify(data));
next();
} catch (error) {
res.status(error.status).send(error);
}
});

export default middlewareInventario;


