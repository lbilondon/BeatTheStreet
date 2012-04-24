var EndScreen = (function () {
                 
        setup: function () {
                 
        Game.setup()
        road = new jaws.Viewport({max_x: jaws.width, max_y: jaws.height})
        var thisBackground = "assets/img/endscreen.png"
        if (jaws.width > 320) {
            //thisBackground = "x"
        }
                 road.addLayer({image: thisBackground, x:0, y: jaws.height, damping: 1});
                 Characters.setup(highscore);
        },

})();