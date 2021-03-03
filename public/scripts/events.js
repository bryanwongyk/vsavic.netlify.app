"use strict";
/**
 * Author: Bryan Wong
 * https://github.com/bryanwyk
 */
var $DROPDOWN = document.querySelector('#events-filter'), $HIGHLIGHTED_SLIDE = document.querySelector('#highlighted-slide'), $HIGHLIGHTED_SLIDE_IMAGE = document.querySelector('#highlighted-slide__image'), $HIGHLIGHTED_SLIDE_LINK = document.querySelector('#highlighted-slide__link'), $HIGHLIGHTED_SLIDE_NAME = document.querySelector('#highlighted-slide__name'), $SCROLLING_SLIDESHOW = document.querySelector('#events-gallery__slideshow-images');
var $CARDS = null, slideIndex = 0, isCardSelected = false, cardSelectedIndex, eventCount = 0, allImgSrcs = ["../public/assets/event-posters/vsa-rmit/2019-little-lunch.jpg", "../public/assets/event-posters/vsa-uom/2019-kahoot.jpg", "../public/assets/event-posters/vsa-rmit/2019-agm.jpg", "../public/assets/event-posters/vsa-rmit/2019-com-tam.jpg", "../public/assets/event-posters/vsa-uom/2019-sport.jpg", "../public/assets/event-posters/vsa-vic/2019-charity-dinner.jpg", "../public/assets/event-posters/vsa-vic/2019-alumni-night.jpg", "../public/assets/event-posters/vsa-monash/2019-agm.png", "../public/assets/event-posters/vsa-monash/2019-mid-autumn.jpg", "../public/assets/event-posters/vsa-uom/2019-agm.jpg", "../public/assets/event-posters/vsa-collabs/2019-sport.png", "../public/assets/event-posters/vsa-vic/2019-ball.jpg", "../public/assets/event-posters/vsa-monash/2019-pho-night.png", "../public/assets/event-posters/vsa-vic/2019-camp-reunion.jpg", "../public/assets/event-posters/vsa-vic/2019-camp.jpg"], allEventLinks = [
    "https://www.facebook.com/events/967524880278099/",
    "https://www.facebook.com/events/1183216525203485/",
    "https://www.facebook.com/events/2407960442863953/",
    "https://www.facebook.com/events/642645132927594/",
    "https://www.facebook.com/events/827939370933622/",
    "https://www.facebook.com/events/942952329418555/",
    "https://www.facebook.com/events/2608732002511713/",
    "https://www.facebook.com/events/2388039351317096/",
    "https://www.facebook.com/events/1052926118432148/",
    "https://www.facebook.com/events/2449560135262822/",
    "https://www.facebook.com/events/724117198034752/",
    "https://www.facebook.com/events/373257819999776/",
    "https://www.facebook.com/events/2503319103024637/",
    "https://www.facebook.com/events/309829899680150/",
    "https://www.facebook.com/events/396846704197244/"
], allEventNames = [
    "RMIT VSA Presents: Little Lunch",
    "VSA UoM Presents: Kahoot Night",
    "RMIT VSA Presents: Annual General Meeting (AGM) 2019",
    "RMIT VSA Presents: Cơm Tấm Night",
    "VSA UoM presents: The Champions League",
    "VSA VIC presents: Charity Dinner 2019",
    "VSA Alumni Networking Night",
    "VSA Monash presents: Annual General Meeting (AGM) 2019",
    "ACYA x VSA Monash presents: A Mid-Autumn Night",
    "VSA UoM presents: Annual General Meeting 2019",
    "VSA Monash x VSA UoM presents: Sports Day 2019 (DODGEBALL)",
    "VSA Victoria's Annual Ball 2019: A Dream of Spring",
    "VSA Monash Presents: Annual PHO NIGHT 2019",
    "VSA presents: Apocalypse",
    "Operation: VSA O-Camp 2019"
], 
// Each index in eventCategories corresponds to the respective matching index of the event in imgSrcs e.g. if vic is in index 1 of eventCategories, then index 1 of imgSrcs is an image of a VSA VIC event.
eventCategories = [
    ["rmit"],
    ["uom"],
    ["rmit"],
    ["rmit"],
    ["uom"],
    ["vic"],
    ["vic"],
    ["monash"],
    ["monash"],
    ["uom"],
    ["monash", "uom"],
    ["vic"],
    ["monash"],
    ["vic"],
    ["vic"]
];
var initGallery = function () {
    /**
     * When the page loads, initGallery() initialises the gallery of events by populating it with all events, and sets eventCount to the total number of events.
     */
    eventCount = allImgSrcs.length;
    updateGallery(allImgSrcs, allEventNames, allEventLinks);
};
/**
 * updateGallery takes in an array of image src paths, and updates the slideshow with the given images by adding these images to the DOM.
 * It categorises these images based on the committee that is running the event (i.e. VSA VIC, VSA Monash, VSA University of Melbourne, or VSA RMIT).
 * This categorisation is done by taking a substring of the image's src path which will contain a folder that is the name of the event's running committee.
 * It then updates the $CARDS letiable to correctly select the new cards on the DOM.
 * @arg imgSrcs - contains strings which are paths to images to be included in the gallery
 * @arg eventNames - contains strings of event names
 * @arg eventLinks - contains strings of URLs to the event on Facebook
 */
