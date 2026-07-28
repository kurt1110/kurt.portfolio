import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = '[data-reveal], [data-project-item], [data-hero-title]';

function resetRevealStyles() {
  gsap.set(REVEAL_SELECTOR, { clearProps: 'opacity,visibility,transform' });
}

/** Never leave sections stuck invisible after refresh / loader. */
function ensureVisible() {
  document.querySelectorAll('[data-reveal], [data-project-item]').forEach((el) => {
    const opacity = Number(getComputedStyle(el).opacity);
    if (opacity < 0.5) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'visibility' });
    }
  });
}

function revealInView() {
  document.querySelectorAll('[data-reveal], [data-project-item]').forEach((el) => {
    const rect = el.getBoundingClientRect();
    const nearViewport = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    if (nearViewport) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: true });
    }
  });
}

function initAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  resetRevealStyles();

  if (reducedMotion) return;

  const heroTitle = document.querySelector('[data-hero-title]');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const projectItems = document.querySelectorAll('[data-project-item]');

  if (heroTitle) {
    gsap.fromTo(
      heroTitle,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', overwrite: true },
    );
  }

  revealItems.forEach((item) => {
    gsap.fromTo(
      item,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: true,
        immediateRender: false,
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true,
        },
      },
    );
  });

  projectItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        delay: index * 0.04,
        ease: 'power2.out',
        overwrite: true,
        immediateRender: false,
        scrollTrigger: {
          trigger: item,
          start: 'top 92%',
          once: true,
        },
      },
    );
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    revealInView();
  });
}

function scheduleInit() {
  initAnimations();
  window.setTimeout(() => {
    ScrollTrigger.refresh();
    revealInView();
  }, 100);
  window.setTimeout(() => {
    ScrollTrigger.refresh();
    revealInView();
    ensureVisible();
  }, 1200);
}

document.addEventListener('astro:page-load', scheduleInit);
document.addEventListener('portfolio:loader-done', () => {
  resetRevealStyles();
  scheduleInit();
});
scheduleInit();
