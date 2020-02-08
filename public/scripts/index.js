// Scroll animations

const   $CHAP_LEFT                  = document.querySelectorAll('.chapters__item--left'),
        $CHAP_RIGHT                 = document.querySelector('.chapters__item--right'),
        $CHAP_HEADER                = document.querySelector('.chapters__header'),
        $CTA_ARROW                  = document.querySelector('.scroll-cta__arrow'),
        $CTA_BUTTON                 = document.querySelector('.scroll-cta__button'),
        $HERO_IMAGE                 = document.querySelector('.hero-section__image'),
        $HERO_TEXT                  = document.querySelector('.hero-section__text'),
        $INTRO                      = document.querySelector('.presentation-section__intro'),
        SCROLL_Y_BREAKPOINTS        = [130, 500, 680, 950, 1190];
        
var heroHidden = false;

initIndex();

function initIndex(){
    // Initialise index page content scroll animaion
    window.onscroll = () => {
        initOnScrollContentAnimations();
        initOnScrollHeaderAnimations();
    };
}

function initOnScrollContentAnimations() {
    /**
     * initOnScrollContentAnimations initialises animations of DOM elements in the contents of <main> that are to occur as the user scrolls vertically (y-axis) on the web-page.
    */

    /*
    As the user scrolls past the 1st breakpoint:
        - The hero text should fade out.
        - The intro-section text should fade in.
    As the user scrolls back to before this breakpoint, elements should return to their initial state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[0]) {
        $HERO_TEXT.style.opacity = (1-(window.scrollY/250));

        $INTRO.classList.remove('fade-hide');
        $INTRO.classList.add('fade-reveal');
    } else {
        $HERO_TEXT.style.opacity = 1;
    }

    /*
    As the user scrolls past the 2nd breakpoint:
        - The call to action button in the hero section should fade out.
        - The hero image should fade out.
        - The chapter section text should fade in.
    As the user scrolls back to before this breakpoint, elements should return to their initial state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[1]) {
        $CTA_ARROW.style.opacity = 0;
        $CTA_BUTTON.style.opacity = (1-(window.scrollY/700));
        $HERO_IMAGE.style.opacity = (1-(window.scrollY/700));
        $CHAP_HEADER.classList.remove('fade-hide');
        $CHAP_HEADER.classList.add('fade-reveal');
        heroHidden = true;
    } else {
        $CTA_ARROW.style.opacity = 1;
        $CTA_BUTTON.style.opacity = 1;
        $HERO_IMAGE.style.opacity = 1;
        heroHidden = false;
    }

    /*
        As the user scrolls past the 3rd breakpoint:
            - The first chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[2]) {
        $CHAP_LEFT[0].classList.add('slide-in');
    }
    /*
        As the user scrolls past the 4th breakpoint:
            - The second chapter should slide in from the right.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[3]) {
        $CHAP_RIGHT.classList.add('slide-in');
    }
    /*
        As the user scrolls past the 5th breakpoint:
            - The third chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[4]) {
        $CHAP_LEFT[1].classList.add('slide-in');

    }
}


function initOnScrollHeaderAnimations() {
    /**
     * initOnScrollHeaderAnimations initialises animations of the header DOM elements that are to occur as the user scrolls vertically (y-axis) on the web-page.
     * When the user scrolls past the hero section, the brand should change to the original (from the alternate) logo, and the toggle button should change from white to grey.
     * As the user scrolls back to the hero section, the brand and toggle button should revert to their initial states.
    */

    // If the hero section is hidden (i.e. has been scrolled past)
    // Note: toggleBtnClicked is a variable being accessed from shared.js, therefore shared.js must be loaded on the webpage first before this file.
    if (heroHidden && !toggleBtnClicked) {
        // Turn header background white
        $MAIN_HEADER.classList.remove('main-header--transparent');
        $MAIN_HEADER.classList.add('header__element--white');
        // Replace alternate logo with original logo that does not have hover effects.
        $LOGO_ALT.classList.remove('image_on');
        $LOGO_ALT.classList.add('brand-alt-hover--disable');
        $LOGO.classList.remove('image_off');
        $LOGO.classList.add('brand-hover--disable');
        // Make toggle button bars grey
        $TOGGLE_BTN_BARS.forEach((bar) => {
            bar.classList.remove('header__element--white');
            bar.classList.add('header__element--grey');
        });


    }
    // If the hero section is not hidden
    if (!heroHidden && !toggleBtnClicked) {
        // Turn header background transparent
        $MAIN_HEADER.classList.remove('header__element--white');
        $MAIN_HEADER.classList.add('main-header--transparent');
        // Replace original logo with alternate (white-only) logo that has hover effects.
        $LOGO.classList.remove('brand-hover--disable');
        $LOGO.classList.add('image_off');
        $LOGO_ALT.classList.remove('brand-alt-hover--disable');
        $LOGO_ALT.classList.add('image_on');
        // Make toggle button bars white
        $TOGGLE_BTN_BARS.forEach((bar) => {
            bar.classList.remove('header__element--grey');
            bar.classList.add('header__element--white');
        });
    }
}