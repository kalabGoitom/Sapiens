const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

/* ── HAMBURGER / MOBILE MENU ─────────────────────────── */
function initMobileMenu() {
  const ham = document.getElementById("hamburger");
  const mob = document.getElementById("mobileMenu");

  function closeMenu() {
    ham.classList.remove("open");
    mob.classList.remove("open");
    document.body.style.overflow = "";
  }

  ham.addEventListener("click", () => {
    const isOpen = mob.classList.toggle("open");
    ham.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

initMobileMenu();

/* ================================================================
     MENU DATA
     To add a dish  → add a new object to this array
     To remove one  → delete its object
     To update      → edit the field directly

     Fields:
       name        : string  — dish name
       description : string  — ingredients / short description
       price       : number  — price in ETB, or null for "ask staff"
       category    : string  — "pizza" | "vegan" | "drinks"
       featured    : boolean — true = show as a card in the section grid
  ================================================================ */
const menuItems = [
  // ── PIZZA ──
  {
    name: "Special Sapiens Pizza",
    description: "Sauce, cheese, beef, tuna, olive, pineapple, onion & pepper",
    price: 500,
    category: "pizza",
    featured: true,
  },
  {
    name: "Pepperoni Pizza",
    description: "Sauce, cheese, pepperoni, onion & pepper",
    price: 480,
    category: "pizza",
    featured: true,
  },
  {
    name: "Beef Pizza",
    description: "Sauce, cheese, beef, onion & pepper",
    price: 460,
    category: "pizza",
    featured: false,
  },
  {
    name: "Margarita Pizza",
    description: "Sauce, cheese & pepper",
    price: 440,
    category: "pizza",
    featured: false,
  },
  {
    name: "Chicken Pizza",
    description: "Sauce, cheese, chicken, pepper & onion",
    price: 520,
    category: "pizza",
    featured: true,
  },
  {
    name: "Al Atuna Pizza",
    description: "Sauce, cheese, tuna, pepper & onion",
    price: 480,
    category: "pizza",
    featured: false,
  },
  {
    name: "Vegetable Pizza with Cheese",
    description: "Sauce, cheese, onion, tomato, pepper & pineapple",
    price: 460,
    category: "pizza",
    featured: false,
  },
  {
    name: "Fasting Vegetable Pizza",
    description: "Sauce, spinach, carrot, zucchini, pineapple & olive",
    price: 390,
    category: "pizza",
    featured: false,
  },
  {
    name: "Tuna Pizza",
    description: "Sauce, tuna, pepper, onion & olive",
    price: 410,
    category: "pizza",
    featured: true,
  },

  // ── VEGAN ──
  {
    name: "Fasting Burger",
    description: "Vegan patty and homemade sauces",
    price: 280,
    category: "vegan",
    featured: true,
  },
  {
    name: "Fasting Sandwich",
    description: "Pan fried vegetables and homemade sauces",
    price: 220,
    category: "vegan",
    featured: true,
  },
  {
    name: "Fasting Vegetable Pizza",
    description: "Sauce, spinach, carrot, zucchini, pineapple & olive",
    price: 390,
    category: "vegan",
    featured: false,
  },

  // ── DRINKS ──
  {
    name: "Fresh Juices",
    description: "Seasonal fruits — ask staff for today's options",
    price: null,
    category: "drinks",
    featured: true,
  },
  {
    name: "Ethiopian Coffee",
    description: "Traditional brew, served with ceremony",
    price: null,
    category: "drinks",
    featured: true,
  },
  {
    name: "Soft Drinks",
    description: "Coca-Cola, Sprite, Fanta, and more",
    price: null,
    category: "drinks",
    featured: false,
  },
  {
    name: "Soft Drinks",
    description: "Coca-Cola, Sprite, Fanta, and more",
    price: null,
    category: "drinks",
    featured: false,
  },
];

/* ── CATEGORY CONFIG ── */
const categories = {
  pizza: { label: "🍕 Pizza", badge: "Pizza", badgeCls: "badge-pizza" },
  vegan: { label: "🥗 Vegan", badge: "Vegan", badgeCls: "badge-vegan" },
  drinks: { label: "☕ Drinks", badge: "Drinks", badgeCls: "badge-drinks" },
};

/* get unique category keys from data (so adding a new category
     to menuItems automatically creates its tab) */
const categoryKeys = [...new Set(menuItems.map((i) => i.category))];

let activeFilter = "all";
let activeModalTab = categoryKeys[0];

/* ── FILTER TABS ── */
function renderFilterTabs() {
  const container = document.getElementById("menuTabs");
  const allKeys = ["all", ...categoryKeys];

  container.innerHTML = allKeys
    .map((key) => {
      const label = key === "all" ? "All" : categories[key].label;
      return `<button class="menu-tab-btn ${key === activeFilter ? "active" : ""}"
                      data-filter="${key}">${label}</button>`;
    })
    .join("");

  container.querySelectorAll(".menu-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      renderFilterTabs();
      renderCards();
    });
  });
}

