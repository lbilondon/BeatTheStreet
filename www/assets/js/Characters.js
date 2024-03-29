var Characters = (function () {
    var sprites = {
            tourist: {
                speed: 0.05,
                sprite: {}
            },
            mycharacter: {
                speed: 0,
                sprite: {}
            },
            copper: {

                speed: 0.075,
                sprite: {}
            },
            frog: {
                speed: 0.175,
                sprite: {}
            },
            cone: {
                speed: 0,
                sprite: {}
            },
            car: {
                speed: 0.1,
                sprite: {}
            },
            benz: {
                  speed: 0.15,
                  sprite: {}
            },
            manhole: {
                speed: 0,
                sprite: {}
            },
            bike: {
                speed: 0.2,
                sprite: {}
            },
            passerby: {
                speed: 0.05,
                sprite: {}
            },
            manhole: {
                speed: 0,
                sprite: {}
            },
            mycharacterdestroyed: {
                sprite: {}
            }
        };
    
    var velocity;
    var count;
    var options = { frequency: 1 };  // Update every 1 milli second
                  
    function setup () {
         
        count = 0;
        dead = false;
        pastAcceleration = 0;
        velocity = 0;
                  
        var animTourist = new jaws.Animation({ sprite_sheet: 'assets/img/obst_touristSprite.png', frame_size: [43, 47], frame_duration:60 });
        sprites['tourist'].sprite = new jaws.Sprite({ x: 100, y: -43, scale: 1});
        sprites['tourist'].sprite.anim_default = animTourist.slice(0,2);
        sprites['tourist'].sprite.setImage(sprites['tourist'].sprite.anim_default.next());
                
        var animCharacter = new jaws.Animation({ sprite_sheet: 'assets/img/characterSprite.png', frame_size: [48, 46], frame_duration:60 });
        sprites['mycharacter'].sprite = new jaws.Sprite({ x: jaws.width / 2 - 20, y: jaws.height - 50, scale: 1});
        sprites['mycharacter'].sprite.anim_default = animCharacter.slice(0,2);
        sprites['mycharacter'].sprite.setImage(sprites['mycharacter'].sprite.anim_default.next());

        var animCharacterDestroyed = new jaws.Animation({ sprite_sheet: 'assets/img/MyCharacterDistroyed.png', frame_size: [85, 85], frame_duration:20 });
        sprites['mycharacterdestroyed'].sprite = new jaws.Sprite({ x: jaws.width / 2 - 50, y: jaws.height - 50, scale: 1});
        sprites['mycharacterdestroyed'].sprite.anim_default = animCharacterDestroyed.slice(0,6);
        sprites['mycharacterdestroyed'].sprite.setImage(sprites['mycharacterdestroyed'].sprite.anim_default.next());
                
        sprites['copper'].sprite = new jaws.Sprite({image: "assets/img/copper.png", x:0 , y:-100});
        sprites['frog'].sprite = new jaws.Sprite({image: "assets/img/Frog.png", x:100 , y:-200});
        sprites['cone'].sprite = new jaws.Sprite({image: "assets/img/cone.png", x:150 , y:-300});
        sprites['car'].sprite = new jaws.Sprite({image: "assets/img/car.png", x:160 , y:-400});
        sprites['benz'].sprite = new jaws.Sprite({image: "assets/img/car.png", x:100 , y:-600});
        sprites['passerby'].sprite = new jaws.Sprite({image: "assets/img/passerby.png", x:220 , y:-400});
        sprites['manhole'].sprite = new jaws.Sprite({image: "assets/img/manhole.png", x:150 , y:-1000});
        sprites['bike'].sprite = new jaws.Sprite({image: "assets/img/bike.png", x:150 , y:-1100});
                  
        var thisEndScreen = "assets/img/gameover.png"
        finalScreen = new jaws.Sprite({image: thisEndScreen, x:0, y:0 });
        if (navigator.accelerometer) {
                  watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 1 });                 
        }
    }
                
                                
    function update () {
                  
        if (!dead) {

        if (sprites['tourist'].sprite.y > jaws.height) {
            var y = Math.random() * 800;
            sprites['tourist'].sprite.moveTo(250, -y);
        } 
        else {
            sprites['tourist'].sprite.moveTo(250, sprites['tourist'].sprite.y+(Game.getSpeed()+sprites['tourist'].speed)*dt);
        }
        sprites['tourist'].sprite.setImage(sprites['tourist'].sprite.anim_default.next());
        sprites['mycharacter'].sprite.setImage(sprites['mycharacter'].sprite.anim_default.next());
                
        if (sprites['copper'].sprite.y > jaws.height) {
            var y = Math.random() * 1000;
            sprites['copper'].sprite.moveTo(50, -y);
        } 
        else {
            sprites['copper'].sprite.y+=(Game.getSpeed()+sprites['copper'].speed)*dt;
        }
          
        if (sprites['frog'].sprite.y > jaws.height) {
            var x = Math.Random * 100;
            var y = Math.random() * jaws.canvas.height;
            sprites['frog'].sprite.moveTo(180, -y);
        } 
        else {
            sprites['frog'].sprite.y+=(Game.getSpeed()+sprites['frog'].speed)*dt;
        }
                  
        if (sprites['passerby'].sprite.y > jaws.height) {
            var y = Math.random() * jaws.canvas.height;
            sprites['passerby'].sprite.moveTo(220, -y);
        } 
            else {
            sprites['passerby'].sprite.y+=(Game.getSpeed()+sprites['passerby'].speed)*dt;
        }
                  
        if (sprites['cone'].sprite.y > jaws.height) {
            var x = Math.random() * jaws.canvas.width  
            var y = Math.random() * jaws.canvas.height;
            sprites['cone'].sprite.moveTo(x, -y);
        } 
        else {
        sprites['cone'].sprite.y+=0.2*dt/0.5;
        }
                
        if (sprites['car'].sprite.y > jaws.height) {
            var x = 160  
            var y = Math.random() * 1400;
            sprites['car'].sprite.moveTo(x, -y);
        } 
            else {
            sprites['car'].sprite.y+=(Game.getSpeed()+sprites['car'].speed)*dt;
        }
                  
        if (sprites['bike'].sprite.y > jaws.height) {
            var x = 130  
            var y = Math.random() * 1300;
            sprites['bike'].sprite.moveTo(x, -y);
        } 
        else {
            sprites['bike'].sprite.y+=(Game.getSpeed()+sprites['bike'].speed)*dt;
        }
                  
        if (sprites['benz'].sprite.y > jaws.height) {
            var x = 100  
            var y = Math.random() * 1600;
            sprites['benz'].sprite.moveTo(x, -y);
        } 
            else {
            sprites['benz'].sprite.y+=(Game.getSpeed()+sprites['benz'].speed)*dt;

        }
                
        if (sprites['manhole'].sprite.y > jaws.height) {
            // Making sure they done get placed at the edge of the boundaries
            var x = Math.random() * jaws.canvas.width
            if (x > 290 )
                x -= 30;
            if (x<30)
                x +=30
            var y = Math.random() * jaws.canvas.height * 10;
            sprites['manhole'].sprite.moveTo(x, -y);
        } 
        else {
            sprites['manhole'].sprite.y += 0.2*dt/0.5; //0.5 here is the damping factor
        }
        if (
            (jaws.collideOneWithOne(sprites['mycharacter'].sprite,sprites['benz'].sprite))||
            (jaws.collideOneWithOne(sprites['mycharacter'].sprite,sprites['cone'].sprite)))
        {
            sprites['mycharacterdestroyed'].sprite.moveTo(sprites['mycharacter'].sprite.x, sprites['mycharacterdestroyed'].sprite.y)
            sprites['mycharacterdestroyed'].sprite.setImage(sprites['mycharacterdestroyed'].sprite.anim_default.next());
            dead = true;
        }
        
        if (
            (jaws.collideCircles(sprites['mycharacter'].sprite,sprites['tourist'].sprite))||
            (jaws.collideCircles(sprites['mycharacter'].sprite,sprites['bike'].sprite))||
            (jaws.collideOneWithOne(sprites['mycharacter'].sprite,sprites['frog'].sprite))||
            (jaws.collideOneWithOne(sprites['mycharacter'].sprite,sprites['car'].sprite))||
            (jaws.collideCircles(sprites['mycharacter'].sprite,sprites['copper'].sprite))||
            (jaws.collideCircles(sprites['mycharacter'].sprite,sprites['manhole'].sprite))||
            (jaws.collideCircles(sprites['mycharacter'].sprite,sprites['passerby'].sprite)))
            
        {
            sprites['mycharacterdestroyed'].sprite.moveTo(sprites['mycharacter'].sprite.x-20, sprites['mycharacterdestroyed'].sprite.y);
            sprites['mycharacterdestroyed'].sprite.setImage(sprites['mycharacterdestroyed'].sprite.anim_default.next());
            dead = true; 
        }
    }
        else
        {
            sprites['mycharacterdestroyed'].sprite.setImage(sprites['mycharacterdestroyed'].sprite.anim_default.next());
                  
        }

    }
       
                
    function draw () {
        sprites['manhole'].sprite.draw(); 
        sprites['cone'].sprite.draw();
        sprites['tourist'].sprite.draw();
        sprites['copper'].sprite.draw();
        sprites['frog'].sprite.draw();
        sprites['passerby'].sprite.draw();
        sprites['bike'].sprite.draw();
        sprites['benz'].sprite.draw();
        sprites['car'].sprite.draw();
     
        if (dead){
            if (count < 50)  { 
                sprites['mycharacterdestroyed'].sprite.draw();  
                count++;
            } else {
                finalScreen.draw();
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
                window.setTimeout(function(){ backToStartScreen.startScreen() }, 1000);
                jaws.stop(menuState)
                jaws.stop(myGameState);
            }
        }else {
            sprites['mycharacter'].sprite.draw();
        }
                  
     }
                  
                  
    function onSuccess(acceleration) 
    { 
        var currentAcceleration = (acceleration.x * 0.1) + (pastAcceleration * 0.9)        
        velocity = currentAcceleration * 3 * dt; 
        var x = sprites['mycharacter'].sprite.x + velocity;
                 
        if (x < 20) 
        {
            x = 20;
        } 
        else if (x >= (jaws.width - sprites['mycharacter'].sprite.width - 20 ))
        {
            x = (jaws.width - sprites['mycharacter'].sprite.width - 20);

        }
        sprites['mycharacter'].sprite.moveTo(x, sprites['mycharacter'].sprite.y);
    }
                            
    function onError()
    {
                  
    }

    return {
        setup : setup,
        update: update,
        draw: draw
    };
            
})();
