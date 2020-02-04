// $ prefix to indicate it is a DOM element
// Toggle button
const   $TOGGLE_BTN                 = document.querySelector('.toggle-button'),
        $TOGGLE_BTN_BARS            = document.querySelectorAll('.toggle-button__bar'),
        $MENU_LABEL                 = document.querySelector('#menu__label'),
        $MOBILE_NAV                 = document.querySelector('.mobile-nav'),
        $MOBILE_NAV_BG              = document.querySelector('.mobile-nav__background'),
        $MOBILE_NAV_ITEMS           = document.querySelector('.mobile-nav__items'),
        $LOGO                       = document.querySelector('#logo'),
        $LOGO_ALT                   = document.querySelector('#logo--alt'),
        $MAIN_HEADER                = document.querySelector('.main-header'),
        $BRAND                      = document.querySelector('.brand'),
        $BODY                       = document.querySelector('body');
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
    $MOBILE_NAV.classList.remove('mobile-nav__hide');
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
        // Reset the header as clicking the toggle button to open the mobile menu scrolls the user to the top of the current page.
        resetHeader();
        // Trigger transition in of menu items.
        $MOBILE_NAV_ITEMS.classList.add('mobile-nav__items--reveal');
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
    $MOBILE_NAV_ITEMS.classList.remove('mobile-nav__items--reveal');
    $MOBILE_NAV_ITEMS.classList.add('mobile-nav__items--hide');

    // Execute transition that hides the mobile menu background.
    $MOBILE_NAV_BG.classList.add('mobile-nav__background--close');
    $MOBILE_NAV_BG.classList.remove('mobile-nav__background--open');

    // AFTER the transitions are done
    setTimeout(() => {
        // Set display of the mobile nav-bar menu to 'none'
        $MOBILE_NAV.classList.remove('mobile-nav__open');
        $MOBILE_NAV.classList.add('mobile-nav__hide');

        // Remove the classes added to animate the closure of the items and background.
        $MOBILE_NAV_ITEMS.classList.remove('mobile-nav__items--hide');
        $MOBILE_NAV_BG.classList.remove('mobile-nav__background--close');
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
    for (let i=0; i<3; i++) {
        $TOGGLE_BTN_BARS[i].classList.add('header__element--grey');
        $TOGGLE_BTN_BARS[i].classList.remove('header__element--white');
        $TOGGLE_BTN_BARS[i].classList.add(`toggle-button__bar-${i+1}--clicked`);
    }

    // Change label of toggle button to indicate it can be clicked on to close the mobile menu.
    $MENU_LABEL.textContent = "CLOSE";
}

function closeToggleAnimation() {
    /**
     * closeToggleAnimation executes animation of 'x' exit button turning into toggle button menu hamburger.
     */

    let timeOutDelay = 500;

    for (let i=0; i<3; i++) {
        $TOGGLE_BTN_BARS[i].classList.remove('header__element--grey');   
        $TOGGLE_BTN_BARS[i].classList.add('header__element--white');
        $TOGGLE_BTN_BARS[i].classList.remove(`toggle-button__bar-${i+1}--clicked`);
        $TOGGLE_BTN_BARS[i].classList.add(`toggle-button__bar-${i+1}--clicked-off`);
    }

    // Remove animation classes after animations are complete
    setTimeout(() => {
        for (let i=0; i<3; i++) {
            $TOGGLE_BTN_BARS[i].classList.remove(`toggle-button__bar-${i+1}--clicked-off`);
        }
    }, timeOutDelay)
    // Change label of toggle button to indicate it can be clicked on to open the mobile menu.
    $MENU_LABEL.textContent = "MENU";
}