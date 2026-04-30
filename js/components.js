// Shared Navbar & Footer
function renderNavbar() {
  return `
  <nav class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all" id="main-nav">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 group">
        <span class="text-3xl group-hover:rotate-12 transition-transform">🌿</span>
        <span class="text-xl font-extrabold text-primary-700">${STORE_NAME}</span>
      </a>
      <div class="hidden md:flex items-center gap-6 text-sm font-bold">
        <a href="/" class="hover:text-primary-600 transition relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all hover:after:w-full">الرئيسية</a>
        <a href="/products.html" class="hover:text-primary-600 transition relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all hover:after:w-full">المنتجات</a>
        <a href="/categories.html" class="hover:text-primary-600 transition relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all hover:after:w-full">التصنيفات</a>
        <a href="/track-order.html" class="hover:text-primary-600 transition relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all hover:after:w-full">📦 تتبع طلبك</a>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleSearch()" class="p-2.5 rounded-xl hover:bg-gray-100 transition text-gray-500 hover:text-primary-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </button>
        <a href="/cart.html" id="cart-icon" class="relative bg-primary-50 hover:bg-primary-100 text-primary-700 p-2.5 rounded-xl transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          <span id="cart-badge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full items-center justify-center font-bold" style="display:none">0</span>
        </a>
        <button id="mobile-menu-btn" class="md:hidden p-2" onclick="toggleMobileMenu()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <!-- Search bar -->
    <div id="search-bar" class="hidden border-t bg-white px-4 py-3">
      <div class="max-w-2xl mx-auto flex gap-2">
        <input id="global-search" type="text" placeholder="ابحث عن منتج..." class="flex-1 border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none" onkeydown="if(event.key==='Enter')goSearch()">
        <button onclick="goSearch()" class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition">بحث</button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t px-4 pb-4 space-y-2">
      <a href="/" class="block py-2 font-bold hover:text-primary-600">الرئيسية</a>
      <a href="/products.html" class="block py-2 font-bold hover:text-primary-600">المنتجات</a>
      <a href="/categories.html" class="block py-2 font-bold hover:text-primary-600">التصنيفات</a>
      <a href="/track-order.html" class="block py-2 font-bold hover:text-primary-600">📦 تتبع طلبك</a>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="bg-gray-900 text-gray-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-white font-extrabold text-lg mb-3">🌿 ${STORE_NAME}</h3>
        <p class="text-sm leading-relaxed">أجود أنواع الأعشاب والبهارات والزيوت الطبيعية. منتجات أصلية 100% بأسعار مناسبة.</p>
      </div>
      <div>
        <h4 class="text-white font-bold mb-3">روابط سريعة</h4>
        <div class="space-y-2 text-sm">
          <a href="/" class="block hover:text-white transition">الرئيسية</a>
          <a href="/products.html" class="block hover:text-white transition">المنتجات</a>
          <a href="/categories.html" class="block hover:text-white transition">التصنيفات</a>
          <a href="/cart.html" class="block hover:text-white transition">السلة</a>
          <a href="/track-order.html" class="block hover:text-white transition">تتبع طلبك</a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-bold mb-3">تواصل معنا</h4>
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.913l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.744-6.235-2.01a.75.75 0 00-.652-.108l-3.1 1.04 1.04-3.1a.75.75 0 00-.108-.652A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          واتساب
        </a>
        <p class="text-sm mt-3">📞 01158221296</p>
      </div>
    </div>
    <div class="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
      © ${new Date().getFullYear()} ${STORE_NAME} — جميع الحقوق محفوظة
    </div>
  </footer>
  <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition hover:scale-110">
    <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
  </a>`;
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

function toggleSearch() {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('hidden');
  if (!bar.classList.contains('hidden')) {
    document.getElementById('global-search').focus();
  }
}

function goSearch() {
  const q = document.getElementById('global-search').value.trim();
  if (q) location.href = '/products.html?q=' + encodeURIComponent(q);
}

function initPage() {
  document.getElementById('navbar').innerHTML = renderNavbar();
  document.getElementById('footer').innerHTML = renderFooter();
  updateCartBadge();
  initScrollAnimations();
  initNavbarScroll();
}

// Scroll animations observer
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up, .fade-in, .stagger').forEach(el => observer.observe(el));
}

// Navbar shadow on scroll
function initNavbarScroll() {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('shadow-md');
      nav.classList.remove('shadow-sm');
    } else {
      nav.classList.remove('shadow-md');
      nav.classList.add('shadow-sm');
    }
  });
}

// Toast notification
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = `toast toast-${type}`;
  div.innerHTML = `${type === 'success' ? '✅' : '❌'} ${msg}`;
  document.body.appendChild(div);
  setTimeout(() => div.classList.add('show'), 10);
  setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 400); }, 3000);
}

// Add to cart with animation
function quickAddToCart(id, name, price, image) {
  addToCart({ id, name, price, image, unit: '' });
  showToast(`تم إضافة "${name}" للسلة`);
  const icon = document.getElementById('cart-icon');
  if (icon) { icon.classList.add('cart-bounce'); setTimeout(() => icon.classList.remove('cart-bounce'), 500); }
}

// Skeleton loading cards
function skeletonCards(count = 4) {
  return Array(count).fill('').map(() => `
    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <div class="aspect-square skeleton"></div>
      <div class="p-4 space-y-2">
        <div class="h-4 skeleton w-3/4"></div>
        <div class="h-3 skeleton w-1/2"></div>
        <div class="h-5 skeleton w-1/3"></div>
      </div>
    </div>`).join('');
}

// Product card template
function productCard(p) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;
  const discPct = hasDiscount ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const stockBadge = p.stock !== undefined && p.stock <= 0 ? '<span class="absolute top-3 left-3 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg font-bold">نفد المخزون</span>' : '';
  return `
  <div class="product-card bg-white rounded-2xl shadow overflow-hidden relative group">
    ${hasDiscount ? `<span class="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-bold pulse-badge">-${discPct}%</span>` : ''}
    ${!hasDiscount && p.featured ? `<span class="absolute top-3 right-3 z-10 bg-amber-400 text-white text-xs px-2 py-1 rounded-lg font-bold">⭐ مميز</span>` : ''}
    ${stockBadge}
    <a href="/product.html?slug=${p.slug}">
      <div class="aspect-square bg-gray-100 flex items-center justify-center text-6xl overflow-hidden">
        ${p.image ? (p.image.startsWith('http') ? `<img src="${p.image}" class="w-full h-full object-cover img-zoom" alt="${p.name}">` : `<span class="img-zoom">${p.image}</span>`) : '<span class="img-zoom">🌿</span>'}
      </div>
    </a>
    <div class="p-4">
      <a href="/product.html?slug=${p.slug}">
        <h3 class="font-bold text-sm mb-1 group-hover:text-primary-700 transition line-clamp-2">${p.name}</h3>
      </a>
      <p class="text-xs text-gray-400 mb-2">${p.unit || 'قطعة'}</p>
      <div class="flex items-center justify-between">
        <div>
          <span class="text-primary-700 font-extrabold">${p.price} ${CURRENCY}</span>
          ${hasDiscount ? `<span class="text-gray-400 line-through text-xs mr-1">${p.oldPrice} ${CURRENCY}</span>` : ''}
        </div>
        <button onclick="event.preventDefault();quickAddToCart(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price},'${(p.image||'🌿').replace(/'/g,"\\'")}')" class="cart-btn bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-xl transition" title="أضف للسلة">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}