/* ── SECTION CARDS ── */
function renderCards() {
  const grid = document.getElementById("menuGrid");
  const items = menuItems.filter(
    (item) =>
      item.featured &&
      (activeFilter === "all" || item.category === activeFilter),
  );

  grid.innerHTML = items
    .map((item, idx) => {
      const cat = categories[item.category];
      const priceHTML =
        item.price !== null
          ? `<span class="card-price"><sup>ETB</sup>${item.price}</span>`
          : `<span class="card-price-ask">Ask staff</span>`;

      return `
        <div class="menu-card" style="animation-delay:${idx * 0.05}s">
          <div class="card-top">
            <p class="card-name">${item.name}</p>
            <span class="card-badge ${cat.badgeCls}">${cat.badge}</span>
          </div>
          <p class="card-desc">${item.description}</p>
          <div class="card-footer">${priceHTML}</div>
        </div>`;
    })
    .join("");
}

/* ── MODAL TABS ── */
function renderModalTabs() {
  const container = document.getElementById("modalTabs");

  container.innerHTML = categoryKeys
    .map(
      (key) => `
      <button class="modal-tab ${key === activeModalTab ? "active" : ""}"
              data-tab="${key}">
        ${categories[key].label}
      </button>`,
    )
    .join("");

  container.querySelectorAll(".modal-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeModalTab = btn.dataset.tab;
      renderModalTabs();
      renderModalBody();
    });
  });
}

/* ── MODAL BODY ── */
function renderModalBody() {
  const body = document.getElementById("modalBody");
  const cat = categories[activeModalTab];
  const items = menuItems.filter((item) => item.category === activeModalTab);

  body.innerHTML = `
      <p class="modal-section-title"><span>${cat.label}</span></p>
      <ul class="modal-menu-list">
        ${items
          .map(
            (item, i) => `
          <li class="modal-menu-item">
            <span class="modal-item-num">${String(i + 1).padStart(2, "0")}</span>
            <div class="modal-item-info">
              <p class="modal-item-name">${item.name}</p>
              <p class="modal-item-desc">${item.description}</p>
            </div>
            <p class="modal-item-price">
              ${
                item.price !== null
                  ? `${item.price} <small>ETB</small>`
                  : `<small>Ask staff</small>`
              }
            </p>
          </li>`,
          )
          .join("")}
      </ul>
      <div class="modal-note">🏠 Home delivery available — call us to order</div>`;
}

