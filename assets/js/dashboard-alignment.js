/* Equalize text only among peer cards occupying the same visible row. */
(() => {
  const groups = '.dashboard-summary-grid,.active-delivery-grid,.dashboard-fields,.dashboard-table tbody,.service-grid,.steps,.industries,.testimonial-grid,.zone-grid,.impact-grid,.benefits,.values-grid,.courier-grid,.safety-grid,.community-grid,.delivery-grid,.blog-grid,.topic-grid,.rate-grid,.business-rate-grid,.price-factor-grid,.pricing-grid,.cargo-cards,.contact-card-grid,.planning-grid,.dashboard-metrics,.service-workflow ol,.detail-content,.numbered-benefits';
  let frame, busy = false;
  const original = new Map();
  function align() {
    if (busy) return;
    busy = true;
    original.forEach((value, node) => { node.style.minHeight = value; });
    original.clear();
    document.querySelectorAll(groups).forEach(group => {
      const rows = [];
      [...group.children].filter(card => card.getClientRects().length && getComputedStyle(card).position !== 'absolute').forEach(card => {
        const top = card.offsetTop;
        let row = rows.find(row => Math.abs(row.top - top) < 5);
        if (!row) rows.push(row = {top, cards: []});
        row.cards.push(card);
      });
      rows.filter(row => row.cards.length > 1).forEach(({cards}) => {
        const bodies = cards.map(card => card.querySelector(':scope > .blog-card-body,:scope > .delivery-card-body,:scope > .courier-copy') || card);
        ['td','label','.dashboard-details','.eyebrow','h3','h4','blockquote','p:not(.eyebrow):not(.rate-limit):not(.neighborhood-window):not(.service-benefit)'].forEach(selector => {
          const matches = bodies.map(body => [...body.children].filter(node => node.matches(selector)));
          const count = Math.min(...matches.map(nodes => nodes.length));
          for (let i = 0; i < count; i++) {
            const nodes = matches.map(nodes => nodes[i]);
            if (nodes.some(node => !node.getClientRects().length)) continue;
            const height = Math.max(...nodes.map(node => { const line = parseFloat(getComputedStyle(node).lineHeight); const natural = node.getBoundingClientRect().height; return Number.isFinite(line) ? Math.ceil((natural - 0.5) / line) * line : natural; }));
            nodes.forEach(node => {
              original.set(node, node.style.minHeight);
              node.style.minHeight = `${Math.ceil(height)}px`;
            });
          }
        });
      });
    });
    busy = false;
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(align); }
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('click', schedule);
  document.addEventListener('input', schedule);
  new MutationObserver(schedule).observe(document.querySelector('main') || document.body, {childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']});
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();



