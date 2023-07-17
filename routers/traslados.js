/* eslint-disable */
import express from 'express';
import con from '../server/db.js';
import { plainToClass } from 'class-transformer';

const appTraslado = express.Router();
appTraslado.use(express.json());
/**
 *  ! Metodo GET 
 */
appTraslado.get('/', (req, res) => {
    con.query(
    /* sql */ 'SELECT * FROM bodegas',
    (err, data, fields) => {
    if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
    res.send(data);
    }
);
});
appTraslado.post('/',(req, res) => {
    const body = req.body
        con.query(
        /*sql*/`INSERT INTO bodegas SET ?`,
        body,
        (err,data,fils) => { 
        console.log(err);
            data.affectedRows += 200;
            let resul = body;
            resul.id = data.insertId;
            res.status(201).json({
                message : "se ha creado con exito",
                data : resul
            })
        }
    )
})




export default appTraslado;