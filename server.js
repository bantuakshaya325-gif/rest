const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const menu = [
  {
    id: 1,
    name: 'Hyderabadi Dum Biryani',
    category: 'Biryani',
    price: 249,
    rating: 4.9,
    description: 'Fragrant basmati rice layered with saffron, herbs, and slow-cooked spices.',
    image:
      'https://images.unsplash.com/photo-1633945274408-1d5fd8ae2d7c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Gongura Chicken',
    category: 'Curries',
    price: 229,
    rating: 4.8,
    description: 'Tangy gongura leaves cooked with juicy chicken and Telangana spices.',
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Kodi Pulusu',
    category: 'Curries',
    price: 219,
    rating: 4.7,
    description: 'Spicy chicken stew with tamarind, curry leaves, and rustic flavors.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Pachi Pulusu',
    category: 'Specials',
    price: 179,
    rating: 4.6,
    description: 'Fresh raw tamarind curry with onion, green chili, and cooling spice balance.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Jonna Rotte',
    category: 'Breads',
    price: 59,
    rating: 4.8,
    description: 'Traditional millet roti served warm with spicy curries and chutneys.',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Sarva Pindi',
    category: 'Snacks',
    price: 89,
    rating: 4.9,
    description: 'Crisp, savory and lightly spiced Telangana snack made with gram flour.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Mirchi Ka Salan',
    category: 'Specials',
    price: 169,
    rating: 4.8,
    description: 'Green chilies simmered in a rich peanut-tamarind gravy.',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Double Ka Meetha',
    category: 'Desserts',
    price: 149,
    rating: 5.0,
    description: 'Hyderabadi bread pudding soaked in saffron milk and nuts.',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Telangana Tastes is running' });
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
    message: 'Order placed successfully! Your Telangana feast is on the way.',
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
    message: 'Reservation received! We will confirm your table shortly.',
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
  console.log(`Telangana Tastes restaurant website running on http://localhost:${PORT}`);
});
