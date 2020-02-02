var toggleButton = document.querySelector('.toggle-button');
var toggleButtonClicked = false;
var mobileNav = document.querySelector('.mobile-nav');
var mobileNavBg = document.querySelector('.mobile-nav__background');
var mobileNavItems = document.querySelector('.mobile-nav__items');
var logo = document.querySelector('#logo');
var logoAlt = document.querySelector('#logo--alt')
var mainHeader = document.querySelector('.main-header');
var intro = document.querySelector('.intro');
var brand = document.querySelector('.brand');
var introOffset = offset(intro);
var heroImage = document.querySelector('.hero-section__image');
var heroText = document.querySelector('.hero-section__text');
var html = document.querySelector('html');
var ctaArrow = document.querySelector('.scroll-cta__arrow');
var ctaButton = document.querySelector('#scroll-cta__button');
var chapLeft = document.querySelectorAll('.chapter-left');
var chapRight = document.querySelector('.chapter-right');
var chapHeader = document.querySelector('#chapter-header');
var copyrightYear = document.querySelector('#copyright-year');
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var menuLabel = document.querySelector('#menu__label');

copyrightYear.textContent = currentYear;

const mainHeaderHeight = 70.4;
const toggleButtonBars = document.querySelectorAll('.toggle-button__bar')
var toggleButtonBar1 = toggleButtonBars[0];
var toggleButtonBar2 = toggleButtonBars[1];
var toggleButtonBar3 = toggleButtonBars[2];


var heroHidden = false;


toggleButton.addEventListener('click', () => {
    if (!toggleButtonClicked) {
        mobileNav.classList.remove('mobile-nav__hidden');
        mobileNav.classList.add('mobile-nav__reveal');
        setTimeout(() => {
            // Need to do background transition AFTER the mobile-nav is revealed (i.e. has its display changed from none to block), otherwise the transition will not execute.
            mobileNavBg.classList.add('mobile-nav__background--open');  
            mainHeader.classList.add('main-header--transparent');
            mainHeader.classList.remove('header__element--white');
            logoAlt.classList.remove('brand-alt-hover--disable');
            logoAlt.classList.add('image_on');
            logo.classList.remove('brand-hover--disable');
            logo.classList.add('image_off');
            // reset header to state it was at top of page as when we click on toggle it brings user bcak to top of page
            mobileNavItems.classList.add('mobile-nav__items--reveal');
        }, 100);

        // Only change logos, and allow us to click on the toggle button again AFTER it has finished loading (to prevent possible bug where user spams on button)
        // setTimeout(() => {
        //     toggleButton.style.pointerEvents = 'auto';
        // }, 1000)

        brand.classList.add('hidden');
        brand.classList.add('unclickable');
        toggleButtonBars.forEach((bar) => {
            bar.classList.add('header__element--grey');
            bar.classList.remove('header__element--white');
        });
        toggleButtonBar1.classList.add('toggle-button__bar-1--clicked');
        toggleButtonBar2.classList.add('toggle-button__bar-2--clicked');
        toggleButtonBar3.classList.add('toggle-button__bar-3--clicked');

        menuLabel.textContent = "CLOSE";

        toggleButtonClicked = true;

        // mobileNav.style.overflow = 'hidden';

        // To prevent scrolling on the body while the mobile nav is open, there are several possible solutions. 
        // (1) Change hte position of the body to 'fixed'.
        // (2) Change the overflow of the body to "hidden".
        // However, these solutions will automatically scroll back up to the top of hte page, and neither of these will allow us to animate the transition of scrolling back up as they are binary options.
        // We can set position of the body to absolute instead.
        document.querySelector('body').style.position = 'fixed';
    } else {
        mobileNavItems.classList.remove('mobile-nav__items--reveal');
        mobileNavItems.classList.add('mobile-nav__items--hide');
        mobileNavBg.classList.add('mobile-nav__background--close');
        mobileNavBg.classList.remove('mobile-nav__background--open');
        setTimeout(() => {
            // Need to hide (i.e. set display to none) AFTER the transition is done.
            mobileNav.classList.remove('mobile-nav__reveal');
            mobileNav.classList.add('mobile-nav__hidden');
            mobileNavBg.classList.remove('mobile-nav__background--close');
            mobileNavItems.classList.remove('mobile-nav__items--hide');
        }, 500);

        document.querySelector('body').style.position = 'static';
        brand.classList.remove('hidden');
        brand.classList.remove('unclickable');
        toggleButtonBars.forEach((bar) => {
            // Only keep header element as grey if the hero is hidden (i.e. the user has scrolled to that point)
            // Else, make header element white.
            if (!heroHidden) {
                bar.classList.remove('header__element--grey');
                bar.classList.add('header__element--white');
            }
        });
        toggleButtonBar1.classList.remove('toggle-button__bar-1--clicked');
        toggleButtonBar2.classList.remove('toggle-button__bar-2--clicked');
        toggleButtonBar3.classList.remove('toggle-button__bar-3--clicked');

        toggleButtonBar1.classList.add('toggle-button__bar-1--clicked-off');
        toggleButtonBar2.classList.add('toggle-button__bar-2--clicked-off');
        toggleButtonBar3.classList.add('toggle-button__bar-3--clicked-off');

        // Remove classes after animations
        setTimeout(() => {
            toggleButtonBar1.classList.remove('toggle-button__bar-1--clicked-off');
            toggleButtonBar2.classList.remove('toggle-button__bar-2--clicked-off');
            toggleButtonBar3.classList.remove('toggle-button__bar-3--clicked-off');
        }, 500)
        toggleButtonClicked = false;

        menuLabel.textContent = "MENU";
    }
});


