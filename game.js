
var userCLickedPattern = [];


var buttonColors =  ['red','blue','green','yellow'];


var gamePattern = [];


var level = 0;

var started = false;


$(document).keypress(function(){

    if(!started){

        $('#level-title').text('Level '+ level);
        nextSquence();
        started=true;

    }

});

$(document).click(function(){
    if(!started){

        $('#level-title').text('Level '+ level);
        nextSquence();
        started=true;

    }
})

$('.btn').click(function(){

    var userChosenColor = $(this).attr('id');
    userCLickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userCLickedPattern.length-1);
});



function nextSquence(){

    level++;

    $('#level-title').text('Level '+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $('#'+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
}

function playSound(name)
{
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor){

    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed'),100
    });
}





function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userCLickedPattern[currentLevel]){

        if(gamePattern.length === userCLickedPattern.length){

            setTimeout(function(){
                nextSquence(),100
            });
        }

    }

    else{
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over'),200
        });
        var audio2 = new Audio('sounds/wrong.mp3');
        audio2.play();
        $('#level-title').text('Game Over,Press Any Key To Restart');

        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    userCLickedPattern = [];
    started = false;

}
