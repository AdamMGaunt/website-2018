// Set Globals
var puzzle = ""; // set building puzzle
var letterBoxCounter = "";
var posAfter = [];

/* 3 x 3 */
var posBefore = [0,1,2,3,4,5,6,7,8];
var initKey = [0,1,2,3,4,5,6,7,8];
var answerKey = [0,1,2,3,4,5,6,7,8];
//var answerKey2 = [1,2,3,4,5,6,7,8,0];
var rowCount = 3;



// shuffle the array before input
function shuffle(initKey) {
    var j, x, i;
    for (i = initKey.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = initKey[i - 1];
        initKey[i - 1] = initKey[j];
        initKey[j] = x;
    }
}

var x = [];
// build puzzle
function initPuzzle() {
    shuffle(initKey);
    // console.log("initKey: " + initKey);
    x = initKey;
    puzzle += "<div class='row'>";
    for(i=0; i < answerKey.length; i++){
        if(letterBoxCounter == rowCount){
            puzzle += "</div><div class='row'>";
            letterBoxCounter = 0;
        }
        var displayNum = initKey[i];
        // console.log("displayNum: " + displayNum);
        // img = "<img src='../../graphics/img" + displayNum + ".png' >";
        puzzle += "<div id='box" + i + "' class='box' onclick='switchBlock(" + i + ")' ><div id='" + i + "'>" + displayNum + "</div></div>";
        letterBoxCounter++;
    }
    letterBoxCounter = 0;
    puzzle += "</div>";
    document.getElementById("slidePuzzle").innerHTML = puzzle;
    for(var i=0;i<answerKey.length;i++){
        var displayNum = x[i];
        document.getElementById("box" + i).classList.add("img" + displayNum);
    }
}

// Add Images to the puzzle
function addImage(arr1,arr2,myKey,num) {
    for(var i=0;i<answerKey.length;i++){
        var displayNum = arr1[i];
        var displayNumOld = arr2[i];
        // console.log("initKey x: " + arr1);
        // console.log("initKey x: " + arr2);
        document.getElementById("box" + i).classList.remove("img" + displayNumOld);
        document.getElementById("box" + i).classList.add("img" + displayNum);
        myAnimation(myKey,num);
    }
}

// ========== Animations ============== //
function moveUp(myKey,num) {
    // Add new movement Classes
    // movement
    document.getElementById("box" + myKey).classList.add("moveUp");
    document.getElementById("box" + num).classList.add("moveDown");
}
function moveDown(myKey,num) {
    // movement
    document.getElementById("box" + myKey).classList.add("moveDown");
    document.getElementById("box" + num).classList.add("moveUp");
}
function moveLeft(myKey,num) {
    // movement
    document.getElementById("box" + myKey).classList.add("moveLeft");
    document.getElementById("box" + num).classList.add("moveRight");
}
function moveRight(myKey,num) {
    // movement
    document.getElementById("box" + myKey).classList.add("moveRight");
    document.getElementById("box" + num).classList.add("moveLeft");
}

// ========== Clear Old Animations ============== //
function removeClass(myKey,num) {
    // Variables
    var boxNum = document.getElementById("box" + num);
    var boxMyKey = document.getElementById("box" + myKey);
    // Remove old classes from previous animations
    if(boxNum.classList) {
        if(boxNum.classList.contains("moveUp")){
            boxNum.classList.remove("moveUp");
            // console.log("removed class moveUp");
        }
        if(boxNum.classList.contains("moveDown")){
            boxNum.classList.remove("moveDown");
            // console.log("removed class moveDown");
        }
        if(boxNum.classList.contains("moveLeft")){
            boxNum.classList.remove("moveLeft");
            // console.log("removed class moveLeft");
        }
        if(boxNum.classList.contains("moveRight")){
            boxNum.classList.remove("moveRight");
            // console.log("removed class moveRight");
        }
    }
    if(boxMyKey.classList) {
        if(boxMyKey.classList.contains("moveUp")){
            boxMyKey.classList.remove("moveUp");
            // console.log("removed class moveUp");
        }
        if(boxMyKey.classList.contains("moveDown")){
            boxMyKey.classList.remove("moveDown");
            // console.log("removed class moveDown");
        }
        if(boxMyKey.classList.contains("moveLeft")){
            boxMyKey.classList.remove("moveLeft");
            // console.log("removed class moveLeft");
        }
        if(boxMyKey.classList.contains("moveRight")){
            boxMyKey.classList.remove("moveRight");
            // console.log("removed class moveRight");
        }
    }
}

