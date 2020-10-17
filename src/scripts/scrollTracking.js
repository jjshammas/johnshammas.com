const MAX_SCROLL_EVENTS_HERTZ = 15;

// Subscribes to window scroll events, but only calls your onScroll function a few times a second (regardless of how quickly you are scrolling)
module.exports = function (onScroll) {
	let currentScrollPos = 0;
	let timerID = null;

	const throttledScroll = function () {
		onScroll && onScroll(currentScrollPos);
		timerID = null;
	};

	// call onScroll once before hooking into the event to set any object positions
	onScroll(document.documentElement.scrollTop || 0);
	window.addEventListener("scroll", function () {
		currentScrollPos = document.documentElement.scrollTop;

		if (timerID) return;
		timerID = setTimeout(throttledScroll, 1000 / MAX_SCROLL_EVENTS_HERTZ);
	});
};
