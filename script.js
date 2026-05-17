/* ============================================================
   MOCK DATABASES & SYSTEM REGISTER
============================================================ */
const CATEGORIES_DB = [
  { id: 'cat-cpu', name: 'Processors', count: '14 Models', icon: 'bi-cpu' },
  { id: 'cat-gpu', name: 'Graphics Cards', count: '18 Models', icon: 'bi-gpu-card' },
  { id: 'cat-cooler', name: 'Liquid Cooling', count: '9 Models', icon: 'bi-water' },
  { id: 'cat-case', name: 'Chassis Frames', count: '12 Models', icon: 'bi-pc-horizontal' }
];

const PRODUCTS_DB = [
  { id: 'p1', cat: 'cat-cpu', name: 'AMD Ryzen 7 9800X3D', spec: '8 Cores / 16 Threads, 5.2GHz Turbo, Curated Gaming Cache', price: 479, label: 'Hot Allocation', emoji: '⚙️' },
  { id: 'p2', cat: 'cat-gpu', name: 'NVIDIA RTX 5070 Ti Founders', spec: '16GB GDDR7, Next-Gen Raytracing Parallel Pipelines', price: 849, label: 'New Drop', emoji: '⚡' },
  { id: 'p3', cat: 'cat-cpu', name: 'Intel Core Ultra 9 285K', spec: '24 Cores / 24 Threads, AI Engine Integrated Architecture', price: 589, label: 'Top Tier', emoji: '🧠' },
  { id: 'p4', cat: 'cat-gpu', name: 'ASUS ROG Strix RTX 5090 OC', spec: '32GB GDDR7, Matrix Liquified Vapor Plate Cooling System', price: 1999, label: 'Heavy Duty', emoji: '🌌' },
  { id: 'p5', cat: 'cat-cooler', name: 'Crow Flow Liquid AIO 360', spec: 'Infinity Mirror LCD Block, Fluid Dynamic Pressure Pumps', price: 169, label: 'Sale', emoji: '💧' },
  { id: 'p6', cat: 'cat-case', name: 'PC CROW Neon Matrix Cube', spec: 'Panoramic Tempered Glass, Dual Chamber High Volume Airflow', price: 149, label: 'Fresh Design', emoji: '📦' }
];

const SERVICES_DB = [
  { id: 'srv1', name: 'High-Fidelity Custom Build Assembly', desc: 'Complete multi-component mounting, structural alignment, structural layout testing, and optimized BIOS parameters.', price: 75, duration: '2 - 3 Hours' },
  { id: 'srv2', name: 'Thermal Repasting & Micro-De-dusting', desc: 'Deep hardware disinfection, removal of dry interfaces, and precision application of premium phase-change pads.', price: 45, duration: '1 - 1.5 Hours' },
  { id: 'srv3', name: 'Critical OS & Driver Diagnostics Suite', desc: 'Secure operating system fresh payload deployment, absolute latency isolation tracking, and driver configuration mapping.', price: 40, duration: '1 Hour' }
];

const TRUST_DB = [
  { icon: 'bi-shield-check', title: 'Secured Component Warranties', desc: '100% Verified product distribution manifests.' },
  { icon: 'bi-truck', title: 'Priority Drop Logistics', desc: 'Insured anti-shock freight networks nationwide.' },
  { icon: 'bi-person-gear', title: 'Certified Technical Nodes', desc: 'Live workbench support access on standby.' }
];

const TESTIMONIALS_DB = [
  { text: "PC CROW field technicians updated my thermal throttling workstations within hours. Incredible client response.", author: "Marcus V.", role: "Lead Dev Operations" },
  { text: "Secured my RTX 5090 drop allocation completely hassle-free. The separated front-end system tracking is blazing fast.", author: "Sarah K.", role: "Digital Render Engineer" }
];

/* ============================================================
   CLIENT CONTAINER STATS & ACTIVE APP STATES
============================================================ */
let activeCategoryFilter = 'all';

// Theme Control System Engine
const ThemeEngine = {
  init() {
    const cached = localStorage.getItem('pccrow_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', cached);
    this.updateIcon(cached);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('pccrow_theme', target);
    this.updateIcon(target);
    ToastSystem.trigger(`Theme adapted to ${target} interface protocol`, '🌓');
  },
  updateIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'bi bi-sun-fill';
    } else {
      icon.className = 'bi bi-moon-stars-fill';
    }
  }
};

