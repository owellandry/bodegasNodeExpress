/* eslint-disable */
import express from 'express';
import con from '../server/db.js';
import { plainToClass } from 'class-transformer';
import  middlewareBodega  from '../middleware/validarBodegas.js';

const appBodegas = express.Router();
appBodegas.use(express.json());
/**
 *  ! Metodo GET listar los datos de bodegas
 */
appBodegas.get('/:id?', (req, res) => {
  (req.params.id)
    ? con.query(
      /* sql */`SELECT * FROM bodegas WHERE id=${req.params.id}`,
      (err, data, fils) => {
        res.send(data);
      },
    )
    : con.query(
      /* sql */'SELECT * FROM bodegas ORDER BY nombre',
      (err, data, fils) => {
        res.send(data);
      },
    );
});
/**
 * ! metodo POST
 *
 * ? manera de insertar los datos
 */
/*
    "nombre": "string",
    "id_responsable": bigint,
    "estado": tyninit,
    "created_by": bigint,
    "update_by": bigint,
    "created_at": "timeStamp",
    "updated_at": timeStamp,
    "deleted_at": timeStamp
*/

appBodegas.post('/',middlewareBodega,(req, res) => {
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
export default appBodegas;

