// Set Globals
var myQuestion,
myQuestionNum,
dailyDoubleNum,
score,
scoreDisplay,
windowSize,
scoreBox,
tableWidth;

var completedQuestions = [];

var rows = jeopardyGame2[0].content.length;
var columns = jeopardyGame2.length;
var totalQuestions = (rows * columns);

// Define Inputs
scoreDisplay = document.getElementById('tempNumDisplay');
scoreBox = document.getElementById('scoreBox');
console.log(scoreDisplay.offsetWidth);
windowSize = document.getElementById('jeopardyBoard');
// tableWidth = document.getElementById('jeopardyTable').offsetWidth;
// console.log(tableWidth);
// create INIT function to initalize score and randomize questions
function jeopardyInit() {
    // set score at 0
    document.getElementById("myScore").innerHTML = 1000;
    // set feedback statement
    document.getElementById("feedback").innerHTML = 'Enter your answer above.';
    // Hide daily double bet input
    document.getElementById('dailyDouble').style.display = "none";

    // Create the table with all the tiles
    var table = document.getElementById('jeopardyTiles');
    var tableContent = '<tr>'
    for(var i = 0; i < jeopardyGame2.length;i++) {
        console.log(jeopardyGame2[i].catagory);
        tableContent += '<th>' + jeopardyGame2[i].catagory + '</th>';
    }
    tableContent += '</tr>';

    var x = 0;
    // determine the amount rows and columns needed

    var tempColumn;
    for(var k = 0; k < rows; k++) {
        tempColumn = jeopardyGame2[k].content;
        tableContent += '<tr>';
        for(var y = 0; y < columns;y++){
            // console.log('Get Array length of content ' + tempColumn[k].value);
            // get each incremmentting value
            var foo = tempColumn[k].value;
            // tempColumn = tempColumn[y].value;
            if(tempColumn[k].value === foo){
                tableContent += '<td id="jBtn' + (x +1) + '" class="jBtn" onclick="showQuestion(' + (y+1) + ',' + (k+1) + ',' + (x+1) + ')">' + tempColumn[k].value + '</td>';
                x++;
            }
        }
        tableContent += '</tr>';
        // console.log(tempColumn.value);
        // tableContent += '<td>Lorem</td>';
    }

    // Test content created
    // console.log(tableContent);

    // insert into the HTML
    table.innerHTML = tableContent;

    // Set the dircetions width param
    // document.getElementById('directions').style.width = '700px';

    // randomly pick a tile to be the daily double
    dailyDoubleNum = Math.random() * (totalQuestions - 1) + 1;
    dailyDoubleNum = Math.round(dailyDoubleNum);
    console.log('Random Number: ' + dailyDoubleNum);
}

/*
    Build a function to create the html of the program based off the data.js file
    Include in the Init function.
    Create new element in array for catagory and catagory number.
    Question.number can be replaced with the array Key - check with random DD function
    change data structure to:
    to get data call: var foo = jepardyGame.col[1];
    foo = foo.content[1].catagory;
    var jeopardyGame =
    [
        {
            "col:"1",
            "content":"[
                {
                    "catagory": "Science",
                    "number":"1",
                    "question":"Question",
                    "answer":"Answer",
                    "value":"200"
                },
                {
                    "catagory": "Science",
                    "number":"2",
                    "question":"Question",
                    "answer":"Answer",
                    "value":"400"
                }
            ]"
        },
        {
            "col:"2",
            "content":"[
                {
                    "catagory": "Art",
                    "number":"3",
                    "question":"Question",
                    "answer":"Answer",
                    "value":"200"
                },
                {
                    "catagory": "Art",
                    "number":"4",
                    "question":"Question",
                    "answer":"Answer",
                    "value":"400"
                }
            ]"
        }
    ];
*/

var tempRows, tempCols;

