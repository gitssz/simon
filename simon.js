var btnColor=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
var randomChosenColor;
var btnDiv=document.getElementsByClassName('Btn');
var level=0;
var started =false;

$(document).on('keypress',function(){
    if(!started){
        $("h1").text="Level "+ level;
        nextSequence();
    started=true;
    }
});

function nextSequence()
{   
    started=true;
    userClickedPattern=[];
    randomChosenColor=btnColor[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    document.querySelector('h1').innerText="Level "+ level;
    console.log(gamePattern );
}
 
$(".Btn").click(function(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(current){
    if(gamePattern[current]===userClickedPattern[current])
    {
        // console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                level++;
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("fail");
        playSound("wrong");
        $("body").addClass('gameOver');
        $("#title").text("Game Over Press any key to restart");
        setTimeout(function(){
            $("body").removeClass('gameOver');
        },100);
        gameOver();
    }
}

function gameOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name){
    var Audioname="sounds/"+name+".mp3"
    var btnAudio= new Audio(Audioname);
 btnAudio.play();
}

function animatePress(currentColor){
    $('#'+ currentColor).addClass('animation');
    setTimeout(function(){
        $('#'+currentColor).removeClass('animation');
    },80)
}

document.getElementById("resetBtn").onclick=function(){
    level=0;
    $("h1").text="Press a key to start.";
};