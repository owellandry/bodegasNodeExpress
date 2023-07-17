/* eslint-disable */
import express from 'express';
import con from '../server/db.js';
import { plainToClass } from 'class-transformer';
import middlewareInventario from '../middleware/validarInventario.js';
const appInventarios = express.Router();
appInventarios.use(express.json());
/**
 * ! metodo POST
 */
appInventarios.post("/",middlewareInventario, (req, res) => {
    const { id_producto, id_bodega, cantidad, created_by, update_by, created_at, updated_at, deleted_at } = req.body;
  
    // Verificar si la combinación de id_producto y id_bodega ya existe en la tabla de inventarios
    con.query(
      /*sql*/ `SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?`,
      [id_producto, id_bodega],
      (err, data, fils) => {
        if (err) {
          res.status(500).send("Internal server error :(");
        } else if (data.length === 0) {
          // Si la combinación no existe, realizar un INSERT en la tabla de inventarios
          const body = req.body;
          con.query(
            /*sql*/ `INSERT INTO inventarios SET ?`,
            body,
            (err, result) => {
              if (err) {
                res.status(500).send("Internal server error");
              } else {
                const insertedData = {
                  id: result.insertId,
                  ...body
                };
                res.status(201).json({
                  message: "Se ha creado con éxito",
                  data: insertedData
                });
              }
            }
          );
        }
         else {
          // Si la combinación ya existe, realizar un UPDATE en la tabla de inventarios
          const currentCantidad = data[0].cantidad;
          const newCantidad = currentCantidad + cantidad;
  
          con.query(
            /*sql*/ `UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?`,
            [newCantidad, id_producto, id_bodega],
            (err, data, fils) => {
              if (err) {
                res.status(500).send("Internal server error");
              } else {
                res.status(200).send({
                  id_producto,
                  id_bodega,
                  cantidad: newCantidad,
                  created_by,
                  update_by,
                  created_at,
                  updated_at,
                  deleted_at
                });
              }
            }
          );
        }
      }
    );
  });
  
appInventarios.get("/", (req, res) => {
    con.query(
      /*sql*/ `SELECT * FROM inventarios`,
      (err, data, fils) => {
        if (err) {
          res.status(500).send("Internal server error");
        } else {
          res.send(data);
        }
      }
    );
  });
export default appInventarios;
