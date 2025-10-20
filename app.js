const menuItems = [
  { name: "Pepper Goat", price: 30, image: "images/pepper-goat.jpg" },
  { name: "Liberian Veg Jollof Rice", price: 17, image: "images/jollof-rice.jpg" },
  { name: "Bake Fish Platter with Plantain", price: 25, image: "images/bake-fish.jpg" },
  { name: "Nimba GB Soup with Fufu", price: 30, image: "images/gb-soup.jpg" },
  { name: "Palm Butter with Rice", price: 25, image: "images/palm-butter.jpg" }
];

const menuContainer = document.getElementById('menu');

if(menuContainer){
  menuItems.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="menu-img">
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      </div>
    `;
    menuContainer.appendChild(div);
  });
}
