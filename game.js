var yourName = prompt("What is your name?");
var firstLetter = yourName.slice(0, 1);
var upperFirstLetter = firstLetter.toUpperCase();
var restLetter = yourName.slice(1, yourName.length);
var lowerRestLetter = restLetter.toLowerCase();
myFunction();

function myFunction() {
    document.getElementById("welcomeSpeech").innerHTML = "Welcome " + upperFirstLetter + lowerRestLetter + "!";
}


$(".Help").on("click", function() {
    $(helpFunction).fadeToggle();
})

function helpFunction() {
    document.getElementById("help").innerHTML = "The game shows the first colour in the sequence e.g Red. The Player clicks on the Red button. Next, the game shows the next colour e.g Blue, the player has to remember the sequence is red, blue and so you click red then blue. Next, the game shows another color e.g green, then the sequence you should click is red, blue, green. and so on till you're not capable of remembering the sequence. C'mon! let's see how retentive you are!";
}


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".Start").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Click Start to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}