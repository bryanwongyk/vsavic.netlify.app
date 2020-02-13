const $DROPDOWN = document.querySelector('#event-filter');

function updateGallery() {
    let $DROPDOWN_VALUE = $DROPDOWN.options[$DROPDOWN.selectedIndex].value;
    console.log($DROPDOWN_VALUE);
}