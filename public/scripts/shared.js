var toggleButton = document.querySelector('.toggle-button');
var mobileNav = document.querySelector('.mobile-nav');

toggleButton.addEventListener("click", () => {
    mobileNav.classList.remove('mobile-nav__hidden');
    mobileNav.classList.add('mobile-nav__reveal');
});