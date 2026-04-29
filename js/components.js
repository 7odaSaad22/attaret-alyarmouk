// Shared Navbar & Footer
function renderNavbar() {
  return `
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2">
        <span class="text-3xl">🌿</span>
        <span class="text-xl font-extrabold text-primary-700">${STORE_NAME}</span>
      </a>
      <div class="hidden md:flex items-center gap-6 text-sm font-bold">
        <a href="/" class="hover:text-primary-600 transition">الرئيسية</a>
        <a href="/products.html" class="hover:text-primary-600 transition">المنتجات</a>
        <a href="/categories.html" class="hover:text-primary-600 transition">التصنيفات</a>
      </div>
      <div class="flex items-center gap-3">
        <a href="/cart.html" class="relative bg-primary-50 hover:bg-primary-100 text-primary-700 p-2.5 rounded-xl transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          <span id="cart-badge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full items-center justify-center font-bold" style="display:none">0</span>
        </a>
        <button id="mobile-menu-btn" class="md:hidden p-2" onclick="toggleMobileMenu()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t px-4 pb-4 space-y-2">
      <a href="/" class="block py-2 font-bold hover:text-primary-600">الرئيسية</a>
      <a href="/products.html" class="block py-2 font-bold hover:text-primary-600">المنتجات</a>
      <a href="/categories.html" class="block py-2 font-bold hover:text-primary-600">التصنيفات</a>
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

function initPage() {
  document.getElementById('navbar').innerHTML = renderNavbar();
  document.getElementById('footer').innerHTML = renderFooter();
  updateCartBadge();
}

// Product card template
function productCard(p) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;
  return `
  <a href="/product.html?slug=${p.slug}" class="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
    <div class="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
      ${p.image ? (p.image.startsWith('http') ? `<img src="${p.image}" class="w-full h-full object-cover" alt="${p.name}">` : p.image) : '🌿'}
    </div>
    <div class="p-4">
      <h3 class="font-bold text-sm mb-1 group-hover:text-primary-700 transition line-clamp-2">${p.name}</h3>
      <p class="text-xs text-gray-400 mb-2">${p.unit || 'قطعة'}</p>
      <div class="flex items-center gap-2">
        <span class="text-primary-700 font-extrabold">${p.price} ${CURRENCY}</span>
        ${hasDiscount ? `<span class="text-gray-400 line-through text-xs">${p.oldPrice} ${CURRENCY}</span>` : ''}
      </div>
    </div>
  </a>`;
}
