var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'playerSprites');
  game.physics.arcade.enable(this);

  this.body.collideWorldBounds = true

  this.cursors = game.input.keyboard.createCursorKeys();

  game.add.existing(this);

  game.camera.follow(this);
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
  }
  else if(this.cursors.down.isDown) {
    this.body.velocity.y += 150;
  }
  if(this.cursors.left.isDown) {
    this.body.velocity.x -= 150;
  }
  else if(this.cursors.right.isDown) {
    this.body.velocity.x += 150;
  }
};

module.exports = Player;
