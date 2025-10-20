function renderCart() {
  const cartBody = document.getElementById('cart-body');
  cartBody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>
          <input type="number" min="1" value="${item.qty}" 
            onchange="updateQty(${index}, this.value)" style="width:50px;">
        </td>
        <td>$${item.price * item.qty}</td>
        <td><button onclick="removeItem(${index})" class="btn">❌</button></td>
      </tr>
    `;
  });

  document.getElementById('cart-total').textContent = total;
  document.getElementById('paypal-amount').value = total;
  updateCartCount();
}

function updateQty(index, value) {
  const qty = parseInt(value);
  if(qty <= 0){
    removeItem(index);
  } else {
    cart[index].qty = qty;
    renderCart();
  }
}

function removeItem(index) {
  cart.splice(index,1);
  renderCart();
}

function updateCartCount(){
  document.getElementById('cart-count').textContent = cart.reduce((sum,item)=>sum+item.qty,0);
}
