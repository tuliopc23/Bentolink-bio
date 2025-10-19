// Motion system for scroll-reveal animations

const isBrowser = typeof window !== 'undefined';
let cleanupScrollProgress: (() => void) | null = null;

function initScrollReveal() {
  if (!isBrowser) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Skip animations for users who prefer reduced motion
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Intersection Observer for scroll reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after reveal
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-reveal attribute
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach((el) => {
    observer.observe(el);
  });
}


function initScrollProgressObserver() {
  if (!isBrowser) return;

  if (cleanupScrollProgress) {
    cleanupScrollProgress();
    cleanupScrollProgress = null;
  }

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    root.style.setProperty('--scroll-progress', '0');
    return;
  }

  let ticking = false;

  const updateProgress = () => {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    root.style.setProperty('--scroll-progress', progress.toFixed(3));
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  updateProgress();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanupScrollProgress = () => window.removeEventListener('scroll', onScroll);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initScrollProgressObserver();
  });
} else {
  initScrollReveal();
  initScrollProgressObserver();
}

// Re-initialize after Astro page transitions
document.addEventListener('astro:page-load', () => {
  initScrollReveal();
  initScrollProgressObserver();
});