/* ── OPEN / CLOSE ── */
function openMenuModal() {
  renderModalTabs();
  renderModalBody();
  document.getElementById("menuOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenuModal() {
  document.getElementById("menuOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("menuOverlay")) closeMenuModal();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenuModal();
});

// testimonial

const reviews = [
  {
    name: "Rita 27",
    rating: 5,
    text: "Best burger in Mekelle! Great food, awesome service. Definitely a must-visit spot.",
    meal: "Lunch",
    timeAgo: "a year ago",
    positive: true,
  },
  {
    name: "Hannibal Ataklti",
    rating: 5,
    text: "If you're looking for the finest burgers, wings and pizzas in town, make sure you visit Sapiens.",
    meal: null,
    timeAgo: "a year ago",
    positive: true,
  },
  {
    name: "Michiale Fisseha",
    rating: 5,
    text: "Best burger in Mekelle. Hands down.",
    meal: null,
    timeAgo: "a year ago",
    positive: true,
  },
  {
    name: "Yonyon Hagos",
    rating: 4,
    text: "Nice interior, but they need to work on their seasonings a little bit.",
    meal: "Lunch",
    timeAgo: "a year ago",
    positive: true,
  },
  {
    name: "Henok",
    rating: 4,
    text: "Good food overall. Enjoyed the brunch experience at Sapiens.",
    meal: "Brunch",
    timeAgo: "8 months ago",
    positive: true,
  },
  {
    name: "David",
    rating: 2,
    text: "The service is very slow — waited over 2 hours for a single order. Hoping management addresses this.",
    meal: null,
    timeAgo: "a year ago",
    positive: false,
  },
];

/* ── AVATAR COLORS — cycles through these per reviewer ── */
const avatarColors = [
  "#c8401a",
  "#7a3a5c",
  "#2a6e4e",
  "#1a4f8c",
  "#7a5c20",
  "#4a2c6e",
  "#6e2a2a",
  "#2a5c6e",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ── STAR SVG ── */
function starSVG(filled) {
  const color = filled ? "#f5a623" : "rgba(255,255,255,0.15)";
  return `<svg viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
}

function starsHTML(rating, size = "card") {
  return Array.from({ length: 5 }, (_, i) => starSVG(i < rating)).join("");
}

/* ── RENDER SUMMARY ── */
function renderSummary() {
  const total = 13;
  const avg = 3.8;
  const el = document.getElementById("reviewSummary");

  el.innerHTML = `
      <span class="big-score">${avg.toFixed(1)}</span>
      <div class="review-summary-right">
        <div class="summary-stars">${starsHTML(Math.round(avg))}</div>
        <p>${total} Google reviews</p>
      </div>
      <div class="google-badge">
        <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
          <path d="M43.611 20.083H42V20H24v8h11.303C33.953 32.028 29.368 35 24 35c-6.075 0-11-4.925-11-11s4.925-11 11-11c2.804 0 5.352 1.062 7.283 2.793l5.657-5.657C33.227 7.398 28.826 5 24 5 13.507 5 5 13.507 5 24s8.507 19 19 19 19-8.507 19-19c0-1.274-.135-2.516-.389-3.917z" fill="#FFC107"/>
          <path d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 13 24 13c2.804 0 5.352 1.062 7.283 2.793l5.657-5.657C33.227 7.398 28.826 5 24 5 16.318 5 9.656 9.337 6.306 14.691z" fill="#FF3D00"/>
          <path d="M24 43c4.734 0 9.057-1.792 12.325-4.72l-6.187-5.23C28.358 34.639 26.252 35 24 35c-5.349 0-9.923-2.972-11.29-7h-.01l-6.495 5.011C9.505 39.217 16.272 43 24 43z" fill="#4CAF50"/>
          <path d="M43.611 20.083H42V20H24v8h11.303a11.048 11.048 0 01-3.74 5.05l6.187 5.23C37.657 38.316 43 32 43 24c0-1.274-.135-2.516-.389-3.917z" fill="#1976D2"/>
        </svg>
        Verified on Google
      </div>`;
}

/* ── RENDER CARDS ── */
function renderReviews() {
  const grid = document.getElementById("testimonialsGrid");

  grid.innerHTML = reviews
    .map((review, idx) => {
      const color = avatarColors[idx % avatarColors.length];
      const initials = getInitials(review.name);
      const mealTag = review.meal
        ? `<span class="meal-tag">${review.meal}</span>`
        : `<span></span>`;

      return `
        <div class="review-card ${review.positive ? "positive" : ""}"
             style="animation-delay: ${idx * 0.07}s">
 
          <div class="card-reviewer">
            <div class="reviewer-avatar" style="background: ${color};">${initials}</div>
            <div class="reviewer-info">
              <p class="reviewer-name">${review.name}</p>
              <p class="reviewer-meta">Google Review</p>
            </div>
          </div>
 
          <div class="card-stars">${starsHTML(review.rating)}</div>
 
          <p class="card-text">"${review.text}"</p>
 
          <div class="card-footer-row">
            ${mealTag}
            <span class="time-ago">${review.timeAgo}</span>
          </div>
 
        </div>`;
    })
    .join("");
}

/* ── INIT ── */
renderFilterTabs();
renderCards();
renderSummary();
renderReviews();
