//var speed = Game.getSpeed();
var splashScreen = null;
var highScore;
var dead;
var tickCount = 0;

var gameStartListener = function(){ 
    
     jaws.start(myGameState);
     window.removeEventListener("touchstart", gameStartListener, false);
    
}

var backToStartScreen = {
    startScreen : function ()
    {   
        jaws.switchGameState(menuState);
    }
}

var myGameState = {
		setup: function () {
			road = new jaws.Parallax({repeat_x: true, repeat_y: true});
            var thisBackground = "assets/img/Road.png"
            var thisBlur = "assets/img/Blur.png"
            blur = new jaws.Sprite({image: thisBlur, x:0, y:0 });
			road.addLayer({image: thisBackground, x:0, y: jaws.height, damping: 1});
           // road.addLayer({image: thisBlur, x:0, y: jaws.height, damping: 1});
            Game.setup()
            Characters.setup();
            
		},
		update: function () {
            if (!dead) {
                road.camera_y -= 6;
            }
            Game.update();
            Characters.update();
        },
		draw: function () {
            
			jaws.context.clearRect(0,0,jaws.width,jaws.height);
			road.draw();
            blur.draw();
            Characters.draw();
            Game.draw(jaws.context,highscore);
            if (Game.getScore() > highscore)
            {
                ReadWriteHighScore.setHighScore(Game.getScore());
                ReadWriteHighScore.writetofile();
            }
            
		}
	}


var menuState = {
        setup: function () {

            window.addEventListener("touchstart", gameStartListener, false);
            var thisBackground = "assets/img/StartSreen.png"
            if (jaws.width > 320) {
                thisBackground = "assets/img/StartSreen.png"
            }
            splashScreen = new jaws.Sprite({image: thisBackground, x:0, y:0 });
        },
    
        update: function () {
        },

        draw: function () {
            splashScreen.draw();
            jaws.context.textAlign  = "right";
            jaws.context.fillStyle  = "white";
            jaws.context.font       = "bold 20px courier new";
            jaws.context.fillText("HI-SCORE : " + highscore, 240, 280);
        } 
    };

function startTheGame(score) {
    highscore = score;

    jaws.assets.add(["assets/img/splash.png", "assets/img/road.png", "assets/img/road@x2.png", "assets/img/characterSprite.png", "assets/img/obst_touristSprite.png", "assets/img/copper.png" , "assets/img/manhole.png" , "assets/img/car.png", "assets/img/devil.png", "assets/img/bike.png", "assets/img/cone.png" , "assets/img/MyCharacterDistroyed.png", "assets/img/Blur.png" ]);
    jaws.start(menuState);
    //jaws.loadAll({onfinish: menuState})
};






