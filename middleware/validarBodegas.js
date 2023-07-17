/*eslint-disable*/
import {DatoBodegas} from '../controller/bodegasDto.js'
import "reflect-metadata";
import express from 'express';
import { plainToClass } from "class-transformer";

const middlewareBodega = express();
middlewareBodega.use((req, res, next) => {
try {
let data = plainToClass(DatoBodegas, req.body, {
    excludeExtraneousValues: true,
});
req.body = JSON.parse(JSON.stringify(data));
next();
} catch (error) {
res.status(error.status).send(error);
}
});

export default middlewareBodega;


