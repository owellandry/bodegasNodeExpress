CREATE DATABASE pruebaGBP;

USE pruebaGBP;


CREATE TABLE users(
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    email VARCHAR(255),
    email_verified_at TIMESTAMP,
    estado TINYINT(4) UNSIGNED,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20),
    foto VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    id_responsable BIGINT(20) UNSIGNED,
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_responsableUsers FOREIGN KEY (id_responsable) REFERENCES users(id),
    CONSTRAINT fk_createdBodegaUsers FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_updateBodegaUsers FOREIGN KEY (update_by) REFERENCES users(id)
);
CREATE TABLE productos(
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_productoUser FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_updateProductoUser FOREIGN KEY (update_by) REFERENCES users(id)
);
CREATE TABLE inventarios(
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_bodega BIGINT(20) UNSIGNED,
    id_producto BIGINT(20) UNSIGNED,
    cantidad int(11),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_inventarioUser FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_inventarioUpdateUsers FOREIGN KEY (update_by) REFERENCES users(id),
    CONSTRAINT fk_inventarioBodegaBodegas FOREIGN KEY (id_bodega) REFERENCES bodegas(id),
    CONSTRAINT fk_inventarioProductoProductos FOREIGN KEY (id_producto) REFERENCES productos(id)
);
CREATE TABLE historiales(
    id BIGINT(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cantidad int(11),
    id_bodega_origen BIGINT(20) UNSIGNED,
    id_bodega_destino BIGINT(20) UNSIGNED,
    id_inventario BIGINT(20) UNSIGNED,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_historialInventarioInventarios FOREIGN KEY (id_inventario) REFERENCES inventarios(id),
    CONSTRAINT fk_InventarioCreated_users FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_updateInventarioUsers FOREIGN KEY (update_by) REFERENCES users(id),
    CONSTRAINT fk_inventarioBodegaOBodegas FOREIGN KEY (id_bodega_origen) REFERENCES bodegas(id),
    CONSTRAINT fk_inventarioBodegaDBodegas FOREIGN KEY (id_bodega_destino) REFERENCES bodegas(id)
);