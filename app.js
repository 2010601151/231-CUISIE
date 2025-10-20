const menuItems = [
  { name: 'Pepper Goat', price: 30 },
  { name: 'Liberian Veg Jollof Rice', price: 17 },
  { name: 'Bake Fish Platter with Plantain', price: 25 },
  { name: 'Nimba GB Soup with Fufu', price: 30 },
  { name: 'Palm Butter with Rice', price: 25 }
];

let cart = [];

// Add item to cart
function addToCart(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  const qty = parseInt(qtyInput.value);

  if (qty <= 0) return;

  const existing = cart.find(item => item.name === menuItems[index].name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...menuItems[index], qty });
  }

  renderCart();
}

// Render cart table and PayPal items
function renderCart() {
  const cartBody = document.getElementById('cart-body');
  cartBody.innerHTML = '';
  let total = 0;

  const paypalItemsDiv = document.getElementById('paypal-items');
  paypalItemsDiv.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    // Table row
    cartBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)" style="width:50px;"></td>
        <td>$${item.price * item.qty}</td>
        <td><button onclick="removeItem(${index})" class="btn">❌</button></td>
      </tr>
    `;

    // PayPal hidden inputs
    paypalItemsDiv.innerHTML += `
      <input type="hidden" name="item_name_${index + 1}" value="${item.name}">
      <input type="hidden" name="amount_${index + 1}" value="${item.price}">
      <input type="hidden" name="quantity_${index + 1}" value="${item.qty}">
    `;
  });

  document.getElementById('cart-total').textContent = total;
}

// Update quantity
function updateQty(index, value) {
  const qty = parseInt(value);
  if (qty <= 0) removeItem(index);
  else {
    cart[index].qty = qty;
    renderCart();
  }
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
