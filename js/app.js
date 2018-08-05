// Speed Randomizer
function getWild(bottom, top) {
  bottom = Math.ceil(bottom);
  top = Math.floor(top);
  return Math.floor(Math.random() * (top - bottom)) + bottom;
}

// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-laser.png';
    this.x = x;
    this.y = y;
    this.speed = getWild(100, 300);
  }


  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    if (this.x >= 500) {
      this.x = -100;
    }
    if (Math.abs(Math.floor(player.x) - Math.floor(this.x)) <= 60 &&
      Math.abs(Math.floor(player.y) - Math.floor(this.y)) <= 40) {
      window.location.reload();
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-spiff.png';
    this.x = x;
    this.y = y;
  }
  //DEATH and SUCCESS
  update(x, y) {
    //left side death
    if (this.x <= -1) {
      this.x = 220, this.y = 410;
    }
    //right side death
    if (this.x >= 401) {
      this.x = 220, this.y = 410;
    }
    //bottom death
    if (this.y > 550) {
      this.x = 220, this.y = 410;
    }
    // Mars Landing
    if (this.y < 30) {
      this.x = 220, this.y = 410, modal.style.display = "block";
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(movement) {
    switch (movement) {
      case 'right':
        this.update(this.x += 50);
        break;
      case 'left':
        this.update(this.x -= 50);
        break;
      case 'up':
        this.update(this.y -= 50);
        break;
      case 'down':
        this.update(this.y += 50);
        break;
    }
  }
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("modal-opener");
document.getElementById("modal-opener").style.display = "none";

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(10, 100, 150);
allEnemies.push(enemy1);
const enemy2 = new Enemy(10, 200, 53);
allEnemies.push(enemy2);
const enemy3 = new Enemy(10, 300, 79);
allEnemies.push(enemy3);
const enemy4 = new Enemy(-200, 100, 65);
allEnemies.push(enemy4);
const enemy5 = new Enemy(-200, 200, 120);
allEnemies.push(enemy5);
const enemy6 = new Enemy(-200, 300, 200);
allEnemies.push(enemy6);
//Place the player object in a variable called player
const player = new Player(220, 410);


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