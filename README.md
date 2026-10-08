# rest

A simple REST API starter built with Node.js and Express.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. The API will run at `http://localhost:3000`

## Available endpoints

- `GET /` - API info
- `GET /items` - Get all items
- `GET /items/:id` - Get one item
- `POST /items` - Create an item
- `PUT /items/:id` - Update an item
- `DELETE /items/:id` - Delete an item

## Example request

```bash
curl http://localhost:3000/items
```

## Notes

This starter uses an in-memory data store for quick prototyping.
