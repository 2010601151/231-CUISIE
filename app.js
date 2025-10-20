const menuItems = [
  { name: 'Pepper Goat', price: 30 },
  { name: 'Liberian Veg Jollof Rice', price: 17 },
  { name: 'Bake Fish Platter with Plantain', price: 25 },
  { name: 'Nimba GB Soup with Fufu', price: 30 },
  { name: 'Palm Butter with Rice', price: 25 }
];

let cart = [];

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const existingIndex = cart.findIndex(item => item.name === menuItems[index].name);

  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({ ...menuItems[index], qty });
  }

  renderCart();
}

function renderCart() {
  const cartBody = document.getElementById('cart-body');
  cartBody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)" style="width:50px;"></td>
        <td>$${item.price * item.qty}</td>
        <td><button onclick="removeItem(${index})" class="btn">❌</button></td>
      </tr>
    `;
  });

  document.getElementById('cart-total').textContent = total;
  document.getElementById('paypal-amount').value = total;
}

function updateQty(index, value) {
  const qty = parseInt(value);
  if (qty <= 0) removeItem(index);
  else {
    cart[index].qty = qty;
    renderCart();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