// ========== Animation ============== //
function myAnimation(myKey,num) {
    // UP
    if(myKey == (num - 3)) {
        // animate up
        // clear animations
        // console.log("Up");
        setTimeout(moveUp(myKey,num),150);
    }
    // DOWN
    else if(myKey == (num + 3)) {
        // animate up
        // clear animations
        // console.log("Down");
        setTimeout(moveDown(myKey,num), 150);
    }
    // LEFT
    else if(myKey == (num - 1)) {
        // animate up
        // console.log("Left");
        setTimeout(moveLeft(myKey,num), 150);
    }
    // RIGHT
    else if(myKey == (num + 1)) {
        // animate up
        // console.log("Right");
        setTimeout(moveRight(myKey,num), 150);
    }
    else{
        console.log("Error");
    }
}

var firstClick = "";
var secondClick = "";
var num1 = "";
var num2 = "";

function switchBlock(num) {
    // if it have 1st click then do this
    if(firstClick !== "") {
        num2 = num;
        secondClick = document.getElementById(num).innerHTML;
        // console.log("secondClick: " + secondClick);
        removeClass(num1,num2);
        if(num1 == (num2 + 1) || num1 == (num2 - 1) || num1 == (num2 + 3) || num1 == (num2 - 3)) {
            posBefore = [];
            for(var i=0;i<answerKey.length;i++) {
                var boxNum1 = document.getElementById(i).innerHTML;
                // console.log("boxNum1: "+ boxNum1);
                posBefore.push(boxNum1);
            }
            var box1 = document.getElementById(num1);
            var box2 = document.getElementById(num2);
            box2.innerHTML= firstClick;
            box1.innerHTML = secondClick;
            for(var i=0;i<answerKey.length;i++) {
                var boxNum = document.getElementById(i).innerHTML;
                posAfter.push(boxNum);
            }
            // console.log("posAfter: " + posAfter);
            addImage(posAfter,posBefore,num1,num2);
            /*for(var i=0;i<answerKey.length;i++) {
                document.getElementById(i).innerHTML = posAfter[i];
            }*/
        }else{
            console.log("incorrect input");
        }
        // clear the vars after the switch is done
        // document.getElementById("box" + num1).style.border = "2px solid #fff";
        document.getElementById("box" + num1).style.border = "none";
        firstClick = "";
        secondClick = "";
        num1 = "";
        num2 = "";
        // console.log("firstClick Clear: " + firstClick);
        // console.log("secondClick Clear: " + secondClick);
    }else{
        num1 = num;
        firstClick = document.getElementById(num).innerHTML;
        document.getElementById("box" + num1).style.border = "2px solid #A96138";
        // console.log("firstClick: " + firstClick);
    }
    boxNum = "";
    posAfter = [];
}

// function to compare the two arrays
function compareArray() {
    //console.log("compareArray Start");
    var boxNum;
    for(var i=0;i<answerKey.length;i++) {
        boxNum = document.getElementById(i).innerHTML;
        posAfter.push(boxNum);
    }
    //console.log("posAfter check: " + posAfter);
    //console.log("answerKey check: " + answerKey);
    // posAfter = [4,1,2,5,6,3,"key",8,7];
    var counter = 0;
    var myAnswer = document.getElementById("myAnswer");
    for(k = 0; k < answerKey.length; k++) {
        // var inputBox = document.getElementById((k + 1));
        if(posAfter[k] == answerKey[k]) {
            counter++;
        }
        else if(posAfter[k] !== answerKey[k]) {
            counter += 0;
        }else{
            console.log("error");
            break;
        }
    }
    //console.log("Counter: " + counter);
    //console.log("Answer Key Length: " + answerKey.length);
    if(counter == answerKey.length){
        // console.log("Your are correct");
        myAnswer.innerHTML = "Your are correct!";
        myAnswer.classList.remove("incorrect");
        myAnswer.classList.add("correct");
    }else{
        // console.log("Your are incorrect");
        myAnswer.innerHTML ="You are incorrect.  Please try again.";
        myAnswer.classList.remove("correct");
        myAnswer.classList.add("incorrect");
    }
    counter = 0;
}
function resetPuzzle() {
    puzzle = "";
    document.getElementById("slidePuzzle").innerHTML = "";
    initPuzzle();
    myAnswerKey = [];
    myAnswer.innerHTML = "";
    myAnswer.classList.remove("correct");
    myAnswer.classList.remove("incorrect");
    // console.log("Reset is complete");
}
