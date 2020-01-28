var toggleButton = document.querySelector('.toggle-button');
var mobileNav = document.querySelector('.mobile-nav');
var logo = document.querySelector('#logo');
var logoAlt = document.querySelector('#logo--alt')
var mainHeader = document.querySelector('.main-header');
var introduction = document.querySelector('.introduction');
var brand = document.querySelector('.brand');
var introductionOffset = offset(introduction);
var heroImage = document.querySelector('.hero-section__image');
var heroText = document.querySelector('.hero-section__text');
var html = document.querySelector('html');
var scrollCtaText = document.querySelector('#scroll-cta__text');
var ctaArrow = document.querySelector('.scroll-cta__arrow');

const mainHeaderHeight = 70.4;
const toggleButtonBars = document.querySelectorAll('.toggle-button__bar')

var heroHidden = false;


toggleButton.addEventListener('click', () => {
    mobileNav.classList.remove('mobile-nav__hidden');
    mobileNav.classList.add('mobile-nav__reveal');
});

window.onscroll = () => {
    if (window.scrollY > 130) {
        heroText.style.opacity = (1-(window.scrollY/250));
    } else {
        heroText.style.opacity = 1;
    }
    if (window.scrollY > 610) {
        heroImage.classList.add('hidden');
        heroHidden = true;
        // heroImage.style.opacity = (1-(window.scrollY/750));
    } else {
        heroImage.classList.remove('hidden');
        heroHidden = false;
    }
    // Transitions when the bottom of the header reaches the introduction section, rather than when the top reaches it, as the offset calculates how far the introduction section is from the top of the window/header.
    if (heroHidden) {
        mainHeader.classList.remove('main-header--transparent');
        mainHeader.classList.add('header__element--white');
        logoAlt.classList.remove('image_on');
        logoAlt.classList.add('brand-alt-hover--disable');
        logo.classList.remove('image_off');
        logo.classList.add('brand-hover--disable');
        brand.classList.remove('disable-hover');
        scrollCtaText.style.color = 'black';
        scrollCtaText.style.textShadow = 'none';
        ctaArrow.style.display = 'none';

        toggleButtonBars.forEach((bar) => {
            bar.classList.remove('header__element--white');
            bar.classList.add('header__element--grey');
        });


    }
    else {
        mainHeader.classList.remove('header__element--white');
        mainHeader.classList.add('main-header--transparent');
        logo.classList.remove('brand-hover--disable');
        logo.classList.add('image_off');
        logoAlt.classList.remove('brand-alt-hover--disable');
        logoAlt.classList.add('image_on');
        ctaArrow.style.display = 'block';

        scrollCtaText.style.color = 'white';

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