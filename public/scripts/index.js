// Scroll animations

const   $CHAP_LEFT                  = document.querySelectorAll('.chapters__item--left'),
        $CHAP_RIGHT                 = document.querySelectorAll('.chapters__item--right'),
        $CHAP_HEADER                = document.querySelector('.chapters__header'),
        $CTA_ARROW                  = document.querySelector('.scroll-cta__arrow'),
        $CTA_BUTTON                 = document.querySelector('.scroll-cta__button'),
        $HERO_SECTION               = document.querySelector('.hero-section'),
        $HERO_TEXT                  = document.querySelector('.hero-section__text'),
        $INTRO                      = document.querySelector('.presentation-section__intro'),
        $LATEST_EVENTS              = document.querySelector('.presentation-section__latest-events'),
        $SLIDESHOW_SLIDES           = document.querySelectorAll('.slideshow__slide'),
        $SLIDESHOW_TABS              = document.querySelectorAll('.slideshow__tab'),
        SCROLL_Y_BREAKPOINTS        = [130, 500, 620, 775, 840, 1060, 1280, 1440];
        
var heroHidden = false;
var slideIndex = 0; // Index corresponds to the current slide being displayed in the hero section.

initIndex();

function initIndex(){
    // Initialise index page content scroll animaion
    window.onscroll = () => {
        initOnScrollContentAnimations();
        initOnScrollHeaderAnimations();
    };
    initHeaderSlideshow();
}

function initHeaderSlideshow() {
    // Add event listeners to slide tabs to make them clickable
    for (let i=0; i<$SLIDESHOW_TABS.length; i++) {
        $SLIDESHOW_TABS[i].addEventListener('click', () => {
            // Set the slide index to the slide that has been clicked on.
            slideIndex = i;
            // Initially remove all slides from display
            for (let j=0; j<$SLIDESHOW_SLIDES.length; j++) {
                $SLIDESHOW_SLIDES[j].style.display = "none";
                $SLIDESHOW_TABS[j].classList.remove('slideshow__tab--active');
            }
            // Display the slide image corresponding to the clicked tab.
            $SLIDESHOW_SLIDES[slideIndex].style.display = "block";
            $SLIDESHOW_TABS[slideIndex].classList.add('slideshow__tab--active');
            slideIndex ++;

            // Reset the interval timer
            clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                if (slideIndex === $SLIDESHOW_SLIDES.length) {
                    slideIndex = 0;
                }
                for (let i=0; i<$SLIDESHOW_SLIDES.length; i++) {
                    $SLIDESHOW_SLIDES[i].style.display = "none";
                    $SLIDESHOW_TABS[i].classList.remove('slideshow__tab--active');
                }
                $SLIDESHOW_SLIDES[slideIndex].style.display = "block";
                $SLIDESHOW_TABS[slideIndex].classList.add('slideshow__tab--active');
                slideIndex ++;
            }, 3000);
        });
    }

    // Play initial slide first, and make its tab active.
    $SLIDESHOW_SLIDES[slideIndex].style.display = "block";
    $SLIDESHOW_TABS[slideIndex].classList.add('slideshow__tab--active');
    slideIndex ++;

    // Every interval, display the next slide, and make its respective tab active.
    var slideTimer = setInterval(() => {
        if (slideIndex === $SLIDESHOW_SLIDES.length) {
            slideIndex = 0;
        }
        for (let i=0; i<$SLIDESHOW_SLIDES.length; i++) {
            $SLIDESHOW_SLIDES[i].style.display = "none";
            $SLIDESHOW_TABS[i].classList.remove('slideshow__tab--active');
        }
        $SLIDESHOW_SLIDES[slideIndex].style.display = "block";
        $SLIDESHOW_TABS[slideIndex].classList.add('slideshow__tab--active');
        slideIndex ++;
    }, 3000);
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
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[1]) {
        $CTA_ARROW.style.opacity = 0;
        $CTA_BUTTON.style.opacity = (1-(window.scrollY/700));
        $CHAP_HEADER.classList.add('fade-reveal');
        heroHidden = true;
    } else {
        // As the user scrolls back to before this breakpoint, these elements should return to their initial state.
        $CTA_ARROW.style.opacity = 1;
        $CTA_BUTTON.style.opacity = 1;
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
        $HERO_SECTION.style.opacity = 0;
        $HERO_SECTION.style.pointerEvents = 'none';
    } else {
        $HERO_SECTION.style.opacity = 1;
        $HERO_SECTION.style.pointerEvents = 'auto';
    }
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[4]) {
        $CHAP_RIGHT[0].classList.add('slide-in');
    }
    /*
        As the user scrolls past the 5th breakpoint:
            - The third chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[5]) {
        $CHAP_LEFT[1].classList.add('slide-in');
    }
        /*
        As the user scrolls past the 6th breakpoint:
            - The fourth chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
   if (window.scrollY > SCROLL_Y_BREAKPOINTS[6]) {
        $CHAP_RIGHT[1].classList.add('slide-in');
    }
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[7]) {
        $LATEST_EVENTS.classList.add('fade-reveal');
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