// set up question in the question hopper
function showQuestion(col,number,num) {
    // reset parameters
    document.getElementById("feedback").innerHTML = 'Enter your answer above';
    document.getElementById("myAnswerBox").value = '';
    document.getElementById('dailyDouble').style.display = "none";

    // test for daily double
    if(num === dailyDoubleNum) {
        console.log('Daily Double!');
        showDD();
        document.getElementById("feedback").innerHTML = 'Please place a bet below.';
    }
    // Get Question Number
    myQuestionNum = num;
    console.log("Question: " + myQuestionNum);
    // add to temporary vars
    tempRows = number;
    tempCols = col;
    // Get the Question
    myQuestion = jeopardyGame2[(col-1)].content[(number - 1)];
    console.log(myQuestion);
    // console.log(myQuestion.question);

    // test for repeated questions
    var foo = document.getElementById('jBtn' + myQuestionNum);
    if(foo.style.backgroundColor === 'green' || foo.style.backgroundColor === 'red'){
        document.getElementById("feedback").innerHTML = '<p class="error">You have already answered this question.</p>';
        return;
    }
    // Add question to the DOC
    document.getElementById("questionBox").innerHTML = '<p>' + myQuestion.question + '</p>';
    // add focus to the answer box
    document.getElementById("myAnswerBox").focus();
}

function submitAnswer() {
    // test for repeated questions
    var foo = document.getElementById('jBtn' + myQuestionNum);
    if(foo.style.backgroundColor === 'green' || foo.style.backgroundColor === 'red'){
        return;
    }
    // Get the answer from input box
    var myAnswer = document.getElementById("myAnswerBox"); // get the HTML element input
    myAnswer = myAnswer.value.toString(); // change into string

    // push questionNum to an array to check for repeated questions

    // Get the answer from answerkey
    console.log(myQuestionNum);
    var answerKey = jeopardyGame2[(tempCols-1)].content[(tempRows - 1)].answer;

    // prepare the strings for testing
    // convert strings into a lowercase
    answerKey = answerKey.toLowerCase();
    myAnswer = myAnswer.toLowerCase();
    // console.log("myAnswer: " + myAnswer);

    // remove spaces and special characters
    myAnswer = myAnswer.replace(/[^A-Z0-9]/ig,'-');
    var myAnswerArray = myAnswer.split('-');
    // console.log('myAnswerArray: ' + myAnswerArray);

    var answerKeyArray = answerKey.replace(/[^A-Z0-9]/ig,'-');
    answerKeyArray = answerKeyArray.split('-');
    // console.log('answerKeyArray: ' + answerKeyArray);

    // Get score
    var myScore = document.getElementById("myScore").innerHTML;
    myScore = Number(myScore);
    console.log('myScore: ' + myScore);

    // test for daily double
    var foo = testMyBet();
    if(foo !== true) {
        return;
    }
    // must not allow for duplicate numbers
    completedQuestions.push(myQuestionNum);
    // console.log('Completed Questions: ' + completedQuestions);
    // variable to hold a Boolean result
    var state;

    // Test the strings to compare answers
    function testString() {
        for(var i = 0; i < myAnswerArray.length;i++) {
            // console.log('myAnswerArray: ' + myAnswerArray[i]);
            // console.log('answerKey: ' + answerKey);

            // test if the answer array has more than one value
            // use while loop to repeat the test
            var k = 0;
            if(myAnswerArray[i] === answerKeyArray[0]) {
                while(k < answerKeyArray.length) {
                    if(myAnswerArray[(i + k)] !== answerKeyArray[k]) {
                        console.log('false');
                        return false;
                    }
                    k++;
                }
                console.log('true');
                return true;
            }
        }
    }

    // Test if the answer is correct

    if(testString(state) !== true){
        // incorrect
        console.log("You are incorrect");
        // Create a feedback message for the user
        document.getElementById("feedback").innerHTML = 'You are incorrect.';
        // minus scroe from the overall socreboard with Math()

        // show points acumulated then hide
        scoreDisplay.innerHTML = '-' + score;
        scoreDisplay.style.color = 'red';
        console.log('scoreDisplay: ' + scoreBox.offsetWidth);

        // console.log((windowSize.offsetWidth / 2) - (myScore.offsetWidth / 2));
        //scoreDisplay.style.left = (windowSize.offsetWidth / 2) - (scoreBox.offsetWidth / 2) - 10;
        fadeInFadeOut();

        var totalScore = myScore - score;
        // console.log('totalScore: ' + totalScore);
        if(totalScore < 0) {
            totalScore = 0;
        }


        // update the scorboard
        document.getElementById("myScore").innerHTML = totalScore;
        countNum(totalScore,myScore);
        // put a strike through on the question
        document.getElementById('jBtn' + myQuestionNum).classList.add('bgRed');
        document.getElementById('jBtn' + myQuestionNum).style.color = '#fff';
        document.getElementById('jBtn' + myQuestionNum).innerHTML = '&#10006;';
    } else {
        // correct
        console.log("You are Correct");
        // Create a feedback message for the user
        document.getElementById("feedback").innerHTML = 'You are correct!';
        // add score to the overall scoreboard with Math()
        var totalScore = myScore + score;

        // show points acumulated then hide
        scoreDisplay.innerHTML = '+' + score;
        scoreDisplay.style.color = 'green';
        // console.log('scoreDisplay: ' + scoreBox.offsetWidth);

        // console.log((windowSize.offsetWidth / 2) - (myScore.offsetWidth / 2));
        //scoreDisplay.style.left = (windowSize.offsetWidth / 2) - (scoreBox.offsetWidth / 2) - 10;
        fadeInFadeOut();

        // console.log('totalScore: ' + totalScore);
        // update the scorboard
        document.getElementById("myScore").innerHTML = totalScore;
        countNum();
        // put a strike through on the question
        document.getElementById('jBtn' + myQuestionNum).classList.add('bgGreen');
        document.getElementById('jBtn' + myQuestionNum).style.color = '#fff';
        document.getElementById('jBtn' + myQuestionNum).innerHTML = '&#10004;';
    }
    endGame();
}

