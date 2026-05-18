/* ============================================================
   INVENTORY DATA & SYSTEM REGISTER
============================================================ */
let CATEGORIES_DB = [];
let PRODUCTS_DB = [];

// Embedded inventory data (fallback for local file access)
const EMBEDDED_INVENTORY = {
  "categories": [
    { "id": "cat-cpu", "name": "Processors", "icon": "bi-cpu" },
    { "id": "cat-gpu", "name": "Graphics Cards", "icon": "bi-gpu-card" },
    { "id": "cat-ram", "name": "Memory (RAM)", "icon": "bi-memory" },
    { "id": "cat-mobo", "name": "Motherboards", "icon": "bi-motherboard" },
    { "id": "cat-storage", "name": "Storage", "icon": "bi-device-ssd" },
    { "id": "cat-psu", "name": "Power Supply", "icon": "bi-lightning-charge" },
    { "id": "cat-case", "name": "Cases", "icon": "bi-pc-horizontal" },
    { "id": "cat-cooler", "name": "Cooling", "icon": "bi-water" }
  ],
  "products": [
    { "id": "cpu-1", "cat": "cat-cpu", "name": "AMD Ryzen 9 9950X", "spec": "16 Cores / 32 Threads, 5.7GHz Boost, 80MB Cache", "price": 33600, "stock": 15, "label": "Top Tier", "emoji": "🔥" },
    { "id": "cpu-2", "cat": "cat-cpu", "name": "AMD Ryzen 7 9800X3D", "spec": "8 Cores / 16 Threads, 5.2GHz Turbo, 3D V-Cache", "price": 26824, "stock": 22, "label": "Hot Allocation", "emoji": "⚙️" },
    { "id": "cpu-3", "cat": "cat-cpu", "name": "Intel Core Ultra 9 285K", "spec": "24 Cores / 24 Threads, AI Engine Integrated", "price": 32984, "stock": 18, "label": "New Drop", "emoji": "🧠" },
    { "id": "cpu-4", "cat": "cat-cpu", "name": "Intel Core i9-14900K", "spec": "24 Cores / 32 Threads, 6.0GHz Turbo", "price": 30800, "stock": 20, "label": "Popular", "emoji": "⚡" },
    { "id": "cpu-5", "cat": "cat-cpu", "name": "AMD Ryzen 5 7600X", "spec": "6 Cores / 12 Threads, 5.3GHz Boost", "price": 11200, "stock": 35, "label": "Budget King", "emoji": "💰" },
    { "id": "gpu-1", "cat": "cat-gpu", "name": "NVIDIA RTX 5090 Founders", "spec": "32GB GDDR7, Next-Gen Ray Tracing", "price": 111944, "stock": 8, "label": "Ultimate", "emoji": "🌌" },
    { "id": "gpu-2", "cat": "cat-gpu", "name": "ASUS ROG Strix RTX 5090 OC", "spec": "32GB GDDR7, Liquid Vapor Chamber Cooling", "price": 125440, "stock": 5, "label": "Heavy Duty", "emoji": "👑" },
    { "id": "gpu-3", "cat": "cat-gpu", "name": "NVIDIA RTX 5070 Ti Founders", "spec": "16GB GDDR7, DLSS 4.0 Support", "price": 47544, "stock": 25, "label": "New Drop", "emoji": "⚡" },
    { "id": "gpu-4", "cat": "cat-gpu", "name": "AMD Radeon RX 7900 XTX", "spec": "24GB GDDR6, Chiplet Architecture", "price": 44800, "stock": 18, "label": "AMD Power", "emoji": "🔴" },
    { "id": "gpu-5", "cat": "cat-gpu", "name": "NVIDIA RTX 4070 Super", "spec": "12GB GDDR6X, Ray Tracing Cores", "price": 33600, "stock": 30, "label": "Best Value", "emoji": "💎" },
    { "id": "gpu-6", "cat": "cat-gpu", "name": "AMD Radeon RX 7800 XT", "spec": "16GB GDDR6, 1440p Gaming Beast", "price": 28000, "stock": 22, "label": "Popular", "emoji": "🎮" },
    { "id": "ram-1", "cat": "cat-ram", "name": "G.SKILL Trident Z5 RGB 64GB", "spec": "DDR5-7200, CL34, 2x32GB Kit", "price": 16800, "stock": 40, "label": "Premium", "emoji": "💾" },
    { "id": "ram-2", "cat": "cat-ram", "name": "Corsair Dominator Platinum 32GB", "spec": "DDR5-6400, CL32, 2x16GB Kit", "price": 11200, "stock": 50, "label": "Popular", "emoji": "⚡" },
    { "id": "ram-3", "cat": "cat-ram", "name": "Kingston Fury Beast 32GB", "spec": "DDR5-6000, CL36, 2x16GB Kit", "price": 8400, "stock": 60, "label": "Best Value", "emoji": "💰" },
    { "id": "ram-4", "cat": "cat-ram", "name": "Corsair Vengeance RGB 64GB", "spec": "DDR5-5600, CL40, 2x32GB Kit", "price": 13440, "stock": 35, "label": "RGB", "emoji": "🌈" },
    { "id": "mobo-1", "cat": "cat-mobo", "name": "ASUS ROG Maximus Z890 Hero", "spec": "Intel Z890, DDR5, PCIe 5.0, WiFi 7", "price": 33600, "stock": 12, "label": "Flagship", "emoji": "👑" },
    { "id": "mobo-2", "cat": "cat-mobo", "name": "MSI MAG X870 Tomahawk", "spec": "AMD X870, DDR5, PCIe 5.0, WiFi 7", "price": 22400, "stock": 20, "label": "Popular", "emoji": "🎯" },
    { "id": "mobo-3", "cat": "cat-mobo", "name": "Gigabyte B650 AORUS Elite", "spec": "AMD B650, DDR5, PCIe 4.0, WiFi 6E", "price": 11200, "stock": 30, "label": "Budget", "emoji": "💰" },
    { "id": "mobo-4", "cat": "cat-mobo", "name": "ASRock X870E Taichi", "spec": "AMD X870E, DDR5, PCIe 5.0, 10GbE LAN", "price": 28000, "stock": 15, "label": "Premium", "emoji": "⚡" },
    { "id": "storage-1", "cat": "cat-storage", "name": "Samsung 990 PRO 2TB", "spec": "NVMe Gen4, 7450MB/s Read, 6900MB/s Write", "price": 8960, "stock": 45, "label": "Top Rated", "emoji": "💿" },
    { "id": "storage-2", "cat": "cat-storage", "name": "WD Black SN850X 4TB", "spec": "NVMe Gen4, 7300MB/s Read, Gaming Optimized", "price": 16800, "stock": 25, "label": "Gaming", "emoji": "🎮" },
    { "id": "storage-3", "cat": "cat-storage", "name": "Crucial P5 Plus 1TB", "spec": "NVMe Gen4, 6600MB/s Read, 5000MB/s Write", "price": 4480, "stock": 60, "label": "Budget", "emoji": "💰" },
    { "id": "storage-4", "cat": "cat-storage", "name": "Seagate FireCuda 530 2TB", "spec": "NVMe Gen4, 7300MB/s, Heatsink Included", "price": 11200, "stock": 30, "label": "Hot", "emoji": "🔥" },
    { "id": "psu-1", "cat": "cat-psu", "name": "Corsair HX1500i 1500W", "spec": "80+ Platinum, Fully Modular, Digital Monitoring", "price": 22400, "stock": 10, "label": "Extreme", "emoji": "⚡" },
    { "id": "psu-2", "cat": "cat-psu", "name": "Seasonic PRIME TX-1000", "spec": "80+ Titanium, 1000W, Fully Modular", "price": 16800, "stock": 15, "label": "Premium", "emoji": "👑" },
    { "id": "psu-3", "cat": "cat-psu", "name": "EVGA SuperNOVA 850 G7", "spec": "80+ Gold, 850W, Fully Modular", "price": 8960, "stock": 35, "label": "Popular", "emoji": "💎" },
    { "id": "psu-4", "cat": "cat-psu", "name": "Thermaltake Toughpower GF3 750W", "spec": "80+ Gold, 750W, Fully Modular", "price": 6720, "stock": 40, "label": "Value", "emoji": "💰" },
    { "id": "case-1", "cat": "cat-case", "name": "Lian Li O11 Dynamic EVO", "spec": "Mid Tower, Tempered Glass, Dual Chamber", "price": 8960, "stock": 25, "label": "Popular", "emoji": "📦" },
    { "id": "case-2", "cat": "cat-case", "name": "Fractal Design Torrent", "spec": "Mid Tower, High Airflow, 2x 180mm Fans", "price": 11200, "stock": 20, "label": "Airflow King", "emoji": "🌪️" },
    { "id": "case-3", "cat": "cat-case", "name": "NZXT H9 Elite", "spec": "Mid Tower, Dual Chamber, Cable Management", "price": 10080, "stock": 18, "label": "Premium", "emoji": "✨" },
    { "id": "case-4", "cat": "cat-case", "name": "Corsair 4000D Airflow", "spec": "Mid Tower, High Airflow, Budget Friendly", "price": 5600, "stock": 45, "label": "Best Value", "emoji": "💰" },
    { "id": "case-5", "cat": "cat-case", "name": "PC HAVEN Neon Matrix Cube", "spec": "Panoramic Glass, RGB Lighting, Premium Build", "price": 8344, "stock": 30, "label": "Fresh Design", "emoji": "🎨" },
    { "id": "cooler-1", "cat": "cat-cooler", "name": "NZXT Kraken Elite 360 RGB", "spec": "360mm AIO, LCD Display, RGB Fans", "price": 15680, "stock": 20, "label": "Premium", "emoji": "❄️" },
    { "id": "cooler-2", "cat": "cat-cooler", "name": "Crow Flow Liquid AIO 360", "spec": "360mm, Infinity Mirror LCD, Dynamic Pumps", "price": 9464, "stock": 25, "label": "Sale", "emoji": "💧" },
    { "id": "cooler-3", "cat": "cat-cooler", "name": "Arctic Liquid Freezer II 280", "spec": "280mm AIO, VRM Fan, Silent Operation", "price": 6720, "stock": 35, "label": "Best Value", "emoji": "🧊" },
    { "id": "cooler-4", "cat": "cat-cooler", "name": "Noctua NH-D15 chromax.black", "spec": "Dual Tower Air Cooler, Premium Fans", "price": 6160, "stock": 40, "label": "Air Cooling", "emoji": "🌬️" },
    { "id": "cooler-5", "cat": "cat-cooler", "name": "Corsair iCUE H150i Elite", "spec": "360mm AIO, RGB Lighting, Zero RPM Mode", "price": 11200, "stock": 22, "label": "RGB", "emoji": "🌈" }
  ]
};

