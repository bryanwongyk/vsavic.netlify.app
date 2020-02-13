const   $DROPDOWN                       = document.querySelector('#event-filter'),
        $HIGHLIGHTED_SLIDE              = document.querySelector('#highlighted-slide'),
        $HIGHLIGHTED_SLIDE_IMAGE        = document.querySelector('#highlighted-slide__image'),
        $SCROLLING_SLIDESHOW            = document.querySelector('#poster-gallery__slideshow-images');
var     $CARDS,
        slideIndex = 0,
        isCardSelected = false,
        cardSelectedIndex,
        eventCount = 0,
        allImgSrcs = ["../public/assets/event-posters/vsa-vic/2020-camp.png", "../public/assets/event-posters/vsa-rmit/2019-little-lunch.jpg", "../public/assets/event-posters/vsa-uom/2019-kahoot.jpg", "../public/assets/event-posters/vsa-rmit/2019-agm.jpg", "../public/assets/event-posters/vsa-rmit/2019-com-tam.jpg", "../public/assets/event-posters/vsa-uom/2019-sport.jpg", "../public/assets/event-posters/vsa-vic/2019-charity-dinner.jpg", "../public/assets/event-posters/vsa-vic/2019-alumni-night.jpg", "../public/assets/event-posters/vsa-monash/2019-agm.png", "../public/assets/event-posters/vsa-monash/2019-mid-autumn.jpg", "../public/assets/event-posters/vsa-uom/2019-agm.jpg", "../public/assets/event-posters/vsa-monash/2019-sport.png", "../public/assets/event-posters/vsa-vic/2019-ball.jpg", "../public/assets/event-posters/vsa-monash/2019-pho-night.png", "../public/assets/event-posters/vsa-vic/2019-camp-reunion.jpg", "../public/assets/event-posters/vsa-vic/2019-camp.jpg"],
        eventCategories = []; // Each index in eventCategories corresponds to the respective matching index of the event in imgSrcs e.g. if vic is in index 1 of eventCategories, then index 1 of imgSrcs is an image of a VSA VIC event.

initGallery();

function initGallery() {
    /**
     * When the page loads, initGallery() initialises the gallery of events by populating it with all events, and sets eventCount to the total number of events.
     */
    eventCount = allImgSrcs.length;
    updateGallery(allImgSrcs);
}

function updateGallery(imgSrcs) {
    /**
     * updateGallery() takes in an array of image src paths, and updates the slideshow with the given images by adding these images to the DOM. It categorises these images based on the committee that is running the event (i.e. VSA VIC, VSA Monash, VSA University of Melbourne, or VSA RMIT). This categorisation is done by taking a substring of the image's src path which will contain a folder that is the name of the event's running committee. It then updates the $CARDS variable to correctly select the new cards on the DOM.
    */

    // Clear any content currently in the gallery
    $SCROLLING_SLIDESHOW.innerHTML = "";

    // Reset isCardSelected
    isCardSelected = false;
    
    // Populate gallery with images given in imgSrcs
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

    // Set $CARDS to newly added HTML elements, and set event listeners.
    $CARDS = document.querySelectorAll('.card');
    for (let i=0; i<$CARDS.length; i++) {
        $CARDS[i].addEventListener('click', () => {
            // Get the entire src of the img child element of the card, then get the part of the src path from where it begins with /public
            let srcPath = getImgSrc($CARDS[i].firstChild);
            scrollToCard(i);
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
    /**
     * filterUpdateGallery() is called when the user changes the filter option on the page. It references the eventCategories array to compare the filter category input by the user against every image in allImgSrcs, then populates the filteredImgSrcs array only with the images that belong in the input category. filteredImgSrcs is then used to call updateGallery().
     */
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
    /**
     * selectCard(index) is used to apply the 'card--clicked' style to the card that the user clicks on. 
     */
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

function scrollToCard(newSlideIndex) {
    /**
     * scrollToCard(newSlideIndex) is used to update the slide index when the user clicks on a card in the slideshow, which is then used to determine how much the slideshow should scroll.
     */
    oldSlideIndex = slideIndex;
    slideIndex = newSlideIndex;
    if ((newSlideIndex > oldSlideIndex)) {
        // If we are clicking on an event that is farther on the left, it should scroll the gallery more to the left. So, the scroll amount is a multiple.
        $SCROLLING_SLIDESHOW.scrollLeft = $SCROLLING_SLIDESHOW.scrollLeft + (150 * (newSlideIndex-oldSlideIndex));
    }
    if ((newSlideIndex < oldSlideIndex)) {
        // If we are clicking on an event that is farther on the right, it should scroll the gallery more to the right. So, the scroll amount is a multiple.
        $SCROLLING_SLIDESHOW.scrollLeft -= (150 * (oldSlideIndex-newSlideIndex));
    }
}

function clickScrollRight() {
    /**
     * clickScrollRight() is called when the user clicks on the 'next' arrow button on the slideshow to scroll to the right.
     */
    $SCROLLING_SLIDESHOW.scrollLeft += 200;
}

function clickScrollLeft() {
    /**
     * clickScrollLeft() is called when the user clicks on the 'previous' arrow button on the slideshow to scroll to the left.
     */
    $SCROLLING_SLIDESHOW.scrollLeft -= 200;
}

function setImage(src) {
    /**
     * setImage(src) sets the highlighted (enlarged) image on the page to the image given by src.
     */
    $HIGHLIGHTED_SLIDE.classList.remove('poster-gallery__highlighted-slide--hidden');
    $HIGHLIGHTED_SLIDE_IMAGE.src = src;
}

function getImgSrc(imgElement) {
    /**
     * getImgSrc(imgElement) takes an <img> element in the /public directory, and retrieves its src.
     */
    let srcPath = imgElement.src;
    let index = srcPath.indexOf('/public');
    srcPath = srcPath.substring(index);
    srcPath = ".." + srcPath;
    return srcPath;
}