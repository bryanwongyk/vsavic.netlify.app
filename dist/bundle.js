/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared.ts":
/*!***********************!*\
  !*** ./src/shared.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleBtnClicked": () => (/* binding */ toggleBtnClicked),
/* harmony export */   "$MAIN_HEADER": () => (/* binding */ $MAIN_HEADER),
/* harmony export */   "$LOGO_ALT": () => (/* binding */ $LOGO_ALT),
/* harmony export */   "$LOGO": () => (/* binding */ $LOGO),
/* harmony export */   "$TOGGLE_BTN_BARS": () => (/* binding */ $TOGGLE_BTN_BARS)
/* harmony export */ });
/**
 * Author: Bryan Wong
 * https://github.com/bryanwyk
 */
var $BODY = document.querySelector('body'), $LOGO = document.querySelector('#logo'), $LOGO_ALT = document.querySelector('#logo--alt'), $MAIN_HEADER = document.querySelector('.main-header'), $MOBILE_NAV = document.querySelector('.mobile-nav'), $MOBILE_NAV_BG = document.querySelector('.mobile-nav__background'), $MOBILE_NAV_ITEMS_LIST = document.querySelector('.mobile-nav__items'), $MOBILE_NAV_SOCIAL_MEDIA = document.querySelector('#mobile-nav__social-media'), $TOGGLE_BTN = document.querySelector('.toggle-button'), $TOGGLE_BTN_BARS = document.querySelectorAll('.toggle-button__bar'), $COPYRIGHT_YEAR = document.querySelector('#copyright-year');
var toggleBtnClicked = false;
/**
 * initSharedElements initialises elements shared in all pages (e.g. header and footer).
 */
var initSharedElements = function () {
    // Initialise header mobile nav bar
    initToggleBtn();
    // Initialise footer copyright year
    var currentYear = new Date().getFullYear();
    $COPYRIGHT_YEAR.textContent = currentYear.toString();
};
/**
 * isOnPage returns whether or not the user is currently on a given html file (e.g. index.html)
 * @arg HTMLFileNameString - the name of the file as a string
 * @return true - the user is on the given page
 * @return false - the user is not on the given page
*/
var isOnPage = function (HTMLFileNameString) {
    var path = window.location.pathname; // Returns the path of the file
    var page = path.split("/").pop(); // Splits path of file into an array of substrings where '/' is located, and pop last substring which is the name of the html file
    if (page === HTMLFileNameString) {
        return true;
    }
    return false;
};
/**
 * initToggleBtn initialises the on-click event listeners for the toggle button, which enables users to open or close a mobile menu navigation bar.
 */
