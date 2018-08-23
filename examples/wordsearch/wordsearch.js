// Set Globals
var puzzle = ""; // set building puzzle
var letterBoxCounter = "";
var myPuzzle = "";

var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var opening = [
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 1-8
     0 , 0 , 0 , 0 ,"S", 0 , 0 , 0 , // 9-16
     0 , 0 , 0 , 0 ,"E", 0 , 0 , 0 , // 25-32
     0 , 0 , 0 , 0 ,"A", 0 , 0 , 0 , // 17-24
     0 , 0 ,"W","O","R","D", 0 , 0 , // 33-40
     0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , // 41-48
     0 , 0 , 0 , 0 ,"H", 0 , 0 , 0 , // 49-56
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0   // 56-64
];

var answerKey1 = [
    0 ,"t", 0 ,"p", 0 , 0 , 0 , 0 , // 1-8
    0 ,"a", 0 ,"o", 0 ,"s", 0 ,"b", // 9-16
    0 ,"c","a","p","i","t","a","l", // 17-24
    0 ,"k","o","c", 0 ,"a", 0 ,"i", // 25-32
    0 ,"l", 0 ,"o", 0 ,"p", 0 ,"n", // 33-40
    0 ,"e", 0 ,"r","k","l", 0 ,"k", // 41-48
    0 , 0 , 0 ,"n", 0 ,"e", 0 , 0 , // 49-56
    "p","e","r","s","o","n", 0 , 0   // 56-64
];
var question1 = ['tackle','popcorn','blink','capital','cook','preson','staple'];
var answerKey2 = [
    "l","e","a","r","n", 0 , 0 , 0 , // 1-8
    "p", 0 ,"c", 0 , 0 , 0 , 0 , 0 , // 9-16
    "u", 0 ,"o", 0 , 0 ,"c","a","r", // 17-24
    "p", 0 ,"n", 0 , 0 , 0 , 0 , 0 , // 25-32
    "p", 0 ,"t","a","p","p","l","e", // 33-40
    "y", 0 ,"r", 0 , 0 , 0 , 0 , 0 , // 41-48
     0 , 0 ,"o", 0 , 0 , 0 , 0 , 0 , // 49-56
     0 , 0 ,"l","o","r","e","m", 0   // 56-64
];
var question2 = ['learn','puppy','control','car','apple','lorem'];
var answerKey3 = [
     0 , 0 , 0 , 0 , 0 , 0 , 0 ,"t", // 1-8
     0 , 0 , 0 , 0 ,"c", 0 , 0 ,"o", // 9-16
     0 , 0 ,"b","e","a","n", 0 ,"w", // 17-24
     0 , 0 , 0 , 0 ,"r", 0 , 0 ,"e", // 25-32
     0 ,"b","e","a","r", 0 ,"f","r", // 33-40
     0 , 0 , 0 , 0 ,"o", 0 ,"i", 0 , // 41-48
     0 , 0 ,"c","i","t","y","l", 0 , // 49-56
     0 , 0 , 0 , 0 , 0 , 0 ,"m", 0   // 56-64
];
var question3 = ['bean','carrot','tower','film','city','bear'];

/* template
var answerKey = [
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 1-8
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 9-16
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 17-24
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 25-32
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 33-40
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 41-48
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , // 49-56
     0 , 0 , 0 , 0 , 0 , 0 , 0 , 0   // 56-64
];
*/
var myAnswerKey = [];


// build puzzle
function buildPuzzle(thePuzzle) {
    // reset puzzle
    myPuzzle = thePuzzle;
    // console.log("current puzzle is " + myPuzzle);
    var wordsearch = document.getElementById("wordsearch");
    puzzle = '';
    puzzle += "<div class='row'>";
    for(i=1; i<=myPuzzle.length; i++){
        if(letterBoxCounter == 8){
            puzzle += "</div><div class='row'>";
            letterBoxCounter = 0;
        }
        puzzle += "<div id='" + i + "' class='letter' onclick='selectLetter(" + i + ")' ></div>";
        letterBoxCounter++;
    }
    puzzle += "</div>";
    wordsearch.innerHTML = puzzle;
    fillPuzzle(myPuzzle);
}
function fillQuestions(myQuestionList) {
    // fill the question boxes
    var foo = '';
    // console.log("add questions: " + myQuestionList[0]);
    // console.log(myQuestionList.length);
    for(var i = 0; i < myQuestionList.length; i++) {
        // console.log(i);
        foo += '<div class="questions">'+ myQuestionList[i] +'</div>';
    }
    // console.log(foo);
    document.getElementById('questionBox').innerHTML = foo;
}

