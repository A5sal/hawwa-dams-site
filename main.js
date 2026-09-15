/**
 * Hawwa PrintShop — Interactive Mobile Navigation & UI Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Mobile Drawer markup if not present
  initMobileDrawer();

  // 2. Setup Category Accordion Toggles
  initMobileCategoryAccordion();

  // 3. Highlight Active Nav Links dynamically
  highlightActiveNavLinks();
});

function initMobileDrawer() {
  const mobileToggleBtn = document.querySelector('.mobile-toggle');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerCloseBtn = document.querySelector('.drawer-close');

  if (!mobileToggleBtn || !mobileDrawer) return;

  function openDrawer() {
    mobileDrawer.classList.add('is-active');
    if (drawerBackdrop) drawerBackdrop.classList.add('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('is-active')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking nav anchors inside drawer
  const drawerNavLinks = mobileDrawer.querySelectorAll('a:not(.mobile-cat-toggle)');
  drawerNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

function initMobileCategoryAccordion() {
  const catToggleBtns = document.querySelectorAll('.mobile-cat-toggle');
  catToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const content = btn.nextElementSibling;
      const arrow = btn.querySelector('.dropdown-arrow');
      if (content) {
        const isOpen = content.classList.contains('is-open');
        content.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        if (arrow) {
          arrow.style.transform = !isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });
}

function highlightActiveNavLinks() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('nav a, .dropdown-menu a, .drawer-nav a');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const pageName = href.split('/').pop();

    if (pageName === currentPath || (currentPath === '' && pageName === 'index.html')) {
      link.classList.add('active');
    }
  });
}
