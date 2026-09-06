// Formspree endpoint: https://formspree.io/f/xkjnvpdn
(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const isRealPath = value => typeof value === 'string' && value.trim().length > 0;
  const profileName = $('.profile-name');
  profileName.innerHTML = modelData.fullName.replace(/ Gunawardhana$/, '<br>Gunawardhana');

  const header = $('.site-header');
  const setHeader = () => header.classList.toggle('scrolled', scrollY > 25);
  addEventListener('scroll', setHeader, { passive: true }); setHeader();

  const menu = $('#mobile-menu'), toggle = $('.menu-toggle'), closeMenu = $('.menu-close');
  const showMenu = show => { menu.classList.toggle('open', show); menu.setAttribute('aria-hidden', String(!show)); toggle.setAttribute('aria-expanded', String(show)); document.body.style.overflow = show ? 'hidden' : ''; };
  toggle.addEventListener('click', () => showMenu(!menu.classList.contains('open')));
  closeMenu.addEventListener('click', () => showMenu(false));
  $$('a', menu).forEach(link => link.addEventListener('click', () => showMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) showMenu(false); });

  const measurements = $('#measurements');
  Object.entries(modelData.measurements).forEach(([label, value]) => { const item = document.createElement('div'); item.innerHTML = `<dt>${label}</dt><dd>${value}</dd>`; measurements.append(item); });
  const specialtyList = $('#specialty-list');
  specialties.forEach((name, i) => { const item = document.createElement('article'); item.className = 'specialty reveal'; item.innerHTML = `<span class="specialty-index">${String(i + 1).padStart(2, '0')}</span><h3>${name}</h3><span aria-hidden="true">↗</span>`; specialtyList.append(item); });
  const available = $('#availability-list');
  specialties.forEach(name => { const item = document.createElement('li'); item.textContent = name; available.append(item); });

  function setImage(container, path, label) {
    if (!isRealPath(path)) return;
    container.innerHTML = ''; container.style.background = '#151515';
    const image = new Image(); image.src = path; image.alt = label; image.loading = 'lazy';
    image.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0';
    image.onerror = () => { container.innerHTML = ''; };
    container.append(image);
  }
  if (isRealPath(modelData.heroImage)) {
    const frame = $('.visual-frame');
    frame.innerHTML = `<img src="${modelData.heroImage}" alt="${modelData.professionalName}" fetchpriority="high" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">`;
  }
  setImage($('#about-image'), modelData.aboutImage, `${modelData.professionalName} portrait`);
  if (isRealPath(modelData.ctaImage)) { const cta = $('#cta-visual'); cta.innerHTML = ''; cta.style.cssText += `background-image:url("${modelData.ctaImage}");background-size:cover;background-position:center;`; }
  const profile = $('#profile-download');
  if (isRealPath(modelData.profilePdf)) { profile.hidden = false; profile.href = modelData.profilePdf; profile.setAttribute('download', 'Jalitha-Induwara-Model-Profile.pdf'); }

  const detailRoot = $('#contact-details'), footerContact = $('#footer-contact');
  const contactRows = [
    ['Phone', `<a href="tel:${modelData.contact.phoneHref}">${modelData.contact.phone}</a>`],
// DISABLED: Formspree now handles inquiries.     ['Email', `<a href="mailto:${modelData.contact.email}">${modelData.contact.email}</a>`],
    ['Location', `<span>${modelData.contact.location}</span>`]
  ];
  contactRows.forEach(([label, content]) => { const el = document.createElement('div'); el.innerHTML = `<small>${label}</small>${content}`; detailRoot.append(el); });
  const socials = Object.entries(modelData.socialLinks).filter(([, url]) => isRealPath(url));
  if (socials.length) { const socialEl = document.createElement('div'); socialEl.innerHTML = `<small>Elsewhere</small>${socials.map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener">${name}</a>`).join(' · ')}`; detailRoot.append(socialEl); }
// DISABLED: Formspree now handles inquiries.   footerContact.innerHTML = `<p>${modelData.contact.location}</p><p><a href="mailto:${modelData.contact.email}">${modelData.contact.email}</a></p><p><a href="tel:${modelData.contact.phoneHref}">${modelData.contact.phone}</a></p>`;

  const gallery = $('#gallery'), filters = $('#filters'), lightbox = $('#lightbox'); let activeItems = [], currentIndex = 0;
  function openLightbox(index) { currentIndex = index; const item = activeItems[index]; $('#lightbox-image').src = item.image; $('#lightbox-image').alt = item.title; $('#lightbox-caption').textContent = `${item.category} — ${item.title}`; lightbox.showModal(); $('.lightbox-close').focus(); }
  function renderGallery(category = 'All') {
    activeItems = category === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === category); gallery.innerHTML = '';
    if (!activeItems.length) { gallery.innerHTML = '<div class="gallery-empty"><span>J I</span><h3>Portfolio imagery forthcoming</h3><p>Original photographs will appear here. This gallery is ready for new work.</p></div>'; return; }
    activeItems.forEach((item, index) => { const figure = document.createElement('figure'); figure.className = 'gallery-item'; figure.tabIndex = 0; figure.innerHTML = `<img src="${item.image}" alt="${item.title}" loading="lazy"><figcaption><span>${item.category}</span>${item.title}</figcaption>`; figure.addEventListener('click', () => openLightbox(index)); figure.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(index); }); gallery.append(figure); });
  }
  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  if (portfolioItems.length) categories.forEach((category, index) => { const button = document.createElement('button'); button.className = `filter ${index === 0 ? 'active' : ''}`; button.textContent = category; button.addEventListener('click', () => { $$('.filter').forEach(x => x.classList.toggle('active', x === button)); renderGallery(category); }); filters.append(button); });
  renderGallery();
  $('.lightbox-close').addEventListener('click', () => lightbox.close());
  $('.lightbox-nav.prev').addEventListener('click', () => openLightbox((currentIndex - 1 + activeItems.length) % activeItems.length));
  $('.lightbox-nav.next').addEventListener('click', () => openLightbox((currentIndex + 1) % activeItems.length));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
  addEventListener('keydown', e => { if (!lightbox.open) return; if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + activeItems.length) % activeItems.length); if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % activeItems.length); });

// DISABLED: Formspree now handles inquiries.   $('#inquiry-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget, message = $('#form-message'); const name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), company = form.elements.company.value.trim(), project = form.elements.project.value, text = form.elements.message.value.trim(); const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); if (!name || !validEmail || !text) { message.className = 'form-message error'; message.textContent = 'Please enter your name, a valid email address, and a message.'; return; } const subject = encodeURIComponent(`Portfolio inquiry from ${name}`); const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany / Brand: ${company || 'Not provided'}\nProject type: ${project || 'Not provided'}\n\nMessage:\n${text}`); message.className = 'form-message'; message.textContent = 'Opening your email app with this inquiry ready to send.'; window.location.href = `mailto:${modelData.contact.email}?subject=${subject}&body=${body}`; });

  const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => reveal.observe(el));
})();