// Load inventory from JSON file or use embedded data
async function loadInventory() {
  try {
    const response = await fetch('inventory.json');
    const data = await response.json();
    CATEGORIES_DB = data.categories;
    PRODUCTS_DB = data.products;
    console.log('✅ Inventory loaded from JSON file');
  } catch (error) {
    console.warn('⚠️ Could not load inventory.json, using embedded data:', error.message);
    // Fallback to embedded data
    CATEGORIES_DB = EMBEDDED_INVENTORY.categories;
    PRODUCTS_DB = EMBEDDED_INVENTORY.products;
  }
  
  // Update category counts
  CATEGORIES_DB.forEach(cat => {
    const count = PRODUCTS_DB.filter(p => p.cat === cat.id).length;
    cat.count = `${count} Models`;
  });
  
  return true;
}

const SERVICES_DB = [
  { id: 'srv1', name: 'High-Fidelity Custom Build Assembly', desc: 'Complete multi-component mounting, structural alignment, structural layout testing, and optimized BIOS parameters.', price: 4200, duration: '2 - 3 Hours' },
  { id: 'srv2', name: 'Thermal Repasting & Micro-De-dusting', desc: 'Deep hardware disinfection, removal of dry interfaces, and precision application of premium phase-change pads.', price: 2520, duration: '1 - 1.5 Hours' },
  { id: 'srv3', name: 'Critical OS & Driver Diagnostics Suite', desc: 'Secure operating system fresh payload deployment, absolute latency isolation tracking, and driver configuration mapping.', price: 2240, duration: '1 Hour' }
];