var initToggleBtn = function () {
    $TOGGLE_BTN.addEventListener('click', function () {
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
var openMobileMenu = function () {
    var timeOutDelay = 100;
    // Make the nav bar visible by adding class 'mobile-nav__open'
    $MOBILE_NAV.classList.add('mobile-nav__open');
    // Execute transition in of menu background AFTER the mobile-nav's display is changed from 'none' (otherwise it will not execute).
    setTimeout(function () {
        $MOBILE_NAV_BG.classList.add('mobile-nav__background--open');
        if (isOnPage('index.html')) {
            // Replace alternate logo with original logo that does not have hover effects.
            $LOGO_ALT.classList.remove('image_on');
            $LOGO_ALT.classList.add('brand-alt-hover--disable');
            $LOGO.classList.remove('image_off');
            $LOGO.classList.add('brand-hover--disable');
        }
        // Trigger transition in of menu items.
        $MOBILE_NAV_ITEMS_LIST.classList.add('mobile-nav__items--reveal');
        $MOBILE_NAV_SOCIAL_MEDIA.classList.add('mobile-nav__items--reveal');
    }, timeOutDelay);
    // To prevent scrolling on the body while the mobile menu is open. This will also cause the page to automatically scroll to the top.
    $BODY.style.position = 'fixed';
};
/**
 * Resets the colours and state of the header and its elements as it was at the top of the page.
 */
var resetHeader = function () {
    // Turn header background transparent
    $MAIN_HEADER.classList.add('main-header--transparent');
    $MAIN_HEADER.classList.remove('header__element--white');
    // Add alternate (white) logo
    $LOGO_ALT.classList.remove('brand-alt-hover--disable');
    $LOGO_ALT.classList.add('image_on');
    $LOGO.classList.remove('brand-hover--disable');
    $LOGO.classList.add('image_off');
};
/**
 * closeMobileMenu hides the mobile navigation bar.
*/
var closeMobileMenu = function () {
    var timeOutDelay = 500;
    // Execute transition that hides the links.
    $MOBILE_NAV_ITEMS_LIST.classList.remove('mobile-nav__items--reveal');
    $MOBILE_NAV_SOCIAL_MEDIA.classList.remove('mobile-nav__items--reveal');
    // Execute transition that hides the mobile menu background.
    $MOBILE_NAV_BG.classList.remove('mobile-nav__background--open');
    // If we are on index.html page, reset the header
    if (isOnPage('index.html')) {
        resetHeader();
    }
    // AFTER the transitions are done, remove the mobile menu
    setTimeout(function () {
        // Set display of the mobile nav-bar menu to 'none'
        $MOBILE_NAV.classList.remove('mobile-nav__open');
    }, timeOutDelay);
    // Make body scroll-able again.
    $BODY.style.position = 'static';
};
/**
 * openToggleAnimation executes animation of toggle button menu hamburger turning into 'x' exit button.
 */
var openToggleAnimation = function () {
    for (var i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
        var toggleBtnBar = $TOGGLE_BTN_BARS[i];
        toggleBtnBar.classList.add('header__element--grey');
        toggleBtnBar.classList.remove('header__element--white');
        toggleBtnBar.classList.add("toggle-button__bar-" + (i + 1) + "--clicked");
    }
};
/**
 * closeToggleAnimation executes animation of 'x' exit button turning into toggle button menu hamburger.
 */
var closeToggleAnimation = function () {
    var timeOutDelay = 500;
    // Change toggle buttons back to white only if on index page.
    for (var i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
        var toggleBtnBar = $TOGGLE_BTN_BARS[i];
        if (isOnPage('index.html')) {
            toggleBtnBar.classList.remove('header__element--grey');
            toggleBtnBar.classList.add('header__element--white');
        }
        toggleBtnBar.classList.remove("toggle-button__bar-" + (i + 1) + "--clicked");
        toggleBtnBar.classList.add("toggle-button__bar-" + (i + 1) + "--clicked-off");
    }
    // Remove animation classes after animations are complete
    setTimeout(function () {
        for (var i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
            var toggleBtnBar = $TOGGLE_BTN_BARS[i];
            toggleBtnBar.classList.remove("toggle-button__bar-" + (i + 1) + "--clicked-off");
        }
    }, timeOutDelay);
};
// Remove mobile nav menu if window resized to bigger than mobile view
window.addEventListener("resize", function () {
    if (window.innerWidth > 750) {
        closeMobileMenu();
        closeToggleAnimation();
        toggleBtnClicked = false;
    }
});
// Used in index.ts

initSharedElements();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared */ "./src/shared.ts");
/**
 * Author: Bryan Wong
 * https://github.com/bryanwyk
 */

var $CHAP_ITEMS = document.querySelector('.chapters__items'), $CHAP_LEFT = document.querySelectorAll('.chapters__item--left'), $CHAP_RIGHT = document.querySelectorAll('.chapters__item--right'), $CHAP_HEADER = document.querySelector('.chapters__header'), $CTA_ARROW = document.querySelector('.scroll-cta__arrow'), $CTA_BUTTON = document.querySelector('.scroll-cta__button'), $HERO_SECTION = document.querySelector('.hero-section'), $HERO_TEXT = document.querySelector('.hero-section__text'), $INTRO = document.querySelector('.presentation-section__intro'), $LATEST_EVENTS = document.querySelector('.presentation-section__latest-events'), $MAIN_NAV_ITEMS = document.querySelectorAll('.main-nav__item-text'), $SLIDESHOW_SLIDES = document.querySelectorAll('.slideshow__slide'), $SLIDESHOW_TABS = document.querySelectorAll('.slideshow__tab');
var SCROLL_Y_BREAKPOINTS = [130, 480, 620, 775, 840, 1060, 1280, 1450];
if (window.matchMedia("(min-width: 750px)").matches) {
    SCROLL_Y_BREAKPOINTS[7] = 820;
}
var heroHidden = false;
var displayedSlideIndex = 0; // Index corresponds to the current slide being displayed in the hero section.
var slideTimerID;
;
/**
 * initIndex calls the methods that initialise scroll animations and the hero slideshow.
 */
var initIndex = function () {
    window.onscroll = function () {
        initOnScrollContentAnimations();
        initOnScrollHeaderAnimations();
    };
    initHeroSlideshow();
};
/**
 * initHeroSlideshow initialises the hero slideshow and sets the relevant event listeners to the slideshow tabs.
 */
var initHeroSlideshow = function () {
    var _loop_1 = function (i) {
        $SLIDESHOW_TABS[i].addEventListener('click', function () {
            // Set the slide index to the slide that has been clicked on.
            displayedSlideIndex = i;
            // Initially remove all slides from display
            for (var j = 0; j < $SLIDESHOW_SLIDES.length; j++) {
                var slide = $SLIDESHOW_SLIDES[j];
                var slideTab = $SLIDESHOW_TABS[j];
                slide.style.opacity = '0';
                slideTab.classList.remove('slideshow__tab--active');
            }
            // Display the slide image corresponding to the clicked tab.
            var displayedSlide = $SLIDESHOW_SLIDES[displayedSlideIndex];
            var displayedSlideTab = $SLIDESHOW_TABS[displayedSlideIndex];
            displayedSlide.style.opacity = '1';
            displayedSlideTab.classList.add('slideshow__tab--active');
            // Reset the slide intervals so e.g. if we were previously on slide 3, and then click on slide 1, it does not 
            // then change the slide to 4
            resetSlideInterval();
        });
    };
    // Add event listeners to slide tabs to make them clickable
    for (var i = 0; i < $SLIDESHOW_TABS.length; i++) {
        _loop_1(i);
    }
    // Play initial slide first, and make its tab active.
    var displayedSlide = $SLIDESHOW_SLIDES[displayedSlideIndex];
    var displayedSlideTab = $SLIDESHOW_TABS[displayedSlideIndex];
    displayedSlide.style.opacity = '1';
    displayedSlideTab.classList.add('slideshow__tab--active');
    displayedSlideIndex++;
    resetSlideInterval();
};
/**
 *  resetSlideInterval resets the slide interval responsible for changing the slide displayed in the slideshow to
 *  the next.
 */
var resetSlideInterval = function () {
    // Reset the interval timer
    if (slideTimerID) {
        clearInterval(slideTimerID);
    }
    // Set the interval timer so that the next slide is shown
    slideTimerID = setInterval(function () {
        // If the displayed slide is the last one, set the first slide to be next to display
        if (displayedSlideIndex === $SLIDESHOW_SLIDES.length) {
            displayedSlideIndex = 0;
        }
        for (var i = 0; i < $SLIDESHOW_SLIDES.length; i++) {
            var slide = $SLIDESHOW_SLIDES[i];
            var slideTab = $SLIDESHOW_TABS[i];
            slide.style.opacity = '0';
            slideTab.classList.remove('slideshow__tab--active');
        }
        var displayedSlide = $SLIDESHOW_SLIDES[displayedSlideIndex];
        var displayedSlideTab = $SLIDESHOW_TABS[displayedSlideIndex];
        displayedSlide.style.opacity = '1';
        displayedSlideTab.classList.add('slideshow__tab--active');
        displayedSlideIndex++;
    }, 8000);
};
/**
 * initOnScrollContentAnimations initialises animations to occur on the contents of the page (excluding the header)
 * e.g. content to appear as the user scrolls down past a specific breakpoint.
 */
var initOnScrollContentAnimations = function () {
    /*
    As the user scrolls past the 1st breakpoint:
        - The hero text should fade out.
        - The intro-section text should fade in.
    As the user scrolls back to before this breakpoint, elements should return to their initial state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[0]) {
        $HERO_TEXT.style.opacity = (1 - (window.scrollY / 250)).toString();
        $CTA_ARROW.style.opacity = '0';
        $CTA_BUTTON.style.opacity = (1 - (window.scrollY / 700)).toString();
        $INTRO.classList.remove('fade-hide');
        $INTRO.classList.add('fade-reveal');
    }
    else {
        $HERO_TEXT.style.opacity = '1';
        $CTA_ARROW.style.opacity = '1';
        $CTA_BUTTON.style.opacity = '1';
    }
    /*
    As the user scrolls past the 2nd breakpoint:
        - The call to action button in the hero section should fade out.
        - The hero image should fade out.
        - The chapter section text should fade in.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[1]) {
        $CHAP_HEADER.classList.add('fade-reveal');
        heroHidden = true;
        if (window.matchMedia("(min-width: 750px").matches) {
            $CHAP_ITEMS.classList.add('fade-reveal');
        }
    }
    else {
        // As the user scrolls back to before this breakpoint, these elements should return to their initial state.
        heroHidden = false;
    }
    /*
        As the user scrolls past the 3rd breakpoint:
            - The first chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[2]) {
        var chapter = $CHAP_LEFT[0];
        chapter.classList.add('slide-in');
    }
    /*
        As the user scrolls past the 4th breakpoint:
            - The second chapter should slide in from the right.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[3]) {
        $HERO_SECTION.style.opacity = '0';
        $HERO_SECTION.style.pointerEvents = 'none';
    }
    else {
        $HERO_SECTION.style.opacity = '1';
        $HERO_SECTION.style.pointerEvents = 'auto';
    }
    /*
        As the user scrolls past
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[7]) {
        $LATEST_EVENTS.classList.add('fade-reveal');
    }
    if (window.matchMedia("(max-width: 750px)").matches) {
        if (window.scrollY > SCROLL_Y_BREAKPOINTS[4]) {
            var chapter = $CHAP_RIGHT[0];
            chapter.classList.add('slide-in');
        }
        /*
            As the user scrolls past the 5th breakpoint:
                - The third chapter should slide in from the left.
            As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
        */
        if (window.scrollY > SCROLL_Y_BREAKPOINTS[5]) {
            var chapter = $CHAP_LEFT[1];
            chapter.classList.add('slide-in');
        }
        /*
        As the user scrolls past the 6th breakpoint:
            - The fourth chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
        if (window.scrollY > SCROLL_Y_BREAKPOINTS[6]) {
            var chapter = $CHAP_RIGHT[1];
            chapter.classList.add('slide-in');
        }
    }
};
/**
 * initOnScrollHeaderAnimations initialises animations of the header DOM elements that are to occur as the user scrolls vertically (y-axis) on the web-page.
 * When the user scrolls past the hero section, the brand should change to the original (from the alternate) logo, and the toggle button should change from white to grey.
 * As the user scrolls back to the hero section, the brand and toggle button should revert to their initial states.
*/
var initOnScrollHeaderAnimations = function () {
    // If the hero section is hidden (i.e. has been scrolled past), and the user has NOT clicked the menu toggle button (i.e. mobile menu is not open)
    if (heroHidden && !_shared__WEBPACK_IMPORTED_MODULE_0__.toggleBtnClicked) {
        // Turn header background white
        _shared__WEBPACK_IMPORTED_MODULE_0__.$MAIN_HEADER.classList.remove('main-header--transparent');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$MAIN_HEADER.classList.add('header__element--white');
        // Replace alternate logo with original logo that does not have hover effects.
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO_ALT.classList.remove('image_on');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO_ALT.classList.add('brand-alt-hover--disable');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO.classList.remove('image_off');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO.classList.add('brand-hover--disable');
        // Make toggle button bars grey
        for (var i = 0; i < _shared__WEBPACK_IMPORTED_MODULE_0__.$TOGGLE_BTN_BARS.length; i++) {
            var bar = _shared__WEBPACK_IMPORTED_MODULE_0__.$TOGGLE_BTN_BARS[i];
            bar.classList.remove('header__element--white');
            bar.classList.add('header__element--grey');
        }
        ;
        // Make main nav words black
        for (var i = 0; i < $MAIN_NAV_ITEMS.length; i++) {
            var item = $MAIN_NAV_ITEMS[i];
            item.classList.remove('main-nav__item-text--alt');
            item.classList.add('main-nav__item-text--original');
        }
        ;
    }
    // If the hero section is NOT hidden (i.e. has been scrolled past), and the user has NOT clicked the menu toggle button (i.e. mobile menu is not open)
    if (!heroHidden && !_shared__WEBPACK_IMPORTED_MODULE_0__.toggleBtnClicked) {
        // Turn header background transparent
        _shared__WEBPACK_IMPORTED_MODULE_0__.$MAIN_HEADER.classList.remove('header__element--white');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$MAIN_HEADER.classList.add('main-header--transparent');
        // Replace original logo with alternate (white-only) logo that has hover effects.
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO.classList.remove('brand-hover--disable');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO.classList.add('image_off');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO_ALT.classList.remove('brand-alt-hover--disable');
        _shared__WEBPACK_IMPORTED_MODULE_0__.$LOGO_ALT.classList.add('image_on');
        // Make toggle button bars white
        for (var i = 0; i < _shared__WEBPACK_IMPORTED_MODULE_0__.$TOGGLE_BTN_BARS.length; i++) {
            var bar = _shared__WEBPACK_IMPORTED_MODULE_0__.$TOGGLE_BTN_BARS[i];
            bar.classList.remove('header__element--grey');
            bar.classList.add('header__element--white');
        }
        ;
        // Make main nav words white
        for (var i = 0; i < $MAIN_NAV_ITEMS.length; i++) {
            var item = $MAIN_NAV_ITEMS[i];
            item.classList.add('main-nav__item-text--alt');
            item.classList.remove('main-nav__item-text--original');
        }
        ;
    }
};
initIndex();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map