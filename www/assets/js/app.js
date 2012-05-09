var highScore;
var dead;
var framespersecond;
var accelerationMultiplicationFactor;

var gameStartListener = function(){ 
     window.removeEventListener("touchstart", gameStartListener, false);
    //jaws.pause(menuState)
     jaws.start(myGameState,{fps:60});
    
     //jaws.stop(menuState)
}

var backToStartScreen = {
    startScreen : function (){   
        //jaws.clear();
        jaws.start(menuState,{fps:60});
    }
}
var mycurrentscore;
var myGameState = {
    
		setup: function () {
            
            //jaws.clear()
            
            mycurrentscore = 0;
			road = new jaws.Parallax({repeat_x: true, repeat_y: true});
            var thisBackground = "assets/img/road.png"
            var thisBlur = "assets/img/Blur.png"
            blur = new jaws.Sprite({image: thisBlur, x:0, y:0 });
			road.addLayer({image: thisBackground, x:0, y: jaws.height, damping: 0.5});
            Characters.setup();
		},
		update: function () {
            if (!dead) {
                //console.log(countingloop)
                road.camera_y -= 0.2*dt;
                mycurrentscore += 1;
            }
           // Game.update();
            Characters.update();
        },
        getScore: function () {
                //return mycurrentscore;
        },
		draw: function () {
            if (dead)
            {
                if (mycurrentscore > highScore)
                {
                    highScore = mycurrentscore
                }
            }
            
			//jaws.context.clearRect(0,0,jaws.width,jaws.height);
			road.draw();
            blur.draw();
            Characters.draw();
            jaws.context.textAlign  = "right";
            jaws.context.fillStyle  = "white";
            jaws.context.font       = "bold 20px chicagobold";
            jaws.context.fillText("SCORE:" + mycurrentscore, jaws.width - 10, 20);
            
            jaws.context.textAlign  = "left";
            jaws.context.fillStyle  = "white";
            jaws.context.font       = "bold 20px chicagobold";
            jaws.context.fillText("HI-SCORE:" + highScore, 10, 20);
           // Game.draw(jaws.context);
            if (Game.getScore() > highScore){
                
                ReadWriteHighScore.setHighScore(Game.getScore());
                ReadWriteHighScore.writetofile();
            }
            
		}
	}


var menuState = {
        setup: function () {
            document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
            window.addEventListener("touchstart", gameStartListener, false);
            var thisBackground = "assets/img/StartSreen.png"
            splashScreen = new jaws.Sprite({image: thisBackground, x:0, y:0 });
        },
    
        draw: function () {
            splashScreen.draw();
            jaws.context.textAlign  = "right";
            jaws.context.fillStyle  = "white";
            jaws.context.font       = "bold 20px chicagobold";
            jaws.context.fillText("HI-SCORE : " + highScore, 240, 280);
        } 
    };

var SplashState = {
setup: function () {
    
    var thisBackground = "assets/img/Default.png"
    splashScreen = new jaws.Sprite({image: thisBackground, x:0, y:0 });
    window.setTimeout(function(){ backToStartScreen.startScreen() }, 10);
},
    
draw: function () {
    splashScreen.draw();
} 
};

function startTheGame(score) {
    
    highScore = score;
    jaws.assets.add(["assets/img/splash.png", "assets/img/road.png", "assets/img/road@x2.png", "assets/img/characterSprite.png", "assets/img/obst_touristSprite.png", "assets/img/copper.png" , "assets/img/manhole.png" , "assets/img/car.png", "assets/img/devil.png", "assets/img/bike.png", "assets/img/cone.png" , "assets/img/MyCharacterDistroyed.png", "assets/img/Blur.png" ]);
    
    var deviceVersion = device.version;
    
    
    console.log(device.version)
    jaws.start(menuState,{fps:60});
    //alert("HELLO")
    
};






