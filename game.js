var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ['red', 'blue', 'green', 'yellow'];

var level;

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 3) + 1;
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$('#' + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);

	level++;
	$('#level-title').text('Level ' + level);
}

$('.btn').on('click', function (event) {
	var userChosenColour = event.target.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);

	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
	var audio = new Audio('./sounds/' + name + '.mp3');
	audio.play();
}

function animatePress(currentColour) {
	$('#' + currentColour).addClass('pressed');
	setTimeout(() => {
		$('#' + currentColour).removeClass('pressed');
	}, 100);
}

var gameStart = false;
$(document).on('keydown', function (event) {
	if (gameStart === false) {
		gameStart = true;

		userClickedPattern = [];

		nextSequence();
		level = 0;
		$('#level-title').text('Level ' + level);
		console.log('---------- Game Started ----------');
	}
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log('Success');
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(() => nextSequence(), 1000);

			userClickedPattern = [];
		}
	} else {
		console.log('Wrong');
		$('body').addClass('game-over');
		setTimeout(() => {
			$('body').removeClass('game-over');
		}, 200);
		$('#level-title').text('Game Over, Press Any Key to Restart');
		playSound('wrong');

		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	gameStart = false;
}
