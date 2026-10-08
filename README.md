# Telangana Tastes Restaurant Website

A Telangana-inspired restaurant website built with Node.js and Express. It includes authentic dishes, a calm premium visual theme, reservation booking, and order management.

## Features

- Telangana restaurant landing page
- Biryani, curry, bread, snack, and dessert sections
- Category-based menu filtering
- Table reservation form
- Food ordering form and API
- Static front-end powered by Express

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
- `GET /api/menu` – fetch Telangana menu items
- `POST /api/orders` – place a food order
- `POST /api/reservations` – reserve a table

## Notes

This version uses an in-memory menu and lightweight validation for a quick restaurant prototype.

## Project structure

```text
public/
  index.html
  styles.css
  script.js
server.js
README.md
```
