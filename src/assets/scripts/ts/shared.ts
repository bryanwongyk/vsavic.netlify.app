/**
 * Author: Bryan Wong
 * https://github.com/bryanwyk
 */

const $BODY: HTMLElement | null = document.querySelector('body'),
	$LOGO: HTMLElement | null = document.querySelector('#logo'),
	$LOGO_ALT: HTMLElement | null = document.querySelector('#logo--alt'),
	$MAIN_HEADER: HTMLElement | null = document.querySelector('.main-header'),
	$MOBILE_NAV: HTMLElement | null = document.querySelector('.mobile-nav'),
	$MOBILE_NAV_BG: HTMLElement | null = document.querySelector('.mobile-nav__background'),
	$MOBILE_NAV_ITEMS_LIST: HTMLElement | null = document.querySelector('.mobile-nav__items'),
	$MOBILE_NAV_SOCIAL_MEDIA: HTMLElement | null = document.querySelector('#mobile-nav__social-media'),
	$TOGGLE_BTN: HTMLElement | null = document.querySelector('.toggle-button'),
	$TOGGLE_BTN_BARS: NodeList = document.querySelectorAll('.toggle-button__bar'),
	$COPYRIGHT_YEAR: HTMLElement | null = document.querySelector('#copyright-year');
let toggleBtnClicked = false;

/**
 * initSharedElements initialises elements shared in all pages (e.g. header and footer).
 */
const initSharedElements = (): void => {
	// Initialise header mobile nav bar
	initToggleBtn();
	// Initialise footer copyright year
	let currentYear = new Date().getFullYear();
	$COPYRIGHT_YEAR!.textContent = currentYear.toString();
};

/**
 * initToggleBtn initialises the on-click event listeners for the toggle button, which enables users to open or close a mobile menu navigation bar.
 */
const initToggleBtn = (): void => {
	$TOGGLE_BTN!.addEventListener('click', () => {
		// If the toggle button is clicked to open the mobile menu
		if (!toggleBtnClicked) {
			openMobileMenu();
			openToggleAnimation();
			toggleBtnClicked = true;
		}
		// If the toggle button is clicked to close the mobile menu
		else {
			closeMobileMenu();
			closeToggleAnimation();
			toggleBtnClicked = false;
		}
	});
};

/**
 * openMobileMenu reveals the mobile navigation bar containing hyperlinks to other web-pages.
 */
const openMobileMenu = (): void => {
	let timeOutDelay = 100;

	// Make the nav bar visible by adding class 'mobile-nav__open'
	$MOBILE_NAV!.classList.add('mobile-nav__open');

	// Execute transition in of menu background AFTER the mobile-nav's display is changed from 'none' (otherwise it will not execute).
	setTimeout(() => {
		$MOBILE_NAV_BG!.classList.add('mobile-nav__background--open');
		if (location.pathname == '/') {
			// Replace alternate logo with original logo that does not have hover effects.
			$LOGO_ALT!.classList.remove('image_on');
			$LOGO_ALT!.classList.add('brand-alt-hover--disable');
			$LOGO!.classList.remove('image_off');
			$LOGO!.classList.add('brand-hover--disable');
		}

		// Trigger transition in of menu items.
		$MOBILE_NAV_ITEMS_LIST!.classList.add('mobile-nav__items--reveal');
		$MOBILE_NAV_SOCIAL_MEDIA!.classList.add('mobile-nav__items--reveal');
	}, timeOutDelay);

	// To prevent scrolling on the body while the mobile menu is open. This will also cause the page to automatically scroll to the top.
	$BODY!.style.position = 'fixed';
};

/**
 * Resets the colours and state of the header and its elements as it was at the top of the page.
 */
const resetHeader = (): void => {
	// Turn header background transparent
	$MAIN_HEADER!.classList.add('main-header--transparent');
	$MAIN_HEADER!.classList.remove('header__element--white');
	// Add alternate (white) logo
	$LOGO_ALT!.classList.remove('brand-alt-hover--disable');
	$LOGO_ALT!.classList.add('image_on');
	$LOGO!.classList.remove('brand-hover--disable');
	$LOGO!.classList.add('image_off');
};

/**
 * closeMobileMenu hides the mobile navigation bar.
 */
const closeMobileMenu = (): void => {
	let timeOutDelay = 500;

	// Execute transition that hides the links.
	$MOBILE_NAV_ITEMS_LIST!.classList.remove('mobile-nav__items--reveal');
	$MOBILE_NAV_SOCIAL_MEDIA!.classList.remove('mobile-nav__items--reveal');

	// Execute transition that hides the mobile menu background.
	$MOBILE_NAV_BG!.classList.remove('mobile-nav__background--open');

	// If we are on index.html page, reset the header
	if (location.pathname == '/') {
		resetHeader();
	}

	// AFTER the transitions are done, remove the mobile menu
	setTimeout(() => {
		// Set display of the mobile nav-bar menu to 'none'
		$MOBILE_NAV!.classList.remove('mobile-nav__open');
	}, timeOutDelay);

	// Make body scroll-able again.
	$BODY!.style.position = 'static';
};

/**
 * openToggleAnimation executes animation of toggle button menu hamburger turning into 'x' exit button.
 */
const openToggleAnimation = (): void => {
	for (let i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
		let toggleBtnBar = $TOGGLE_BTN_BARS![i] as HTMLElement;
		toggleBtnBar.classList.add('header__element--grey');
		toggleBtnBar.classList.remove('header__element--white');
		toggleBtnBar.classList.add(`toggle-button__bar-${i + 1}--clicked`);
	}
};

/**
 * closeToggleAnimation executes animation of 'x' exit button turning into toggle button menu hamburger.
 */
const closeToggleAnimation = (): void => {
	let timeOutDelay = 500;

	// Change toggle buttons back to white only if on index page.
	for (let i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
		let toggleBtnBar = $TOGGLE_BTN_BARS![i] as HTMLElement;
		if (location.pathname == '/') {
			toggleBtnBar.classList.remove('header__element--grey');
			toggleBtnBar.classList.add('header__element--white');
		}
		toggleBtnBar.classList.remove(`toggle-button__bar-${i + 1}--clicked`);
		toggleBtnBar.classList.add(`toggle-button__bar-${i + 1}--clicked-off`);
	}

	// Remove animation classes after animations are complete
	setTimeout(() => {
		for (let i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
			let toggleBtnBar = $TOGGLE_BTN_BARS![i] as HTMLElement;
			toggleBtnBar.classList.remove(`toggle-button__bar-${i + 1}--clicked-off`);
		}
	}, timeOutDelay);
};

// Remove mobile nav menu if window resized to bigger than mobile view
window.addEventListener('resize', function () {
	if (window.innerWidth > 750) {
		closeMobileMenu();
		closeToggleAnimation();
		toggleBtnClicked = false;
	}
});

// Used in index.ts
export { toggleBtnClicked, $MAIN_HEADER, $LOGO_ALT, $LOGO, $TOGGLE_BTN_BARS };

initSharedElements();
