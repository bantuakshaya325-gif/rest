const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [
  { id: 1, name: 'Sample item', done: false },
  { id: 2, name: 'Second item', done: true }
];

app.get('/', (req, res) => {
  res.json({
    message: 'REST API is running',
    endpoints: [
      'GET /items',
      'GET /items/:id',
      'POST /items',
      'PUT /items/:id',
      'DELETE /items/:id'
    ]
  });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

app.post('/items', (req, res) => {
  const { name, done = false } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newItem = {
    id: items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1,
    name,
    done
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((entry) => entry.id === Number(req.params.id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const { name, done } = req.body;

  items[itemIndex] = {
    ...items[itemIndex],
    ...(name !== undefined ? { name } : {}),
    ...(done !== undefined ? { done } : {})
  };

  res.json(items[itemIndex]);
});

app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((entry) => entry.id === Number(req.params.id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const deletedItem = items[itemIndex];
  items.splice(itemIndex, 1);
  res.json({ message: 'Item deleted', item: deletedItem });
});

app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});