const TRUST_DB = [
  { icon: 'bi-shield-check', title: 'Secured Component Warranties', desc: '100% Verified product distribution manifests.' },
  { icon: 'bi-truck', title: 'Priority Drop Logistics', desc: 'Insured anti-shock freight networks nationwide.' },
  { icon: 'bi-person-gear', title: 'Certified Technical Nodes', desc: 'Live workbench support access on standby.' }
];

const TESTIMONIALS_DB = [
  { text: "PC HAVEN field technicians updated my thermal throttling workstations within hours. Incredible client response.", author: "Marcus V.", role: "Lead Dev Operations" },
  { text: "Secured my RTX 5090 drop allocation completely hassle-free. The separated front-end system tracking is blazing fast.", author: "Sarah K.", role: "Digital Render Engineer" }
];

/* ============================================================
   CLIENT CONTAINER STATS & ACTIVE APP STATES
============================================================ */
let activeCategoryFilter = 'all';
let activeBuilderCategory = null;

// PC Builder State Management
const PCBuilder = {
  selectedComponents: {},
  
  init() {
    this.loadBuild();
    this.renderCategories();
  },
  
  selectCategory(catId) {
    activeBuilderCategory = catId;
    this.renderCategories();
    this.renderComponents(catId);
  },
  
  renderCategories() {
    const container = document.getElementById('builderCategories');
    if (!container) return;
    
    container.innerHTML = CATEGORIES_DB.map(cat => {
      const isSelected = this.selectedComponents[cat.id];
      const isActive = activeBuilderCategory === cat.id;
      return `
        <div class="builder-cat-item ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}" 
             onclick="PCBuilder.selectCategory('${cat.id}')">
          <i class="bi ${cat.icon}"></i>
          <span>${cat.name}</span>
          ${isSelected ? '<i class="bi bi-check-circle-fill check-icon"></i>' : ''}
        </div>
      `;
    }).join('');
  },
  
  renderComponents(catId) {
    const container = document.getElementById('builderComponents');
    if (!container) return;
    
    const products = PRODUCTS_DB.filter(p => p.cat === catId);
    const category = CATEGORIES_DB.find(c => c.id === catId);
    
    if (products.length === 0) {
      container.innerHTML = '<div class="text-center text-muted py-4">No components available</div>';
      return;
    }
    
    container.innerHTML = `
      <div class="builder-components-header">
        <h5><i class="bi ${category.icon}"></i> Select ${category.name}</h5>
      </div>
      <div class="builder-components-grid">
        ${products.map(p => {
          const isSelected = this.selectedComponents[catId]?.id === p.id;
          const compatibility = this.checkComponentCompatibility(catId, p);
          const hasWarning = compatibility.warnings.length > 0;
          
          return `
            <div class="builder-component-card ${isSelected ? 'selected' : ''} ${p.stock === 0 ? 'out-of-stock' : ''} ${hasWarning ? 'has-warning' : ''}" 
                 onclick="PCBuilder.selectComponent('${catId}', '${p.id}')">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="component-emoji">${p.emoji}</div>
                <div class="d-flex gap-1">
                  ${hasWarning ? '<i class="bi bi-exclamation-triangle-fill text-warning" title="Compatibility warning"></i>' : ''}
                  ${isSelected ? '<i class="bi bi-check-circle-fill text-success"></i>' : ''}
                </div>
              </div>
              <h6 class="component-name">${p.name}</h6>
              <p class="component-spec">${p.spec}</p>
              ${hasWarning ? `<div class="component-warning"><i class="bi bi-info-circle"></i> ${compatibility.warnings[0]}</div>` : ''}
              <div class="d-flex justify-content-between align-items-center">
                <span class="component-price">₱${p.price.toLocaleString()}</span>
                <span class="component-stock ${p.stock < 10 ? 'low' : ''}">${p.stock} in stock</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },
  
  checkComponentCompatibility(catId, product) {
    const warnings = [];
    const cpu = this.selectedComponents['cat-cpu'];
    const mobo = this.selectedComponents['cat-mobo'];
    const gpu = this.selectedComponents['cat-gpu'];
    const psu = this.selectedComponents['cat-psu'];
    const cooler = this.selectedComponents['cat-cooler'];
    const caseItem = this.selectedComponents['cat-case'];
    
    // Check motherboard compatibility with CPU
    if (catId === 'cat-mobo' && cpu) {
      const isAMD = cpu.name.includes('AMD') || cpu.name.includes('Ryzen');
      const isIntel = cpu.name.includes('Intel') || cpu.name.includes('Core');
      const moboAMD = product.name.includes('X870') || product.name.includes('B650') || product.name.includes('X870E');
      const moboIntel = product.name.includes('Z890') || product.name.includes('Z790');
      
      if (isAMD && moboIntel) {
        warnings.push('Incompatible: AMD CPU needs AMD motherboard');
      } else if (isIntel && moboAMD) {
        warnings.push('Incompatible: Intel CPU needs Intel motherboard');
      }
    }
    
    // Check CPU compatibility with motherboard
    if (catId === 'cat-cpu' && mobo) {
      const isAMD = product.name.includes('AMD') || product.name.includes('Ryzen');
      const isIntel = product.name.includes('Intel') || product.name.includes('Core');
      const moboAMD = mobo.name.includes('X870') || mobo.name.includes('B650') || mobo.name.includes('X870E');
      const moboIntel = mobo.name.includes('Z890') || mobo.name.includes('Z790');
      
      if (isAMD && moboIntel) {
        warnings.push('Incompatible: AMD CPU needs AMD motherboard');
      } else if (isIntel && moboAMD) {
        warnings.push('Incompatible: Intel CPU needs Intel motherboard');
      }
    }
    
    // Check PSU wattage for high-end GPUs
    if (catId === 'cat-psu' && gpu) {
      const wattageMatch = product.name.match(/(\d+)W/);
      const wattage = wattageMatch ? parseInt(wattageMatch[1]) : 0;
      
      if (gpu.name.includes('5090') && wattage < 1000) {
        warnings.push('Warning: RTX 5090 recommended 1000W+ PSU');
      } else if ((gpu.name.includes('5080') || gpu.name.includes('7900')) && wattage < 850) {
        warnings.push('Warning: High-end GPU recommended 850W+ PSU');
      }
    }
    
    // Check GPU power requirements
    if (catId === 'cat-gpu' && psu) {
      const wattageMatch = psu.name.match(/(\d+)W/);
      const wattage = wattageMatch ? parseInt(wattageMatch[1]) : 0;
      
      if (product.name.includes('5090') && wattage < 1000) {
        warnings.push('Warning: This GPU needs 1000W+ PSU');
      } else if ((product.name.includes('5080') || product.name.includes('7900')) && wattage < 850) {
        warnings.push('Warning: This GPU needs 850W+ PSU');
      }
    }
    
    // Check cooler compatibility with case
    if (catId === 'cat-cooler' && caseItem) {
      const is360AIO = product.name.includes('360');
      const is280AIO = product.name.includes('280');
      const isSmallCase = caseItem.name.includes('Compact') || caseItem.name.includes('Mini');
      
      if ((is360AIO || is280AIO) && isSmallCase) {
        warnings.push('Warning: Large AIO may not fit in compact case');
      }
    }
    
    // Check case size for cooler
    if (catId === 'cat-case' && cooler) {
      const is360AIO = cooler.name.includes('360');
      const is280AIO = cooler.name.includes('280');
      const isSmallCase = product.name.includes('Compact') || product.name.includes('Mini');
      
      if ((is360AIO || is280AIO) && isSmallCase) {
        warnings.push('Warning: May not fit large AIO coolers');
      }
    }
    
    return { compatible: warnings.length === 0, warnings };
  },
  
  selectComponent(catId, productId) {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    this.selectedComponents[catId] = product;
    this.saveBuild();
    this.renderCategories();
    this.renderComponents(catId);
    this.updateSummary();
    this.checkBuildCompatibility();
    ToastSystem.trigger(`${product.name} added to build`, product.emoji);
  },
  
  checkBuildCompatibility() {
    const warningsContainer = document.getElementById('compatibilityWarnings');
    if (!warningsContainer) return;
    
    const allWarnings = [];
    const cpu = this.selectedComponents['cat-cpu'];
    const mobo = this.selectedComponents['cat-mobo'];
    const gpu = this.selectedComponents['cat-gpu'];
    const psu = this.selectedComponents['cat-psu'];
    const ram = this.selectedComponents['cat-ram'];
    const cooler = this.selectedComponents['cat-cooler'];
    const caseItem = this.selectedComponents['cat-case'];
    
    // CPU and Motherboard compatibility
    if (cpu && mobo) {
      const isAMDCPU = cpu.name.includes('AMD') || cpu.name.includes('Ryzen');
      const isIntelCPU = cpu.name.includes('Intel') || cpu.name.includes('Core');
      const isAMDMobo = mobo.name.includes('X870') || mobo.name.includes('B650') || mobo.name.includes('X870E');
      const isIntelMobo = mobo.name.includes('Z890') || mobo.name.includes('Z790');
      
      if ((isAMDCPU && isIntelMobo) || (isIntelCPU && isAMDMobo)) {
        allWarnings.push({
          type: 'error',
          icon: 'bi-x-circle-fill',
          message: 'CPU and Motherboard are incompatible! AMD CPUs need AMD motherboards, Intel CPUs need Intel motherboards.'
        });
      }
    }
    
    // GPU and PSU compatibility
    if (gpu && psu) {
      const wattageMatch = psu.name.match(/(\d+)W/);
      const wattage = wattageMatch ? parseInt(wattageMatch[1]) : 0;
      
      if (gpu.name.includes('5090') && wattage < 1000) {
        allWarnings.push({
          type: 'warning',
          icon: 'bi-exclamation-triangle-fill',
          message: 'RTX 5090 requires at least 1000W PSU. Current PSU may be insufficient.'
        });
      } else if ((gpu.name.includes('5080') || gpu.name.includes('5070') || gpu.name.includes('7900')) && wattage < 850) {
        allWarnings.push({
          type: 'warning',
          icon: 'bi-exclamation-triangle-fill',
          message: 'High-end GPU recommended 850W+ PSU for optimal performance.'
        });
      }
    }
    
    // Cooler and Case compatibility
    if (cooler && caseItem) {
      const is360AIO = cooler.name.includes('360');
      const is280AIO = cooler.name.includes('280');
      const isSmallCase = caseItem.name.includes('Compact') || caseItem.name.includes('Mini');
      
      if ((is360AIO || is280AIO) && isSmallCase) {
        allWarnings.push({
          type: 'warning',
          icon: 'bi-exclamation-triangle-fill',
          message: 'Large AIO cooler may not fit in compact case. Verify case specifications.'
        });
      }
    }
    
    // Missing essential components
    const essentialComponents = [
      { id: 'cat-cpu', name: 'Processor' },
      { id: 'cat-mobo', name: 'Motherboard' },
      { id: 'cat-ram', name: 'RAM' },
      { id: 'cat-storage', name: 'Storage' },
      { id: 'cat-psu', name: 'Power Supply' }
    ];
    
    const missingComponents = essentialComponents.filter(comp => !this.selectedComponents[comp.id]);
    
    if (missingComponents.length > 0 && Object.keys(this.selectedComponents).length > 0) {
      allWarnings.push({
        type: 'info',
        icon: 'bi-info-circle-fill',
        message: `Missing essential components: ${missingComponents.map(c => c.name).join(', ')}`
      });
    }
    
    // Display warnings
    if (allWarnings.length > 0) {
      warningsContainer.style.display = 'block';
      warningsContainer.innerHTML = allWarnings.map(w => `
        <div class="compatibility-alert compatibility-${w.type}">
          <i class="bi ${w.icon}"></i>
          <span>${w.message}</span>
        </div>
      `).join('');
    } else if (Object.keys(this.selectedComponents).length > 0) {
      warningsContainer.style.display = 'block';
      warningsContainer.innerHTML = `
        <div class="compatibility-alert compatibility-success">
          <i class="bi bi-check-circle-fill"></i>
          <span>All components are compatible! ✓</span>
        </div>
      `;
    } else {
      warningsContainer.style.display = 'none';
    }
  },
  
  updateSummary() {
    const summaryBody = document.getElementById('buildSummary');
    const totalPriceEl = document.getElementById('buildTotalPrice');
    const addBtn = document.getElementById('addBuildToCartBtn');
    
    if (!summaryBody || !totalPriceEl) return;
    
    const components = Object.values(this.selectedComponents);
    
    if (components.length === 0) {
      summaryBody.innerHTML = `
        <div class="text-center text-muted py-4">
          <i class="bi bi-cpu fs-3 d-block mb-2"></i>
          <small>Start selecting components</small>
        </div>
      `;
      totalPriceEl.textContent = '₱0';
      if (addBtn) addBtn.disabled = true;
      return;
    }
    
    const total = components.reduce((sum, comp) => sum + comp.price, 0);
    
    summaryBody.innerHTML = components.map(comp => {
      const category = CATEGORIES_DB.find(c => c.id === comp.cat);
      return `
        <div class="build-summary-item">
          <div class="build-summary-item-header">
            <span class="build-summary-cat">${category.name}</span>
            <button class="build-summary-remove" onclick="PCBuilder.removeComponent('${comp.cat}')" title="Remove">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="build-summary-item-name">${comp.emoji} ${comp.name}</div>
          <div class="build-summary-item-price">₱${comp.price.toLocaleString()}</div>
        </div>
      `;
    }).join('');
    
    totalPriceEl.textContent = `₱${total.toLocaleString()}`;
    if (addBtn) addBtn.disabled = false;
  },
  
  removeComponent(catId) {
    delete this.selectedComponents[catId];
    this.saveBuild();
    this.renderCategories();
    if (activeBuilderCategory === catId) {
      this.renderComponents(catId);
    }
    this.updateSummary();
    this.checkBuildCompatibility();
    ToastSystem.trigger('Component removed from build', '🗑️');
  },
  
  clearBuild() {
    if (Object.keys(this.selectedComponents).length === 0) {
      ToastSystem.trigger('Build is already empty', 'ℹ️');
      return;
    }
    
    // Create custom modal instead of browser confirm
    const modal = document.createElement('div');
    modal.className = 'custom-modal-overlay';
    modal.innerHTML = `
      <div class="custom-modal">
        <div class="custom-modal-header">
          <i class="bi bi-exclamation-triangle-fill text-warning"></i>
          <h5>Clear Build?</h5>
        </div>
        <div class="custom-modal-body">
          <p>Are you sure you want to clear your entire build? This will remove all selected components.</p>
        </div>
        <div class="custom-modal-footer">
          <button class="btn-modal-cancel" onclick="this.closest('.custom-modal-overlay').remove()">Cancel</button>
          <button class="btn-modal-confirm" onclick="PCBuilder.confirmClearBuild(); this.closest('.custom-modal-overlay').remove();">Clear Build</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  },
  
  confirmClearBuild() {
    this.selectedComponents = {};
    this.saveBuild();
    this.renderCategories();
    if (activeBuilderCategory) {
      this.renderComponents(activeBuilderCategory);
    }
    this.updateSummary();
    this.checkBuildCompatibility();
    ToastSystem.trigger('Build cleared successfully', '🔄');
  },
  
  addToCart() {
    const components = Object.values(this.selectedComponents);
    if (components.length === 0) return;
    
    components.forEach(comp => {
      CartManager.addItem(comp.id, comp.name, comp.price, comp.emoji);
    });
    
    ToastSystem.trigger(`${components.length} components added to cart!`, '🎉');
  },
  
  saveBuild() {
    localStorage.setItem('pchaven_build', JSON.stringify(this.selectedComponents));
  },
  
  loadBuild() {
    const saved = localStorage.getItem('pchaven_build');
    if (saved) {
      this.selectedComponents = JSON.parse(saved);
    }
  }
};

// Theme Control System Engine
const ThemeEngine = {
  init() {
    const cached = localStorage.getItem('pchaven_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', cached);
    this.updateIcon(cached);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem('pchaven_theme', target);
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
    return JSON.parse(localStorage.getItem('pchaven_cart') || '[]');
  },
  saveItems(cart) {
    localStorage.setItem('pchaven_cart', JSON.stringify(cart));
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
      subtotalEl.textContent = '₱0';
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
            <span class="cart-item-price">₱${item.price.toLocaleString()} <span class="text-muted small">x${item.qty}</span></span>
          </div>
          <button class="cart-remove-btn" onclick="CartManager.removeItem('${item.id}')" title="Remove Item">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      `;
    });
    container.innerHTML = html;
    subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
  },
  checkout() {
    const cart = this.getItems();
    if (cart.length === 0) {
      ToastSystem.trigger('Cart node clear. Add components first.', '⚠️');
      return;
    }
    alert('PC HAVEN Front-End Simulator: Purchase sequence initialized. Clearing local state matrix.');
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
      { id: 'all', label: 'All Components' },
      ...CATEGORIES_DB.map(cat => ({ id: cat.id, label: cat.name }))
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
                <span class="product-price">₱${p.price.toLocaleString()}</span>
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
            <span class="service-price">₱${s.price.toLocaleString()} <span class="text-muted small">/ Base</span></span>
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
  
  // FIXED NAVIGATION BAR ORANGE HIGHLIGHT SWITCH LOGIC
  document.querySelectorAll('#filter-tabs .filter-tab-btn').forEach(btn => {
     btn.classList.remove('active');
  });
  const activeBtn = Array.from(document.querySelectorAll('#filter-tabs .filter-tab-btn')).find(btn => btn.getAttribute('onclick').includes(catId));
  if(activeBtn) activeBtn.classList.add('active');

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
    "⚡ PC HAVEN STOCK ALERT: AMD RYZEN 7 9800X3D ALLOCATIONS ALLOTTED IN QUANTITY POOLS",
    "🛡️ EXPERT ON-SITE DIAGNOSTIC DISPATCH WORKFORCE RUNNING ACTIVE OPS METRIC",
    "🔥 EXCLUSIVE INTEL ULTRA GENERATION CORE TRAFFIC RE-ROUTED CLIENT DISPATCHES OPEN"
  ];
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
    if (hours < 0) { hours = 24; } 

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
document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is logged in, redirect to login if not
  const session = localStorage.getItem('pchaven_session');
  if (!session) {
    window.location.href = 'index.html';
    return;
  }
  
  const user = JSON.parse(session);
  if (!user.loggedIn) {
    window.location.href = 'index.html';
    return;
  }
  
  // Load inventory first
  await loadInventory();
  
  ThemeEngine.init();
  CartManager.syncBadge();
  renderAllComponents();
  initTickerSystem();
  runPromoTimer();
  
  // Initialize PC Builder
  PCBuilder.init();
  
  // Check user session and update UI
  updateUserSection();

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Dynamic Navigation highlighters for the structural page anchors
  const navLinks = document.querySelectorAll('#mainNav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

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

  document.getElementById('themeToggle')?.addEventListener('click', () => ThemeEngine.toggle());
});

