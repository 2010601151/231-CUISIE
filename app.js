const menuItems = [
  { name: "Pepper Goat", price: 30, img: "images/pepper-goat.jpg" },
  { name: "Liberian Veg Jollof Rice", price: 17, img: "images/veg-jollof.jpg" },
  { name: "Bake Fish Platter with Plantain", price: 25, img: "images/bake-fish.jpg" },
  { name: "Nimba GB Soup with Fufu", price: 30, img: "images/gb-soup.jpg" },
  { name: "Palm Butter with Rice", price: 25, img: "images/palm-butter.jpg" }
];

const menuSection = document.getElementById("menu");
const cartSummary = document.getElementById("cart-summary");
const payButton = document.getElementById("pay-button");
let cart = [];

// Render Menu Items
menuItems.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "menu-item";
  div.innerHTML = `
    <img src="${item.img}" alt="${item.name}" class="menu-img">
    <div class="menu-info">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
    </div>
    <label>Qty: <input type="number" id="qty-${index}" min="1" value="1" style="width:50px"></label><br>
    <button class="btn" onclick="addToCart(${index})">Add to Cart</button>
  `;
  menuSection.appendChild(div);
});

// Global function for buttons
window.addToCart = function(index){
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const existingIndex = cart.findIndex(item => item.name === menuItems[index].name);
  if(existingIndex > -1){
    cart[existingIndex].qty += qty;
  } else {
    cart.push({...menuItems[index], qty});
  }
  renderCart();
}

// Render cart
function renderCart(){
  if(cart.length===0){ 
    cartSummary.innerHTML="No items yet."; 
    return; 
  }
  let html = "<ul>";
  let total = 0;
  cart.forEach(item => {
    html += `<li>${item.name} x${item.qty} - $${item.price*item.qty}</li>`;
    total += item.price*item.qty;
  });
  html += `</ul><p><b>Total: $${total}</b></p>`;
  cartSummary.innerHTML = html;
}

// Modal Logic
const modal = document.getElementById("orderModal");
const modalSummary = document.getElementById("modal-summary");
const spanClose = document.getElementsByClassName("close")[0];

payButton.addEventListener("click", ()=>{
  if(cart.length === 0){ alert("Please add items to your cart first."); return; }

  let total = 0;
  let summaryHTML = "<ul>";
  cart.forEach(item => {
    summaryHTML += `<li>${item.name} x${item.qty} - $${item.price*item.qty}</li>`;
    total += item.price*item.qty;
  });
  summaryHTML += `</ul><p><b>Total: $${total}</b></p>`;
  modalSummary.innerHTML = summaryHTML;

  // PayPal form
  const itemsDescription = cart.map(item => `${item.name} x${item.qty}`).join(", ");
  const paypalHTML = `
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
      <input type="hidden" name="cmd" value="_xclick">
      <input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL">
      <input type="hidden" name="item_name" value="${itemsDescription}">
      <input type="hidden" name="amount" value="${total}">
      <input type="hidden" name="currency_code" value="USD">
      <input type="submit" class="btn" value="Pay with PayPal">
    </form>
  `;
  document.getElementById("paypal-button").innerHTML = paypalHTML;

  modal.style.display = "block";
});

spanClose.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if(event.target === modal) modal.style.display = "none"; }
