/* eslint-disable */
import { plainToClass } from 'class-transformer';
import express from 'express';
import con from '../server/db.js';
import middlewareProductos from '../middleware/validarProductos.js';

const appProductos = express.Router();
appProductos.use(express.json())
/**
 *  ! Metodo GET listar los datos de bodegas
 */
appProductos.get("/", (req, res) => {
  con.query(
      /* sql */`SELECT pro.*, SUM(inv.cantidad) AS Total
      FROM productos AS pro
      INNER JOIN inventarios AS inv ON pro.id = inv.id_producto
      GROUP BY pro.id
      ORDER BY Total DESC`,

    (err, data, fils) => {
      res.send(data);
    }
  );
});
/**
 * ! metodo POST
 *
 * ? manera de insertar los datos
 */
appProductos.post('/', middlewareProductos,(req, res) => {
  const producto = req.body;

  // Insertar el producto en la tabla de productos
  con.query('INSERT INTO productos SET ?', producto, (err, result) => {
    if (err) {
      console.error('Error al insertar el producto:', err);
      res.status(500).json({ error: 'Error al insertar el producto' });
    } else {
      const productoId = result.insertId; // Obtener el ID del producto insertado

      // Insertar una cantidad inicial en la tabla de inventarios
      const inventario = {
        id_producto: productoId,
        cantidad: 1
      };

      con.query('INSERT INTO inventarios SET ?', inventario, (err) => {
        if (err) {
          console.error('Error al insertar el inventario:', err);
          res.status(500).json({ error: 'Error al insertar el inventario' });
        } else {
          res.status(201).json({
            message: 'Producto creado con éxito',
            data: { ...producto, id: productoId },
          });
        }
      });
    }
  });
});

export default appProductos;
