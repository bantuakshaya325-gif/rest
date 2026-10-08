# Saffron & Spice Restaurant Website

A delicious restaurant website built with Node.js and Express. It includes a rich landing page, menu showcase, reservation form, and order API.

## Features

- Modern restaurant homepage with hero section
- Menu cards for featured dishes
- Category filtering
- Reservation booking form
- Order placement API
- Static frontend served from Express

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

## API endpoints

- `GET /api/health` – health check
- `GET /api/menu` – fetch restaurant menu
- `POST /api/orders` – place an order
- `POST /api/reservations` – book a table

## Notes

This version uses an in-memory menu and simple validation for quick prototyping.

## Project structure

```text
public/
  index.html
  styles.css
  script.js
server.js
README.md
```