// Client Storage Local Cart Manager API
const CartManager = {
  getItems() {
    return JSON.parse(localStorage.getItem('pccrow_cart') || '[]');
  },
  saveItems(cart) {
    localStorage.setItem('pccrow_cart', JSON.stringify(cart));
    this.syncBadge();
    this.renderDrawer();
  },
  addItem(id, name, price, emoji) {
    let cart = this.getItems();
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, emoji, qty: 1 });
    }
    this.saveItems(cart);
    ToastSystem.trigger(`[${name}] allocated to cart node`, '📥');
  },
  removeItem(id) {
    let cart = this.getItems();
    cart = cart.filter(i => i.id !== id);
    this.saveItems(cart);
    ToastSystem.trigger('Component profile expunged from memory', '🗑️');
  },
  syncBadge() {
    const cart = this.getItems();
    const totalQty = cart.reduce((acc, current) => acc + current.qty, 0);
    const badge = document.getElementById('cartCountBadge');
    if (!badge) return;
    badge.textContent = totalQty;
    if (totalQty > 0) {
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
  },
  renderDrawer() {
    const container = document.getElementById('cartDrawerItems');
    const subtotalEl = document.getElementById('cartDrawerSubtotal');
    if (!container || !subtotalEl) return;

    const cart = this.getItems();
    if (cart.length === 0) {
      container.innerHTML = `<div class="text-center py-5 text-muted small"><i class="bi bi-cpu fs-3 d-block mb-2"></i>No hardware allocations registered.</div>`;
      subtotalEl.textContent = '$0';
      return;
    }

    let html = '';
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.qty;
      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.emoji} ${item.name}</span>
            <span class="cart-item-price">$${item.price} <span class="text-muted small">x${item.qty}</span></span>
          </div>
          <button class="cart-remove-btn" onclick="CartManager.removeItem('${item.id}')" title="Remove Item">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      `;
    });
    container.innerHTML = html;
    subtotalEl.textContent = `$${subtotal}`;
  },
  checkout() {
    const cart = this.getItems();
    if (cart.length === 0) {
      ToastSystem.trigger('Cart node clear. Add components first.', '⚠️');
      return;
    }
    alert('PC CROW Front-End Simulator: Purchase sequence initialized. Clearing local state matrix.');
    this.saveItems([]);
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
  }
};

// Custom System Toast Engine
const ToastSystem = {
  trigger(msg, icon = '💻') {
    const stack = document.getElementById('toast-container');
    if (!stack) return;
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-msg">${msg}</div>
    `;
    stack.appendChild(item);
    setTimeout(() => {
      item.style.animation = 'toast-out 0.3s forwards';
      setTimeout(() => item.remove(), 300);
    }, 3500);
  }
};

