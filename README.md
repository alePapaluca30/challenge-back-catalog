# E-commerce API with JSON Server

This project sets up a mock e-commerce API using JSON Server, providing endpoints for product data.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Get Products

- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `_page`: Page number (default: 1)
  - `_per_page`: Items per page (default: 10)
  - `sku`: Filter by SKU
  - `category.name`: Filter by category name
  - `name`: Filter by product name (partial match)

### Response Format

The API returns paginated results with the following structure:

```json
{
  "data": [
    {
      "sku": "sku-201",
      "name": "Product Name",
      "description": "Product Description",
      "image": "image_url",
      "category": { "id": "cat-001", "name": "Category Name" },
      "brand": "Brand Name",
      "price": 29.99,
      "stock": 100,
      "specifications": [
        { "name": "Spec Name", "value": "Spec Value" }
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

## Headers

- `X-Total-Count`: Total number of items
- `X-Total-Pages`: Total number of pages

## Error Handling

- 404 Not Found: When no products match the query
- 500 Internal Server Error: For server-side errors

## Data Structure

The `db.json` file contains an array of product objects with the following structure:

- `sku`: String (unique identifier)
- `name`: String
- `description`: String
- `image`: String (URL)
- `category`: Object { id: String, name: String }
- `brand`: String
- `price`: Number
- `stock`: Number
- `specifications`: Array of Objects { name: String, value: String }

## Dependencies

- json-server
- express
- cors
- lodash

## Scripts

- `npm start`: Starts the JSON Server

---

This project uses JSON Server to create a mock API for an e-commerce application, providing endpoints for product data with pagination, filtering, and error handling.
```
