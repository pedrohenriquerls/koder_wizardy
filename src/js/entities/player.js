var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'playerSprites');
  game.physics.arcade.enable(this);

  this.body.collideWorldBounds = true

  this.cursors = game.input.keyboard.createCursorKeys();

  game.add.existing(this);
  game.camera.follow(this);

  this.loadAnimations()
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function() {
  //player movement
  this.body.velocity.y = 0;
  this.body.velocity.x = 0;

  if(this.cursors.up.isDown) {
    this.body.velocity.y -= 150;
    this.animations.play('walkTop', 30);
  }
  else if(this.cursors.down.isDown) {
    this.body.velocity.y += 150;
    this.animations.play('walkBottom', 30);
  }
  if(this.cursors.left.isDown) {
    this.body.velocity.x -= 150;
    this.animations.play('walkLeft', 30);
  }
  else if(this.cursors.right.isDown) {
    this.body.velocity.x += 150;
    this.animations.play('walkRight', 30);
  }
}

Player.prototype.addCollider = function(game, layer){
  game.physics.arcade.collide(this, layer);
}

Player.prototype.loadAnimations = function(){
  this.animations.add('walkBottom', [0,1], 10);
  this.animations.add('walkTop', [2,3], 10);
  this.animations.add('walkRight', [4,5], 10);
  this.animations.add('walkLeft', [6,7], 10);
}


module.exports = Player;
