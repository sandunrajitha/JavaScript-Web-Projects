const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let imagesLoaded = 0;
let ready = false;

let photosArray = [];

const count = 20;
const resource = `https://rajitha-api-proxy.herokuapp.com/api/infinite-scroll?count=${count}`

//check if all the images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === photosArray.length) {
        ready = true;
    }
}

// helper function for set attributes
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create photo elements for each object in the photos array
function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // add event listener to check if the image is loaded
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// Get photos
async function getPhotos() {
    try {
        const response = await fetch(resource);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// Load more photos when scrolling near bottom of the page
window.addEventListener('scroll', () => {
    if ((scrollY + window.innerHeight) >= document.body.offsetHeight - 1000 && ready) {
        
        ready = false;
        imagesLoaded = 0;
        getPhotos();
        console.log('got photos');
    }
});

// on load
getPhotos();