var updateGallery = function (imgSrcs, eventNames, eventLinks) {
    // Clear any content currently in the gallery
    $SCROLLING_SLIDESHOW.innerHTML = "";
    // Reset isCardSelected
    isCardSelected = false;
    // Populate gallery with images given in imgSrcs
    imgSrcs.forEach(function (imgSrc) {
        // Add gallery cards to HTML
        var newCardHtml = "<div class=\"card\"><img class=\"slide-image\" src=" + imgSrc + "></div>";
        $SCROLLING_SLIDESHOW.insertAdjacentHTML('beforeend', newCardHtml);
    });
    // Set $CARDS to newly added HTML elements, and set event listeners.
    $CARDS = document.querySelectorAll('.card');
    var _loop_1 = function (i) {
        $CARDS[i].addEventListener('click', function () {
            // Get the entire src of the img child element of the card, then get the part of the src path from where it begins with /public
            var img = $CARDS[i].firstChild;
            var srcPath = getImgSrc(img);
            setImg(srcPath, eventNames, eventLinks, i);
            selectCard(i);
        });
    };
    for (var i = 0; i < $CARDS.length; i++) {
        _loop_1(i);
    }
    // Automatically preview the latest (first in imgSrcs) image as if it was clicked.
    var img = $CARDS[0].firstChild;
    var srcPath = getImgSrc(img);
    setImg(srcPath, eventNames, eventLinks, 0);
    selectCard(0);
};
/**
 * filterUpdateGallery is called when the user changes the filter option on the page.
 * It references the eventCategories array to compare the
 * filter category input by the user against every image in allImgSrcs, then populates the filteredImgSrcs array only with the images that belong in the input category.
 * It also populates filteredEventNames with the event names, and filteredEventLinks with the event Facebook links.
 * updateGallery() is then called to update the gallery contents.
 */
var filterUpdateGallery = function () {
    var $DROPDOWN_VALUE = $DROPDOWN.options[$DROPDOWN.selectedIndex].value;
    var filteredImgSrcs = [];
    var filteredEventNames = [];
    var filteredEventLinks = [];
    if ($DROPDOWN_VALUE === 'all') {
        updateGallery(allImgSrcs, allEventNames, allEventLinks);
    }
    else {
        // Iterate through each event
        for (var i = 0; i < eventCount; i++) {
            // Iterate through each category in an event's category array (to account for possible event collaborations e.g. VSA UoM x VSA Monash: Dodgeball)
            for (var j = 0; j < eventCategories[i].length; j++) {
                if (eventCategories[i][j] === $DROPDOWN_VALUE) {
                    filteredImgSrcs.push(allImgSrcs[i]);
                    filteredEventNames.push(allEventNames[i]);
                    filteredEventLinks.push(allEventLinks[i]);
                }
            }
        }
        updateGallery(filteredImgSrcs, filteredEventNames, filteredEventLinks);
    }
};
/**
 * selectCard is used to apply the 'card--clicked' style to the card in the gallery that the user clicks on.
 * @arg index - index of the card selected from the array stored in $CARDS
 */
var selectCard = function (index) {
    var selectedCard = $CARDS[index];
    // if a card has not previously been selected
    if (!isCardSelected) {
        selectedCard.classList.add('card--clicked');
        // set reference to card that has been selected
        cardSelectedIndex = index;
        isCardSelected = true;
        return;
    }
    // if a card had already been selected before
    // Remove selected style on previous card
    var prevSelectedCard = $CARDS[cardSelectedIndex];
    prevSelectedCard.classList.remove('card--clicked');
    // Apply selected style to current card clicked
    selectedCard.classList.add('card--clicked');
    // Set reference to new card that has been selected
    cardSelectedIndex = index;
};
/**
 * clickScrollRight is called when the user clicks on the 'next' arrow button on the slideshow to scroll to the right.
 */
var clickScrollRight = function () {
    $SCROLLING_SLIDESHOW.scrollLeft += 804;
};
/**
 * clickScrollLeft is called when the user clicks on the 'previous' arrow button on the slideshow to scroll to the left.
 */
var clickScrollLeft = function () {
    $SCROLLING_SLIDESHOW.scrollLeft -= 804;
};
/**
 * setImg sets the highlighted (enlarged) image on the page to the event given by src.
 * @arg src - path to image
 * @arg eventNames - array of all the event names
 * @arg eventLinks - array of all the event links
 * @arg index - position of the selected event to be extracted from eventNames and eventLinks
 */
var setImg = function (src, eventNames, eventLinks, index) {
    $HIGHLIGHTED_SLIDE.classList.remove('events-gallery__highlighted-slide--hidden');
    $HIGHLIGHTED_SLIDE_IMAGE.src = src;
    $HIGHLIGHTED_SLIDE_NAME.textContent = eventNames[index];
    $HIGHLIGHTED_SLIDE_LINK.href = eventLinks[index];
};
/**
 * getImgSrc takes an <img> element in the /public directory, and retrieves its src.
 */
var getImgSrc = function (imgElement) {
    var srcPath = imgElement.src;
    var index = srcPath.indexOf('/public');
    srcPath = srcPath.substring(index);
    srcPath = ".." + srcPath;
    return srcPath;
};
initGallery();
//# sourceMappingURL=events.js.map