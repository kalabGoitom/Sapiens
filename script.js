const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
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
  if (e.key === "Escape") {
    // lightbox takes priority if open
    const lb = document.getElementById("lightbox");
    if (lb.classList.contains("open")) {
      closeLightbox();
      return;
    }
    closeMenuModal();
  }
  if (e.key === "ArrowRight") shiftLightbox(1);
  if (e.key === "ArrowLeft") shiftLightbox(-1);
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

const galleryItems = [
  // ── FOOD ──
  {
    src: "./img/burger.webp",
    label: "Signature Sapiens Burger",
    category: "food",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    label: "Wood-fired Pizza",
    category: "food",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80",
    label: "Crispy Chicken Wings",
    category: "food",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    label: "Fasting Vegetable Pizza",
    category: "food",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    label: "Classic Beef Burger",
    category: "food",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    label: "Chef's Special Platter",
    category: "food",
    tall: false,
  },

  // ── INTERIOR ──
  {
    src: "./img/interior.jpg",
    label: "Dining Area",
    category: "interior",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    label: "Restaurant Interior",
    category: "interior",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    label: "Evening Ambience",
    category: "interior",
    tall: false,
  },

  // ── DRINKS ──
  {
    src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    label: "Fresh Juice Selection",
    category: "drinks",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    label: "Ethiopian Coffee",
    category: "drinks",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    label: "Refreshing Cocktails",
    category: "drinks",
    tall: false,
  },
];

/* ── CATEGORY CONFIG ── */
const galleryCategories = {
  all: "All",
  food: "🍔 Food",
  interior: "🏠 Interior",
  drinks: "☕ Drinks",
};

let activeGalleryFilter = "all";
let lightboxIndex = 0;
let lightboxItems = [];

/* ── FILTER TABS ── */
function renderGalleryTabs() {
  const container = document.getElementById("galleryTabs");

  container.innerHTML = Object.entries(galleryCategories)
    .map(
      ([key, label]) => `
      <button class="gallery-tab-btn ${key === activeGalleryFilter ? "active" : ""}"
              data-filter="${key}">${label}</button>
    `,
    )
    .join("");

  container.querySelectorAll(".gallery-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGalleryFilter = btn.dataset.filter;
      renderGalleryTabs();
      renderGalleryGrid();
    });
  });
}

/* ── GRID ── */
function renderGalleryGrid() {
  const grid = document.getElementById("galleryGrid");

  const items = galleryItems.filter(
    (item) =>
      activeGalleryFilter === "all" || item.category === activeGalleryFilter,
  );

  /* store filtered list for lightbox navigation */
  lightboxItems = items;

  grid.innerHTML = items
    .map(
      (item, idx) => `
      <div class="gallery-item" style="animation-delay:${idx * 0.06}s"
           onclick="openLightbox(${idx})">
        <img
          src="${item.src}"
          alt="${item.label}"
          style="aspect-ratio: ${item.tall ? "3/4" : "4/3"};"
          loading="lazy"
        />
        <div class="gallery-item-overlay">
          <div class="overlay-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </div>
          <p class="overlay-tag">${galleryCategories[item.category]}</p>
          <p class="overlay-label">${item.label}</p>
        </div>
      </div>
    `,
    )
    .join("");
}

/* ── LIGHTBOX ── */
function openLightbox(idx) {
  lightboxIndex = idx;
  updateLightboxContent();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const item = lightboxItems[lightboxIndex];
  document.getElementById("lightboxImg").src = item.src;
  document.getElementById("lightboxImg").alt = item.label;
  document.getElementById("lightboxLabel").textContent = item.label;
  document.getElementById("lightboxTag").textContent =
    galleryCategories[item.category];
}

function shiftLightbox(dir) {
  lightboxIndex =
    (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  updateLightboxContent();
}

function handleLightboxClick(e) {
  if (e.target === document.getElementById("lightbox")) closeLightbox();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const lb = document.getElementById("lightbox");
    if (lb.classList.contains("open")) {
      closeLightbox();
      return;
    }
    closeMenuModal();
  }
  const lb = document.getElementById("lightbox");
  if (!lb.classList.contains("open")) return;
  if (e.key === "ArrowRight") shiftLightbox(1);
  if (e.key === "ArrowLeft") shiftLightbox(-1);
});

// footer socials and contact info

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sapiens_mekelle/",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
               <circle cx="12" cy="12" r="4"/>
               <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
             </svg>`,
  },
  {
    label: "Facebook",
    href: "#" /* replace with real Facebook URL */,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
             </svg>`,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/251943888677" /* replace with real number */,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
             </svg>`,
  },
  {
    label: "Call Us",
    href: "tel:+251943888677" /* replace with real phone number */,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
             </svg>`,
  },
];

const contactItems = [
  {
    label: "Address",
    value: "Mekelle, Tigray, Ethiopia",
    href: "https://maps.google.com/?q=Sapiens+Mekelle",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
               <circle cx="12" cy="10" r="3"/>
             </svg>`,
  },
  {
    label: "Phone",
    value: "+251 943 888 677",
    href: "tel:+251943888677",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
             </svg>`,
  },
  {
    label: "WhatsApp",
    value: "+251 943 888 677",
    href: "https://wa.me/251943888677",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
               <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
             </svg>`,
  },
];

const openingHours = [
  { day: "Mon – Fri", hours: "10:00 AM – 10:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 11:00 PM" },
  { day: "Sunday", hours: "11:00 AM – 10:00 PM" },
];

/* ── RENDER SOCIAL LINKS ── */
document.getElementById("socialLinks").innerHTML = socialLinks
  .map(
    (link) => `
    <a class="social-link" href="${link.href}" target="_blank"
       rel="noopener" aria-label="${link.label}" title="${link.label}">
      ${link.icon}
    </a>
  `,
  )
  .join("");

/* ── RENDER CONTACT ITEMS ── */
document.getElementById("contactItems").innerHTML = contactItems
  .map(
    (item) => `
    <a class="contact-item" href="${item.href}" target="_blank" rel="noopener">
      <div class="contact-icon">${item.icon}</div>
      <div class="contact-item-text">
        <p>${item.label}</p>
        <span>${item.value}</span>
      </div>
    </a>
  `,
  )
  .join("");

/* ── RENDER HOURS ── */
document.getElementById("hoursList").innerHTML = openingHours
  .map(
    (row) => `
    <div class="hours-row">
      <span>${row.day}</span>
      <span>${row.hours}</span>
    </div>
  `,
  )
  .join("");

/* ── INIT ── */
renderFilterTabs();
renderCards();
renderSummary();
renderReviews();
renderGalleryTabs();
renderGalleryGrid();

/* ── ACTIVE NAV ON SCROLL ── */
const navLinks = document.querySelectorAll("header nav ul a");
const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
revealEls.forEach((el) => revealObserver.observe(el));
