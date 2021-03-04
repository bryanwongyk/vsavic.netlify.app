/**
 * Author: Bryan Wong
 * https://github.com/bryanwyk
 */

import { toggleBtnClicked, $MAIN_HEADER, $LOGO_ALT, $LOGO, $TOGGLE_BTN_BARS } from './shared.js'; 

const   $CHAP_ITEMS: (HTMLElement | null) = document.querySelector('.chapters__items'),
        $CHAP_LEFT: (NodeList | null) = document.querySelectorAll('.chapters__item--left'),
        $CHAP_RIGHT: (NodeList | null) = document.querySelectorAll('.chapters__item--right'),
        $CHAP_HEADER: (HTMLElement | null) = document.querySelector('.chapters__header'),
        $CTA_ARROW: (HTMLElement | null)= document.querySelector('.scroll-cta__arrow'),
        $CTA_BUTTON: (HTMLElement | null) = document.querySelector('.scroll-cta__button'),
        $HERO_SECTION: (HTMLElement | null) = document.querySelector('.hero-section'),
        $HERO_TEXT: (HTMLElement | null) = document.querySelector('.hero-section__text'),
        $INTRO: (HTMLElement | null) = document.querySelector('.presentation-section__intro'),
        $LATEST_EVENTS: (HTMLElement | null) = document.querySelector('.presentation-section__latest-events'),
        $MAIN_NAV_ITEMS: (NodeList | null) = document.querySelectorAll('.main-nav__item-text'),
        $SLIDESHOW_SLIDES: (NodeList | null) = document.querySelectorAll('.slideshow__slide'),
        $SLIDESHOW_TABS: (NodeList | null) = document.querySelectorAll('.slideshow__tab');
    
let SCROLL_Y_BREAKPOINTS: number[] = [130, 480, 620, 775, 840, 1060, 1280, 1450];

if (window.matchMedia("(min-width: 750px)").matches) {
    SCROLL_Y_BREAKPOINTS[7] = 820;
}
        
let heroHidden: boolean = false;
let displayedSlideIndex: number = 0; // Index corresponds to the current slide being displayed in the hero section.
let slideTimerID: ReturnType<typeof setTimeout>;;

/**
 * initIndex calls the methods that initialise scroll animations and the hero slideshow.
 */
const initIndex = (): void => {
    window.onscroll = () => {
        initOnScrollContentAnimations();
        initOnScrollHeaderAnimations();
    };
    initHeroSlideshow();
}

/**
 * initHeroSlideshow initialises the hero slideshow and sets the relevant event listeners to the slideshow tabs.
 */
const initHeroSlideshow = (): void => {
    // Add event listeners to slide tabs to make them clickable
    for (let i=0; i<$SLIDESHOW_TABS!.length; i++) {
        $SLIDESHOW_TABS![i].addEventListener('click', () => {
            // Set the slide index to the slide that has been clicked on.
            displayedSlideIndex = i;
            // Initially remove all slides from display
            for (let j=0; j<$SLIDESHOW_SLIDES!.length; j++) {
                let slide = $SLIDESHOW_SLIDES![j] as HTMLElement;
                let slideTab = $SLIDESHOW_TABS![j] as HTMLElement;
            
                slide.style.opacity = '0';
                slideTab.classList.remove('slideshow__tab--active');
            }
            // Display the slide image corresponding to the clicked tab.
            let displayedSlide = $SLIDESHOW_SLIDES![displayedSlideIndex] as HTMLElement;
            let displayedSlideTab = $SLIDESHOW_TABS![displayedSlideIndex] as HTMLElement;

            displayedSlide.style.opacity = '1';
            displayedSlideTab.classList.add('slideshow__tab--active');

            // Reset the slide intervals so e.g. if we were previously on slide 3, and then click on slide 1, it does not 
            // then change the slide to 4
            resetSlideInterval();
        });
    }

    // Play initial slide first, and make its tab active.
    let displayedSlide = $SLIDESHOW_SLIDES![displayedSlideIndex] as HTMLElement;
    let displayedSlideTab = $SLIDESHOW_TABS![displayedSlideIndex] as HTMLElement;

    displayedSlide.style.opacity = '1';
    displayedSlideTab.classList.add('slideshow__tab--active');
    displayedSlideIndex ++;
    
    resetSlideInterval();
}

