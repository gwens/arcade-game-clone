//gems should appear randomly on the road at the beginning of each level
//collecting a gem gives points that display in the top-right, next to a mini picture of a gem
//points can be stored in the player object
//gems can't be on top of each other
//gems stored in a 5x3 array to represent the squares? 
//Random number in each square, then cycle through and add relevant gem or object with a switch statement?

//rows are at ROW * 83 - 30 (rows 1-3) or ROW * 83 + 53 (rows 0-2)
//columns are at COLUMN * 100 (cols 1-5)
//let's have heart, star, and 3 gems, and nothing, in proportions:
//nothing: 9 0:49
//blue gem: 3 50:69
//green gem: 2 70:84
//orange gem: 0.5 85:94
//heart: 0.25 95:97
//star: 0.25 98:99
//random numbers from 0 to 99

var Gems = function(){
    this.gemGrid = [[],[],[],[],[],[]]; //gemGrid[row][col]
    this.initialize();
};

Gems.prototype.initialize = function(){
    for (var i = 1; i < 4; i++){ //iterate over rows
        for (var j = 0; j < 5; j++){
            var random = Math.floor(Math.random()*100);
            switch(true){
                case (random < 50):
                this.gemGrid[i][j] = 0;
                break;
                case (random < 70):
                this.gemGrid[i][j] = 1;
                break;
                case (random < 85):
                this.gemGrid[i][j] = 2;
                break;
                case (random < 95):
                this.gemGrid[i][j] = 3;
                break;
                case (random < 98):
                this.gemGrid[i][j] = 4;
                break;
                case (random < 100): //could also use default but reads weirdly
                this.gemGrid[i][j] = 5;
                break;
            }
        }
    }
};

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.width = 70;
    this.height = 50;
    this.initialize();
};

Enemy.prototype.initialize = function(){
    this.speed = Math.random() * player.level * 100 + 100; //make this a function of level? or make initialize a function of level
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
    this.score = 0;
    this.lives = 3;
    this.level = 1;
};

Player.prototype.initialize = function(){
    this.col = 2;
    this.row = 5;
    this.x = this.col * 100;
    this.y = this.row * 83 - 30;
};

Player.prototype.handleInput = function(keypress){
    switch(keypress){
        case 'left':
            this.col -= 1;
            //this.x = this.x - 101;
            break;
        case 'right':
            this.col += 1;
            //this.x = this.x + 101;
            break;
        case 'up':
            this.row -= 1;
            //this.y = this.y - 83;
            break;
        case 'down':
            this.row += 1;
            //this.y = this.y + 83;
            break;
    }
};

Player.prototype.update = function(dt){
    //win if you reach the water
    if (this.row == 0){
        player.level += 1;
        this.initialize();
        gems.initialize();
    }
    //don't go off screen
    else if(this.row > 5){
        this.row = 5;
    }
    else if(this.col > 4){
        this.col = 4;
    }
    else if(this.col < 0){
        this.col = 0;
    }
    //collect any gems
    var pickup = gems.gemGrid[this.row][this.col];
    switch(pickup){
        case 1:
        this.score += 1;
        break;
        case 2:
        this.score += 2;
        break;
        case 3:
        this.score += 5;
        break;
        case 4:
        this.lives += 1;
        break;
        case 5:
        //add code for invincibility
        break;
    }
    console.log("score is " + this.score + " lives " + this.lives);
    //cell is now empty
    gems.gemGrid[this.row][this.col] = 0;
    //update actual position
    this.x = this.col * 100;
    this.y = this.row * 83 - 30;
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
            player.lives -= 1;
            gems.initialize();
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player          ////

//there are only three bugs on screen at any one time

//setGems();
//renderGems();

var gems = new Gems();
var player = new Player();
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];






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
