const menuGrid = document.getElementById('menuGrid');
const categoryButtons = document.querySelectorAll('.filter-button');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const orderStatus = document.getElementById('orderStatus');
const reservationStatus = document.getElementById('reservationStatus');

const state = {
  menu: [],
  selectedCategory: 'All',
  cart: []
};

async function fetchMenu() {
  const response = await fetch('/api/menu');
  const menu = await response.json();
  state.menu = menu;
  renderMenu();
}

function renderMenu() {
  const filteredMenu =
    state.selectedCategory === 'All'
      ? state.menu
      : state.menu.filter((item) => item.category === state.selectedCategory);

  menuGrid.innerHTML = filteredMenu
    .map(
      (item) => `
        <article class="dish-card">
          <img src="${item.image}" alt="${item.name}" />
          <div class="dish-body">
            <div class="dish-head">
              <h4>${item.name}</h4>
              <span class="badge">${item.category}</span>
            </div>
            <div class="dish-meta">
              <span>⭐ ${item.rating}</span>
              <span>${item.category}</span>
            </div>
            <p>${item.description}</p>
            <div class="dish-actions">
              <span class="price">$${item.price.toFixed(2)}</span>
              <button class="add-order" data-id="${item.id}" type="button">Add to order</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function addToCart(itemId) {
  const item = state.menu.find((dish) => dish.id === Number(itemId));
  if (!item) return;

  const existing = state.cart.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  if (!state.cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">No dishes selected yet.</p>';
    cartTotal.textContent = '$0.00';
    return;
  }

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>Qty: ${item.quantity}</span>
          </div>
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      `
    )
    .join('');

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.selectedCategory = button.dataset.category;
    categoryButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderMenu();
  });
});

document.addEventListener('click', (event) => {
  const target = event.target;

  if (target instanceof HTMLElement && target.matches('.add-order')) {
    addToCart(target.dataset.id);
  }
});

async function submitOrder(event) {
  event.preventDefault();

  if (!state.cart.length) {
    orderStatus.textContent = 'Please add at least one dish before placing an order.';
    return;
  }

  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = {
    customerName: formData.get('customerName'),
    phone: formData.get('phone'),
    items: state.cart.map((item) => item.id)
  };

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    orderStatus.textContent = result.message || 'Order submitted.';

    if (response.ok) {
      state.cart = [];
      form.reset();
      renderCart();
    }
  } catch (error) {
    orderStatus.textContent = 'Unable to place the order right now. Please try again.';
  }
}

async function submitReservation(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const payload = {
    name: data.get('name'),
    guests: Number(data.get('guests')),
    date: data.get('date'),
    time: data.get('time'),
    phone: data.get('phone')
  };

  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    reservationStatus.textContent = result.message || 'Reservation received.';

    if (response.ok) {
      form.reset();
    }
  } catch (error) {
    reservationStatus.textContent = 'Something went wrong while reserving. Try again soon.';
  }
}

document.getElementById('orderForm').addEventListener('submit', submitOrder);
document.getElementById('reservationForm').addEventListener('submit', submitReservation);

fetchMenu();
renderCart();
