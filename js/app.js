////from engine.js:
/*This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.*/

////need to randomise y position of new enemy. and timing/probability of new one appearing at any time? or have a constant number, some of which are off screen
////keep track of amount of space enemy takes up, so they can't appear too close together? - no, they overlap in video (could add this feature though)

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.width = 70;
    this.height = 50;
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


var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.initialize();
    this.width = 50;
    this.height = 60;
};

Player.prototype.initialize = function(){
    this.x = 200;
    this.y = 83 * 4 + 53;
};

Player.prototype.handleInput = function(keypress){
    switch(keypress){
        case 'left':
            this.x = this.x - 101;
            break;
        case 'right':
            this.x = this.x + 101;
            break;
        case 'up':
            this.y = this.y - 83;
            break;
        case 'down':
            this.y = this.y + 83;
            break;
    }
};

Player.prototype.update = function(dt){
    //win if you reach the water
    if (this.y <= -30){
        this.initialize();
    }
    //don't go off screen
    else if(this.y > 83 * 4 + 53){
        this.y = 83 * 4 + 53;
    }
    else if(this.x > 200 + 101 * 2){
        this.x = 200 + 101 * 2;
    }
    else if(this.x < 200 - 101 * 2){
        this.x = 200 - 101 * 2;
    }
};

//could refactor into a general sprite render method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function checkCollisions(){
    for (i = 0; i < allEnemies.length; i++){
        var enemy = allEnemies[i];
        // bounding box collision detection
        if (player.x < enemy.x + enemy.width  && player.x + enemy.width  > enemy.x &&
        player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
            player.initialize();
            //console.log('collision detected');
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player          ////

//there are only three bugs on screen at any one time

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
