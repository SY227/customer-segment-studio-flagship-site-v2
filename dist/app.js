const experienceScreens = {
  field: {
    webp: 'assets/screens/living-map-growing-buyers.webp',
    png: 'assets/screens/living-map-growing-buyers.png',
    alt: 'Customer Segment Studio with Growing Buyers selected.',
    kicker: 'PORTFOLIO VIEW',
    title: 'See all nine groups at once.',
    copy: 'Start with the whole field: which group drives the most revenue, which group needs reactivation, and where a practical growth opportunity is emerging.',
    question: 'Where should we focus first?',
    visible: 'Customer mix, revenue share, and strategic priority.',
    why: 'A shared visual makes portfolio tradeoffs easier to discuss than another export or static table.'
  },
  group: {
    webp: 'assets/screens/living-map-dormant-vips.webp',
    png: 'assets/screens/living-map-dormant-vips.png',
    alt: 'Customer Segment Studio with Dormant VIPs selected.',
    kicker: 'SELECTED GROUP',
    title: 'Understand what makes this group different.',
    copy: 'Open a group and see its customer count, revenue share, revenue at stake, best channel, KPI, objective, messaging angle, and time horizon together.',
    question: 'Why should this group be treated differently?',
    visible: 'Value at stake, customer behavior, and the recommended treatment.',
    why: 'The segment label becomes useful only when the commercial context behind it is visible.'
  },
  move: {
    webp: 'assets/screens/living-map-occasional-buyers.webp',
    png: 'assets/screens/living-map-occasional-buyers.png',
    alt: 'Customer Segment Studio with Occasional Buyers selected.',
    kicker: 'NEXT MOVE',
    title: 'Turn the segment into an action.',
    copy: 'Every group ends with a practical objective and treatment. For Occasional Buyers, the current guidance is to test low-cost email before offering deeper discounts.',
    question: 'What should we do next?',
    visible: 'Objective, KPI, channel, action preview, messaging angle, and tactic.',
    why: 'Segmentation becomes operational when it changes the next action, not when it simply creates another label.'
  }
};

const experience = document.querySelector('[data-experience-gallery]');
if (experience) {
  const tabs = [...experience.querySelectorAll('[data-experience]')];
  const source = experience.querySelector('[data-experience-source]');
  const image = experience.querySelector('[data-experience-img]');
  const imageButton = experience.querySelector('[data-experience-image]');
  const fields = {
    kicker: experience.querySelector('[data-experience-kicker]'),
    title: experience.querySelector('[data-experience-title]'),
    copy: experience.querySelector('[data-experience-copy]'),
    question: experience.querySelector('[data-experience-question]'),
    visible: experience.querySelector('[data-experience-visible]'),
    why: experience.querySelector('[data-experience-why]')
  };

  const selectExperience = (key) => {
    const screen = experienceScreens[key];
    if (!screen) return;
    tabs.forEach((tab) => {
      const active = tab.dataset.experience === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    if (source) source.srcset = screen.webp;
    if (image) {
      image.src = screen.png;
      image.alt = screen.alt;
    }
    if (imageButton) {
      imageButton.dataset.lightboxSrc = screen.png;
      imageButton.dataset.lightboxAlt = screen.alt;
    }
    Object.entries(fields).forEach(([field, element]) => {
      if (element) element.textContent = screen[field];
    });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => selectExperience(tab.dataset.experience)));
}

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
document.querySelectorAll('[data-lightbox-src]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightboxSrc || '';
    lightboxImage.alt = button.dataset.lightboxAlt || '';
    lightbox.showModal();
  });
});
lightbox?.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
  revealElements.forEach((element) => observer.observe(element));
}
