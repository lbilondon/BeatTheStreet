var Game = (function () {
	

	var speed = 6,
		score = 0,
		lives = 3,
        windowWidth = 0,
        windowHeight = 0,
        my_media = null,
        mediaTimer = null;
	
	function initGame() {
		score = 0;
		lives = 3;
	}
            
    function setWindowSize() {
        if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }
            
        element = document.getElementById("canvas");
        element.width = windowWidth;
        element.height = windowHeight;
    }
            
            
    // This plays audio
        function playAudio(src) 
        {
            if (my_media == null) {
            // Creating media object from the file received
                my_media = new Media(src, onSuccess, onError);
            } // else play current audio
            // Play audio
            my_media.play();
            
            // Update my_media position every second
            if (mediaTimer == null) 
            {
            console.log("playing audio")

                mediaTimer = setInterval(function() {
                // get my_media position
                my_media.getCurrentPosition(
                    // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                            // error callback
                                                                 function(e) {
                                                                 console.log("Error getting pos=" + e);
                                                                 setAudioPosition("Error: " + e);
                                                                 }
                                                                 );
                                     }, 1000);
            }
            }
            
            // Pause audio
            // 
            function pauseAudio() {
            if (my_media) {
            my_media.pause();
            }
            }
            
            // Stop audio
            // 
            function stopAudio() {
            if (my_media) {
            my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
            }
            
            // onSuccess Callback
            //
            function onSuccess() {
            console.log("playAudio():Audio Success");
            }
            
            // onError Callback 
            //
            function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
            }
            
            // Set audio position
            // 
            function setAudioPosition(position) {
            //document.getElementById('audio_position').innerHTML = position;
            }

	
	function drawScore (context, hiscore) {
	    context.textAlign  = "right";
	    context.fillStyle  = "white";
	    context.font       = "bold 20px courier new";
	    context.fillText("SCORE:" + score, jaws.width - 10, 20);
	    
	    context.textAlign  = "left";
	    context.fillStyle  = "white";
	    context.font       = "bold 20px courier new";
	    context.fillText("HISCORE:" + hiscore, 10, 20);
	}
            
	return {
		setup: function () {

            //window.addEventListener('touchmove', function (e) { e.preventDefault() }, false);
			//jaws.preventDefaultKeys(["up", "down", "left", "right"]);
            
            setWindowSize();
            
            jaws.width = Game.getWidth();
            jaws.height = Game.getHeight();
            if (jaws.height > 640) {
                jaws.width = 640;
            }
			//initGame();
		},
        initGame: function () {
            initGame();
        },
		update: function () {
            if (!dead) {
                score += 1;
            }
		},
        playAudio : function (src)
        {
            playAudio(src);
        },
		draw: function (context, hiscore) {
			drawScore(context, hiscore);
		},
		getSpeed: function () {
			return speed;
		},
        getLives: function () {
			return lives;
        },
        getScore: function () {
            return score;
        },
        getWidth: function () {
            return windowWidth;
        },
        getHeight: function ()  {
            return windowHeight;
        }
	};
})();