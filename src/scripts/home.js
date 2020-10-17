let map = null;
let roleScreens = null;
let roleScreensYPos = null;

const registerEmailCopier = function () {
	const copier = document.getElementById("email-copier");
	const anchor = copier.querySelector("a");
	const address =
		anchor.getAttribute("data-user") +
		"@" +
		anchor.getAttribute("data-host") +
		"." +
		anchor.getAttribute("data-tld");

	copier.addEventListener("click", function () {
		navigator.clipboard.writeText(address);
		copier.classList.add("-copied");
	});
};

const getDistanceFromTop = function (element) {
	let y = 0;

	while (element) {
		y += element.offsetTop - element.scrollTop + element.clientTop;
		element = element.offsetParent;
	}

	return y;
};

const onLoad = function () {
	const mapElement = document.getElementById("home-map");
	map = mapElement;

	const roleScreenContainers = document.getElementsByClassName("home-role-images-positioner");
	roleScreens = Array.from(roleScreenContainers).map(function (container) {
		return container.children[0];
	});
	// Safari calculates offsetTop for this element correctly, but Chrome assumes it from its parent (0). So, we have to loop through each of the parents to get the real distance from the top :(
	roleScreensYPos = getDistanceFromTop(roleScreens[0]);

	registerEmailCopier();
};

const MAP_SCREEN_BOTTOM_OFFSET_PERCENT = 0.2;
let mapEnhanced = false;
const performMapEnhancements = function (scrollPos, windowHeight) {
	// map gets animated and then nothing else happens
	if (mapEnhanced) return;

	// could use getBoundingClientRect, but offsetTop is quicker and this is easy so why not
	const isScrolledIntoView =
		scrollPos > map.offsetTop - windowHeight + windowHeight * MAP_SCREEN_BOTTOM_OFFSET_PERCENT;
	if (isScrolledIntoView) {
		mapEnhanced = true;
		map.classList.add("-animated");
	}
};

const ROLE_SCREENS_MAX_MOVEMENT = 0.08;
const performCurrentRoleEnhancements = function (scrollPos, windowHeight) {
	// this is when the boxes are starting to enter the viewport
	const startScrollPos = roleScreensYPos;
	// this is when the boxes have fully exited the viewport
	const endScrollPos = startScrollPos + roleScreens[0].offsetHeight + windowHeight;

	// calculate a percentage indicating the progress between the start and end of the viewport
	// e.g., when elements are perfectly centered, progress should be 0.5
	const progress = (scrollPos + windowHeight - startScrollPos) / (endScrollPos - startScrollPos);

	// if ROLE_SCREENS_MAX_MOVEMENT is 5, we want the transform to be +5 at the bottom of the viewport and -5 at the top of the viewport
	const transformAmount =
		-1 * ROLE_SCREENS_MAX_MOVEMENT + progress * (ROLE_SCREENS_MAX_MOVEMENT * 2);
	roleScreens[0].style.transform = "translateZ(0) translateY(" + 100 * transformAmount + "%)";
	roleScreens[1].style.transform = "translateZ(0) translateY(" + -100 * transformAmount + "%)";
};

const scrollListener = function (scrollPos) {
	const windowHeight = window.innerHeight;
	performMapEnhancements(scrollPos, windowHeight);
	performCurrentRoleEnhancements(scrollPos, windowHeight);
};

module.exports = {
	onLoad: onLoad,
	onScroll: scrollListener,
};
