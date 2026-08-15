
(() => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const toast = document.querySelector('#toast');
  const showToast = (msg) => {
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast(form.dataset.success || 'Thank you! Your details have been submitted.');
      form.reset();
    });
  });

  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        item.classList.toggle('hide', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });
})();
