# API de Catálogo de Productos con JSON Server

Este proyecto configura una API que proporciona acceso a un catálogo de productos utilizando JSON Server.

## URL Base

La API está desplegada en Render y accesible en:
```
https://challenge-back-catalog.onrender.com
```

## Endpoints de la API

### Obtener Productos del Catálogo

- **URL**: `/products`
- **URL Completa**: `https://challenge-back-catalog.onrender.com/products`
- **Método**: `GET`
- **Parámetros de consulta**:
  - `_page`: Número de página (por defecto: 1)
  - `_per_page`: Elementos por página (por defecto: 10)
  - `sku`: Filtrar por SKU
  - `name`: Filtrar por nombre de producto (coincidencia parcial)

### Ejemplos de Uso

1. Obtener la primera página del catálogo:
```
GET https://challenge-back-catalog.onrender.com/products?_page=1&_per_page=10
```

2. Filtrar productos por SKU:
```
GET https://challenge-back-catalog.onrender.com/products?sku=sku-203
```

3. Buscar productos por nombre:
```
GET https://challenge-back-catalog.onrender.com/products?name=camiseta%20Casual
```

### Formato de Respuesta

La API devuelve resultados paginados con la siguiente estructura:

```json
{
  "data": [
    {
      "sku": "sku-201",
      "name": "Nombre del Producto",
      "description": "Descripción del Producto",
      "image": "url_de_la_imagen",
      "category": { "id": "cat-001", "name": "Nombre de la Categoría" },
      "brand": "Nombre de la Marca",
      "price": 29.99,
      "stock": 100,
      "specifications": [
        { "name": "Nombre de la Especificación", "value": "Valor de la Especificación" }
      ]
    }
  ],
  "items": 100,
  "pages": 10,
  "first": 1,
  "last": 10,
  "prev": null,
  "next": 2
}
```

## Encabezados de Respuesta

- `X-Total-Count`: Número total de productos en el catálogo
- `X-Total-Pages`: Número total de páginas disponibles

## Manejo de Errores

- 404 No Encontrado: Cuando ningún producto coincide con los criterios de búsqueda
- 500 Error Interno del Servidor: Para errores del lado del servidor

## Estructura de los Productos

Cada producto en el catálogo contiene los siguientes campos:

- `sku`: String (identificador único del producto)
- `name`: String (nombre del producto)
- `description`: String (descripción detallada)
- `image`: String (URL de la imagen del producto)
- `category`: Objeto { id: String, name: String }
- `brand`: String (marca del producto)
- `price`: Number (precio del producto)
- `stock`: Number (cantidad disponible)
- `specifications`: Array de Objetos { name: String, value: String }

## Categorías Disponibles

El catálogo incluye productos en las siguientes categorías:
- Ropa
- Celulares
- Laptops
- Tablets
- Accesorios
- Electrónica
- Hogar

## Métodos HTTP Disponibles

- `GET`: Consultar productos del catálogo

## Dependencias

- json-server
- express
- cors
- lodash

---

Este proyecto implementa una API para un catálogo de productos, proporcionando funcionalidades de consulta, paginación y filtrado de productos.
```
