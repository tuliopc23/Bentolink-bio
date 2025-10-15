// Theme controller for dark/light mode toggle

const isBrowser = typeof window !== 'undefined';

function initThemeToggle() {
  if (!isBrowser) return;

  const toggleButton = document.querySelector('[data-theme-toggle]');
  if (!toggleButton) return;

  toggleButton.addEventListener('click', () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Update theme
    root.setAttribute('data-theme', newTheme);
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);

    // Persist to localStorage
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }

    // Add transition class
    root.classList.add('theme-transition');
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 400);
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}

// Re-initialize after Astro page transitions
document.addEventListener('astro:page-load', initThemeToggle);
