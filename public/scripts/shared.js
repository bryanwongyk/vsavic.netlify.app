// $ prefix to indicate it is a DOM element
// Toggle button
const   $BRAND                      = document.querySelector('.main-header__brand'),
        $BODY                       = document.querySelector('body'),
        $LOGO                       = document.querySelector('#logo'),
        $LOGO_ALT                   = document.querySelector('#logo--alt'),
        $MAIN_HEADER                = document.querySelector('.main-header'),
        $MOBILE_NAV                 = document.querySelector('.mobile-nav'),
        $MOBILE_NAV_BG              = document.querySelector('.mobile-nav__background'),
        $MOBILE_NAV_ITEM            = document.querySelectorAll('.mobile-nav__item'),
        $MOBILE_NAV_ITEMS_LIST      = document.querySelector('.mobile-nav__items'),
        $MOBILE_NAV_SOCIAL_MEDIA    = document.querySelector('#mobile-nav__social-media'),
        $TOGGLE_BTN                 = document.querySelector('.toggle-button'),
        $TOGGLE_BTN_BARS            = document.querySelectorAll('.toggle-button__bar');

var toggleBtnClicked = false;

init();

function init() {
    // Initialise header mobile nav bar
    initToggleBtn();
    // Initialise footer copyright year
    let copyrightYear = document.querySelector('#copyright-year');
    let currentYear = new Date().getFullYear();
    copyrightYear.textContent = currentYear;
}

function isOnPage(html_file) {
    /**
     * isOnPage() returns whether or not the user is currently on a given html file (e.g. index.html)
    */

    // FOR INDEX PAGE: Reset the header as clicking the toggle button to open the mobile menu scrolls the user to the top of the current page, where the logo is different.
    let path = window.location.pathname;    // Returns the path of the file
    let page = path.split("/").pop();       // Splits path of file into an array of substrings where '/' is located, and pop last substring which is the name of the html file
    if (page === html_file) {
        return true;
    }
    return false;
}

function initToggleBtn() {
    /**
     * initToggleBtn initialises the on-click event listeners for the toggle button, which enables users to open or close a mobile menu navigation bar.
     */
    $TOGGLE_BTN.addEventListener('click', () => {
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
    
}

function openMobileMenu() {
    /**
     * openMobileMenu reveals the mobile navigation bar containing hyperlinks to other web-pages.
    */
   
    let timeOutDelay = 100;

    // Change the display of $MOBILE_NAV from 'none' to 'flex'.
    $MOBILE_NAV.classList.add('mobile-nav__open');

    /* 
    Hide the brand and make it unclickable.
    By setting the opacity of the brand to '0' and removing hover events, rather than setting its display to 'none', the position of the toggle button can still be 
    maintained in the header flexbox container in relation to the brand.
    */
    $BRAND.classList.add('hidden');
    $BRAND.classList.add('unclickable');

    // Execute transition in of menu background AFTER the mobile-nav's display is changed from 'none' (otherwise it will not execute).
    setTimeout(() => {
        $MOBILE_NAV_BG.classList.add('mobile-nav__background--open');  

        if (isOnPage('index.html')) {
            resetHeader();
        }
        // Trigger transition in of menu items.
        $MOBILE_NAV_ITEMS_LIST.classList.add('mobile-nav__items--reveal');
        $MOBILE_NAV_SOCIAL_MEDIA.classList.add('mobile-nav__items--reveal');
    }, timeOutDelay);

    // To prevent scrolling on the body while the mobile menu is open. This will also cause the page to automatically scroll to the top.
    $BODY.style.position = 'fixed';
}

function resetHeader() {
    /**
     * Resets the colours and state of the header and its elements as it was at the top of the page.
     */

    // Turn header background transparent
    $MAIN_HEADER.classList.add('main-header--transparent');
    $MAIN_HEADER.classList.remove('header__element--white');
    // Add alternate (white) logo
    $LOGO_ALT.classList.remove('brand-alt-hover--disable');
    $LOGO_ALT.classList.add('image_on');
    $LOGO.classList.remove('brand-hover--disable');
    $LOGO.classList.add('image_off');
}

function closeMobileMenu() {
    /**
     * closeMobileMenu hides the mobile navigation bar.
    */

    let timeOutDelay = 500;
   
    // Execute transition that hides the links.
    $MOBILE_NAV_ITEMS_LIST.classList.remove('mobile-nav__items--reveal');
    $MOBILE_NAV_SOCIAL_MEDIA.classList.remove('mobile-nav__items--reveal');

    // Execute transition that hides the mobile menu background.
    $MOBILE_NAV_BG.classList.remove('mobile-nav__background--open');

    // AFTER the transitions are done
    setTimeout(() => {
        // Set display of the mobile nav-bar menu to 'none'
        $MOBILE_NAV.classList.remove('mobile-nav__open');
    }, timeOutDelay);

    // Make brand clickable again.
    $BRAND.classList.remove('hidden');
    $BRAND.classList.remove('unclickable');

    // Make body scroll-able again.
    $BODY.style.position = 'static';
}

function openToggleAnimation() {
    /**
     * openToggleAnimation executes animation of toggle button menu hamburger turning into 'x' exit button.
     */
    for (let i=0; i<$TOGGLE_BTN_BARS.length; i++) {
        $TOGGLE_BTN_BARS[i].classList.add('header__element--grey');
        $TOGGLE_BTN_BARS[i].classList.remove('header__element--white');
        $TOGGLE_BTN_BARS[i].classList.add(`toggle-button__bar-${i+1}--clicked`);
    }
}

function closeToggleAnimation() {
    /**
     * closeToggleAnimation executes animation of 'x' exit button turning into toggle button menu hamburger.
     */

    let timeOutDelay = 500;

    // Change toggle buttons back to white only if on index page.
    for (let i=0; i<$TOGGLE_BTN_BARS.length; i++) {
        if (isOnPage('index.html')) {
            $TOGGLE_BTN_BARS[i].classList.remove('header__element--grey');   
            $TOGGLE_BTN_BARS[i].classList.add('header__element--white');
        }
        $TOGGLE_BTN_BARS[i].classList.remove(`toggle-button__bar-${i+1}--clicked`);
        $TOGGLE_BTN_BARS[i].classList.add(`toggle-button__bar-${i+1}--clicked-off`);
    }

    // Remove animation classes after animations are complete
    setTimeout(() => {
        for (let i=0; i<$TOGGLE_BTN_BARS.length; i++) {
            $TOGGLE_BTN_BARS[i].classList.remove(`toggle-button__bar-${i+1}--clicked-off`);
        }
    }, timeOutDelay)
}