// Portfolio selector and populator
var gallery = document.getElementById('gallery1');
function buildGallery(sort) {
    console.log('building gallery items');
    console.log(imgArray.length);

    var galleryItems = '';

    for( var i = 0; i < imgArray.length; i++ ) {
        if(imgArray[i].type === sort || sort === 'all') {
            galleryItems += '<div class="gallery-item" onclick="modalOn(' + (i+1) + ')">' +
            imgArray[i].image +
            '</div>';
        }
    }
    gallery.innerHTML = galleryItems;
}

// call the gallery
buildGallery('all');
function sortGallery(sort) {
    var foo;
    if(sort === 'all') {
        console.log('all items');
        foo = 'all';
    }
    if(sort === 'web') {
        console.log('web items');
        foo = sort;
    }
    if(sort === 'project') {
        console.log('project items');
        foo = sort;
    }
    if(sort === 'design') {
        console.log('design items');
        foo = sort;
    }
    buildGallery(foo);
}
