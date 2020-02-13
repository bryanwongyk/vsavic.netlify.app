const $DROPDOWN = document.querySelector('#event-filter');
const $HIGHLIGHTED_SLIDE = document.querySelector('#highlighted-slide');
const $HIGHLIGHTED_SLIDE_IMAGE = document.querySelector('#highlighted-slide__image');
const $SCROLLING_SLIDESHOW = document.querySelector('#poster-gallery__slideshow-images');
var $CARDS;
var slideIndex = 0;
var isCardSelected = false;
var cardSelectedIndex;

var eventCount = 0;
var allImgSrcs = ["../public/assets/event-posters/vsa-vic/2020-camp.png", "../public/assets/event-posters/vsa-rmit/2019-little-lunch.jpg", "../public/assets/event-posters/vsa-uom/2019-kahoot.jpg", "../public/assets/event-posters/vsa-rmit/2019-agm.jpg", "../public/assets/event-posters/vsa-rmit/2019-com-tam.jpg", "../public/assets/event-posters/vsa-uom/2019-sport.jpg", "../public/assets/event-posters/vsa-vic/2019-charity-dinner.jpg", "../public/assets/event-posters/vsa-vic/2019-alumni-night.jpg", "../public/assets/event-posters/vsa-monash/2019-agm.png", "../public/assets/event-posters/vsa-monash/2019-mid-autumn.jpg", "../public/assets/event-posters/vsa-uom/2019-agm.jpg", "../public/assets/event-posters/vsa-monash/2019-sport.png", "../public/assets/event-posters/vsa-vic/2019-ball.jpg", "../public/assets/event-posters/vsa-monash/2019-pho-night.png", "../public/assets/event-posters/vsa-vic/2019-camp-reunion.jpg", "../public/assets/event-posters/vsa-vic/2019-camp.jpg"];

// Each index in eventCategories corresponds to the respective matching index of the event in imgSrcs e.g. if vic is in index 1 of eventCategories, then index 1 of imgSrcs is an image of a VSA VIC event.
var eventCategories = [];

initGallery();

function initGallery() {
    eventCount = allImgSrcs.length;
    updateGallery(allImgSrcs);
}

function updateGallery(imgSrcs) {
    // Clear any content currently in the gallery
    $SCROLLING_SLIDESHOW.innerHTML = "";

    // Reset isCardSelected
    isCardSelected = false;
    
    // Populate gallery with images
    imgSrcs.forEach((imgSrc) => {
        // Categorise event posters based on the committee (e.g. vic, monash, rmit, uom).
        let category = imgSrc.indexOf('vsa');
        // Gets substring starting from index e.g. vsa-vic/2020-camp.png
        category = imgSrc.substring(category);
        //e.g. ['vsa-vic', '2020-camp.png']
        category = category.split('/');
        //e.g. vic
        category = category[0].substr((4));

        // Add gallery cards to HTML
        let newCardHtml = `<div class="card"><img class="slide-image" src=${imgSrc}></div>`;
        $SCROLLING_SLIDESHOW.insertAdjacentHTML('beforeend', newCardHtml);

        eventCategories.push(category);
    });

    $CARDS = document.querySelectorAll('.card');

    for (let i=0; i<$CARDS.length; i++) {
        $CARDS[i].addEventListener('click', () => {
            // Get the entire src of the img child element of the card, then get the part of the src path from where it begins with /public
            let srcPath = getImgSrc($CARDS[i].firstChild);
            setSlideIndex(i);
            setImage(srcPath);
            selectCard(i);
        })
    }

    // Automatically preview the latest (first in imgSrcs) image as if it was clicked.
    let srcPath = getImgSrc($CARDS[0].firstChild);
    setImage(srcPath);
    selectCard(0);
}

function filterUpdateGallery() {
    let $DROPDOWN_VALUE = $DROPDOWN.options[$DROPDOWN.selectedIndex].value;
    var filteredImgSrcs = [];
    
    if ($DROPDOWN_VALUE === 'all') {
        updateGallery(allImgSrcs);
    } else {
        for (let i=0; i < eventCount; i++) {
            if (eventCategories[i] === $DROPDOWN_VALUE) {
                filteredImgSrcs.push(allImgSrcs[i]);
            }
        }
        updateGallery(filteredImgSrcs);
    }
}

function selectCard(index) {
    if (isCardSelected === false) {
        $CARDS[index].classList.add('card--clicked');
        // set reference to card that has been selected
        cardSelectedIndex = index;
        isCardSelected = true;
    }

    // if a card had already been selected before
    if (isCardSelected === true) {
        // Remove selected style on previous card
        $CARDS[cardSelectedIndex].classList.remove('card--clicked');
        // Apply selected style to current card clicked
        $CARDS[index].classList.add('card--clicked');

        // Set reference to new card that has been selected
        cardSelectedIndex = index;
    }
}

function setSlideIndex(index) {
    slideIndex = index;
}


function clickScrollRight() {
    $SCROLLING_SLIDESHOW.scrollLeft += 200;
}

function clickScrollLeft() {
    $SCROLLING_SLIDESHOW.scrollLeft -= 200;
}

function addSlideIndex(index) {
    slideIndex += index;
    getImgSrc($CARDS[slideIndex].firstChild);
    let srcPath = $CARDS[slideIndex].firstChild.src;
    let indexPath = srcPath.indexOf('/public');
    srcPath = srcPath.substring(indexPath);
    srcPath = ".." + srcPath;
    setImage(srcPath);
}

$SCROLLING_SLIDESHOW.addEventListener('keydown', (event) => {
    // Get the current image being displayed
    if (event.key === "ArrowLeft") {
        addSlideIndex(-1);
    }
    if (event.key === "ArrowRight") {
        addSlideIndex(1);
    }
});

function setImage(src) {
    $HIGHLIGHTED_SLIDE.classList.remove('poster-gallery__highlighted-slide--hidden');
    $HIGHLIGHTED_SLIDE_IMAGE.src = src;
}

function getImgSrc(imgElement) {
    let srcPath = imgElement.src;
    let index = srcPath.indexOf('/public');
    srcPath = srcPath.substring(index);
    srcPath = ".." + srcPath;
    return srcPath;
}