const scrollTracking = require("./scrollTracking");
const home = require("./home");

document.addEventListener("DOMContentLoaded", function (event) {
	home.onLoad();
	scrollTracking(function (scrollPos) {
		home.onScroll(scrollPos);
	});
});
