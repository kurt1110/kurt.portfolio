import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  if (reducedMotion) return;

  const heroTitle = document.querySelector('[data-hero-title]');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const projectItems = document.querySelectorAll('[data-project-item]');

  if (heroTitle) {
    gsap.from(heroTitle, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' });
  }

  revealItems.forEach((item) => {
    gsap.from(item, {
      y: 24,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 86%', once: true },
    });
  });

  projectItems.forEach((item, index) => {
    gsap.from(item, {
      y: 20,
      opacity: 0,
      duration: 0.55,
      delay: index * 0.04,
      ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 90%', once: true },
    });
  });

  ScrollTrigger.refresh();
}

document.addEventListener('astro:page-load', initAnimations);
initAnimations();
