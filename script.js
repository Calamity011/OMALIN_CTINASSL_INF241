// Prod daata
const products = {
  new: [
    { name: "Red Flow Dress",    price: 168, cat: "women",     img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" },
    { name: "Yellow Jogger Set", price: 118, cat: "women",     img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500" },
    { name: "Utility Overshirt", price: 142, cat: "men",       img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
    { name: "Linen Blazer",      price: 158, cat: "outerwear", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" }
  ],
  best: [
    { name: "Essential Tank",    price: 54,  cat: "women",     img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500" },
    { name: "Perfect Weight Tee",price: 58,  cat: "men",       img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { name: "Everyday Denim",    price: 128, cat: "men",       img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
    { name: "Classic Sneakers",  price: 98,  cat: "women",     img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500" }
  ],
  street: [
    { name: "Oversized Hoodie",  price: 85,  cat: "men",       img: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500" },
    { name: "Leather Biker Jacket", price: 220, cat: "outerwear", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
    { name: "Graphic Tee",       price: 45,  cat: "men",       img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500" }
  ],
  basics: [
    { name: "Plain White Tee",   price: 25,  cat: "men",       img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500" },
    { name: "Cotton Shirt",      price: 49,  cat: "men",       img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500" },
    { name: "Soft Knit Top",     price: 39,  cat: "women",     img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500" },
    { name: "Daily Jeans",       price: 72,  cat: "women",     img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500" }
  ],
  sale: [
    { name: "Winter Parka",      price: 99,  cat: "outerwear", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500" },
    { name: "Running Shoes",     price: 65,  cat: "men",       img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { name: "Summer Dress",      price: 55,  cat: "women",     img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" }
  ]
};


const menuBtn   = document.getElementById("menu-btn");
const closeBtn  = document.getElementById("close-btn");
const sidebar   = document.getElementById("sidebar");
const overlay   = document.getElementById("overlay");
const cartCount = document.getElementById("cart-count");
const toast     = document.getElementById("toast");
const sortSelect = document.getElementById("sort-select");
const catButtons = document.querySelectorAll(".cat-btn");

let cartItems = 0;
let currentCategory = "all";


function renderProducts() {
  document.querySelectorAll(".product-grid").forEach(function (grid) {
    const sectionKey = grid.dataset.section;


    let list = products[sectionKey].filter(function (p) {
      return currentCategory === "all" || p.cat === currentCategory;
    });

  
    list = list.slice();
    if (sortSelect.value === "low")  list.sort(function (a, b) { return a.price - b.price; });
    if (sortSelect.value === "high") list.sort(function (a, b) { return b.price - a.price; });

  
    if (list.length === 0) {
      grid.innerHTML = '<p class="empty-msg">No items in this category.</p>';
      return;
    }

    grid.innerHTML = list.map(function (p) {
      return `
        <div class="card">
          <img src="${p.img}" alt="${p.name}">
          <div class="card-info">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="add-btn" data-name="${p.name}">Add to Cart</button>
          </div>
        </div>`;
    }).join("");
  });

  // if no image, it will display a place holder
  document.querySelectorAll(".card img").forEach(function (img) {
    img.onerror = function () {
      img.src = "https://placehold.co/500x500?text=No+Image";
    };
  });
}

// Menu
function openMenu() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}
function closeMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}
menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);


sidebar.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Add to cart
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-btn")) {
    cartItems++;
    cartCount.textContent = cartItems;
    showToast(e.target.dataset.name + " added to cart!");
  }
});

// pop up message
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

// Category & sorts
catButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    catButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentCategory = btn.dataset.cat;
    renderProducts();
  });
});

sortSelect.addEventListener("change", renderProducts);

// ===== START =====
renderProducts();