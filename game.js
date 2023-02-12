var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Way to keep track if game is started or not, so you only call nextSequence() on first keypress.
var started = false;

// Create new variable called level and start at 0
var level = 0;

// When any key is pressed start the game and call nextSequence function. This also listens for the key to restart after losing.
$(document).keydown(function () {
    if (!started){
        nextSequence();
        started = true;
    }
});



$(".btn").click(function () {

    // Store the btn clicked id color the the userChosenColor variable.
    var userChosenColor = $(this).attr("id");

    // Adds the userChosenColor to the userClickedPattern array.
    userClickedPattern.push(userChosenColor);

    // Calls the playSound function & plays a sound when the class btn is clicked based on the color id.
    playSound(userChosenColor);

    // Calls animatePress function 
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    // Check if most recent userClicked answer is same as the random  gamePattern. If yes, log "success", if no log "wrong"
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

        console.log("success"); 
         // If previously correct, check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            // Call nextSequence(); after 1000 milisecond delay. 
            setTimeout(function () {
                nextSequence();  
            }, 1000);
        }
    } else {
        console.log("wrong");

        // Play the wrong sound when answer is wrong.
        playSound("wrong");

        // Add the game-over class to the body & remove the class from the body after 200 miliseconds when wrong.
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change the level-title to game over response when answer is wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// Function which generates a random number between 0-3(4 total), uses number to select buttonColor from array then adds to the gamePattern array.
// Then causes the corresponding randomChosenColor to fadout and fadein after 100 miliseconds each. Then plays the randomChosenColor sound with playSound function.
function nextSequence() {
    userClickedPattern = [];

    // This increases the current variable level by 1 everytime the function is called.
    level ++;
    
    // Change level-title by taking the current level & adding 1. Example: "Level 1"
    $("#level-title").text("Level " + level);

    // Generate a random number and round down between 0-3 
    var randomNumber = Math.floor(Math.random() * 4);

    // Select one of the buttonColors based on the random number generated
    var randomChosenColor = buttonColors[randomNumber];

    // Add the randomChosenColor at the end of the gamePattern array
    gamePattern.push(randomChosenColor);

    // Select the button color id using therandomChosenColor and cause it to fadeOut and then fadeIn
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    // Call the playSound function to play the sound of the randomChosenColor.
    playSound(randomChosenColor);
}

// Function which uses the corresponding color sound based on the input given, such as userChosenColor or randomChosenColor. Then plays the audio sound.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function which takes the currentColor using the id & adds the css class pressed causing a white box shadow & grey background. 
// After 100 miliseconds this removes the class from the current color.
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to reset variables and start over game.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}