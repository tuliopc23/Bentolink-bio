// Motion system utilities (instant reveal + scroll progress)

let cleanupScrollProgress: (() => void) | null = null;

function initScrollReveal() {
	if (typeof window === "undefined") return;

	const root = document.documentElement;
	root.classList.remove("motion-ready");

	const revealElements = document.querySelectorAll("[data-reveal]");
	revealElements.forEach((el) => {
		el.classList.add("is-visible");
	});
}

function initScrollProgressObserver() {
	if (typeof window === "undefined") return;

	if (cleanupScrollProgress) {
		cleanupScrollProgress();
		cleanupScrollProgress = null;
	}

	const root = document.documentElement;
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) {
		root.style.setProperty("--scroll-progress", "0");
		return;
	}

	let ticking = false;

	const updateProgress = () => {
		const max = root.scrollHeight - window.innerHeight;
		const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
		root.style.setProperty("--scroll-progress", progress.toFixed(3));
		ticking = false;
	};

	const onScroll = () => {
		if (!ticking) {
			window.requestAnimationFrame(updateProgress);
			ticking = true;
		}
	};

	updateProgress();
	window.addEventListener("scroll", onScroll, { passive: true });
	cleanupScrollProgress = () => window.removeEventListener("scroll", onScroll);
}

// Initialize on page load
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		initScrollReveal();
		initScrollProgressObserver();
	});
} else {
	initScrollReveal();
	initScrollProgressObserver();
}

// Re-initialize after Astro page transitions
document.addEventListener("astro:page-load", () => {
	initScrollReveal();
	initScrollProgressObserver();
});
