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
    var page = path.split('/').pop(); // Splits path of file into an array of substrings where '/' is located, and pop last substring which is the name of the html file
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
//# sourceMappingURL=shared.js.map