/**
 *  resetSlideInterval resets the slide interval responsible for changing the slide displayed in the slideshow to
 *  the next.
 */
const resetSlideInterval = (): void => {
    // Reset the interval timer
    if (slideTimerID) {
        clearInterval(slideTimerID);
    }

    // Set the interval timer so that the next slide is shown
    slideTimerID = setInterval(() => {
        // If the displayed slide is the last one, set the first slide to be next to display
        if (displayedSlideIndex === $SLIDESHOW_SLIDES.length) {
            displayedSlideIndex = 0;
        }
        for (let i=0; i<$SLIDESHOW_SLIDES.length; i++) {
            let slide = $SLIDESHOW_SLIDES![i] as HTMLElement;
            let slideTab = $SLIDESHOW_TABS![i] as HTMLElement;

            slide.style.opacity = '0';
            slideTab.classList.remove('slideshow__tab--active');
        }
        let displayedSlide = $SLIDESHOW_SLIDES![displayedSlideIndex] as HTMLElement;
        let displayedSlideTab = $SLIDESHOW_TABS![displayedSlideIndex] as HTMLElement;

        displayedSlide.style.opacity = '1';
        displayedSlideTab.classList.add('slideshow__tab--active');
        displayedSlideIndex ++;
    }, 8000);
}

/**
 * initOnScrollContentAnimations initialises animations to occur on the contents of the page (excluding the header)
 * e.g. content to appear as the user scrolls down past a specific breakpoint.
 */
const initOnScrollContentAnimations = (): void => {
    /*
    As the user scrolls past the 1st breakpoint:
        - The hero text should fade out.
        - The intro-section text should fade in.
    As the user scrolls back to before this breakpoint, elements should return to their initial state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[0]) {
        $HERO_TEXT!.style.opacity = (1-(window.scrollY/250)).toString();
        $CTA_ARROW!.style.opacity = '0';
        $CTA_BUTTON!.style.opacity = (1-(window.scrollY/700)).toString();

        $INTRO!.classList.remove('fade-hide');
        $INTRO!.classList.add('fade-reveal');
    } 
    else {
        $HERO_TEXT!.style.opacity = '1';
        $CTA_ARROW!.style.opacity = '1';
        $CTA_BUTTON!.style.opacity = '1';
    }

    /*
    As the user scrolls past the 2nd breakpoint:
        - The call to action button in the hero section should fade out.
        - The hero image should fade out.
        - The chapter section text should fade in.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[1]) {
        $CHAP_HEADER!.classList.add('fade-reveal');
        heroHidden = true;

        if (window.matchMedia("(min-width: 750px").matches) {
            $CHAP_ITEMS!.classList.add('fade-reveal');
        }

    } else {
        // As the user scrolls back to before this breakpoint, these elements should return to their initial state.
        heroHidden = false;
    }

    /*
        As the user scrolls past the 3rd breakpoint:
            - The first chapter should slide in from the left.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[2]) {
        let chapter = $CHAP_LEFT[0] as HTMLElement;
        chapter.classList.add('slide-in');
    }
    /*
        As the user scrolls past the 4th breakpoint:
            - The second chapter should slide in from the right.
        As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[3]) {
        $HERO_SECTION!.style.opacity = '0';
        $HERO_SECTION!.style.pointerEvents = 'none';
    } else {
        $HERO_SECTION!.style.opacity = '1';
        $HERO_SECTION!.style.pointerEvents = 'auto';
    }

    /*
        As the user scrolls past 
    */
    if (window.scrollY > SCROLL_Y_BREAKPOINTS[7]) {
        $LATEST_EVENTS!.classList.add('fade-reveal');
    }

    if (window.matchMedia("(max-width: 750px)").matches) {
        if (window.scrollY > SCROLL_Y_BREAKPOINTS[4]) {
            let chapter = $CHAP_RIGHT[0] as HTMLElement;
            chapter.classList.add('slide-in');
        }
        /*
            As the user scrolls past the 5th breakpoint:
                - The third chapter should slide in from the left.
            As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
        */
        if (window.scrollY > SCROLL_Y_BREAKPOINTS[5]) {
            let chapter = $CHAP_LEFT[1] as HTMLElement;
            chapter.classList.add('slide-in');
        }
            /*
            As the user scrolls past the 6th breakpoint:
                - The fourth chapter should slide in from the left.
            As the user scrolls back to before this breakpoint, the chapter item should stay in its final state.
        */
       if (window.scrollY > SCROLL_Y_BREAKPOINTS[6]) {
        let chapter = $CHAP_RIGHT[1] as HTMLElement;
            chapter.classList.add('slide-in');
        }
    }
}

