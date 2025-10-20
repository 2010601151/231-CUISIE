const menuItems = [
  { name: 'Pepper Goat', price: 30 },
  { name: 'Liberian Veg Jollof Rice', price: 17 },
  { name: 'Bake Fish Platter with Plantain', price: 25 },
  { name: 'Nimba GB Soup with Fufu', price: 1 },
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
  toggleMenu(false); // hide menu after adding
}

// Render cart and PayPal inputs
function renderCart() {
  const cartBody = document.getElementById('cart-body');
  cartBody.innerHTML = '';
  let total = 0;

  const paypalItemsDiv = document.getElementById('paypal-items');
  paypalItemsDiv.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    // Cart table row
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

  // Add "Add More Items" button only once
  if (!document.getElementById('add-more-btn') && cart.length > 0) {
    const addMoreBtn = document.createElement('button');
    addMoreBtn.textContent = 'Add More Items';
    addMoreBtn.id = 'add-more-btn';
    addMoreBtn.className = 'btn';
    addMoreBtn.onclick = () => toggleMenu(true);
    document.getElementById('order-form').appendChild(addMoreBtn);
  }
}

// Update quantity
function updateQty(index, value) {
  const qty = parseInt(value);
  if (qty <= 0) {
    removeItem(index);
  } else {
    cart[index].qty = qty;
    renderCart();
  }
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Show/hide menu section
function toggleMenu(show) {
  const menuSection = document.getElementById('menu');
  menuSection.style.display = show ? 'flex' : 'none'; // use 'block' if you want vertical layout

  if (show) {
    menuSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  toggleMenu(true); // show menu initially
  renderCart();     // render empty cart
});
// Animate elements when they enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));
});
