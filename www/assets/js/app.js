var highScore;
var dead;
var mycurrentscore;

var gameStartListener = function(){ 
     window.removeEventListener("touchstart", gameStartListener, false);
     jaws.start(myGameState,{fps:60});
}

var backToStartScreen = {
    startScreen : function (){   
        jaws.start(menuState,{fps:60});
    }
}

var myGameState = {
    
		setup: function () {
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
                road.camera_y -= 0.2*dt;
                mycurrentscore += 1;
            }
            Characters.update();
        },
    
		draw: function () {
            if (dead)
            {
                if (mycurrentscore > highScore)
                {
                    highScore = mycurrentscore
                    ReadWriteHighScore.setHighScore(highScore)
                    ReadWriteHighScore.writetofile();
                }
            }
            
			jaws.context.clearRect(0,0,jaws.width,jaws.height);
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

function startTheGame(score) {
    
    highScore = score;
    jaws.assets.add(["assets/img/splash.png", "assets/img/road.png", "assets/img/road@x2.png", "assets/img/characterSprite.png", "assets/img/obst_touristSprite.png", "assets/img/copper.png" , "assets/img/manhole.png" , "assets/img/car.png", "assets/img/devil.png", "assets/img/bike.png", "assets/img/cone.png" , "assets/img/MyCharacterDistroyed.png", "assets/img/Blur.png" ]);
    jaws.start(menuState,{fps:60});
    
};






