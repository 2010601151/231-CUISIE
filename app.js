// Menu Data
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

// Render Menu
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

function addToCart(index){
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const item = {...menuItems[index], qty};
  cart.push(item);
  renderCart();
}

function renderCart(){
  if(cart.length===0){ cartSummary.innerHTML="No items yet."; return; }
  let html = "<ul>";
  let total=0;
  cart.forEach(item => {
    html += `<li>${item.name} x${item.qty} - $${item.price*item.qty}</li>`;
    total += item.price*item.qty;
  });
  html += `</ul><p><b>Total: $${total}</b></p>`;
  cartSummary.innerHTML = html;
}

// Modal
const modal = document.getElementById("orderModal");
const modalSummary = document.getElementById("modal-summary");
const spanClose = document.getElementsByClassName("close")[0];
const copyBtn = document.getElementById("copy-payment");

payButton.addEventListener("click",()=>{
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if(cart.length===0){ alert("Please add items to your cart first."); return; }
  if(!name || !phone || !address){ alert("Please fill in all your details."); return; }

  let total = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  let summaryHTML = `<p><b>Name:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Address:</b> ${address}</p><ul>`;
  cart.forEach(item=>{ summaryHTML += `<li>${item.name} x${item.qty} - $${item.price*item.qty}</li>`; });
  summaryHTML += `</ul><p><b>Total: $${total}</b></p>`;
  modalSummary.innerHTML = summaryHTML;
  modal.style.display="block";
});

spanClose.onclick=function(){ modal.style.display="none"; }
window.onclick=function(event){ if(event.target==modal) modal.style.display="none"; }
copyBtn.addEventListener("click",()=>{ navigator.clipboard.writeText("Cash App: $nharper2929\nZelle: 3022571662").then(()=>alert("Payment info copied!")); });
