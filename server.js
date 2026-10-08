const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const menu = [
  {
    id: 1,
    name: 'Truffle Mushroom Pasta',
    category: 'Main Course',
    price: 18.5,
    rating: 4.9,
    description: 'Creamy parmesan sauce with roasted mushrooms and fresh herbs.',
    image:
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Firecracker Tacos',
    category: 'Specials',
    price: 14.0,
    rating: 4.8,
    description: 'Crispy tacos filled with grilled chicken, lime slaw, and chili glaze.',
    image:
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Gourmet Burger Deluxe',
    category: 'Burgers',
    price: 16.75,
    rating: 4.7,
    description: 'Double patty, cheddar, caramelized onions, and truffle aioli.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Citrus Salmon Bowl',
    category: 'Healthy',
    price: 17.25,
    rating: 4.9,
    description: 'Seared salmon, rice, avocado, greens, and orange sesame dressing.',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Sunset Pizza',
    category: 'Pizza',
    price: 19.0,
    rating: 4.8,
    description: 'Wood-fired crust topped with basil, mozzarella, roasted peppers, and chili oil.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Berry Cheesecake',
    category: 'Desserts',
    price: 8.5,
    rating: 5.0,
    description: 'Velvety cheesecake with fresh berries and house-made compote.',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Saffron & Spice is running' });
});

app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.post('/api/orders', (req, res) => {
  const { customerName, phone, items } = req.body;

  if (!customerName || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: 'Please provide a name, phone number, and at least one ordered item.'
    });
  }

  const orderedItems = items
    .map((itemId) => menu.find((dish) => dish.id === Number(itemId)))
    .filter(Boolean);

  if (orderedItems.length === 0) {
    return res.status(400).json({ message: 'No valid menu items were selected.' });
  }

  const total = orderedItems.reduce((sum, item) => sum + item.price, 0);

  const order = {
    id: Date.now(),
    customerName,
    phone,
    items: orderedItems.map((item) => ({ id: item.id, name: item.name, price: item.price })),
    total: Number(total.toFixed(2))
  };

  res.status(201).json({
    message: 'Order placed successfully!',
    order
  });
});

app.post('/api/reservations', (req, res) => {
  const { name, date, time, guests, phone } = req.body;

  if (!name || !date || !time || !guests || !phone) {
    return res.status(400).json({
      message: 'Please fill in your name, date, time, guest count, and phone number.'
    });
  }

  res.status(201).json({
    message: 'Reservation received! We will confirm shortly.',
    reservation: {
      name,
      date,
      time,
      guests,
      phone
    }
  });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Saffron & Spice restaurant website running on http://localhost:${PORT}`);
});