/**
 * initOnScrollHeaderAnimations initialises animations of the header DOM elements that are to occur as the user scrolls vertically (y-axis) on the web-page.
 * When the user scrolls past the hero section, the brand should change to the original (from the alternate) logo, and the toggle button should change from white to grey.
 * As the user scrolls back to the hero section, the brand and toggle button should revert to their initial states.
*/
const initOnScrollHeaderAnimations = (): void => {
    // If the hero section is hidden (i.e. has been scrolled past), and the user has NOT clicked the menu toggle button (i.e. mobile menu is not open)
    if (heroHidden && !toggleBtnClicked) {
        // Turn header background white
        $MAIN_HEADER!.classList.remove('main-header--transparent');
        $MAIN_HEADER!.classList.add('header__element--white');
        // Replace alternate logo with original logo that does not have hover effects.
        $LOGO_ALT!.classList.remove('image_on');
        $LOGO_ALT!.classList.add('brand-alt-hover--disable');
        $LOGO!.classList.remove('image_off');
        $LOGO!.classList.add('brand-hover--disable');
        // Make toggle button bars grey
        for (let i=0; i<$TOGGLE_BTN_BARS.length; i++) {
            let bar = $TOGGLE_BTN_BARS[i] as HTMLElement;
            bar.classList.remove('header__element--white');
            bar.classList.add('header__element--grey');    
        };
        // Make main nav words black
        for (let i=0; i<$MAIN_NAV_ITEMS.length; i++) {
            let item = $MAIN_NAV_ITEMS[i] as HTMLElement;
            item.classList.remove('main-nav__item-text--alt');
            item.classList.add('main-nav__item-text--original');
        };
    }
    // If the hero section is NOT hidden (i.e. has been scrolled past), and the user has NOT clicked the menu toggle button (i.e. mobile menu is not open)
    if (!heroHidden && !toggleBtnClicked) {
        // Turn header background transparent
        $MAIN_HEADER!.classList.remove('header__element--white');
        $MAIN_HEADER!.classList.add('main-header--transparent');
        // Replace original logo with alternate (white-only) logo that has hover effects.
        $LOGO!.classList.remove('brand-hover--disable');
        $LOGO!.classList.add('image_off');
        $LOGO_ALT!.classList.remove('brand-alt-hover--disable');
        $LOGO_ALT!.classList.add('image_on');
        // Make toggle button bars white
        for (let i=0; i<$TOGGLE_BTN_BARS.length; i++) {
            let bar = $TOGGLE_BTN_BARS[i] as HTMLElement;
            bar.classList.remove('header__element--grey');
            bar.classList.add('header__element--white');
        };
        // Make main nav words white
        for (let i=0; i<$MAIN_NAV_ITEMS.length; i++) {
            let item = $MAIN_NAV_ITEMS[i] as HTMLElement;
            item.classList.add('main-nav__item-text--alt');
            item.classList.remove('main-nav__item-text--original');
        };
    }
}

initIndex();