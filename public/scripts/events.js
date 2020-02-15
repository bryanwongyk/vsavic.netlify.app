const   $DROPDOWN                       = document.querySelector('#event-filter'),
        $HIGHLIGHTED_SLIDE              = document.querySelector('#highlighted-slide'),
        $HIGHLIGHTED_SLIDE_IMAGE        = document.querySelector('#highlighted-slide__image'),
        $HIGHLIGHTED_SLIDE_LINK         = document.querySelector('#highlighted-slide__link'),
        $HIGHLIGHTED_SLIDE_NAME         = document.querySelector('#highlighted-slide__name'),
        $SCROLLING_SLIDESHOW            = document.querySelector('#poster-gallery__slideshow-images');
var     $CARDS,
        slideIndex = 0,
        isCardSelected = false,
        cardSelectedIndex,
        eventCount = 0,
        allImgSrcs = ["../public/assets/event-posters/vsa-vic/2020-camp.png", "../public/assets/event-posters/vsa-rmit/2019-little-lunch.jpg", "../public/assets/event-posters/vsa-uom/2019-kahoot.jpg", "../public/assets/event-posters/vsa-rmit/2019-agm.jpg", "../public/assets/event-posters/vsa-rmit/2019-com-tam.jpg", "../public/assets/event-posters/vsa-uom/2019-sport.jpg", "../public/assets/event-posters/vsa-vic/2019-charity-dinner.jpg", "../public/assets/event-posters/vsa-vic/2019-alumni-night.jpg", "../public/assets/event-posters/vsa-monash/2019-agm.png", "../public/assets/event-posters/vsa-monash/2019-mid-autumn.jpg", "../public/assets/event-posters/vsa-uom/2019-agm.jpg", "../public/assets/event-posters/vsa-collabs/2019-sport.png", "../public/assets/event-posters/vsa-vic/2019-ball.jpg", "../public/assets/event-posters/vsa-monash/2019-pho-night.png", "../public/assets/event-posters/vsa-vic/2019-camp-reunion.jpg", "../public/assets/event-posters/vsa-vic/2019-camp.jpg"],
        allEventLinks = [  "https://www.facebook.com/events/870768526685134/", 
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
                    ],
        allEventNames = [  "Prison Break: VSA O-Camp 2020", 
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
        eventCategories = [["vic"], 
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

initGallery();

function initGallery() {
    /**
     * When the page loads, initGallery() initialises the gallery of events by populating it with all events, and sets eventCount to the total number of events.
     */
    eventCount = allImgSrcs.length;
    updateGallery(allImgSrcs, allEventNames, allEventLinks);
}

function updateGallery(imgSrcs, eventNames, eventLinks) {
    /**
     * updateGallery() takes in an array of image src paths, and updates the slideshow with the given images by adding these images to the DOM. It categorises these images based on the committee that is running the event (i.e. VSA VIC, VSA Monash, VSA University of Melbourne, or VSA RMIT). This categorisation is done by taking a substring of the image's src path which will contain a folder that is the name of the event's running committee. It then updates the $CARDS variable to correctly select the new cards on the DOM.
    */

    // Clear any content currently in the gallery
    $SCROLLING_SLIDESHOW.innerHTML = "";

    // Reset isCardSelected
    isCardSelected = false;
    
    // Populate gallery with images given in imgSrcs
    imgSrcs.forEach((imgSrc) => {
        // Add gallery cards to HTML
        let newCardHtml = `<div class="card"><img class="slide-image" src=${imgSrc}></div>`;
        $SCROLLING_SLIDESHOW.insertAdjacentHTML('beforeend', newCardHtml);
    });

    // Set $CARDS to newly added HTML elements, and set event listeners.
    $CARDS = document.querySelectorAll('.card');
    for (let i=0; i<$CARDS.length; i++) {
        $CARDS[i].addEventListener('click', () => {
            // Get the entire src of the img child element of the card, then get the part of the src path from where it begins with /public
            let srcPath = getImgSrc($CARDS[i].firstChild);


            // SAVE SCROLLING FOR WEB ONLY
            if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                scrollToCard(i);
            }

            setImg(srcPath, eventNames, eventLinks, i);
            selectCard(i);
        })
    }

    // Automatically preview the latest (first in imgSrcs) image as if it was clicked.
    let srcPath = getImgSrc($CARDS[0].firstChild);
    setImg(srcPath, eventNames, eventLinks, 0);
    selectCard(0);
}

function filterUpdateGallery() {
    /**
     * filterUpdateGallery() is called when the user changes the filter option on the page. It references the eventCategories array to compare the filter category input by the user against every image in allImgSrcs, then populates the filteredImgSrcs array only with the images that belong in the input category. filteredImgSrcs is then used to call updateGallery().
     */
    let $DROPDOWN_VALUE = $DROPDOWN.options[$DROPDOWN.selectedIndex].value;
    var filteredImgSrcs = [];
    var filteredEventNames = [];
    var filteredEventLinks = [];
    
    if ($DROPDOWN_VALUE === 'all') {
        updateGallery(allImgSrcs);
    } else {
        // Iterate through each event
        for (let i=0; i < eventCount; i++) {
            // Iterate through each category in an event's category array (to account for possible event collaborations e.g. VSA UoM x VSA Monash: Dodgeball)
            for (let j=0; j < eventCategories[i].length; j++) {
                if (eventCategories[i][j] === $DROPDOWN_VALUE) {
                    filteredImgSrcs.push(allImgSrcs[i]);
                    filteredEventNames.push(allEventNames[i]);
                    filteredEventLinks.push(allEventLinks[i]);
                }
            }
        }
        updateGallery(filteredImgSrcs, filteredEventNames, filteredEventLinks);
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
        $SCROLLING_SLIDESHOW.scrollLeft = $SCROLLING_SLIDESHOW.scrollLeft + (90 * (newSlideIndex-oldSlideIndex));
        console.log($SCROLLING_SLIDESHOW.scrollLeft);
    }
    if ((newSlideIndex < oldSlideIndex)) {
        // If we are clicking on an event that is farther on the right, it should scroll the gallery more to the right. So, the scroll amount is a multiple.
        $SCROLLING_SLIDESHOW.scrollLeft -= (90 * (oldSlideIndex-newSlideIndex));
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

function setImg(src, eventNames, eventLinks, index) {
    /**
     * setImg(src) sets the highlighted (enlarged) image on the page to the event given by src.
     */
    $HIGHLIGHTED_SLIDE.classList.remove('poster-gallery__highlighted-slide--hidden');
    $HIGHLIGHTED_SLIDE_IMAGE.src = src;
    $HIGHLIGHTED_SLIDE_NAME.textContent = eventNames[index];
    $HIGHLIGHTED_SLIDE_LINK.href = eventLinks[index];
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