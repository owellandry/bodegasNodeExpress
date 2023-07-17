# Prueba de Bodegas con Express y MySQL

Este es un proyecto que utiliza Node.js y MySQL para crear una API que administra bodegas, productos, inventarios, historiales y usuarios. El proyecto incluye migraciones de base de datos y varios endpoints para realizar operaciones CRUD.

## Configuración de la Base de Datos

1. Crea una nueva base de datos en MySQL.
2. Configura las credenciales de acceso a la base de datos en el archivo `.env`.

## Ejecución del Proyecto

Una vez que hayas configurado la base de datos y hayas importado los datos de prueba, puedes ejecutar el proyecto con el siguiente comando: 

```bash
npm run dev
```
El proyecto se ejecutará.

Endpoints Disponibles

---

### GET /bodegas - Lista todas las bodegas ordenadas alfabéticamente.
---
### POST /bodegas - Crea una nueva bodega.
---
### GET /productos - Lista todos los productos en orden descendente por el campo "Total".
---
### POST /productos - Crea un nuevo producto y asigna una cantidad inicial en el inventario de una bodega por defecto.
---
### POST /inventarios - Inserta un registro en la tabla de inventarios, validando si la combinación de bodega y producto ya existe.
---
Uso de DTO (Data Transfer Object)
Este proyecto utiliza DTO para manejar la transferencia de datos entre el cliente y el servidor. Los DTO se encuentran en la carpeta storage y se utilizan para definir la estructura de los datos que se reciben y se envían en cada endpoint. Los controladores utilizan los DTO para validar y transformar los datos antes de realizar operaciones en la base de datos.

Elaborado por :
Owell Andry Polanco Silva