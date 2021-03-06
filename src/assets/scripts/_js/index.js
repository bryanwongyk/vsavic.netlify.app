/**
 * Author: Bryan Wong
 * https://github.com/bryanwyk
 */
import { toggleBtnClicked, $MAIN_HEADER, $LOGO_ALT, $LOGO, $TOGGLE_BTN_BARS } from './shared';
var $CHAP_ITEMS = document.querySelector('.chapters__items'), $CHAP_LEFT = document.querySelectorAll('.chapters__item--left'), $CHAP_RIGHT = document.querySelectorAll('.chapters__item--right'), $CHAP_HEADER = document.querySelector('.chapters__header'), $CTA_ARROW = document.querySelector('.scroll-cta__arrow'), $CTA_BUTTON = document.querySelector('.scroll-cta__button'), $HERO_SECTION = document.querySelector('.hero-section'), $HERO_TEXT = document.querySelector('.hero-section__text'), $INTRO = document.querySelector('.presentation-section__intro'), $LATEST_EVENTS = document.querySelector('.presentation-section__latest-events'), $MAIN_NAV_ITEMS = document.querySelectorAll('.main-nav__item-text'), $SLIDESHOW_SLIDES = document.querySelectorAll('.slideshow__slide'), $SLIDESHOW_TABS = document.querySelectorAll('.slideshow__tab');
var SCROLL_Y_BREAKPOINTS = [130, 480, 620, 775, 840, 1060, 1280, 1450];
if (window.matchMedia('(min-width: 750px)').matches) {
    SCROLL_Y_BREAKPOINTS[7] = 820;
}
var heroHidden = false;
var displayedSlideIndex = 0; // Index corresponds to the current slide being displayed in the hero section.
var slideTimerID;
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
        $HERO_TEXT.style.opacity = (1 - window.scrollY / 250).toString();
        $CTA_ARROW.style.opacity = '0';
        $CTA_BUTTON.style.opacity = (1 - window.scrollY / 700).toString();
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
        if (window.matchMedia('(min-width: 750px').matches) {
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
    if (window.matchMedia('(max-width: 750px)').matches) {
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
        for (var i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
            var bar = $TOGGLE_BTN_BARS[i];
            bar.classList.remove('header__element--white');
            bar.classList.add('header__element--grey');
        }
        // Make main nav words black
        for (var i = 0; i < $MAIN_NAV_ITEMS.length; i++) {
            var item = $MAIN_NAV_ITEMS[i];
            item.classList.remove('main-nav__item-text--alt');
            item.classList.add('main-nav__item-text--original');
        }
    }
    // If the hero section is NOT hidden (i.e. has been scrolled past), and the user has NOT clicked the menu toggle button (i.e. mobile menu is not open)
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
        for (var i = 0; i < $TOGGLE_BTN_BARS.length; i++) {
            var bar = $TOGGLE_BTN_BARS[i];
            bar.classList.remove('header__element--grey');
            bar.classList.add('header__element--white');
        }
        // Make main nav words white
        for (var i = 0; i < $MAIN_NAV_ITEMS.length; i++) {
            var item = $MAIN_NAV_ITEMS[i];
            item.classList.add('main-nav__item-text--alt');
            item.classList.remove('main-nav__item-text--original');
        }
    }
};
initIndex();
//# sourceMappingURL=index.js.map