window.onscroll = () => {
    if (window.scrollY > 130) {
        heroText.style.opacity = (1-(window.scrollY/250));
    } else {
        heroText.style.opacity = 1;
    }
    if (window.scrollY > 500) {
        ctaArrow.style.opacity = 0;
        ctaButton.style.opacity = (1-(window.scrollY/700));
    } else {
        ctaArrow.style.opacity = 1;
        ctaButton.style.opacity = 1;
        ctaButton.style.textShadow = 'inherit';
    }
    if (window.scrollY > 500) {
        heroImage.style.opacity = (1-(window.scrollY/700));
        // heroImage.classList.add('hidden');
        heroHidden = true;
        // heroImage.style.opacity = (1-(window.scrollY/750));
    } else {
        heroImage.style.opacity = 1;
        // heroImage.classList.remove('hidden');
        heroHidden = false;
    }
    // Transitions when the bottom of the header reaches the intro section, rather than when the top reaches it, as the offset calculates how far the intro section is from the top of the window/header.
    if (heroHidden && !toggleButtonClicked) {
        mainHeader.classList.remove('main-header--transparent');
        mainHeader.classList.add('header__element--white');
        logoAlt.classList.remove('image_on');
        logoAlt.classList.add('brand-alt-hover--disable');
        logo.classList.remove('image_off');
        logo.classList.add('brand-hover--disable');
        brand.classList.remove('disable-hover');
        chapHeader.classList.remove('fade-hide');
        chapHeader.classList.add('fade-reveal');
        

        toggleButtonBars.forEach((bar) => {
            bar.classList.remove('header__element--white');
            bar.classList.add('header__element--grey');
        });


    }
    if (!heroHidden && !toggleButtonClicked) {
        mainHeader.classList.remove('header__element--white');
        mainHeader.classList.add('main-header--transparent');
        logo.classList.remove('brand-hover--disable');
        logo.classList.add('image_off');
        logoAlt.classList.remove('brand-alt-hover--disable');
        logoAlt.classList.add('image_on');

        chapHeader.classList.add('fade-hide');
        chapHeader.classList.remove('fade-reveal');

        brand.classList.add('disable-hover');

        toggleButtonBars.forEach((bar) => {
            bar.classList.remove('header__element--grey');
            bar.classList.add('header__element--white');
        });

        // html.classList.remove('disable-scroll-snapping');
    }
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
