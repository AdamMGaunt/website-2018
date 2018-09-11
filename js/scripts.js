/*========== Scripts ==========*/
// globals
var menuOpen = false;
var windowWidthInit = window.innerWidth;
var windowHeightInit = window.innerHeight;

$(document).ready(function (){
    var foo = $('#nav-top');
    var baa = $('.nav-collapse');
    foo.css('left', windowWidthInit + 'px');
    $('#nav-top').css('height',windowHeightInit);
    $('.nav-btn').click(function(){
        closeMenu();
    });
    $(".nav-btn").click(function (){
        var link = this.attributes[0].value;
        // console.log(link);
        if($(link).id === 'top') {
            $('html, body').animate({
                scrollTop: $(link).offset().top
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: ($(link).offset().top -44)
            }, 1000);
        }
    });
    pageInit();
});


function pageInit() {
    $('nav-top').css('left', windowWidthInit + 'px');
    $('.feature').css('height', windowHeightInit);
    $('.feature').find('div').css('padding-top', ((windowHeightInit / 2) - 44));
    $('#moveDown').css('top', (windowHeightInit - 50));
    $('#moveDown').css('left', ((windowWidthInit/2) - 20));
    $('.content').css('min-height', windowHeightInit);
    var contactHeight = $('.contact').innerHeight();
    $('.contact').css('padding-top', ((windowHeightInit - contactHeight)/2));
    $('.contact').css('padding-bottom', ((windowHeightInit - contactHeight)/2));
    $('#bottom').css('min-height', (windowHeightInit - 150));
}


(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
})();


window.addEventListener("optimizedResize", function() {
    console.log("Resource conscious resize callback!");
    windowWidthInit = window.innerWidth;
    windowHeightInit = window.innerHeight;
    var contactHeight = $('.contact').innerHeight();
    $('.contact').css('padding-top', ((windowHeightInit - contactHeight)/2));
    $('.contact').css('padding-bottom', ((windowHeightInit - contactHeight)/2));
    pageInit();
});

/*
*/

$('.nav-collapse').click(function(){
    // console.log("slide");
    var foo = $('#nav-top');
    var menuWidth = foo.innerWidth();
    if(menuOpen !== true ){
        openMenu(windowWidthInit,menuWidth);
    } else {
        closeMenu(windowWidthInit,menuWidth);
    }
});

// Opens the top menu
function openMenu() {
    // console.log("open");
    $('#nav-top').remove('close');
    $('#nav-top').add('open');
    var menuIcon = $('.menu-icon');
    menuIcon.fadeOut('fast',function(){
        menuIcon.html('<i class="fa fa-times"></i>');
        menuIcon.fadeIn('fast');
    });
    menuOpen = true;
    $('#nav-top').animate({
        left: '0px'
    },500);
}
// Closes the top menu
function closeMenu() {
    // console.log("close");
    var menuIcon = $('.menu-icon');
    menuIcon.fadeOut('fast',function(){
        menuIcon.html('<i class="fa fa-bars"></i>');
        menuIcon.fadeIn('fast');
    });
    $('#nav-top').remove('open');
    $('#nav-top').add('close');
    menuOpen = false;
    $('#nav-top').animate({
        left: windowWidthInit + 'px'
    },500);
}


function sliderInit(num) {
    // slider
    var gallery = document.querySelector('#gallery' + num);
    // console.log(gallery.querySelectorAll('.gallery-item'));

    var galleryItem = gallery.querySelectorAll('.gallery-item');
    for(var i = 0; i <galleryItem.length;i++) {
        // console.log(galleryItem[i]);
        galleryItem[i].style.display = 'none';
    }
    galleryItem[0].style.display = 'block';
}

// Hide the menu icons till hover
function hoverIcons() {
  // toggle the menu icons
}

// Modal functions

var modal = document.getElementById('myModal');

// get the button
var btn = document.getElementById('myBtn');

// Get the <span> that closes the Modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modalin
// btn.onclick = function() {
//   console.log('modal open');
//   modal.style.display = 'block';
// }
function modalOn(num) {
  console.log('modal open');
  modal.style.display = 'block';
  var baa = imgArray[(num-1)];
  var foo = "<h4>" + baa.title + "</h4>";
  foo += "<p>" + baa.content + "</p>";
  foo += baa.image;
  document.getElementById('myTarget').innerHTML = foo;
}

// When the user clicks on the span (x), close the modalin
span.onclick = function() {
  console.log('modal close');
  modal.style.display = 'none';
}

// when the user clicks anywhere outside the modalin
window.onclick = function(event) {
  if(event.target == modal) {
    console.log('modal close');
    modal.style.display = 'none';
  }
}
