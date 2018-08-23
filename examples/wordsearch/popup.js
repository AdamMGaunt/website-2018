/* Begin Pop Up */
var counter = 0;
var popup = document.getElementById("popup");
var screenLeft = window.innerWidth;
var screenTop = window.innerHeight;
popupCenter(popup, 400, 300);
// popup.style.display = "none";
// button event to open the popup
function openPopUp() {
    console.log('Open Popup');
    var open = document.getElementById("popupOpen");
    if(counter == 0) {
        openPopup(open);
        counter++;
    }else{
        console.log("open error");
        counter--;
    }
}
// button event to close the popup
function closePopUp() {
    console.log('Close Popup');
    var close = document.getElementById("popupClose");
    if(counter == 1){
        closePopup(close);
        counter--;
    }else{
        console.log("open error");
        counter++;
    }
}
// center and size the popup
function popupCenter(popup, w, h) {
    popup.style.width = w +"px";
    popup.style.height = h +"px";
    var left = (screenLeft/2) - (w/2);
    var top = (screenTop/2) - (h/2);
    popup.style.left = left +"px";
    popup.style.top = top +"px";
    popup.style.display = "none";
}
// open the popup
function openPopup(open) {
    console.log('Open');
    popup.style.display = "block";
    // console.log("open");
}
// close the popup
function closePopup(close) {
    console.log('Closed');
    popup.style.display = "none";
    // console.log("close");
}
/* End Pop Up */