function testMyBet() {
    // seperate out of function for individual testing
    if(myQuestionNum === dailyDoubleNum) {
        console.log("daily double");
        var bet = document.getElementById('myBetBox').value;
        var totalScore = document.getElementById('myScore').innerHTML;
        totalScore = Number(totalScore); // convert into number
        // validate that your bet is a number
        var validation = {
            isNumber:function(str) {
                var pattern = /^\d+$/;
                return pattern.test(str);
            },
            isLessThan:function(str) {
                if(str <= totalScore) {
                    return true;
                }
            },
            isEmpty:function(str) {
                var pattern =/\S+/;
                return pattern.test(str);
            }
        }
        console.log('validation is number: ' + validation.isNumber(bet));
        console.log('validation is <=: ' + validation.isLessThan(bet));
        console.log('validation is empty: ' + validation.isEmpty(bet));
        if(validation.isEmpty(bet) !== true) {
            document.getElementById("feedback").innerHTML = 'You must place a bet.';
            score = 0;
            return false;
        }else if(validation.isNumber(bet) !== true) {
            document.getElementById("feedback").innerHTML = 'Your bet must be a number.';
            score = 0;
            return false;
        } else if(validation.isLessThan(bet) !== true) {
            document.getElementById("feedback").innerHTML = 'Your bet must not be greater than your total score.';
            score = 0;
            return false;
        } else{
            console.log(bet);
            score = Number(bet);
            console.log(score);
            return true;
        }
    } else {
        // Get the value of answerkey score
        console.log("Not a daily double");
        score = jeopardyGame2[(tempCols-1)].content[(tempRows - 1)].value;
        score = Number(score);
        console.log("Score: " + score);
        return true;
    }
}

function showDD() {
    var myModal = document.getElementById('dailyDouble');
    if(myModal.style.display === "none") {
        myModal.style.display = "block";
        console.log(myModal.offsetWidth);
        console.log(windowSize.offsetWidth);
        myModal.style.left = (windowSize.offsetWidth / 2) - (myModal.offsetWidth / 2);
    } else {
        myModal.style.display = "none";
    }
}

function placeBet() {
    // on click submit value to score and hide prompt
    // test for daily double
    var foo = testMyBet();
    if(foo !== true) {
        score = score * 2;
        return;
    }
    showDD();
}

function endGame() {
    if(completedQuestions.length === totalQuestions) {
        var totalScore = document.getElementById('myScore').innerHTML;
        // console.log(score);
        if(totalScore < 0) {
            totalScore = 0;
        }
        document.getElementById("feedback").innerHTML = '<h1>Game Over</h1><p>your score is:</p><h2>' + totalScore + '</h2>';
    }
}

/* JQuery */
function countNum(totalScore,myScore) {
    $('.count').each(function(){
        $(this).prop('Counter',myScore).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
};
function fadeInFadeOut() {
    $('#tempNumDisplay').fadeIn('slow','swing', function() {
        $('#tempNumDisplay').fadeOut('slow','swing');
    });
};
