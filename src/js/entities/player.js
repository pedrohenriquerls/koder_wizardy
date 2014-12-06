var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'playerSprites');
  game.physics.p2.enable(this);

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
	this.body.setZeroVelocity();

  if (this.cursors.up.isDown){
      this.body.moveUp(300)
  }
  else if (this.cursors.down.isDown){
      this.body.moveDown(300);
  }

  if (this.cursors.left.isDown){
      this.body.velocity.x = -300;
  }
  else if (this.cursors.right.isDown){
      this.body.moveRight(300);
  }
};

module.exports = Player;