/* ============================================================
   USER SESSION MANAGEMENT
============================================================ */
function updateUserSection() {
  const userSection = document.getElementById('userSection');
  if (!userSection) return;
  
  const session = localStorage.getItem('pchaven_session');
  
  if (session) {
    const user = JSON.parse(session);
    if (user.loggedIn) {
      // User is logged in
      userSection.innerHTML = `
        <div class="user-dropdown">
          <button class="btn-user-nav" id="userMenuBtn" title="${user.name}">
            <i class="bi bi-person-circle"></i>
            <span class="d-none d-md-inline">${user.name.split(' ')[0]}</span>
          </button>
          <div class="user-dropdown-menu" id="userDropdownMenu">
            <div class="user-dropdown-header">
              <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
              <div>
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
              </div>
            </div>
            <div class="user-dropdown-divider"></div>
            <a href="#" class="user-dropdown-item" onclick="event.preventDefault(); alert('Profile feature coming soon!')">
              <i class="bi bi-person"></i> My Profile
            </a>
            <a href="#" class="user-dropdown-item" onclick="event.preventDefault(); alert('Orders feature coming soon!')">
              <i class="bi bi-box-seam"></i> My Orders
            </a>
            <a href="#pc-builder" class="user-dropdown-item">
              <i class="bi bi-pc-display"></i> My Builds
            </a>
            <div class="user-dropdown-divider"></div>
            <a href="#" class="user-dropdown-item text-danger" onclick="event.preventDefault(); logoutUser()">
              <i class="bi bi-box-arrow-right"></i> Logout
            </a>
          </div>
        </div>
      `;
      
      // Toggle dropdown
      const userMenuBtn = document.getElementById('userMenuBtn');
      const userDropdownMenu = document.getElementById('userDropdownMenu');
      
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdownMenu.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        userDropdownMenu.classList.remove('show');
      });
      
      return;
    }
  }
  
  // User is not logged in
  userSection.innerHTML = `
    <a href="index.html" class="btn-login-nav" title="Login">
      <i class="bi bi-person-circle"></i>
    </a>
  `;
}

function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('pchaven_session');
    localStorage.removeItem('pchaven_remember');
    ToastSystem.trigger('Logged out successfully', '👋');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}