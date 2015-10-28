////from engine.js:
/*This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.*/

////need to randomise y position of new enemy. and timing/probability of new one appearing at any time? or have a constant number, some of which are off screen
////keep track of amount of space enemy takes up, so they can't appear too close together? - no, they overlap in video (could add this feature though)

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initialize();
};

Enemy.prototype.initialize = function(){
    this.speed = Math.random() * 150 + 50;
    this.x = -100;
    this.y = (Math.floor(Math.random() * 3 ) + 1) * 83 - 30; //choose random row
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //if bug is off right of screen, move it back to left-hand side and initialize row and speed again
    if (this.x > 550){
        this.initialize();
    }
    else{
    //bugs move at a constant speed and do not affect each other (can overtake/overlap)
        this.x = this.x + this.speed * dt;
    }                                                      
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


////start with Enemy as prototype or not?                   ////
/*var Player = function(){

}

Player.prototype.update = function(dt){

}*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player          ////

//there are only three bugs on screen at any one time

var bug = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug, bug2, bug3];





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
/*document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});*/
