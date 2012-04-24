
var obstacle = (function () {
    var obstacles = {
            tourist: {
                speed: 1,
                sprite: {}
            },
            dude: {
                speed: 1,
                sprite: {}
            },
            copper: {
                speed: 2,
                sprite: {}
            },
            frog: {
                speed: 1,
                sprite: {}
            },
            cone: {
                speed: 0,
                sprite: {}
            },
            car: {
                speed: 3,
                sprite: {}
            },
            manhole: {
                speed: 2,
                sprite: {}
            }
        };
                
    var currentObstacles = [];
    var sprites = []
    var sprite_pairs = [];
    var lives = Game.getLives();
                
    function setup () {
                
        var anim = new jaws.Animation({ sprite_sheet: 'assets/img/obst_touristSprite.png', frame_size: [43, 47], frame_duration:80 });
        obstacles['tourist'].sprite = new jaws.Sprite({ x: 100, y: -43, scale: 1});
        obstacles['tourist'].sprite.anim_default = anim.slice(0,2);
        obstacles['tourist'].sprite.setImage(obstacles['tourist'].sprite.anim_default.next());
                
        var animdude = new jaws.Animation({ sprite_sheet: 'assets/img/obst_touristSprite.png', frame_size: [43, 47], frame_duration:80 });
        obstacles['dude'].sprite = new jaws.Sprite({ x: 120, y: -50, scale: 1});
        obstacles['dude'].sprite.anim_default = animdude.slice(0,2);
        obstacles['dude'].sprite.setImage(obstacles['dude'].sprite.anim_default.next());
                
        var animcopper = new jaws.Animation({ sprite_sheet: 'assets/img/obst_touristSprite.png', frame_size: [43, 47], frame_duration:80 });
        obstacles['copper'].sprite = new jaws.Sprite({ x: 150, y: -50, scale: 1});
        obstacles['copper'].sprite.anim_default = animcopper.slice(0,2);
        obstacles['copper'].sprite.setImage(obstacles['copper'].sprite.anim_default.next());
                
        obstacles['frog'].sprite = new jaws.Sprite({image: "assets/img/devil.png", x:100 , y:-43});
        obstacles['cone'].sprite = new jaws.Sprite({image: "assets/img/copper.png", x:150 , y:-50});
        obstacles['car'].sprite = new jaws.Sprite({image: "assets/img/devil.png", x:100 , y:-43});
        obstacles['manhole'].sprite = new jaws.Sprite({image: "assets/img/manhole.png", x:150 , y:-50});

       
        var speed = Game.getSpeed();
        
        
        console.log("score and live " + lives + speed);
    }
                
                                
    function update (character){
                
        if (obstacles['tourist'].sprite.y > jaws.height) {
            obstacles['tourist'].sprite.moveTo(100, -43);
        } 
        else {
            obstacles['tourist'].sprite.moveTo(160, obstacles['tourist'].sprite.y+(Game.getSpeed()+obstacles['tourist'].speed));
        }
        obstacles['tourist'].sprite.setImage(obstacles['tourist'].sprite.anim_default.next());
        
                
        if (obstacles['dude'].sprite.y > jaws.height) {
            obstacles['dude'].sprite.moveTo(120, -50);
        } 
        else {
            obstacles['dude'].sprite.moveTo(140, obstacles['dude'].sprite.y+(Game.getSpeed()+obstacles['dude'].speed));
        }
        obstacles['dude'].sprite.setImage(obstacles['dude'].sprite.anim_default.next());
              

        if (obstacles['copper'].sprite.y > jaws.height) {
            obstacles['copper'].sprite.moveTo(140, -50);
        } 
        else {
            obstacles['copper'].sprite.moveTo(140, obstacles['copper'].sprite.y+(Game.getSpeed()+obstacles['copper'].speed));
        }
        obstacles['copper'].sprite.setImage(obstacles['copper'].sprite.anim_default.next());
                
       /* if (obstacles['dude'].sprite.y > jaws.height) {
            var x = Math.random() * jaws.canvas.width;  
            var y = Math.random() * jaws.canvas.height * 5;
            obstacles['dude'].sprite.moveTo(x, -y);
        } 
        else {
            obstacles['dude'].sprite.y+=1;
        }*/
                
        if (obstacles['copper'].sprite.y > jaws.height) {
            var x = Math.random() * jaws.canvas.width  
            var y = Math.random() * jaws.canvas.height;
            obstacles['copper'].sprite.moveTo(x, -y);
        } 
        else {
            obstacles['copper'].sprite.y+=(Game.getSpeed()+2);
        }
          
        if (obstacles['frog'].sprite.y > jaws.height) {
            var x = Math.random() * jaws.canvas.width  
            var y = Math.random() * jaws.canvas.height;
            obstacles['frog'].sprite.moveTo(x, -y);
        } 
        else {
            obstacles['frog'].sprite.y+=(Game.getSpeed()+1);
        }
                
        if (obstacles['cone'].sprite.y > jaws.height) {
            var x = Math.random() * jaws.canvas.width  
            var y = Math.random() * jaws.canvas.height;
            obstacles['cone'].sprite.moveTo(x, -y);
        } 
        else {
        obstacles['cone'].sprite.y+=(Game.getSpeed());
        }
                
        if (obstacles['car'].sprite.y > jaws.height) {
            var x = Math.random() * jaws.canvas.width  
            var y = Math.random() * jaws.canvas.height;
            obstacles['car'].sprite.moveTo(x, -y);
            } 
            else {
            obstacles['car'].sprite.y+=(Game.getSpeed()+1);
        }
                
        if (obstacles['manhole'].sprite.y > jaws.height) {
            // Making sure they done get placed at the edge of the boundaries
            var x = Math.random() * jaws.canvas.width
            if (x > 290 )
                x -= 30;
            if (x<30)
                x +=30
            var y = Math.random() * jaws.canvas.height * 10;
            obstacles['manhole'].sprite.moveTo(x, -y);
        } 
        else {
            obstacles['manhole'].sprite.y+=(Game.getSpeed());
        }
        
        // Used this for collision detection. The other collideonewithone works alright i think
       /* if ((character.getPlayer().x == obstacles['tourist'].sprite.x) && (character.getPlayer().y  == obstacles['tourist'].sprite.y)) 
        {
            lives--
            if (lives == 0)
            {
                alert ("You have No Lives left")
                alive == false;
                jaws.pause(myGameState);
                jaws.start(menuState);
            }
        }*/
                
        if ((jaws.collideOneWithOne(character.getPlayer(),obstacles['tourist'].sprite))) 
        {
            lives--
                
            if (lives == 0)
                {console.log(lives);
                backToStartScreen.startScreen();
                
                
                alert ("You Have NO lives left and your highest score is ");
                alive == false;
            }
        }
    }
       
                
    function destroy(){
        //obstacles['tourist'].sprite.anim_default = animDestroy.slice(0,2);
        //obstacles['tourist'].sprite.setImage(obstacles['tourist'].sprite.anim_default.next());
    }
                
    function draw () {
        obstacles['tourist'].sprite.draw();
                //player2.draw();
        obstacles['dude'].sprite.draw();
        obstacles['copper'].sprite.draw();
        obstacles['frog'].sprite.draw();
        obstacles['cone'].sprite.draw();
        obstacles['car'].sprite.draw();
        obstacles['manhole'].sprite.draw();
    }
                 
    return {
        setup: setup,
        update: update,
        draw: draw
    };
            
})();
