/* Additive presentation layer; existing page markup and behaviors are retained. */
(() => {
 const map = document.querySelector('.coverage-map');
 if (map) {
  const panel = document.createElement('div');
  panel.className = 'coverage-editorial';
  panel.innerHTML = `<div class="coverage-editorial-photo"><img src="assets/images/areas-hero.jpg" alt="Bicycle delivery in the neighborhood"><div class="coverage-photo-caption"><span>LOCAL BY DESIGN</span><h3>Closer neighborhoods.<br>Better handoffs.</h3></div></div><div class="coverage-directory"><p class="eyebrow">PORTLAND DELIVERY AREAS</p><h3>Find your neighborhood.</h3><p class="coverage-directory-intro">A quick look at our sample service areas. Confirm your address before requesting a delivery.</p><ul class="coverage-directory-list"><li><span>Pearl District</span><span class="coverage-badge">Core area</span></li><li><span>Downtown</span><span class="coverage-badge">Core area</span></li><li><span>Hawthorne</span><span class="coverage-badge">Core area</span></li><li><span>Sellwood</span><span class="coverage-badge extended">Extended area</span></li><li><span>Woodstock</span><span class="coverage-badge extended">Extended area</span></li><li><span>St. Johns</span><span class="coverage-badge unavailable">Unavailable</span></li></ul><a class="button button-primary" href="contact.html">Check your delivery address <span aria-hidden="true">↗</span></a></div>`;
  map.hidden = true;
  map.insertAdjacentElement('afterend', panel);
  const section = map.closest('section');
  section.querySelector('.section-heading>p').textContent = 'Neighborhood coverage, at a glance. Find a practical starting point for your next local delivery.';
  const note = section.querySelector(':scope>.small-copy');
  if (note) note.textContent = 'Sample coverage only. Service boundaries and availability must be confirmed with your delivery operator.';
 }
 const context = document.querySelector('.login-context');
 if (context) {
  const photo = document.createElement('div');
  photo.className = 'login-account-ready';
  photo.innerHTML = '<p class="eyebrow">BEFORE YOUR NEXT PICKUP</p><h3>A little preparation. A smoother handoff.</h3><ul><li>Keep the pickup and recipient contact details ready.</li><li>Check parcel size, weight and any handling needs.</li><li>Choose a preferred pickup window for your request.</li></ul>';
  context.insertBefore(photo, context.querySelector(':scope>.text-link'));
 }
})();

