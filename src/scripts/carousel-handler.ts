/**
 * Mobile Carousel Keyboard Navigation Handler
 * Provides keyboard navigation for the mobile widget carousel
 * Only activates on mobile breakpoint (viewport width <= 767px)
 */

function isMobileViewport(): boolean {
	return window.innerWidth <= 767;
}

function initCarouselNavigation() {
	if (!isMobileViewport()) return;

	const carousel = document.querySelector(".widget-carousel") as HTMLElement;
	if (!carousel) return;

	const widgets = Array.from(carousel.querySelectorAll(".widget-box")) as HTMLElement[];
	if (widgets.length === 0) return;

	function scrollToWidget(index: number) {
		if (index < 0 || index >= widgets.length) return;

		const widget = widgets[index];
		widget.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	}

	function getCurrentWidgetIndex(): number {
		const carouselRect = carousel.getBoundingClientRect();
		const carouselCenter = carouselRect.left + carouselRect.width / 2;

		let closestIndex = 0;
		let closestDistance = Infinity;

		widgets.forEach((widget, index) => {
			const widgetRect = widget.getBoundingClientRect();
			const widgetCenter = widgetRect.left + widgetRect.width / 2;
			const distance = Math.abs(widgetCenter - carouselCenter);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		return closestIndex;
	}

	// Keyboard navigation
	document.addEventListener("keydown", (e: KeyboardEvent) => {
		if (!isMobileViewport()) return;

		const currentIndex = getCurrentWidgetIndex();

		switch (e.key) {
			case "ArrowLeft":
				e.preventDefault();
				scrollToWidget(currentIndex - 1);
				break;
			case "ArrowRight":
				e.preventDefault();
				scrollToWidget(currentIndex + 1);
				break;
			case "Home":
				e.preventDefault();
				scrollToWidget(0);
				break;
			case "End":
				e.preventDefault();
				scrollToWidget(widgets.length - 1);
				break;
		}
	});

	// Re-initialize on window resize
	let resizeTimeout: number;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = window.setTimeout(() => {
			// Re-check viewport and reinitialize if needed
			if (!isMobileViewport()) {
				// Clean up on desktop
				return;
			}
		}, 250);
	});
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initCarouselNavigation);
} else {
	initCarouselNavigation();
}

export { initCarouselNavigation };