// on/off function for selecting leters
function selectLetter(num) {
    var letterBox = document.getElementById(num);
    if(letterBox.value == 0) {
        letterBox.value = "1";
        //console.log("On: " + letterBox.value);
    }else if(letterBox !== 0) {
        letterBox.value = "0";
        //console.log("Off: " + letterBox.value);
    }
    //console.log(letterValue);
    if (letterBox.classList) {
        letterBox.classList.toggle("on");
    } else {
        /*var classes = letterBox."on".split(' ');
        var existingIndex = classes.indexOf("on");
        if (existingIndex >= 0){
            classes.splice(existingIndex, 1);
        }else{
            classes.push("on");
            letterBox."on" = classes.join(' ');
        }*/
        console.log("On/Off Error");
    }
}


// then randomize the remaining letters
function fillPuzzle(myPuzzle) {
    for(i=0; i < myPuzzle.length; i++){
        var letterBox = document.getElementById((i + 1));
        var result = myPuzzle[i];
        if( result !== 0){
            //console.log(result);
            if(myPuzzle === opening) {
                letterBox.innerHTML = '<strong>' + result + '</strong>';
                letterBox.value = "0";
                letterBox.classList.add('letterOpening');
            } else {
                letterBox.innerHTML = result;
                letterBox.value = "0";
            }
            // console.log(letterBox.value);
        }else if(result == 0) {
            // add random letter
            var x = Math.floor((Math.random() * 26) + 0);
            var foo = letters[x];
            letterBox.innerHTML = foo;
            letterBox.value = "0";
        }else{
            console.log("fillPuzzle error");
            break;
        }
    }
}

// Check the answers to the key
function submitPuzzle() {
    for(i=0; i <= (myPuzzle.length - 1); i++) {
        var letterBox = document.getElementById((i + 1));
        var myLetter = letterBox.innerHTML;
        if(letterBox.value == 1) {
            myAnswerKey.push(myLetter);
        }else if(letterBox.value == 0) {
            myAnswerKey.push(0);
        }else{
            console.log("submitPuzzle error");
            break;
        }
    }
    // console.log(myAnswerKey);
    compareArray();
    myAnswerKey = [];
}

// function to compare the two arrays
function compareArray() {
    var counter = 0;
    var myAnswer = document.getElementById("myAnswer");
    for(k = 0; k <= (myAnswerKey.length -1); k++) {
        var inputBox = document.getElementById((k + 1));
        if(myAnswerKey[k] === myPuzzle[k]) {
            counter++;
        }
        else if(myAnswerKey[k] !== myPuzzle[k]) {
            counter += 0;
        }else{
            console.log("error");
            break;
        }
    }
    // console.log("Counter: " + counter);
    // console.log("Answer Key Length: " + myPuzzle.length);
    if(counter == myPuzzle.length){
        console.log("Your are correct");
        myAnswer.innerHTML = "Your are correct!";
        myAnswer.style.color = "green";
        myAnswer.classList.remove("incorrect");
        myAnswer.classList.add("correct");
    }else{
        console.log("Your are incorrect");
        myAnswer.innerHTML = "You are incorrect.  Please try again.";
        myAnswer.style.color = "red";
        myAnswer.classList.remove("correct");
        myAnswer.classList.add("incorrect");
    }
}

// Reset the puzzle
function resetPuzzle() {
    var myAnswer = document.getElementById("myAnswer");
     for(k = 0; k < myPuzzle.length; k++) {
        var letterBox = document.getElementById((k + 1));
        if(letterBox.value == 1) {
            letterBox.classList.toggle("on");
            letterBox.value = "0";
        }
    }
    myAnswerKey = [];
    myAnswer.innerHTML = "";
    myAnswer.classList.remove("correct");
    myAnswer.classList.remove("incorrect");
    console.log("Reset is complete");
}
