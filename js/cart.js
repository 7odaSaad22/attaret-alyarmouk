// Cart Management (localStorage)
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image, unit: product.unit, qty });
  }
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) { item.qty = Math.max(1, qty); }
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}
