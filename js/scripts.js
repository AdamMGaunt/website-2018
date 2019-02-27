/*========== Scripts ==========*/
// globals
var menuOpen = false;
var windowWidthInit = window.innerWidth;
var windowHeightInit = window.innerHeight;

$(document).ready(function (){
    var foo = $('#nav-top');
    var baa = $('.nav-collapse');
    // console.log(windowWidthInit);
    // foo.css('left', windowWidthInit + 'px');
    // $('#nav-top').css('height',windowHeightInit);
    $('.navbar-toggler').click(function(){
      console.log("clicked");
      console.log(this.attributes[5].value);
      if(this.attributes[5].value !== 'true') {
        console.log('open menu');
        var menuIcon = $('.navbar-toggler-icon');
        menuIcon.fadeOut('fast',function(){
          menuIcon.html('<i class="fa fa-times"></i>');
          menuIcon.fadeIn('fast');
        });
      } else {
        console.log('close menu');
        var menuIcon = $('.navbar-toggler-icon');
        menuIcon.fadeOut('fast',function(){
          menuIcon.html('<i class="fa fa-bars"></i>');
          menuIcon.fadeIn('fast');
        });
      }
    });
    $(".nav-btn").click(function (){
        var link = this.attributes[1].value;
        console.log(link);
        if($(link).id === 'top') {
            $('html, body').animate({
                scrollTop: $(link).offset().top
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: ($(link).offset().top -100)
            }, 1000);
        }
        closeMenu(this);
    });
    pageInit();
});


function pageInit() {
    $('nav-top').css('left', windowWidthInit + 'px');
    // $('.feature').css('height', windowHeightInit);
    // $('.feature').find('div').css('padding-top', ((windowHeightInit / 2) - 44));
    // $('#moveDown').css('top', (windowHeightInit - 50));
    // $('#moveDown').css('left', ((windowWidthInit/2) - 20));
    // $('.content').css('min-height', windowHeightInit);
    // var contactHeight = $('.contact').innerHeight();
    // $('.contact').css('padding-top', ((windowHeightInit - contactHeight)/2));
    // $('.contact').css('padding-bottom', ((windowHeightInit - contactHeight)/2));
    // $('#bottom').css('min-height', (windowHeightInit - 150));
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

/* Smooth Scroll in services page */
$(".price-btn").click(function (){
    var link = this.attributes[0].value;
    console.log(link);
    if($(link).id === 'top') {
        $('html, body').animate({
            scrollTop: $(link).offset().top
        }, 1000);
    } else {
        $('html, body').animate({
            scrollTop: ($(link).offset().top -50)
        }, 1000);
    }
});

$('.nav-collapse').click(function(){
    console.log("slide");
    var foo = $('#nav-top');
    var menuWidth = foo.innerWidth();
    if(menuOpen !== true ){
        openMenu(windowWidthInit,menuWidth);
    } else {
        closeMenu(windowWidthInit,menuWidth);
    }
});

// open and close toggler
function menuToggle() {
  if(!$(".collapse").show) {
    // toggle
    openMenu();
  } else {
    closeMenu();
  }
}

// Opens the top menu
function openMenu() {
    console.log("open");
    // $('#nav-top').remove('close');
    // $('#nav-top').add('open');
    // var menuIcon = $('.menu-icon');
    // menuIcon.fadeOut('fast',function(){
    //     menuIcon.html('<i class="fa fa-times"></i>');
    //     menuIcon.fadeIn('fast');
    // });
    // menuOpen = true;
    // $('#nav-top').animate({
    //     left: '0px'
    // },500);
}
// Closes the top menu
function closeMenu(e) {
    // console.log(e.parentNode.parentNode.parentNode.attributes[2].value);
    // e.parentNode.parentNode.parentNode.attributes[2].value = false;
    // var menuIcon = $('.navbar-toggler-icon');
    // menuIcon.fadeOut('fast',function(){
    //     menuIcon.html('<i class="fa fa-bars"></i>');
    //     menuIcon.fadeIn('fast');
    // });
    // $('.collapse').attributes[2].value = false;
}


// function sliderInit(num) {
//     // slider
//     var gallery = document.querySelector('#gallery' + num);
//     // console.log(gallery.querySelectorAll('.gallery-item'));
//
//     var galleryItem = gallery.querySelectorAll('.gallery-item');
//     for(var i = 0; i <galleryItem.length;i++) {
//         // console.log(galleryItem[i]);
//         galleryItem[i].style.display = 'none';
//     }
//     galleryItem[0].style.display = 'block';
// }

// Hide the menu icons till hover
function hoverIcons() {
  // toggle the menu icons
}

// Modal functions

// var modal = document.getElementById('myModal');
//
// // get the button
// var btn = document.getElementById('myBtn');
//
// // Get the <span> that closes the Modal
// var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modalin
// btn.onclick = function() {
//   console.log('modal open');
//   modal.style.display = 'block';
// }
// function modalOn(num) {
//   console.log('modal open');
//   modal.style.display = 'block';
//   var baa = imgArray[(num-1)];
//   var foo = "<h4>" + baa.title + "</h4>";
//   foo += "<p>" + baa.content + "</p>";
//   foo += baa.image;
//   if(baa.link !== '') {
//       foo += "<p>" + baa.link + "</p>";
//   }
//   document.getElementById('myTarget').innerHTML = foo;
// }
//
// // When the user clicks on the span (x), close the modalin
// span.onclick = function() {
//   console.log('modal close');
//   modal.style.display = 'none';
// }
//
// // when the user clicks anywhere outside the modalin
// window.onclick = function(event) {
//   if(event.target == modal) {
//     console.log('modal close');
//     modal.style.display = 'none';
//   }
// }