/* ============================================================
   TEMPLATE RENDERING DOM ENGINES
============================================================ */
function renderAllComponents() {
  // Render Categories Row
  const catGrid = document.getElementById('categories-grid');
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES_DB.map(c => `
      <div class="col-xl-3 col-sm-6" onclick="setProductFilter('${c.id}')">
        <div class="cat-card">
          <div class="cat-icon"><i class="bi ${c.icon}"></i></div>
          <div class="cat-name">${c.name}</div>
          <div class="cat-count">${c.count}</div>
        </div>
      </div>
    `).join('');
  }

  // Render Filter Navigation Tabs
  const tabsContainer = document.getElementById('filter-tabs');
  if (tabsContainer) {
    const filterOptions = [
      { id: 'all', label: 'All Silicon' },
      { id: 'cat-cpu', label: 'Processors' },
      { id: 'cat-gpu', label: 'Graphics Units' }
    ];
    tabsContainer.innerHTML = filterOptions.map(t => `
      <button class="filter-tab-btn ${activeCategoryFilter === t.id ? 'active' : ''}" onclick="setProductFilter('${t.id}')">
        ${t.label}
      </button>
    `).join('');
  }

  // Render Products Grid System
  const prodGrid = document.getElementById('products-grid');
  if (prodGrid) {
    const targetSet = activeCategoryFilter === 'all' ? PRODUCTS_DB : PRODUCTS_DB.filter(p => p.cat === activeCategoryFilter);
    if (targetSet.length === 0) {
      prodGrid.innerHTML = `<div class="col-12 text-center text-muted">No components found matching parameters.</div>`;
    } else {
      prodGrid.innerHTML = targetSet.map(p => `
        <div class="col-xl-4 col-md-6">
          <div class="product-card">
            <div class="product-img-wrap">
              <div class="badge-stack"><span class="badge-sale">${p.label}</span></div>
              <div class="item-emoji">${p.emoji}</div>
            </div>
            <div class="product-body">
              <div class="product-category">Inventory Token ID: ${p.id}</div>
              <h4 class="product-name">${p.name}</h4>
              <p class="product-spec text-truncate-2">${p.spec}</p>
              <div class="product-footer">
                <span class="product-price">$${p.price}</span>
                <button class="btn-add-cart" onclick="CartManager.addItem('${p.id}', '${p.name}', ${p.price}, '${p.emoji}')">
                  <i class="bi bi-plus-lg"></i> Allocate
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Repair Technician Service Cards
  const servGrid = document.getElementById('services-grid');
  if (servGrid) {
    servGrid.innerHTML = SERVICES_DB.map(s => `
      <div class="col-lg-4 col-md-6">
        <div class="service-card">
          <div class="service-icon-wrap"><i class="bi bi-gear-fill"></i></div>
          <h4 class="service-name">${s.name}</h4>
          <p class="service-desc">${s.desc}</p>
          <div class="service-meta">
            <span class="service-price">$${s.price} <span class="text-muted small">/ Base</span></span>
            <button class="btn-book-service" onclick="openBookingDialogue('${s.name}')">Request Node</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Cognitive Infrastructure Trust Strip Elements
  const trustGrid = document.getElementById('trust-grid');
  if (trustGrid) {
    trustGrid.innerHTML = TRUST_DB.map(t => `
      <div class="col-md-4">
        <div class="trust-item">
          <div class="trust-icon"><i class="bi ${t.icon}"></i></div>
          <div>
            <div class="trust-title">${t.title}</div>
            <div class="trust-desc">${t.desc}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Client User Commendations
  const testGrid = document.getElementById('testimonials-grid');
  if (testGrid) {
    testGrid.innerHTML = TESTIMONIALS_DB.map(t => `
      <div class="col-md-6">
        <div class="testimonial-card">
          <p class="testimonial-text">"${t.text}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${t.author[0]}</div>
            <div>
              <div class="testimonial-name">${t.author}</div>
              <div class="testimonial-role">${t.role}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

/* ============================================================
   UTILITY FILTER CONTROLLERS & DIALOG SYSTEMS
============================================================ */
function setProductFilter(catId) {
  activeCategoryFilter = catId;
  renderAllComponents();
  const targetElement = document.getElementById('featured');
  if(targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
}

function openBookingDialogue(serviceName) {
  const modalEl = document.getElementById('bookingModal');
  const titleInput = document.getElementById('bookingServiceName');
  if (!modalEl || !titleInput) return;
  
  titleInput.value = serviceName;
  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

function handleBookingSubmit() {
  const modalEl = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeBookingModalBtn');
  if (closeBtn) closeBtn.click();
  
  setTimeout(() => {
    ToastSystem.trigger('Technician payload queued. Dispatch route optimized!', '🛠️');
    document.getElementById('technicianBookingForm').reset();
  }, 400);
}

// Global Ticker Loop initializer 
function initTickerSystem() {
  const element = document.getElementById('ticker-content');
  if (!element) return;
  const messaging = [
    "⚡ PC CROW STOCK ALERT: AMD RYZEN 7 9800X3D ALLOCATIONS ALLOTTED IN QUANTITY POOLS",
    "🛡️ EXPERT ON-SITE DIAGNOSTIC DISPATCH WORKFORCE RUNNING ACTIVE OPS METRIC",
    "🔥 EXCLUSIVE INTEL ULTRA GENERATION CORE TRAFFIC RE-ROUTED CLIENT DISPATCHES OPEN"
  ];
  // Duplicate array content to form endless carousel effect stream loop
  element.innerHTML = [...messaging, ...messaging].map(m => `<span>${m}</span>`).join('');
}

// Flash Sale Countdown clock setup simulation
function runPromoTimer() {
  const container = document.getElementById('countdown');
  if (!container) return;
  let hours = 14, minutes = 32, seconds = 45;

  setInterval(() => {
    seconds--;
    if (seconds < 0) { seconds = 59; minutes--; }
    if (minutes < 0) { minutes = 59; hours--; }
    if (hours < 0) { hours = 24; } // Endless rotation loop mimic 

    container.innerHTML = `
      <div class="countdown-unit"><span class="countdown-num">${String(hours).padStart(2, '0')}</span><span class="countdown-label">HR</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(minutes).padStart(2, '0')}</span><span class="countdown-label">MIN</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(seconds).padStart(2, '0')}</span><span class="countdown-label">SEC</span></div>
    `;
  }, 1000);
}

/* ============================================================
   MAIN DOM EXECUTION DOM CONTENT LOAD EVENT REGISTER
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeEngine.init();
  CartManager.syncBadge();
  renderAllComponents();
  initTickerSystem();
  runPromoTimer();

  // Navigation Scrolling Effects listeners
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Drawer Toggle Interactivity bindings
  const cartToggle = document.getElementById('cartToggleBtn');
  const cartClose = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');

  if (cartToggle && drawer && cartOverlay) {
    cartToggle.addEventListener('click', () => {
      drawer.classList.add('open');
      cartOverlay.classList.add('open');
      CartManager.renderDrawer();
    });
  }

  const closeCartAction = () => {
    if(drawer) drawer.classList.remove('open');
    if(cartOverlay) cartOverlay.classList.remove('open');
  };

  if (cartClose) cartClose.addEventListener('click', closeCartAction);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartAction);

  // Bind Light/Dark theme toggle control element switch actions
  document.getElementById('themeToggle')?.addEventListener('click', () => ThemeEngine.toggle());
});